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

--  Course table
CREATE TABLE public.courses
(
    id SERIAL PRIMARY KEY,
    courseid character varying(45) NOT NULL UNIQUE,
    coursename character varying(45) NOT NULL
);

INSERT INTO courses(courseid, coursename) VALUES('3132', 'NodeJS for Beginners');

-- Exam table
CREATE TABLE public.exam
(
    examname character varying(45) NOT NULL,
    examcode character varying(45) NOT NULL,
    durationhours integer NOT NULL,
    durationminutes integer NOT NULL,
    coursecode character varying(45) NOT NULL,
    CONSTRAINT examcourse FOREIGN KEY (coursecode)
        REFERENCES public.courses (courseid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

-- Faculty and Course constraint table
CREATE TABLE public.facultycourse
(
    username character varying(45) NOT NULL,
    coursecode character varying(45) NOT NULL,
    CONSTRAINT username FOREIGN KEY (username)
        REFERENCES public.faculty (username) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

-- Student and Course constraint table
CREATE TABLE public.student_course
(
    coursecode character varying(45) NOT NULL,
    username character varying(45) NOT NULL,
    CONSTRAINT course FOREIGN KEY (coursecode)
        REFERENCES public.courses (courseid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

-- Questions Table
CREATE TABLE public.question
(
    id SERIAL PRIMARY KEY,
    question text NOT NULL,
    "optionA" character varying(45) NOT NULL,
    "optionB" character varying(45) NOT NULL,
    "optionC" character varying(45) NOT NULL,
    "optionD" character varying(45) NOT NULL,
    key "char" NOT NULL,
    examcode character varying(45) NOT NULL
);