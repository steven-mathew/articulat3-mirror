# -----------------------------------------------------------------------------
# Hashistack versions
# -----------------------------------------------------------------------------

locals {
  dependencies = yamldecode(file("../../dev/terraform/dependencies.yaml"))
}

# -----------------------------------------------------------------------------
# Default VPC
# -----------------------------------------------------------------------------

resource "digitalocean_vpc" "default" {
  name   = "${var.vpc_name}-${terraform.workspace}"
  region = var.region
}

# -----------------------------------------------------------------------------
# Reserved IP to persist through instance restarts and serve as a known value
# for filling out DNS via chosen host, eg 44.194.137.14
# -----------------------------------------------------------------------------

resource "digitalocean_reserved_ip" "lb" {
  region = var.region
}

resource "digitalocean_reserved_ip_assignment" "lb" {
  ip_address = digitalocean_reserved_ip.lb.ip_address
  droplet_id = digitalocean_droplet.droplet.id
}

# -----------------------------------------------------------------------------
# Droplet config
# -----------------------------------------------------------------------------

resource "digitalocean_droplet" "droplet" {
  image    = "ubuntu-20-04-x64"
  name     = "${var.droplet_name}-${terraform.workspace}"
  size     = var.droplet_size
  region   = var.region
  vpc_uuid = digitalocean_vpc.default.id
  ssh_keys = [digitalocean_ssh_key.droplet_ssh_keypair.fingerprint]

  # Add config files, scripts, Nomad jobs to host
  provisioner "file" {
    source      = "../../dev/terraform/vm_assets/"
    destination = "/root"

    connection {
      host        = self.ipv4_address
      type        = "ssh"
      user        = "root"
      private_key = tls_private_key.droplet_ssh_key.private_key_pem
    }
  }

  provisioner "file" {
    source      = "../../flake.nix"
    destination = "/root/flake.nix"

    connection {
      host        = self.ipv4_address
      type        = "ssh"
      user        = "root"
      private_key = tls_private_key.droplet_ssh_key.private_key_pem
    }
  }

  provisioner "file" {
    source      = "../../flake.lock"
    destination = "/root/flake.lock"

    connection {
      host        = self.ipv4_address
      type        = "ssh"
      user        = "root"
      private_key = tls_private_key.droplet_ssh_key.private_key_pem
    }
  }

  provisioner "file" {
    source      = "../../shell.nix"
    destination = "/root/shell.nix"

    connection {
      host        = self.ipv4_address
      type        = "ssh"
      user        = "root"
      private_key = tls_private_key.droplet_ssh_key.private_key_pem
    }
  }

  user_data = templatefile("../../dev/terraform/scripts/startup.sh",
    {
      home_path          = "/root"
      dns_zone           = var.dns_host == "sslip.io" ? "${digitalocean_reserved_ip.lb.ip_address}.${var.dns_host}" : var.dns_host,
      enable_letsencrypt = var.enable_letsencrypt,
      droplet_ssh_private_key = tls_private_key.droplet_ssh_key.private_key_openssh,
      droplet_ssh_public_key = tls_private_key.droplet_ssh_key.public_key_openssh,

      nomad_version  = local.dependencies.nomad.version,
      nomad_checksum = local.dependencies.nomad.checksum,

      consul_version  = local.dependencies.consul.version,
      consul_checksum = local.dependencies.consul.checksum,

      vault_version  = local.dependencies.vault.version,
      vault_checksum = local.dependencies.vault.checksum,

      traefik_version  = local.dependencies.traefik.version,
      traefik_checksum = local.dependencies.traefik.checksum,
    }
  )
}

# -----------------------------------------------------------------------------
# Firewall rules to specify allowed inbound/outbound addresses/ports
# -----------------------------------------------------------------------------

