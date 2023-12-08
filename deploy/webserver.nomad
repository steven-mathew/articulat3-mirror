variable "articulate_folder" {
  type        = string
  default     = "/root/project-44-toronto-intelligence-m/"
  description = "Articulate folder path"
}

variable "dns_domain" {
  type        = string
  default     = "articulat3.com"
  description = "hostname"
}

variable "production" {
  type        = bool
  default     = false
  description = "Whether or not this job should run in production mode. Default: false."
}

variable "letsencrypt_env" {
  type    = string
  default = "prod"
  description = <<EOF
The Let's Encrypt cert resolver to use. Options are 'staging' and 'prod'. (Default: prod)

With the letsencrypt-prod cert resolver, we're limited to *5 requests per week* for a cert with matching domain and SANs.
For testing/staging, it is recommended to use letsencrypt-staging, which has vastly increased limits.
EOF

  validation {
    condition     = var.letsencrypt_env == "staging" || var.letsencrypt_env == "prod"
    error_message = "The Let's Encrypt env must be either 'staging' or 'prod'."
  }
}

variable "git_ref" {
  type        = string
  default     = "refs/heads/main"
  description = "Git ref to use for the spin repo clone. Default: refs/heads/main"
}

variable "commit_sha" {
  type        = string
  default     = ""
  description = "Specific commit SHA to check out. Default: empty/none"
}

job "webserver" {
  datacenters = ["dc1"]
  type        = "service"

  constraint {
    attribute = "${attr.kernel.name}"
    value     = "linux"
  }

  group "webserver" {
    count = 1

    update {
      max_parallel      = 1
      min_healthy_time  = "10s"
      healthy_deadline  = "10m"
      progress_deadline = "15m"
      auto_revert       = true
    }

    network {
      port "http" {}
    }

    service {
      name = "webserver-${NOMAD_NAMESPACE}"
      port = "http"

      tags = var.production ? [
        # Prod config
        "traefik.enable=true",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.rule=Host(`${var.dns_domain}`, `www.${var.dns_domain}`)",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.entryPoints=web,websecure",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.tls=true",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.tls.certresolver=letsencrypt-tls",
        #"traefik.http.routers.webserver-${NOMAD_NAMESPACE}.tls.certresolver=letsencrypt-cf-${var.letsencrypt_env}",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.tls.domains[0].main=www.${var.dns_domain}",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.tls.domains[1].main=${var.dns_domain}",

        # NOTE: middleware name MUST be unique across a given namespace.
        # If there are duplicates, Traefik errors out and each site using the
        # duplicated name will not be routed to (404).
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.middlewares=webserver-www-redirect",
        "traefik.http.middlewares.webserver-www-redirect.redirectregex.regex=^https?://${var.dns_domain}/(.*)",
        "traefik.http.middlewares.webserver-www-redirect.redirectregex.replacement=https://www.${var.dns_domain}/$${1}",
        "traefik.http.middlewares.webserver-www-redirect.redirectregex.permanent=true",
      ] : [
        # Staging config
        "traefik.enable=true",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.rule=Host(`staging.${var.dns_domain}`)",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.entryPoints=web,websecure",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.tls=true",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.tls.certresolver=letsencrypt-cf-${var.letsencrypt_env}",
        "traefik.http.routers.webserver-${NOMAD_NAMESPACE}.tls.domains[0].main=staging.${var.dns_domain}"
      ]

      check {
        name     = "alive"
        type     = "tcp"
        interval = "10s"
        timeout  = "2s"
      }
    }

    task "webserver" {
      driver = "raw_exec"

      artifact {
        source   = "git::git@github.com:csc301-2023-fall/project-44-toronto-intelligence-m.git"
        destination = "${NOMAD_TASK_DIR}/articulate"
        # options {
        #     sshkey = "${base64encode(file(pathexpand("~/.ssh/id_rsa")))}"
        # }
      }

      env {
        GOOGLE_APPLICATION_CREDENTIALS = "secrets/credentials.json"
        PORT = "${NOMAD_PORT_http}"
        GCS_BUCKET_NAME = "articulate-store-tflto"
      }

      template {
        data = <<-EOF
        #!/bin/bash

        set -euo pipefail

        readonly repo_dir="${NOMAD_TASK_DIR}/articulate"
        echo $repo_dir

        # Capture branch/tag name from full ref
        readonly branch="$(echo ${var.git_ref} | cut -d'/' -f3-)"

        cd ${repo_dir}

        # Check out commit if provided
        [[ "${var.commit_sha}" == "" ]] || git checkout ${var.commit_sha}

        bob build build-art
        bob build build-art-web
        ./.bin/articulate
        EOF
        destination = "${NOMAD_TASK_DIR}/publish.bash"
        perms       = "777"
      }

      config {
        command = "bash"
        args = ["${NOMAD_TASK_DIR}/publish.bash"]
      }
    }
  }
}
