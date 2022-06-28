variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "eu-west-1"
}

variable "cert_aws_region" {
  description = "AWS region for certificates"

  type    = string
  default = "us-east-1"
}

variable "url" {
  description = "Main URL"

  type    = string
  default = "creaturechess.com"
}

variable "stage_name" {
  description = "Stage name"

  type    = string
  default = "live"
}
