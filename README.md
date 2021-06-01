# Instructions for running as docker container
1. Build image using below commands\
eval $(minikube docker-env)
docker build -t kanban-frontend --no-cache .
2. Run image using below command\
docker run -d -it -p [port on docker host]:80 kanban-frontend
