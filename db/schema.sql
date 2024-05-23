DROP DATABASE IF EXISTS workforce_db;
CREATE DATABASE workforce_db;

\c workforce_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  salary DECIMAL(10, 2),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);

