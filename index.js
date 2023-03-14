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
                    addEmployee()
                }
                else if (response.choice === 'Update Employee Role') {
                    updateEmployeeRole()
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
                name: 'department',
                message: 'What is the name of the department?'
            }
        ]).then(response => {
            const query = `INSERT INTO department SET ?`
            db.query(
                query, {
                department_name: response.department
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
                name: 'role',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Which department does the role belong to?'
            },
        ]).then(response => {
            const query = `INSERT INTO roles SET ?`
            db.query(
                query, {
                title: response.role,
                salary: response.salary,
                department_id: response.departmentId
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

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'last',
                message: "What is the employee's last name?"
            },
            {
                type: 'input',
                name: 'roleId',
                message: "What is the employee's role id?"
            },
            {
                type: 'input',
                name: 'managerId',
                message: "What is the employee's manager id?"
            },
        ]).then(response => {
            const query = `INSERT INTO employee SET ?`
            db.query(
                query, {
                first_name: response.first,
                last_name: response.last,
                role_id: response.roleId,
                manager_id: response.managerId
            }
            )
            list()
        })
}

const updateEmployeeRole = () => {
    const employeeSql = `SELECT * FROM employee`;
    db.query(employeeSql, (err, data) => {
        if (err) throw err;
        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
            .then(empChoice => {
                const employee = empChoice.name;
                const params = [];
                params.push(employee);
                const roleSql = `SELECT * FROM roles`;
                db.query(roleSql, (err, data) => {
                    if (err) throw err;
                    const roles = data.map(({ id, title }) => ({ name: title, value: id }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: "What is the employee's new role?",
                            choices: roles
                        }
                    ])
                        .then(roleChoice => {
                            const role = roleChoice.role;
                            params.push(role);
                            let employee = params[0]
                            params[0] = role
                            params[1] = employee
                            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                            db.query(sql, params, (err, result) => {
                                if (err) throw err;
                                list();
                            });
                        });
                });
            });
    });
};