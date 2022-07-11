resource "aws_subnet" "subnet_public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.cidr_subnet_a
  map_public_ip_on_launch = "false"
  availability_zone       = var.availability_zone_a

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_route_table_association" "rta_subnet_public_a" {
  subnet_id      = aws_subnet.subnet_public_a.id
  route_table_id = aws_route_table.rtb_public.id
}

resource "aws_subnet" "subnet_public_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.cidr_subnet_b
  map_public_ip_on_launch = "false"
  availability_zone       = var.availability_zone_b

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_route_table_association" "rta_subnet_public_b" {
  subnet_id      = aws_subnet.subnet_public_b.id
  route_table_id = aws_route_table.rtb_public.id
}
