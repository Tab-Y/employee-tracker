

const startQuestion = [
    {
        type: "list",
        message: "What task would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "View employees by manager", 
        "View employees by department", "View budget by department", "Add a department", "Add a role", "Add an employee", 
        "Update an employee role", "Update employee managers", "Delete department", "Delete role", "Delete employee"],
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
// need to add questions for all the specific info
const addRole = [
    {
        type: "input",
        message: "What role do you want to add?",
        name: "role"
    }
];
const addEmployee = [
    {
        type: "input",
        message: "what is the id number of this employee?",
        name: "employee_id",
        validate: (employee_id) => {
            if(isNaN(employee_id)){
                return "please enter a valid number"
            } else {
                return true
            }
        }
    },
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name"
    },
    {
        type: "list",
        message: "Who is the direct manager of this employee?",
        choices: ["tim", "tara", "becky"], //need to link this to the list of employees in the db
        name: "manager"
    }
];
const startOver = [
    {
        type: "confirm",
        message: "would you like to start another task?",
        name: "confirm"
    }
];

module.exports = { startQuestion, addDepartment, addRole, addEmployee, startOver }