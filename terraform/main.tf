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

  AUTH0_DOMAIN                       = var.AUTH0_DOMAIN
  AUTH0_SPA_CLIENT_ID                = var.AUTH0_SPA_CLIENT_ID
  AUTH0_MACHINE_TO_MACHINE_CLIENT_ID = var.AUTH0_MACHINE_TO_MACHINE_CLIENT_ID
  AUTH0_MANAGEMENT_CLIENT_SECRET     = var.AUTH0_MANAGEMENT_CLIENT_SECRET
  CREATURE_CHESS_APP_URL             = var.CREATURE_CHESS_APP_URL
  CREATURE_CHESS_FAUNA_KEY           = var.CREATURE_CHESS_FAUNA_KEY
  discord_bot_token                  = var.discord_bot_token
}
