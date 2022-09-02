variable "AUTH0_DOMAIN" {
  description = "Auth0 domain"

  type = string
}

variable "AUTH0_SPA_CLIENT_ID" {
  description = "SPA Client ID for Auth0"

  type = string
}

variable "AUTH0_MACHINE_TO_MACHINE_CLIENT_ID" {
  description = "Machine-to-machine Client ID for Auth0"

  type = string
}

variable "AUTH0_MANAGEMENT_CLIENT_SECRET" {
  description = "Management client secret for Auth0"

  type = string
}

variable "CREATURE_CHESS_APP_URL" {
  description = "Application URL"

  type = string
}

variable "CREATURE_CHESS_FAUNA_KEY" {
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
