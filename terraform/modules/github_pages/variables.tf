variable "route53_zone_id" {
  description = "Route53 Zone ID"

  type = string
}

variable "domain_name" {
  description = "Apex domain to use (e.g. creaturechess.com)"

  type = string
}

variable "github_pages_io_domain" {
  description = "Domain name for GitHub Pages (e.g. jameskmonger.github.io)"

  type = string
}
