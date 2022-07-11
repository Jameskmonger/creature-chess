variable "auth0_management_client_secret" {
  description = "Management client secret for Auth0"

  type = string
}

variable "creature_chess_fauna_key" {
  description = "FaunaDB API key"

  type = string
}

variable "discord_bot_token" {
  description = "Discord bot token"

  type = string
}

// ===


variable "domain_name" {
  description = "Domain name to host gameserver"

  type = string
}



/// ===

variable "vpc_id" {
  description = "VPC ID"

  type = string
}

variable "subnet_ids" {
  description = "Subnet IDs"

  type = list(string)
}

variable "route53_zone_id" {
  description = "Route53 Zone ID"

  type = string
}

/// =====

variable "environment_tag" {
  description = "Environment tag"
  default     = "Production"
}
