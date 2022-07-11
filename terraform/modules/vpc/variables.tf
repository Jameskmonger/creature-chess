
variable "environment_tag" {
  description = "Environment tag"
  default     = "Production"
}

variable "cidr_vpc" {
  description = "CIDR block for the VPC"
  default     = "10.1.0.0/16"
}

variable "cidr_subnet_a" {
  description = "CIDR block for the subnet A"
  default     = "10.1.0.0/24"
}

variable "cidr_subnet_b" {
  description = "CIDR block for the subnet B"
  default     = "10.1.1.0/24"
}

variable "availability_zone_a" {
  description = "availability zone to create subnet A"
  default     = "eu-west-1a"
}

variable "availability_zone_b" {
  description = "availability zone to create subnet B"
  default     = "eu-west-1b"
}
