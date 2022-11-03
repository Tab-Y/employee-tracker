const startQuestion = [
    {
        type: "list",
        message: "What task would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "View employees by manager", "View employees by department", "View budget by department", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Update employee managers", "Delete department", "Delete role", "Delete employee"],
        name: "task"
    }
];
const addDepartment = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: "department"
    }
];
const addRole = [
    {
        type: "input",
        message: "What role do you want to add?",
        name: "role"
    }
];
const startOver = [
    {
        type: "confirm",
        message: "would you like to start another task?",
        name: "confirm"
    }
];

module.exports = { startQuestion, addDepartment, addRole, startOver }