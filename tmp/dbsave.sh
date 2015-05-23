#!/usr/bin/env bash

tmp="/home/vagrant/laravel5/dp-moviedb/tmp"
pass=secret

/usr/bin/mysqldump -u homestead --password="${pass}" --databases homestead > "${tmp}/homestead.sql"
