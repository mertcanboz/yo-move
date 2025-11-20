data "oci_objectstorage_namespace" "ns" {}

// Data source to get the current tenancy OCID from the provider configuration.
data "oci_identity_tenancy" "current" {
  tenancy_id = var.tenancy_ocid
}
