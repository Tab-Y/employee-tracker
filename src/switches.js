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
                    console.table('\n',res,'\n');
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
                    console.table('\n',res,'\n');
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
                    console.table('\n',res,'\n');
                    anotherTask()
                }
            });
            break;
        case 'Add a department':
            inquirer.prompt(questions.addDepartmentQuestions)
                .then((data) => {
                    connections.db.query(`INSERT INTO department (name)
                    VALUES (?)`, [data.department], (err, res) => {
                        console.log('\n New department added', data.department, '.\n');
                        anotherTask()
                    })
                });
            break;
        case 'Add a role':
            function setRoleToDb(data, selectedRole) {
                connections.db.query(`INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`, [data.title, data.salary, selectedRole], (err, res) => {
                    console.log('\n New role added', data.title, '.\n');
                    anotherTask()
                })
            };
            function askDepartmentQuestions(departmentList) {
                inquirer.prompt(questions.addRoleQuestions(departmentList))
                    .then((data) => {
                        let selectedRole;
                        connections.db.query(`SELECT id FROM department WHERE name = ?`, data.department, (err, roleRes) => {
                            selectedRole = roleRes[0].id;
                        });
                        setTimeout(function () {        //needs to be fixed to wait for querys to end before starting for scaling purposes
                            setRoleToDb(data, selectedRole);
                        }, 200);
                    })
            };
            function getDepartmentList() {
                let departmentList = [];
                connections.db.query("SELECT name FROM department", (err, res) => {
                    for (i = 0; i < res.length; i++) {
                        departmentList.push(res[i].name)
                    }
                    askDepartmentQuestions(departmentList);
                });
            };
            getDepartmentList();
            break;
        case 'Add an employee':

            function setEmployeeToDb(data, selectedRole, selectedBoss) {
                connections.db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`, [data.first_name, data.last_name, selectedRole, selectedBoss], (err, res) => {
                    console.log('\n New employee added', data.first_name, data.last_name + '.\n');
                    anotherTask()
                })
            };
            function askRoleQuestions(roleList, managerList) {
                inquirer.prompt(questions.addEmployeeQuestions(roleList, managerList))
                    .then((data) => {
                        let selectedRole;
                        connections.db.query(`SELECT id from role WHERE title = ?`, data.department, (err, roleRes) => {
                            selectedRole = roleRes[0].id;
                        });
                        let selectedBoss;
                        connections.db.query(`SELECT id from employee WHERE CONCAT(first_name, ' ', last_name) = ?`, data.manager, (err, bossRes) => {
                            selectedBoss = bossRes[0].id;
                        });

                        setTimeout(function () {        //needs to be fixed to wait for querys to end before starting for scaling purposes
                            setEmployeeToDb(data, selectedRole, selectedBoss);
                        }, 200);
                    })

            };
            function getRoleList() {
                let roleList = [];
                connections.db.query("SELECT id, title FROM role", (err, result) => {
                    for (i = 0; i < result.length; i++) {
                        roleList.push(result[i].title);
                    }
                });
                let managerList = [];
                connections.db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee WHERE manager_id is NULL`, (err, result2) => {
                    for (i = 0; i < result2.length; i++) {
                        managerList.push(result2[i].manager);
                    }
                });
                askRoleQuestions(roleList, managerList)
            };
            getRoleList();
            break;
        case 'Update an employee role':
            function setUpdateToDb(data, selectedRole) {
                connections.db.query(`UPDATE employee SET role_id = ${selectedRole} WHERE CONCAT(first_name, ' ', last_name) = ?`, data.employee, (err, res) => {
                    console.log('\n Employee updated', data.employee, 'to new role', data.role, '.\n');
                    anotherTask()
                });
            }
            function askWhichEmployee(employeeList, roleList) {
                inquirer.prompt(questions.updateRoleQuestion(employeeList, roleList))
                    .then((data) => {
                        let selectedRole;
                        connections.db.query(`SELECT id from role WHERE title = ?`, data.role, (err, roleRes) => {
                            selectedRole = roleRes[0].id;
                        });
                        setTimeout(function () {        //needs to be fixed to wait for querys to end before starting for scaling purposes
                            setUpdateToDb(data, selectedRole);
                        }, 200);
                    })
            }
            function getEmployees() {
                let roleList = [];
                connections.db.query("SELECT id, title FROM role", (err, result) => {
                    for (i = 0; i < result.length; i++) {
                        roleList.push(result[i].title);
                    }
                });
                let employeeList = [];
                connections.db.query(`SELECT CONCAT(first_name, ' ', last_name) AS employee FROM employee`, (err, resEmpl) => {
                    for (i = 0; i < resEmpl.length; i++) {
                        employeeList.push(resEmpl[i].employee)
                    }
                });
                setTimeout(function () {        //needs to be fixed to wait for querys to end before starting for scaling purposes
                    askWhichEmployee(employeeList, roleList)
                }, 200);
            };
            getEmployees();

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