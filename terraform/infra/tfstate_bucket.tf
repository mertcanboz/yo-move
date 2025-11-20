// Terraform-managed OCI Object Storage bucket for storing Terraform state files.
// This single bucket will contain a prefix (directory) per environment/workspace
// e.g. `sandbox/terraform.tfstate` and `prod/terraform.tfstate`.

locals {
  bucket_name = "yo-move-infra"
}

variable "freeform_tags" {
	description = "Freeform tags applied to the bucket"
	type        = map(string)
	default     = {}
}

variable "defined_tags" {
	description = "Defined tags applied to the bucket"
	type        = map(string)
	default     = {}
}

// Create a dedicated compartment to hold project-level infra (shared state, configs, etc.).
// Name recommendation: use hyphens/dashes like `project-infra` (more readable; common convention).
resource "oci_identity_compartment" "project_infra" {
  compartment_id   = data.oci_identity_tenancy.current.id
	name           = "project-infra"
	description    = "Shared project infrastructure (tfstate bucket, config, shared services)"
	// prevent accidental deletion unless you intentionally allow it
	enable_delete = false
}

resource "oci_objectstorage_bucket" "infra" {
	compartment_id        = oci_identity_compartment.project_infra.id
	namespace             = data.oci_objectstorage_namespace.ns.namespace
	name                  = local.bucket_name
    access_type          = "NoPublicAccess"

	freeform_tags = var.freeform_tags
	defined_tags  = var.defined_tags
}


/*
Backend example (use in your environment-specific Terraform repo or use
`terraform init -reconfigure -backend-config=...`):

terraform {
	backend "oci" {
		region         = "<OCI_REGION>"        # e.g. eu-frankfurt-1
		namespace      = "<OBJECT_NAMESPACE>"  # output from data.oci_objectstorage_namespace
		bucket         = "yo-move-tfstate"
		key            = "sandbox/terraform.tfstate"  # change to `prod/...` for prod
		compartment_id = "<COMPARTMENT_OCID>"
	}
}

Notes:
- Use `key = "<workspace>/terraform.tfstate"` to keep state per workspace (workspace here
	equals environment folder in the bucket).
- You can run `terraform init -backend-config="key=sandbox/terraform.tfstate"` to reconfigure.
- Create an OCI policy granting the service/user/group access to the bucket, for example:

	Allow group TerraformAdmins to manage object-family in compartment <compartment-name>

	or more restricted:

	Allow group TerraformOperators to read,write object-family in compartment <compartment-name>

Security / lifecycle suggestions:
- Oracle Cloud encrypts objects at rest by default. For CMEK, configure a KMS key and set
	bucket-level encryption via the Console or additional provider resources if needed.
- Enable Object Lifecycle rules in the console if you want automatic cleanup of old objects.
*/
