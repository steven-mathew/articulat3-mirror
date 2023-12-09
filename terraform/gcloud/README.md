# Starting the GCloud services

>[!NOTE]
>Terraform is only used for initial deployment and provisioning of infrastructure.
>It is not for continuous delivery or deployment.

These terraform configurations will create a GCS store on Google Cloud. We are not
using CloudSQL and are instead using the postgres DB running on our server.

This means that there is no redundancy and none of the benefits that come from
using a managed service such as CloudSQL. It is highly recommended you configure
CloudSQL.

It requires that you have two projects `$PROJECT_ID-production` and `$PROJECT_ID-staging`.

## Requirements

- Terraform v1.5.7
- gcloud

Unset `GOOGLE_APPLICATION_CREDENTIALS` in your environment:

```
unset GOOGLE_APPLICATION_CREDENTIALS
```

1. Create a GCP project and enable billing for the project.

```
export PROJECT_ID="<value-from-above>"
```

2. Authenticate to gcloud with:

```
gcloud auth login && gcloud auth application-default login
```

3. Save project ID as a Terraform variable:

```
echo "project = \"${PROJECT_ID}\"" >> ./terraform.tfvars
```

4. (Recommended) Create a GCS bucket for storing remote state. This is important
if multiple people may be running Terraform, but if you don't see this happening
then this is not required.

```
gsutil mb -p ${PROJECT_ID} gs://${PROJECT_ID}-tf-state
```

In this case you would want to enable versioning of the bucket:

```
gsutil versioning set on gs://${PROJECT_ID}-tf-state
```

Configure Terraform to store state in the bucket with:

```
$ cat <<EOF > ./state.tf
terraform {
  backend "gcs" {
    bucket = "${PROJECT_ID}-tf-state"
  }
}
EOF
```

5. Run `terraform init`.

```
terraform init
```

6. Apply changes:

```
terraform apply
```

7. View the credentials for the bucket:

You will want to save this for later after we have provisioned digitalocean droplets
so that the store can be added to the vault of the droplets (for their their respective workspaces).

```
terraform output -raw cs_creds
```



And you're done!
