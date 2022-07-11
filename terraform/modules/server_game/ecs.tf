resource "aws_ecr_repository" "server_game_nginx" {
  name = "server-game-nginx"
}

resource "aws_ecr_repository" "server_game" {
  name = "server-game"
}

resource "aws_ecs_cluster" "game" {
  name = "server-game"
}

data "template_file" "task_definition_template" {
  template = file("${path.module}/task_definitions.json.tpl")

  vars = {
    REPOSITORY_URL_GAME            = aws_ecr_repository.server_game.repository_url
    REPOSITORY_URL_NGINX           = aws_ecr_repository.server_game_nginx.repository_url
    AWS_REGION                     = "eu-west-1"
    AUTH0_MANAGEMENT_CLIENT_SECRET = var.auth0_management_client_secret
    CREATURE_CHESS_FAUNA_KEY       = var.creature_chess_fauna_key
    DISCORD_BOT_TOKEN              = var.discord_bot_token
  }
}

resource "aws_cloudwatch_log_group" "server_game" {
  name = "server-game"

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_cloudwatch_log_group" "server_game_nginx" {
  name = "server-game-nginx"

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_ecs_task_definition" "game" {
  family                   = "server-game-task-definition"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 1024
  memory                   = 2048
  container_definitions    = data.template_file.task_definition_template.rendered

  task_role_arn      = aws_iam_role.ecs_task_role.arn
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_lb" "main" {
  name               = "server-game-elb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.sg_server_game.id]
  subnets            = var.subnet_ids

  enable_deletion_protection = false

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_route53_record" "www" {
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

resource "aws_lb_target_group" "main" {
  name        = "server-game-${substr(uuid(), 0, 3)}"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  lifecycle {
    create_before_destroy = true
    ignore_changes = [
      name
    ]
  }

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_lb_listener" "https_redirect" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_lb_listener" "server_game" {
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = module.acm.acm_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }

  tags = {
    Environment = var.environment_tag
  }
}

resource "aws_ecs_service" "game" {
  name            = "server-game"
  cluster         = aws_ecs_cluster.game.id
  task_definition = aws_ecs_task_definition.game.arn
  desired_count   = 1

  launch_type         = "FARGATE"
  scheduling_strategy = "REPLICA"

  network_configuration {
    security_groups  = [aws_security_group.sg_server_game.id]
    subnets          = var.subnet_ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.main.arn
    container_name   = "nginx"
    container_port   = 80
  }

  tags = {
    Environment = var.environment_tag
  }
}
