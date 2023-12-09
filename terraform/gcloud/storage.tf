resource "google_storage_bucket" "cloud_storage" {
  project  = data.google_project.project.project_id
  location = var.storage_location
  name     = "articulate-store-${terraform.workspace}"

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

  cors {
    // FIXME: This should be changed to only accept origins from our staging/production
    // servers.
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_iam_member" "public" {
  bucket = google_storage_bucket.cloud_storage.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

resource "google_service_account" "cloud_storage" {
  account_id   = "cs-sa-${terraform.workspace}"
  display_name = "cs-sa-${terraform.workspace}"
  description  = "${terraform.workspace} cloud storage service account"
}

resource "google_service_account_key" "cloud_storage" {
  service_account_id = google_service_account.cloud_storage.name
  public_key_type    = "TYPE_X509_PEM_FILE"
}

resource "google_storage_bucket_iam_member" "cloud_storage_viewer" {
  bucket = google_storage_bucket.cloud_storage.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.cloud_storage.email}"
}

resource "google_storage_bucket_iam_member" "cloud_storage_creator" {
  bucket = google_storage_bucket.cloud_storage.name
  role   = "roles/storage.objectCreator"
  member = "serviceAccount:${google_service_account.cloud_storage.email}"
}

resource "google_storage_bucket_iam_member" "legacy_bucket_writer" {
  bucket = google_storage_bucket.cloud_storage.name
  role   = "roles/storage.legacyBucketWriter"
  member = "serviceAccount:${google_service_account.cloud_storage.email}"
}

output "cloud_storage_bucket" {
  value = google_storage_bucket.cloud_storage.name
}

output "cs_creds" {
  value = base64decode(google_service_account_key.cloud_storage.private_key)
  sensitive = true
}
