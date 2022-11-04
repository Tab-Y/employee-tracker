const cTable = require('console.table');
const connections = require("../routes/connection.js");

const server = require("../server.js");
const inquirer = require('inquirer');
const questions = require("../src/questions.js");


function anotherTask() {
    inquirer.prompt(questions.startOver)
        .then((data) => {
            if (data.confirm === true) {
                inquirer
                    .prompt(questions.startQuestion)
                    .then((data) => {
                        questionSwitch(data)

                    })
            } else {
                connections.db.end()
            }
        })
};


function questionSwitch(data) {
    const choice = data.task
    switch (choice) {
        case 'View all departments':
            connections.db.query(`SELECT * 
            FROM department
            ORDER BY department.id`, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    console.log('\n');
                    console.table(res);
                    console.log('\n');
                    anotherTask()
                }
            });
            break;
        case 'View all roles':
            connections.db.query(`SELECT role.id, role.title, department.name AS department, role.salary 
                    FROM role
                    JOIN department 
                    ON role.department_id = department.id
                    ORDER BY role.id`, (err, res) => {
                if (err) {
                    throw err;
                } else {

                    console.log('\n');
                    console.table(res);
                    console.log('\n');
                    anotherTask()
                }
            });
            break;
        case 'View all employees':
            connections.db.query(`WITH RECURSIVE manager AS (
                SELECT  id, first_name, last_name, role_id, manager_id
                FROM employee
                WHERE manager_id IS NULL
                UNION ALL
                SELECT  employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id
                FROM employee employee, manager manager
                WHERE employee.manager_id = manager.id
            )
            SELECT  
                employee.id, 
                employee.first_name,
                employee.last_name,
                role.title,
                department.name AS department,
                role.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) as manager_name
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN manager ON employee.manager_id = manager.id
            ORDER BY employee.id`, (err, res) => {
                if (err) {
                    throw err;
                } else {

                    console.log('\n');
                    console.table(res);
                    console.log('\n');
                    anotherTask()
                }
            });
            break;
        case 'Add a department':
            inquirer.prompt(questions.addDepartmentQuestions)
                .then((data) => {
                    console.log(data)
                    anotherTask();
                });
            break;
        case 'Add a role':
            function setRoleToDb(data) {
                connections.db.query(`INSERT INTO role(title, salary, department_id)
                VALUES (?, ?, ?)`, [data.title, data.salary, data.name], (err, res) => {
                    console.log('\n New role added', data.title, '.');
                    anotherTask()
                })
            };
            function askDepartmentQuestions(departmentList) {
                console.log(departmentList)
                inquirer.prompt(questions.addRoleQuestions(departmentList))
                    .then((data) => {
                        setRoleToDb(data);
                    })
            };
            function getDepartmentList() {
                let departmentList = [];
                connections.db.query("SELECT name FROM department", (err, res) => {
                    for (i = 0; i < res.length; i++) {
                        departmentList.push(res[i])
                    }
                    askDepartmentQuestions(departmentList);
                });
            };
            getDepartmentList();
            break;
        case 'Add an employee':
            function setEmployeeToDb(data) {
                connections.db.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?, ?)`, [data.id, data.first_name, data.last_name, data.role_id, data.manager_id], (err, res) => {
                    console.log('\n New role added', data.title, '.');
                    anotherTask()
                })
            };
            function askRoleQuestions(roleList) {
                inquirer.prompt(questions.addEmployeeQuestions(roleList))
                    .then((data) => {
                        setEmployeeToDb(data);
                    })
            };
            function getRoleList() {
                let roleList = [];
                connections.db.query("SELECT title FROM role", (err, result) => {
                    for (i = 0; i < result.length; i++) {
                        roleList.push(result[i].title);
                    }
                })
                let managerList = [];
                connections.db.query(`SELECT CONCAT(first_name, ' ', last_name) AS manager FROM employee WHERE manager_id is NULL`, (err, result2) => {
                    for (i = 0; i < result2.length; i++) {
                        managerList.push(result2[i].manager)
                    }
                });
                askRoleQuestions(roleList, managerList)
            };
            getRoleList();
            break;
        case 'Update an employee role':
            console.log(choice);// what to do
            anotherTask();
            break;
    }
};
// switches for bonus
// case 'View employees by manager':
//     connections.db.query('SELECT * FROM employee FULL JOIN employee ON manager_id = employee.id ORDER BY employee.manager_id', (err, res) => {
//         if (err) {
//             throw err;
//         } else {

//             console.log('\n');
//             console.table(res);
//             console.log('\n');
//             anotherTask()
//         }
//     });
//     break;
// case 'View employees by department':
//     connections.db.query('SELECT * FROM employee LEFT JOIN role, department ON role_id', (err, res) => {
//         if (err) {
//             throw err;
//         } else {

//             console.log('\n');
//             console.table(res);
//             console.log('\n');
//             anotherTask()
//         }
//     });
//     break;
// case 'View budget by department':
//     connections.db.query('SELECT department.name AS Departments FROM department', (err, res) => {
//         if (err) {
//             throw err;
//         } else {

//             console.log('\n');
//             console.table(res);
//             console.log('\n');
//             anotherTask()
//         }
//     });
//     break;
// case 'Update employee managers':
//     console.log(choice);// what to do
//     anotherTask();
//     break;
// case 'Delete department':
//     console.log(choice);// what to do
//     anotherTask();
//     break;
// case 'Delete role':
//     console.log(choice);// what to do
//     anotherTask();
//     break;
// case 'Delete employee':
//     console.log(choice);// what to do
//     anotherTask();
//     break;

module.exports = { questionSwitch }