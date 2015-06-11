DROP DATABASE IF EXISTS echoapp;
CREATE DATABASE echoapp;

USE echoapp;

CREATE TABLE echos (
  echo_id serial PRIMARY KEY,
  echo_text varchar(255)
);