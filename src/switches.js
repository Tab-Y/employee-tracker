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

function makeQuery() {

}

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
            inquirer.prompt(questions.addDepartment)
                .then((data) => {
                    console.log(data.department);
                    anotherTask();
                });
            break;
        case 'Add a role':
            inquirer.prompt(questions.addRole)
                .then((data) => {
                    console.log(data.role)
                    anotherTask();
                });
            break;
        case 'Add an employee':
            inquirer.prompt(questions.addEmployee)
                .then((data) => {
                    console.log(data)
                    anotherTask();
                });
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