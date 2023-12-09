variable "project_name" {
  description = "Name of the project to assign the droplet to."
  type        = string
  default     = ""
}

variable "project_purpose" {
  description = "Purpose of the project to assign the droplet to."
  type        = string
  default     = "Web Application"
}

variable "region" {
  description = "DigitalOcean region (Default: nyc1)"
  type        = string
  default     = "tor1"
}

variable "vpc_name" {
  description = "The name of the VPC; should be unique if multiple are launched in the same project (Default: articulate-vpc)"
  type        = string
  default     = "articulate-vpc"
}

variable "droplet_name" {
  description = "The name of the Droplet instance; should be unique if multiple are launched in the same region"
  type        = string
  default     = "articulate-nomad-web"
}

variable "droplet_size" {
  description = "The size of Droplet to run for each node in the cluster (Default: s-2vcpu-2gb)"
  type        = string
  default     = "s-1vcpu-2gb"
}

variable "enable_letsencrypt" {
  description = "Enable cert provisioning via Let's Encrypt"
  type        = bool
  default     = false
}

variable "dns_host" {
  description = "The DNS host to use for construction of the root domain for articulate services and apps"
  type        = string
  default     = "sslip.io"
}

variable "allowed_ssh_cidr_blocks" {
  description = "A list of CIDR-formatted IP address ranges from which the DO Instance will allow SSH connections"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "allowed_inbound_cidr_blocks" {
  description = "A list of CIDR-formatted IP address ranges from which the DO Instance will allow connections"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "allow_outbound_cidr_blocks" {
  description = "Allow outbound traffic to these CIDR blocks"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "allow_inbound_http_nomad" {
  description = "Allow inbound connections to the unsecured Nomad API http port"
  type        = bool
  default     = false
}

variable "allow_inbound_http_consul" {
  description = "Allow inbound connections to the unsecured Consul API http port"
  type        = bool
  default     = false
}
