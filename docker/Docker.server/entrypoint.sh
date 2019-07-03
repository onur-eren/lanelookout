#!/bin/bash

set -e

function migrate {
    if psql -h db -U postgres -lqt | cut -d \| -f 1 | grep -qw ${POSTGRES_GM_DB}; then
        echo "Database exists. Not creating"
    else
        psql -h db -U postgres -c "CREATE DATABASE ${POSTGRES_GM_DB}"
    fi
    python manage.py migrate
}
function createSuperUser {
python3 -c"import cmd;
import os;
import sys;
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'oakbike.settings');
from django.core.management import execute_from_command_line;
import django;
django.setup();
from django.contrib.auth.management.commands.createsuperuser import get_user_model;
User = get_user_model();
if User.objects.count()>0:
    print('\n======> Superuser Exist.\n')
else:
    print('\n======> Superuser creating...\n');
    User.objects.create_superuser(username='${DJUSERNAME}',email='${DJEMAIL}',password='${DJPASSWORD}');
    if User.objects.count()>0:
        print('\n======> Superuser created.\n');
    else:
        print('\n======> Superuser Creation Failed.\n');
">&2
    # python3 createsuperuser.py
    # python3 manage.py createsuperuser --database db --username weaktiger --email onurerenytu@yahoo.com
}
function mockdata {
    :
}

function assets {
    python manage.py collectstatic --noinput
}

function prepare {
    :
}

function supervisor {
    exec /usr/bin/supervisord -c /code/docker/Docker.server/supervisord-dev.conf
}

function development {
    migrate
    createSuperUser
    mockdata
    assets
    supervisor
}

function production {
    prepare
    migrate
    assets
    supervisor
}

function test {
    echo "Running tests with cache (use --cache-clear otherwise)..."
    cd /code/server/
    if [ $# -eq 0 ]; then
        DJANGO_SETTINGS_MODULE=oak-bike.settings pytest --pylama tests/
    else
        DJANGO_SETTINGS_MODULE=oak-bike.settings pytest --pylama "$@"
    fi
}

# Wait for the postgres container to actually be up and running
until psql -h db -U postgres -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

eval $@
