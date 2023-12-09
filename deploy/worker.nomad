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

locals {
  worker_private_ssh_key = "${file("${pathexpand("/tmp/worker_private_ssh_key")}")}"
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
    auto_promote = true
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

        cd ${repo_dir}/dev/worker

        mkdir ~/.ssh
        ssh-keyscan -H ${var.server} >> ~/.ssh/known_hosts
        eval `ssh-agent -s`
        ssh-add - <<< "${local.worker_private_ssh_key}"

        ./run-worker.sh -p 2233 -u ${var.user} -s ${var.server} -t ${var.temporal_host_port}

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
