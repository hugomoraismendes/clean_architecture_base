.PHONY: build up down start stop restart logs ps login

database:
	docker run --name mysql-8.2 -e MYSQL_USER=root -e MYSQL_ROOT_PASSWORD=PASSWORD -p 3306:3306 -d -t mysql:8.2.0

build:
	docker-compose build

setup:
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