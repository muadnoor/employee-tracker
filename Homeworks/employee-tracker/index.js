const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db"
});

db.connect(function (err) {
    if (err) throw err
    list();
});

function list() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Roll']
            }]).then(response => {
                if (response.choice === 'View all Departments') {
                    //viewDepartments()
                }
                else if (response.choice === 'View all Roles') {
                    //viewRoles()
                }
                else if (response.choice === 'View all Employees') {
                    //viewEmployees()
                }
                else if (response.choice === 'Add Department') {
                    //addDepartment()
                }
                else if (response.choice === 'Add Role') {
                    //addRole()
                }
                else if (response.choice === 'Add Employee') {
                    //addEmployee()
                }
                else if (response.choice === 'Update Employee Role') {
                    //updateEmployeeRole()
                }
            })
}