resource "aws_route53_zone" "main" {
  name = var.url

  tags = {
    Environment = var.environment_tag
  }
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
