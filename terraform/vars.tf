variable "force_destroy" {
  type    = bool
  default = false

  description = "Allow resources like buckets and database instances to be destroyed."
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "network_location" {
  type    = string
  default = "us-central1"
}

variable "storage_location" {
  type    = string
  default = "US"
}


variable "project" {
  type = string
}

terraform {
  required_version = "~> 1.2"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.28"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.28"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.2"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.1"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.3"
    }
  }
}
