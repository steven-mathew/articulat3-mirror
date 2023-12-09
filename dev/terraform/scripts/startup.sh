#!/usr/bin/env bash
set -euo pipefail

export HOME=/root
export USER=root

# Output can be seen at:
# AWS: /var/log/cloud-init-output.log
# GCP: journalctl -u google-startup-scripts.service

# Note: this is used as a template in Terraform, where vars are injected to
# produce the final version. As such, all vars *not* intended to be resolved
# at the Terraform level should just be '$var'.

# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------

function validate-checksum() {
  local readonly file="$1"
  local readonly want="$2"
  local readonly got="$(sha256sum "$file" | cut -d' ' -f1)"

  [ "$got" == "$want" ] || \
    (echo "ERROR: $file checksums don't match; want $want, got $got" && exit 1)
}

# -----------------------------------------------------------------------------
# Install deps
# -----------------------------------------------------------------------------

cd /tmp

## Install misc utilities
sudo apt-get update && sudo apt-get install -y \
  curl \
  unzip

## Install nix

# install_script_cache_key="install-nix-2.16.1"
# install_script="/tmp/$install_script_cache_key"

# Install Nix. Install the base version if the currently installed version is
# not what we expect.
# if [ \
# 	! -f $HOME/.nix-profile/etc/profile.d/nix.sh -o \
# 	"$($HOME/.nix-profile/bin/nix --version)" != "nix (Nix) 2.16.1" \
# 	]; then
# 	curl -L https://releases.nixos.org/nix/nix-2.16.1/install | sh
# fi



# Add Docker's official GPG key:
echo "Install docker"
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get -y update

sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "Install nix"
sh <(curl -L https://nixos.org/nix/install) --daemon

source $HOME/.nix-profile/etc/profile.d/nix.sh

mkdir -p $HOME/.config/nix && echo "experimental-features = nix-command flakes" >> $HOME/.config/nix/nix.conf

## Install Hashistack & co deps

echo "Install Nomad"
curl -sO https://releases.hashicorp.com/nomad/${nomad_version}/nomad_${nomad_version}_linux_amd64.zip
validate-checksum "nomad_${nomad_version}_linux_amd64.zip" "${nomad_checksum}"
sudo unzip nomad_${nomad_version}_linux_amd64.zip -d /usr/local/bin
sudo chmod +x /usr/local/bin/nomad
nomad --version

echo "Install Consul"
curl -sO https://releases.hashicorp.com/consul/${consul_version}/consul_${consul_version}_linux_amd64.zip
validate-checksum "consul_${consul_version}_linux_amd64.zip" "${consul_checksum}"
sudo unzip consul_${consul_version}_linux_amd64.zip -d /usr/local/bin
sudo chmod +x /usr/local/bin/consul
consul --version

echo "Install Vault"
curl -sO https://releases.hashicorp.com/vault/${vault_version}/vault_${vault_version}_linux_amd64.zip
validate-checksum "vault_${vault_version}_linux_amd64.zip" "${vault_checksum}"
sudo unzip vault_${vault_version}_linux_amd64.zip -d /usr/local/bin
sudo chmod +x /usr/local/bin/vault
vault --version

echo "Install Traefik"
curl -sLO https://github.com/traefik/traefik/releases/download/${traefik_version}/traefik_${traefik_version}_linux_amd64.tar.gz
validate-checksum "traefik_${traefik_version}_linux_amd64.tar.gz" "${traefik_checksum}"
sudo tar zxvf traefik_${traefik_version}_linux_amd64.tar.gz -C /usr/local/bin
sudo chmod +x /usr/local/bin/traefik
traefik version

# -----------------------------------------------------------------------------
# Configure deps
# -----------------------------------------------------------------------------

# Currently, config is setup via files in ${home_path}/etc and used in-line
# in the run_servers.sh script

# -----------------------------------------------------------------------------
# Configure ssh keys
# -----------------------------------------------------------------------------

echo "${droplet_ssh_public_key}" >> $HOME/.ssh/id_rsa.pub
echo "${droplet_ssh_private_key}" >> $HOME/.ssh/id_rsa
chmod 400 $HOME/.ssh/id_rsa

ssh-keyscan github.com | sudo tee -a /etc/ssh/ssh_known_hosts

# -----------------------------------------------------------------------------
# run-servers.sh or similar
# -----------------------------------------------------------------------------

cd ${home_path}
sudo chmod +x run_servers.sh

export DNS_ZONE='${dns_zone}'
export ENABLE_LETSENCRYPT='${enable_letsencrypt}'

echo "Running servers using DNS zone '$DNS_ZONE'"
nix develop -c $HOME/run_servers.sh
