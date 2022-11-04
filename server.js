const asciiart = require('asciiart-logo');

const table = require('console.table');
const inquirer = require('inquirer');
const questions = require("./src/questions.js");
const connections = require("./routes/connection.js");
const switches = require("./src/switches")


function init() {
    inquirer
        .prompt(questions.startQuestion)
        .then((data) => {
            switches.questionSwitch(data)
        })
}
init();


module.exports = { init }