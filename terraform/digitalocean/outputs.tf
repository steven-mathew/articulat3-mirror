output "droplet_ssh_public_key" {
  description = "The public key for SSH access to the Droplet instance"
  value       = tls_private_key.droplet_ssh_key.public_key_pem
}

output "droplet_ssh_public_key_openssh" {
  description = "The public openssh key for SSH access to the Droplet instance"
  value       = tls_private_key.droplet_ssh_key.public_key_openssh
}

output "droplet_ssh_private_key_openssh" {
  description = "The public openssh key for SSH access to the Droplet instance"
  value       = tls_private_key.droplet_ssh_key.private_key_openssh
  sensitive   = true
}

output "droplet_ssh_private_key" {
  description = "The private key for SSH access to the Droplet instance"
  value       = tls_private_key.droplet_ssh_key.private_key_pem
  sensitive   = true
}

output "public_ip_address" {
  description = "The public IP address associated with the Droplet instance"
  value       = digitalocean_reserved_ip.lb.ip_address
}

output "dns_host" {
  description = "The DNS host to use for construction of the root domain for Fermyon Platform services and apps"
  value       = var.dns_host
}

output "environment" {
  description = "Get environment config by running: $(terraform output -raw environment)"
  sensitive   = true
  value       = <<EOM
export DNS_DOMAIN=${var.dns_host == "sslip.io" ? "${digitalocean_reserved_ip.lb.ip_address}.${var.dns_host}" : var.dns_host}
EOM
}
