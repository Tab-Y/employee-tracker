const express = require('express');
const mysql = require('mysql2');
const asciiart = require('asciiart-logo');
const chalk = import('chalk');
const table = require('console.table');
const inquirer = require('inquirer');
const config = require('./config/config.js')
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

function init () {
    inquirer
        .prompt(questions.startQuestion)
        .then((data) => {
            console.log("test")})
}
init();