[
	{
		"name": "nginx",
		"essential": true,
		"cpu": 256,
		"image": "${REPOSITORY_URL_NGINX}:latest",
		"portMappings": [
			{
				"hostPort": 80,
				"protocol": "tcp",
				"containerPort": 80
			}
		],
		"logConfiguration": {
			"logDriver": "awslogs",
			"secretOptions": null,
			"options": {
				"awslogs-group": "server-game-nginx",
				"awslogs-region": "${AWS_REGION}",
				"awslogs-stream-prefix": "ecs"
			}
		}
	},
	{
		"name": "server-game",
		"essential": true,
		"memoryReservation": 1024,
		"cpu": 512,
		"image": "${REPOSITORY_URL_GAME}:latest",
		"environment": [
			{
				"name": "CREATURE_CHESS_FAUNA_KEY",
				"value": "${CREATURE_CHESS_FAUNA_KEY}"
			},
			{
				"name": "AUTH0_DOMAIN",
				"value": "${AUTH0_DOMAIN}"
			},
			{
				"name": "AUTH0_SPA_CLIENT_ID",
				"value": "${AUTH0_SPA_CLIENT_ID}"
			},
			{
				"name": "AUTH0_MACHINE_TO_MACHINE_CLIENT_ID",
				"value": "${AUTH0_MACHINE_TO_MACHINE_CLIENT_ID}"
			},
			{
				"name": "AUTH0_MANAGEMENT_CLIENT_SECRET",
				"value": "${AUTH0_MANAGEMENT_CLIENT_SECRET}"
			},
			{
				"name": "CREATURE_CHESS_APP_URL",
				"value": "${CREATURE_CHESS_APP_URL}"
			},
			{
				"name": "DISCORD_BOT_TOKEN",
				"value": "${DISCORD_BOT_TOKEN}"
			},
			{
				"name": "PORT",
				"value": "3000"
			}
		],
		"portMappings": [
			{
				"hostPort": 3000,
				"protocol": "tcp",
				"containerPort": 3000
			}
		],
		"logConfiguration": {
			"logDriver": "awslogs",
			"secretOptions": null,
			"options": {
				"awslogs-group": "server-game",
				"awslogs-region": "${AWS_REGION}",
				"awslogs-stream-prefix": "ecs"
			}
		}
	}
]
