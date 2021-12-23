docker build -t cc-server-game-nginx -f apps/nginx-server-game/Dockerfile .
docker tag cc-server-game-nginx:latest 352494607378.dkr.ecr.eu-west-2.amazonaws.com/cc-server-game-nginx:latest
docker push 352494607378.dkr.ecr.eu-west-2.amazonaws.com/cc-server-game-nginx:latest

docker build -t cc-server-game -f apps/Dockerfile --build-arg APP_DIR=server-game .
docker tag cc-server-game:latest 352494607378.dkr.ecr.eu-west-2.amazonaws.com/cc-server-game:latest
docker push 352494607378.dkr.ecr.eu-west-2.amazonaws.com/cc-server-game:latest

docker build -t cc-server-info -f apps/Dockerfile --build-arg APP_DIR=server-info .
docker tag cc-server-info:latest 352494607378.dkr.ecr.eu-west-2.amazonaws.com/cc-server-info:latest
docker push 352494607378.dkr.ecr.eu-west-2.amazonaws.com/cc-server-info:latest
