const express = require('express');
const mysql = require('mysql2');
const asciiart = require('asciiart-logo');
const chalk = import('chalk');
const table = require('console.table');
const inquirer = require('inquirer');
const config = require('./config/config.js');
const questions = require("./src/questions.js");



// const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // add your SQL password here
        password: process.env.SECRETKEY || `${config}`,
        database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
);





function anotherTask() {
    inquirer.prompt(questions.startOver)
    .then((data) => {
        if(data.confirm === true){
            init()
        } else {
            db.end()
        }
    })
};
function init() {
    inquirer
        .prompt(questions.startQuestion)
        .then((data) => {
            const choice = data.task
            switch (choice) {
                case 'View all departments':
                    console.log(choice);// what to do
                    anotherTask();
                    break;
                case 'View all roles':
                    console.log(choice);// what to do
                    anotherTask();
                    break;
                case 'View all employees':
                    console.log(choice); // what to do
                    break;
                case 'View employees by manager':
                    console.log(choice);// what to do
                    anotherTask();
                    break;
                case 'View employees by department':
                    console.log(choice);// what to do
                    anotherTask();
                    break;
                case 'View budget by department':
                    console.log(choice);// what to do
                    anotherTask();
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
                    console.log(choice);// what to do
                    anotherTask();
                    break;
                case 'Update an employee role':
                    console.log(choice);// what to do
                    anotherTask();
                    break;
                case 'Update employee managers':
                    console.log(choice);// what to do
                    anotherTask();
                    break;
                case 'Delete department':
                    console.log(choice);// what to do
                    anotherTask();
                    break;
                case 'Delete role':
                    console.log(choice);// what to do
                    anotherTask();
                    break;
                case 'Delete employee':
                    console.log(choice);// what to do
                    anotherTask();
                    break;
            }
        })
}
init();