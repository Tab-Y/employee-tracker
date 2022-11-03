-- making database & base sql
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY(department_id)REFERENCES department(id)ON DELETE SET NULL  -- needs to be assigned same as department table
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT, -- needs to match to employee id of the manager (null if doesnt have manager)
    FOREIGN KEY(role_id)REFERENCES role(id)ON DELETE SET NULL,
    FOREIGN KEY(manager_id)REFERENCES employee(id)ON DELETE SET NULL -- needs to match the role table
)

-- departments, roles, employees        -- Tables
-- add role, add employee, update employee
-- view all - shows selected table
--  department - department names and department id
--  roles - job title, role id, department, salary
--  employees - employee id, first name, last names, job titles, departments, salaries, reporting managers
-- add -- all id's are generated
--  department - prompted to enter name for department -> added to database
--  role - promted for name, salary, department of role -> added to database
--  employee - promptedfirst name, last name, role, manager -> added to database
-- update --
--  employee role - prompted to select employee from list, change role -> updated in database

-- BONUS --
-- update employee managers
-- view employees by manager
-- view employees by department
-- delete departments, roles, and employees
-- view total utilized budget of the department (total combined salaries)