

const startQuestion = [
    {
        type: "list",
        message: "What task would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", 
        "Update an employee role"],
        name: "task"
            // prompts for bonus
        // , "Update employee managers", "Delete department", "Delete role", "Delete employee""View employees by manager", "View employees by department", "View budget by department"
    }
];
const addDepartmentQuestions = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: "department"
    }
];
// need to add questions for all the specific info
function addRoleQuestions(departmentList) {
    return [
    {
        type: "input",
        message: "What role do you want to add?",
        name: "title"
    },
    {
        type: "input",
        message: "What is the salary of this role?",
        name: "salary",
        validate: (salary) => {
            if(isNaN(salary)){
                return "please enter a valid number"
            } else {
                return true
            }
        }
    },
    {
        type: "list",
        message: "What department does this role belong to?",
        choices: departmentList,
        name: "department"
    }
]
};
function addEmployeeQuestions(roleList, managerList) {

return [
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
        type: "list",
        message: "What department does this employee work in?",
        choices: roleList,
        name: "department"
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
        choices: managerList,
        name: "manager"
    }
]
}
const startOver = [
    {
        type: "confirm",
        message: "would you like to start another task?",
        name: "confirm"
    }
];

module.exports = { startQuestion, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, startOver }