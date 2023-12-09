These files are based closely on these files from [fermyon](https://github.com/fermyon/installer/blob/main/digitalocean/README.md).
The modifications we've added allow multiple workspaces (i.e. multiple environments for staging and prod).

The following section is also taken from their README.md with modifications.

# How to Deploy

First, [create a personal access token](https://docs.digitalocean.com/reference/api/create-personal-access-token/) and set the `DIGITALOCEAN_TOKEN` environment variable.

```console
export DIGITALOCEAN_TOKEN="dop_v1_xxx"
```

Second, navigate to the `terraform` directory and initialize Terraform:

```console
cd terraform/digitalocean
terraform workspace new production # you will have to do the same for staging
terraform init
```

Deploy with all defaults (http-based URLs):

```console
terraform apply
```

>[!NOTE]
>We used the following for our deployment:

Deploy with all defaults and use Let's Encrypt to provision certs for TLS/https:

```console
terraform apply -var='enable_letsencrypt=true'
```

Quick disclaimer when Let's Encrypt is enabled: if the DNS record does not propagate in time,
Let's Encrypt may incur a rate limit on your domain. Create the A record for *.example.com as soon as you can,
making sure it points to the provisioned public IP address.
See https://letsencrypt.org/docs/staging-environment/#rate-limits for more details.

## Environment setup

When Terraform finishes provisioning, it will supply URL and username/password
values for Hippo and Bindle, which will be needed to deploy your first
application.

Set your environment up in one go using the `environment` output:

```console
$(terraform output -raw environment)
```

This will export values into your shell for the following environment
variables:

  - `DNS_DOMAIN`

Now you're ready to start building and deploying applications on your droplet!

## Cleaning up

When the provisioned resources in this example are no longer needed, they can be destroyed via:

```console
terraform destroy
```

# Troubleshooting/Debugging

## SSH into the Droplet instance

```console
terraform output -raw droplet_ssh_private_key > /tmp/droplet_ssh_private_key.pem
chmod 0600 /tmp/droplet_ssh_private_key.pem
ssh -i /tmp/droplet_ssh_private_key.pem root@$(terraform output -raw public_ip_address)
```

Once on the instance, output from user-data.sh, which is the script
that runs at startup time, can be checked like so:

```console
root@fermyon:~$ tail -n15 /var/log/cloud-init-output.log

Logs are stored in ./log

Export these into your shell

    export CONSUL_HTTP_ADDR=http://10.0.0.12:8500
    export NOMAD_ADDR=http://127.0.0.1:4646
    export VAULT_ADDR=http://localhost:8200
    export VAULT_TOKEN=devroot
    export VAULT_UNSEAL=lZzl7uhktA8uBYgqijPsar5IPD7kH4xa6WR2qvNbnwo=

Ctrl+C to exit.
```

The Hashistack CLIs can be used to dig deeper.

### Check Consul

```console
root@articulate-nomad-web-staging:~$ consul members status
Node     Address              Status  Type    Build   Protocol  DC   Partition  Segment
articulate-nomad-web-staging  161.35.106.110:8301  alive   server  1.12.1  2         dc1  default    <all>
```

### Check Nomad

```console
root@articulate-nomad-web-staging:~$ nomad status
ID       Type     Priority  Status   Submit Date

traefik  ...
temporal ...
postgres ...
```

### Check Vault

```console
root@articulate-nomad-web-staging:~$ vault status
Key             Value
---             -----
Seal Type       shamir
Initialized     true
Sealed          false
Total Shares    1
Threshold       1
Version         1.10.3
Storage Type    file
Cluster Name    vault-cluster-7929ac40
Cluster ID      6e351bf4-bdcb-ed75-5ab7-f62b15f7e236
HA Enabled      false
```

### Check Traefik

```console
root@articulate-nomad-web-staging:~$ nomad logs -job traefik
time="2022-05-18T23:42:32Z" level=info msg="Configuration loaded from file: /home/ubuntu/data/nomad/alloc/1737c563-b9d8-cd1e-65dc-a1f7fb9cdd48/traefik/local/traefik.toml"
time="2022-05-18T23:42:32Z" level=info msg="Traefik version 2.6.6 built on 2022-05-03T16:58:48Z"
...
```

## Advanced: Accessing Nomad and/or Consul from outside of the Droplet instance

You may wish to access the Nomad and/or Consul APIs from outside of the Droplet instance.

### Access via SSH tunnel

The safest approach is to access the services via SSH tunnels.

#### Access Nomad and Consul

Nomad is configured to run on port 4646 and Consul on 8500. This following command sets
up the local SSH tunnel and will run until stopped:

```console
ssh -i /tmp/droplet_ssh_private_key.pem \
  -L 4646:127.0.0.1:4646 \
  -L 8500:127.0.0.1:8500 \
  -L 8200:127.0.0.1:8200 \
  -N root@$(terraform output -raw public_ip_address)
```

You should now be able to interact with these services, for example by navigating in your
browser to the Nomad dashboard at 127.0.0.1:4646.

(Additional ports may be added, for instance 8200 for Vault, 8081 for Traefik, etc.)

You can use this to see the progress of deployments when running a GitHub deploy Action.