resource "digitalocean_firewall" "allow_ssh_inbound" {
  count       = length(var.allowed_ssh_cidr_blocks) > 0 ? 1 : 0
  name        = "allow-ssh-inbound-${terraform.workspace}"
  droplet_ids = [digitalocean_droplet.droplet.id]

  # ssh
  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = var.allowed_ssh_cidr_blocks
  }
}

resource "digitalocean_firewall" "allow_traefik_app_http_inbound" {
  count       = length(var.allowed_inbound_cidr_blocks) > 0 ? 1 : 0
  name        = "allow-traefik-app-http-inbound-${terraform.workspace}"
  droplet_ids = [digitalocean_droplet.droplet.id]

  # traefik app http
  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = var.allowed_inbound_cidr_blocks
  }
}

resource "digitalocean_firewall" "allow_traefik_app_https_inbound" {
  count       = var.enable_letsencrypt && length(var.allowed_inbound_cidr_blocks) > 0 ? 1 : 0
  name        = "allow-traefik-app-https-inbound-${terraform.workspace}"
  droplet_ids = [digitalocean_droplet.droplet.id]

  # traefik app https
  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = var.allowed_inbound_cidr_blocks
  }
}

resource "digitalocean_firewall" "allow_nomad_api_inbound" {
  count       = var.allow_inbound_http_nomad && length(var.allowed_inbound_cidr_blocks) > 0 ? 1 : 0
  name        = "allow-nomad-api-inbound-${terraform.workspace}"
  droplet_ids = [digitalocean_droplet.droplet.id]

  # nomad api
  inbound_rule {
    protocol         = "tcp"
    port_range       = "4646"
    source_addresses = var.allowed_inbound_cidr_blocks
  }
}

resource "digitalocean_firewall" "allow_consul_api_inbound" {
  count       = var.allow_inbound_http_consul && length(var.allowed_inbound_cidr_blocks) > 0 ? 1 : 0
  name        = "allow-consul-api-inbound-${terraform.workspace}"
  droplet_ids = [digitalocean_droplet.droplet.id]

  # consul api
  inbound_rule {
    protocol         = "tcp"
    port_range       = "8500"
    source_addresses = var.allowed_inbound_cidr_blocks
  }
}

resource "digitalocean_firewall" "allow_temporal_server_inbound" {
  count       = length(var.allowed_inbound_cidr_blocks) > 0 ? 1 : 0
  name        = "allow-temporal-server-inbound-${terraform.workspace}"
  droplet_ids = [digitalocean_droplet.droplet.id]

  # temporal server
  inbound_rule {
    protocol         = "tcp"
    port_range       = "7233"
    source_addresses = var.allowed_inbound_cidr_blocks
  }
}

resource "digitalocean_firewall" "allow_all_outbound" {
  name        = "allow-all-outbound-${terraform.workspace}"
  droplet_ids = [digitalocean_droplet.droplet.id]

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = var.allow_outbound_cidr_blocks
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = var.allow_outbound_cidr_blocks
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = var.allow_outbound_cidr_blocks
  }
}

# -----------------------------------------------------------------------------
# SSH keypair
# -----------------------------------------------------------------------------

resource "tls_private_key" "droplet_ssh_key" {
  algorithm = "RSA"
  rsa_bits  = "4096"
}

resource "digitalocean_ssh_key" "droplet_ssh_keypair" {
  name       = "${var.droplet_name}_ssh_key"
  public_key = tls_private_key.droplet_ssh_key.public_key_openssh
}

resource "digitalocean_project" "project" {
  count       = var.project_name != "" ? 1 : 0
  name        = "${var.project_name}-${terraform.workspace}"
  description = "A project for ${var.project_name} in ${terraform.workspace}"
  purpose     = var.project_purpose
  environment = terraform.workspace # Development, Staging, Production
}

# Atach resources to project:
resource "digitalocean_project_resources" "project_resource" {
  count     = var.project_name != "" ? 1 : 0
  project   = digitalocean_project.project[count.index].id
  resources = compact(concat(
      digitalocean_droplet.droplet[*].urn,
    ))
}
