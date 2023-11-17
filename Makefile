.PHONY: build up down start stop restart logs ps login

network:
	docker network create shared-services || true

database-setup: network
	docker run --name mysql-8.2 --network shared-services -e MYSQL_ROOT_PASSWORD=PASSWORD -p 3306:3306 -d -t mysql:8.2.0

database-up:
	docker start mysql-8.2

database-down:
	docker stop mysql-8.2

build:
	docker-compose build

setup: network
	docker-compose run -w /application clean_architecture /bin/bash -c "npm install && npm run setup"

up:
	docker-compose up -d

down:
	docker-compose down

login:
	docker-compose run -w /application clean_architecture /bin/bash

watch:
	WATCH_FILES=1 docker-compose up -d
	docker-compose logs --tail=10 -f

configure: down build setup watch