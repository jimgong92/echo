DROP DATABASE IF EXISTS echoapp;
CREATE DATABASE echoapp;

USE echoapp;

SET TIME ZONE 'UTC';

CREATE TABLE echos (
  echo_id serial PRIMARY KEY,
  echo_text varchar(255),
  echo_date timestamptz
);