resource "aws_acm_certificate" "cert_apigateway" {
  provider = aws.us-east-1

  domain_name = var.url

  subject_alternative_names = [
    format("user-api.%s", var.url)
  ]

  validation_method = "DNS"

  tags = {
    Environment = var.environment_tag
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_apigateway" {
  for_each = {
    for dvo in aws_acm_certificate.cert_apigateway.domain_validation_options : dvo.domain_name => {
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

resource "aws_acm_certificate_validation" "cert_apigateway" {
  provider = aws.us-east-1

  certificate_arn         = aws_acm_certificate.cert_apigateway.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_apigateway : record.fqdn]
}
