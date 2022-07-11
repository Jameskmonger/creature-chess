/**
 * Configures the apex domain
 * https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
 */
resource "aws_route53_record" "apex" {
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "A"
  ttl     = 60

  records = [
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153"
  ]
}

/**
 * Configures the www. subdomain
 *
 * https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain-and-the-www-subdomain-variant
 */
resource "aws_route53_record" "www" {
  zone_id = var.route53_zone_id
  name    = format("www.%s", var.domain_name)
  type    = "CNAME"
  ttl     = 60

  records = [
    var.github_pages_io_domain
  ]
}
