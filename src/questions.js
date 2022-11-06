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
function updateRoleQuestion(employeeList, roleList) {

    return [
        {
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeList,
            name: "employee"
        },
        {
            type: "list",
            message: "What is this employees new role?",
            choices: roleList,
            name: "role"
        }
    ]
}
const addDepartmentQuestions = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: "department"
    }
];

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
                if (isNaN(salary)) {
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
            message: "What department does this employee work in?",
            choices: roleList,
            name: "department"
        },
        {
            type: "list",
            message: "Who is the direct manager of this employee?",
            choices: managerList,
            name: "manager"
        }
    ]
};

const startOver = [
    {
        type: "confirm",
        message: "would you like to start another task?",
        name: "confirm"
    }
];

module.exports = { startQuestion, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateRoleQuestion, startOver }