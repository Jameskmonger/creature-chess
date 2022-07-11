/**
 * Environment variables
 */

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
