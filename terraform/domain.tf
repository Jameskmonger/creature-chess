resource "aws_route53_zone" "main" {
  name = var.url

  tags = {
    Stack = "live"
  }
}

resource "aws_acm_certificate" "cert" {
  provider = aws.main_cert

  domain_name = var.url

  subject_alternative_names = [
    format("user-api.%s", var.url)
  ]

  validation_method = "DNS"

  tags = {
    Stack = "live"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "main" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.main.zone_id
}

# TODO is this the best thing to do?
# sets up record for user-api.creaturechess.com
resource "aws_route53_record" "user-service" {
  zone_id = aws_route53_zone.main.zone_id
  name    = format("user-api.%s", var.url)
  type    = "A"

  alias {
    name                   = aws_api_gateway_domain_name.live.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.live.cloudfront_zone_id
    evaluate_target_health = true
  }
}

resource "aws_acm_certificate_validation" "main" {
  provider = aws.main_cert

  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.main : record.fqdn]
}
