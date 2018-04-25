#!/bin/bash

rm db.sqlite3
rm -rf ./betting/migrations/
python manage.py makemigrations betting
python manage.py migrate

python manage.py shell < data.py
