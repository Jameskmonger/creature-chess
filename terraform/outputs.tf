# # Output value definitions

# output "lambda_bucket_name" {
#   description = "Name of the S3 bucket used to store function code."

#   value = aws_s3_bucket.lambda_bucket.id
# }

output "nameservers" {
  description = "Nameservers for DNS"

  value = aws_route53_zone.main.name_servers
}
