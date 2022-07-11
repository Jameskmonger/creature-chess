docker login --username AWS -p $(aws ecr get-login-password --region eu-west-1) 522702119152.dkr.ecr.eu-west-1.amazonaws.com

docker build -t server-game-nginx -f nginx/server-game/Dockerfile .
docker tag server-game-nginx:latest 522702119152.dkr.ecr.eu-west-1.amazonaws.com/server-game-nginx:latest
docker push 522702119152.dkr.ecr.eu-west-1.amazonaws.com/server-game-nginx:latest

docker build -t server-game -f apps/Dockerfile --build-arg APP_DIR=server-game .
docker tag server-game:latest 522702119152.dkr.ecr.eu-west-1.amazonaws.com/server-game:latest
docker push 522702119152.dkr.ecr.eu-west-1.amazonaws.com/server-game:latest
