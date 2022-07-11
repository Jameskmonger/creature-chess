resource "aws_vpc" "main" {
  cidr_block           = var.cidr_vpc
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_route_table" "rtb_public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Environment = var.environment_tag
  }
}
