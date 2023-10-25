#!/bin/bash

if [[ "$#" -eq 0 ]]
then
    docker-compose down
else
    docker-compose stop "$@"
fi
