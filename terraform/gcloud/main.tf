provider "google" {
  project = var.project
  region  = var.region

  user_project_override = true
}

provider "google-beta" {
  project = var.project
  region  = var.region

  user_project_override = true
}

data "google_project" "project" {
  project_id = var.project
}

# Cloud Resource Manager needs to be enabled first, before other services.
resource "google_project_service" "resourcemanager" {
  project            = var.project
  service            = "cloudresourcemanager.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "services" {
  project = data.google_project.project.project_id
  for_each = toset([
    "iam.googleapis.com",
    "storage-api.googleapis.com",
  ])
  service            = each.value
  disable_on_destroy = false

  depends_on = [
    google_project_service.resourcemanager,
  ]
}

output "project_id" {
  value = data.google_project.project.project_id
}

output "project_number" {
  value = data.google_project.project.number
}

output "region" {
  value = var.region
}

output "network_location" {
  value = var.network_location
}

output "storage_location" {
  value = var.storage_location
}
