variable "user" {
  type        = string
  description = "The username to use for the worker using SSH."
}

variable "server" {
  type        = string
  description = "The IP address or DNS hostname of the target server."
}

variable "temporal_host_port" {
  type        = string
  description = "Temporal host port for the worker to accept jobs from."
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

variable "backend_fqdn" {
  type        = string
  description = "The fully-qualified domain name of the server the worker can make request to."
}

job "worker" {
  datacenters = ["dc1"]
  type = "service"

  update {
    max_parallel = 1
    min_healthy_time = "10s"
    healthy_deadline = "3m"
    progress_deadline = "60m"
    auto_revert = false
  }

  migrate {
    max_parallel = 1
    health_check = "checks"
    min_healthy_time = "10s"
    healthy_deadline = "5m"
  }

  group "worker" {
    count = 1

    restart {
      attempts = 2
      interval = "30m"
      delay = "15s"
      mode = "fail"
    }

    task "work" {
      driver = "raw_exec"

      artifact {
        source   = "git::git@github.com:csc301-2023-fall/project-44-toronto-intelligence-m.git"
        destination = "${NOMAD_TASK_DIR}/articulate"
      }

      template {
        data = <<-EOF
        #!/bin/bash

        set -euo pipefail

        readonly repo_dir="${NOMAD_TASK_DIR}/articulate"
        echo $repo_dir

        # Capture branch/tag name from full ref
        readonly branch="$(echo ${var.git_ref} | cut -d'/' -f3-)"

        cd ${repo_dir}/dev/worker

        # Check out commit if provided
        [[ "${var.commit_sha}" == "" ]] || git checkout ${var.commit_sha}

        # NOTE: Assumes this host can ssh to user@server. Make sure you configure this.
        ./run-worker.sh -p 2233 -u ${var.user} -s ${var.server} -t ${var.temporal_host_port} -f ${var.backend_fqdn}

        EOF
        destination = "${NOMAD_TASK_DIR}/run.bash"
        perms       = "777"
      }

      config {
        command = "bash"
        args = ["${NOMAD_TASK_DIR}/run.bash"]
      }

      resources {
        cpu    = 200
        memory = 256
      }
    }
  }
}
