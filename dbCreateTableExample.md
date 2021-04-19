create table employees (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(50),
	gender VARCHAR(50) NOT NULL,
	phone VARCHAR(50),
	department VARCHAR(50) NOT NULL,
	team_id INT NOT NULL,
	date_of_birth DATE NOT NULL,
	salary VARCHAR(50) NOT NULL,
	hire_date DATE NOT NULL
);