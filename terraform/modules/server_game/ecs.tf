resource "aws_ecr_repository" "server_game" {
  name = "server-game"
}

resource "aws_ecs_cluster" "game" {
  name = "server-game"
}

data "template_file" "task_definition_template" {
  template = file("${path.module}/task_definition.json.tpl")

  vars = {
    REPOSITORY_URL = aws_ecr_repository.server_game.repository_url
  }
}

resource "aws_ecs_task_definition" "game" {
  family                   = "server-game-task-definition"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 1024
  memory                   = 2048
  container_definitions    = data.template_file.task_definition_template.rendered

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
}
