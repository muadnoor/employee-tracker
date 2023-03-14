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

const list = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Roll']
            }]).then(response => {
                if (response.choice === 'View all Departments') {
                    viewDepartments()
                }
                else if (response.choice === 'View all Roles') {
                    viewRoles()
                }
                else if (response.choice === 'View all Employees') {
                    viewEmployees()
                }
                else if (response.choice === 'Add Department') {
                    addDepartment()
                }
                else if (response.choice === 'Add Role') {
                    addRole()
                }
                else if (response.choice === 'Add Employee') {
                    //addEmployee()
                }
                else if (response.choice === 'Update Employee Role') {
                    //updateEmployeeRole()
                }
            })
}

const viewDepartments = () => {
    const query = `SELECT * FROM department`;
    db.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            list()
        })
}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?'
            }
        ]).then(response => {
            const query = `INSERT INTO department SET ?`
            db.query(
                query, {
                department_name: response.departmentName
            }
            )
            list()
        })
}

const viewRoles = () => {
    const query = `SELECT * FROM roles`;
    db.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            list()
        })
}

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'roleDepartment',
                message: 'Which department does the role belong to?'
            },
        ]).then(response => {
            const query = `INSERT INTO roles SET ?`
            db.query(
                query, {
                title: response.roleName,
                salary: response.salary,
                department_id: response.roleDepartment
            }
            )
            list()
        })
}

const viewEmployees = () => {
    const query = `SELECT * FROM employee`;
    db.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            list()
        })
}