variable "dns_domain" {
  type        = string
  default     = "temporal.local.fermyon.link"
  description = "hostname"
}

job "temporal" {
  datacenters = ["dc1"]
  type        = "service"

  constraint {
    attribute = "${attr.kernel.name}"
    value     = "linux"
  }

  group "temporal" {
    count = 1

    network {
      port  "temporal-app" {
        to = 7233
      }
    }

    service {
      name = "temporal-app"
      tags = [
        # Middlewares
        # "traefik.tcp.middlewares.temporal-app.grpcWeb.allowOrigins=*",
        # Services
        #"traefik.tcp.routers.temporal-app.rule=HostSNI(`tempo.${var.dns_domain}`)",
        "traefik.tcp.routers.temporal-app.rule=HostSNI(`*`)",
        # "traefik.tcp.services.temporal-app.loadbalancer.server.port=7233",
        # "traefik.tcp.routers.temporal-app.tls.passthrough=true",
        "traefik.tcp.routers.temporal-app.entrypoints=grpc",
        "traefik.enable=true",
      ]

      port = "temporal-app"

      check {
         type = "tcp"
         interval = "30s"
         timeout = "2s"
      }
    }

    task "temporal-app" {
      driver = "docker"

      env {
        DB = "postgresql"
        DB_PORT = 5432
        POSTGRES_USER = "root"
        POSTGRES_PWD = "rootpassword"
        # DYNAMIC_CONFIG_FILE_PATH = "/etc/dynamic-config.yaml"
        BIND_ON_IP = "0.0.0.0"
        TEMPORAL_BROADCAST_ADDRESS = "127.0.0.1"
      }

      config {
        image = "temporalio/auto-setup:1.22.0"
        force_pull = true

        ports = ["temporal-app"]
      }

      resources {
        memory = 256
      }

      template {
        data = <<EOF
{{ range service "postgres" }}
POSTGRES_SEEDS = "{{ .Address }}"
{{ end }}
EOF
        destination = "local/env"
        env         = true
      }

      template {
        data   = <<EOF
frontend.keepAliveMaxConnectionAge:
- value: 48m
frontend.keepAliveMaxConnectionAgeGrace:
- value: 70s
frontend.enableClientVersionCheck:
- value: true
  constraints: {}
history.persistenceMaxQPS:
- value: 3000
  constraints: {}
frontend.persistenceMaxQPS:
- value: 3000
  constraints: {}
frontend.historyMgrNumConns:
- value: 10
  constraints: {}
frontend.throttledLogRPS:
- value: 20
  constraints: {}
history.historyMgrNumConns:
- value: 50
  constraints: {}
history.defaultActivityRetryPolicy:
- value:
    InitialIntervalInSeconds: 1
    MaximumIntervalCoefficient: 100.0
    BackoffCoefficient: 2.0
    MaximumAttempts: 0
history.defaultWorkflowRetryPolicy:
- value:
    InitialIntervalInSeconds: 1
    MaximumIntervalCoefficient: 100.0
    BackoffCoefficient: 2.0
    MaximumAttempts: 0
system.advancedVisibilityWritingMode:
- value: "off"
  constraints: {}
EOF
        destination = "/etc/dynamic-config.yaml"
      }
    }
  }
}
