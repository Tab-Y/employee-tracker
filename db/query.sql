-- view all employees
WITH RECURSIVE manager AS (         -- creates a temp manager data to be displayed instead of numbers
SELECT  id, first_name, last_name, role_id, manager_id
FROM employee
WHERE manager_id IS NULL
UNION ALL
SELECT  employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id
FROM employee employee, manager manager
WHERE employee.manager_id = manager.id)
SELECT  employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager_name
FROM employee
JOIN role ON employee.role_id = role.id                     -- links the employee role number to the role id number
JOIN department ON role.department_id = department.id       -- links the department name with the department id number
LEFT JOIN manager ON employee.manager_id = manager.id       -- links the temp manager data with the employee id to make the manager name 
ORDER BY employee.id


-- view all roles
SELECT role.id, role.title, department.name AS department, role.salary 
FROM role
JOIN department 
ON role.department_id = department.id
ORDER BY role.id

-- view all departments
SELECT * 
FROM department
ORDER BY department.id

-- add new role
INSERT INTO role(title, salary, department_id)
VALUES (?, ?, ?)

-- add new employee
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?, ?)

-- selects managers
SELECT CONCAT(first_name, ' ', last_name) AS manager FROM employee WHERE manager_id is NULL

-- selects roles
SELECT title FROM role

-- selects specific id given input
SELECT id from role WHERE title = "Janitor"