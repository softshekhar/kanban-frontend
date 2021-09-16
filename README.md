# Information
This is the frontend created using React showing kanban board(tasks) with actions to Add/Update/Delete/Get tasks. Detailed info about this application can be found in the book `Redux in Action`

# Instructions
1. from command prompt run `npm start`

# Dependencies
1. Keycloak. You can spin up local keycloak using docker. refer https://www.keycloak.org/getting-started/getting-started-docker
2. Backend for this app is on https://github.com/softshekhar/kanban-api

# Instructions for running as docker container(optional)
1. Build image using below commands\
eval $(minikube docker-env)
docker build -t kanban-frontend --no-cache .
2. Run image using below command\
docker run -d -it -p [port on docker host that you wish to use]:80 kanban-frontend

# You can also run this application and all related applications in local minikube cluster
Deployment yaml files can be found under https://github.com/softshekhar/kanban-k8s 

# Note
provide configuration values in file public/config.js if not running using kubernetes

#Pending issues to fix


#Features to add
https url instead of http