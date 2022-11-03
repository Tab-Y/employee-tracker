const express = require('express');
const mysql = require('mysql2');
const asciiart = require('asciiart-logo');
const chalk = require('chalk');
const table = require('console.table');
const inquirer = require('inquirer');
const secretKey = require('./config/config.js');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.SECRETKEY || secretKey,
        database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
);