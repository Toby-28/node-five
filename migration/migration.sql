-- Admin table
CREATE TABLE public.admins
(
    id SERIAL PRIMARY KEY,
    name character varying(45) NOT NULL UNIQUE,
    password integer NOT NULL
);

INSERT INTO admins(name, password) VALUES('Guljemal', 12345);

--  Students table
CREATE TABLE public.students
(
    id SERIAL PRIMARY KEY,
    name character varying(45) NOT NULL,
    username character varying(45) NOT NULL UNIQUE,
    password integer NOT NULL
);

INSERT INTO students(name, username, password) VALUES('Hushnudbek', 'hushnud', 12345);

--  Faculty table
CREATE TABLE public.faculty
(
    id SERIAL PRIMARY KEY,
    name character varying(45) NOT NULL,
	username character varying(45) NOT NULL UNIQUE,
    password integer NOT NULL
);

INSERT INTO faculty(name, username, password) VALUES('Maral', 'maral', 12345);