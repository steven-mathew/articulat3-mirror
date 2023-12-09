job "traefik" {
  region      = "global"
  datacenters = ["dc1"]
  type        = "service"

  group "traefik" {
    count = 1

    network {
      port "http" {
        static = 80
      }

      port "https" {
        static = 443
      }

      port "api" {
        static = 8081
      }


      port "grpc" {
        static = 7233
      }
    }

    service {
      name = "traefik-entrypoint-grpc"
      port = "grpc"

      check {
        type     = "tcp"
        interval = "10s"
        timeout  = "5s"
      }
    }

    service {
      name = "traefik"

      # tags = [
      # 	"traefik.enable=true",

      # 	"traefik.http.routers.http-catchall.rule=hostregexp(`{host:.+}`)",
      # 	"traefik.http.routers.http-catchall.entrypoints=web",
      # 	"traefik.http.routers.http-catchall.middlewares=https-redirect",

      # 	"traefik.http.middlewares.https-redirect.redirectscheme.scheme=https",
      # 	#"traefik.http.middlewares.https-redirect.redirectscheme.permanent=true",
      # ]

      check {
        name     = "alive"
        type     = "tcp"
        port     = "http"
        interval = "10s"
        timeout  = "2s"
      }
    }

    task "traefik" {
      driver = "raw_exec"

      config {
        command = "traefik"
        args = [
          "--configfile", "local/traefik.toml"
        ]
      }

      template {
        data = <<EOF
[log]
  level = "DEBUG"

[entryPoints]
  [entryPoints.web]
    address = ":80"
    [entryPoints.web.http]
      [entryPoints.web.http.redirections]
        [entryPoints.web.http.redirections.entryPoint]
          to = "websecure"
          scheme = "https"

  [entryPoints.websecure]
    address = ":443"
    [entryPoints.websecure.http.tls]

  [entryPoints.traefik]
    address = ":8081"

  [entryPoints.grpc]
    address = ":7233"

# Let's Encrypt TLS
[certificatesResolvers.letsencrypt-tls.acme]
  # Supply an email to get cert expiration notices
  email = "articulat3.3d@gmail.com"
  # The CA server can be toggled to staging for testing/avoiding rate limits
  caServer = "https://acme-staging-v02.api.letsencrypt.org/directory"
  # caServer = "https://acme-v02.api.letsencrypt.org/directory"
  storage = "/acme.json"
  [certificatesResolvers.letsencrypt-tls.acme.tlsChallenge]

[api]
    dashboard = true
    insecure  = true

# Enable Consul Catalog configuration backend.
[providers.consulCatalog]
    prefix           = "traefik"
    exposedByDefault = false

    [providers.consulCatalog.endpoint]
      address = "127.0.0.1:8500"
      scheme  = "http"

[http.middlewares]
  [http.middlewares.https-redirect.redirectscheme]
    scheme = "https"
    permanent = true
EOF

        destination = "local/traefik.toml"
      }

    }
  }
}
