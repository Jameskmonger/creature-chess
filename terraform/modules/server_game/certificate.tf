# We need to set up a certificate for the ELB
module "acm" {
  source  = "terraform-aws-modules/acm/aws"
  version = "~> 3.0"

  domain_name = var.domain_name
  zone_id     = var.route53_zone_id

  wait_for_validation = true

  tags = {
    Environment = var.environment_tag
  }
}
