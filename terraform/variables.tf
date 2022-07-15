/**
 * Environment variables
 */

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

variable "APP_URL" {
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

/**
  * Configuration
  */

variable "environment_tag" {
  description = "Environment tag"
  default     = "Production"
}

variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "eu-west-1"
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
