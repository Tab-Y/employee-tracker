// const verifyAsString = function (input) {
//     if (input === "") {
//         throw console.error(err)
//     }
// };
const startQuestion = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        name: "task"
    }
];
// const addDepartment = [
//     {
//         type: "input",
//         message: "What is the name of the department?",
//         name: "department",
//         validate: function () {
//             if(input === null){
//                 throw console.error("Please enter a department name.")
//             }
//         }
//     }
// ];
// const addRole = [
//     {
//         type: "input",
//         message: ""
//     }
// ]

module.exports = {startQuestion}