resource "random_string" "bucket-name" {
  length  = 5
  special = false
  numeric = false
  upper   = false
}

resource "google_storage_bucket" "object_files" {
  project  = data.google_project.project.project_id
  location = var.storage_location
  name     = "articulate-store-${random_string.bucket-name.result}"

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      num_newer_versions = "3"
    }

    action {
      type = "Delete"
    }
  }

  force_destroy = var.force_destroy
}

resource "google_storage_bucket_iam_member" "public" {
  bucket = google_storage_bucket.object_files.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

output "object_files_bucket" {
  value = google_storage_bucket.object_files.name
}
