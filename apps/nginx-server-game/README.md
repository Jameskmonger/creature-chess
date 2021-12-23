# nginx-server-game

nginx server to be deployed as part of the server-game service

## Deployment

- Push to ECR registry
- Create new revision of ECS task definition
- Update ECS service to use new task definition revision
