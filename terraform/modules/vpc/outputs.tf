output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnet_ids" {
  value = [aws_subnet.subnet_public_a.id, aws_subnet.subnet_public_b.id]
}
