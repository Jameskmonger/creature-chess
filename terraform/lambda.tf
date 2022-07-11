data "aws_cloudformation_export" "get-current-user-lambda-qualified-arn" {
  name = "sls-user-live-GetCurrentUserLambdaFunctionQualifiedArn"
}

data "aws_cloudformation_export" "update-current-user-lambda-qualified-arn" {
  name = "sls-user-live-UpdateCurrentUserLambdaFunctionQualifiedArn"
}

data "aws_cloudformation_export" "user-service-api-gateway-qualified-arn" {
  name = "UserServiceApiGatewayQualifiedArn"
}

data "aws_arn" "user-service-api-gateway" {
  arn = data.aws_cloudformation_export.user-service-api-gateway-qualified-arn.value
}

# add domain to api gateway
resource "aws_api_gateway_domain_name" "live" {
  domain_name     = format("user-api.%s", var.url)
  certificate_arn = aws_acm_certificate_validation.cert_apigateway.certificate_arn
}

resource "aws_api_gateway_base_path_mapping" "live" {
  api_id      = data.aws_arn.user-service-api-gateway.resource
  domain_name = aws_api_gateway_domain_name.live.domain_name
  stage_name  = var.stage_name
}
