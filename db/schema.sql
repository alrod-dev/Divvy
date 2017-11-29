CREATE DATABASE divvy_db;

USE divvy_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	fullname varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	vehicle varchar(255) NOT NULL,
	seats INTEGER NOT NULL,
    email varchar(255) NOT NULL,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);


