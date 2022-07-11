terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2.0"
    }
  }

  required_version = "~> 1.0"
}

provider "aws" {
  region = var.aws_region
}

# API Gateway requires a certificate in us-east-1
provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}

module "vpc" {
  source = "./modules/vpc"

  environment_tag = var.environment_tag
}

module "server_game" {
  source = "./modules/server_game"

  domain_name     = var.url
  route53_zone_id = aws_route53_zone.main.zone_id
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.subnet_ids

  auth0_management_client_secret = var.auth0_management_client_secret
  creature_chess_fauna_key       = var.creature_chess_fauna_key
  discord_bot_token              = var.discord_bot_token
}
