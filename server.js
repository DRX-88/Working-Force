const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
  {
    user: 'postgres',
    password: 'Password24',
    host: 'localhost',
    database: 'workforce_db',
    port: 5432,
  },
  console.log(`Connected to the workforce_db.`)
);

pool.connect()
.then(() => console.log('Connected to the workforce_db'))
.catch(err => console.error('Connection error', err));

app.get('/api/department', (req, res) => {
  pool.query('SELECT * FROM department', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(result.rows);
  });
});

app.get('/api/role', (req, res) => {
  pool.query('SELECT * FROM role', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(result.rows);
  });
});

app.get('/api/employee', (req, res) => {
    pool.query('SELECT * FROM employee', (err, result) => {
        if (err) {
        console.error(err);
        return res.status(500).json(err);
        }
        res.json(result.rows);
    });
    });

app.post('/api/department', (req, res) => {
    const { name } = req.body;
    pool.query('INSERT INTO department (name) VALUES ($1)', [name], (err, result) => {
        if (err) {
        console.error(err);
        return res.status(500).json(err);
        }
        res.json(result);
    });
    }
);

app.post('/api/add-role', (req, res) => {  
    const { title, salary, department_id } = req.body;
    pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id], (err, result) => {
        if (err) {
        console.error(err);
        return res.status(500).json(err);
        }
        res.json(result);
    });
    }
);

app.post('/api/add-employee', (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id], (err, result) => {
        if (err) {
        console.error(err);
        return res.status(500).json(err);
        }
        res.json(result);
    });
    }
);

app.put('/api/update-employee', (req, res) => {
    const { first_name, last_name, role_id, manager_id, id } = req.body;
    pool.query('UPDATE employee SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 WHERE id = $5', [first_name, last_name, role_id, manager_id, id], (err, result) => {
        if (err) {
        console.error(err);
        return res.status(500).json(err);
        }
        res.json(result);
    });
    }
);

app.delete('/api/delete-employee', (req, res) => {
    const { id } = req.body;
    pool.query('DELETE FROM employee WHERE id = $1', [id], (err, result) => {
        if (err) {
        console.error(err);
        return res.status(500).json(err);
        }
        res.json(result);
    });
    }
);

app.delete('/api/delete-role', (req, res) => {
    const { id } = req.body;
    pool.query('DELETE FROM role WHERE id = $1', [id], (err, result) => {
        if (err) {
        console.error(err);
        return res.status(500).json(err);
        }
        res.json(result);
    });
    }   
);

app.delete('/api/delete-department', (req, res) => {
    const { id } = req.body;
    pool.query('DELETE FROM department WHERE id = $1', [id], (err, result) => {
        if (err) {
        console.error(err);
        return res.status(500).json(err);
        }
        res.json(result);
    });
    }     
);

const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Delete Employee',
      'Delete Role',
      'Delete Department',
      'Exit'
    ]
  }
];

const mainMenu = () => {
    inquirer.prompt(questions).then((answers) => {
        switch (answers.action) {
        case 'View All Departments':
            viewDepartments();
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'View All Employees':
            viewEmployees();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'Delete Employee':
            deleteEmployee();
            break;
        case 'Delete Role':
            deleteRole();
            break;
        case 'Delete Department':
            deleteDepartment();
            break;
        case 'Exit':
            pool.end();
            break;
        }
    });
    }

const viewDepartments = () => {
    pool.query('SELECT * FROM department', (err, result) => {
        if (err) {
        console.error(err);
        return;
        }
        console.table(result.rows);
        mainMenu();
    });
    }

const viewRoles = () => { 
    pool.query('SELECT * FROM role', (err, result) => {
        if (err) {
        console.error(err);
        return;
        }
        console.table(result.rows);
        mainMenu();
    });
    }

const viewEmployees = () => {
    pool.query('SELECT * FROM employee', (err, result) => {
        if (err) {
        console.error(err);
        return;
        }
        console.table(result.rows);
        mainMenu();
    });
    }

const addDepartment = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
        }
    ]).then((answers) => {
        pool.query('INSERT INTO department (name) VALUES ($1)', [answers.name], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Department added successfully.');
        mainMenu();
        });
    });
    }

const addRole = () => { 
    inquirer.prompt([
        {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:'
        },
        {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the role:'
        },
        {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID of the role:'
        }
    ]).then((answers) => {
        pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Role added successfully.');
        mainMenu();
        });
    });
    }   

const addEmployee = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee:'
        },
        {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee:'
        },
        {
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID of the employee:'
        },
        {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID of the employee:'
        }
    ]).then((answers) => {
        pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Employee added successfully.');
        mainMenu();
        });
    });
    }

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'id',
        message: 'Enter the ID of the employee:'
        },
        {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee:'
        },
        {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee:'
        },
        {
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID of the employee:'
        },
        {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID of the employee:'
        }
    ]).then((answers) => {
        pool.query('UPDATE employee SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 WHERE id = $5', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id, answers.id], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Employee updated successfully.');
        mainMenu();
        });
    });
    }   

const deleteEmployee = () => {  
    inquirer.prompt([
        {
        type: 'input',
        name: 'id',
        message: 'Enter the ID of the employee:'
        }
    ]).then((answers) => {
        pool.query('DELETE FROM employee WHERE id = $1', [answers.id], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Employee deleted successfully.');
        mainMenu();
        });
    });
    }

const deleteRole = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'id',
        message: 'Enter the ID of the role:'
        }
    ]).then((answers) => {
        pool.query('DELETE FROM role WHERE id = $1', [answers.id], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Role deleted successfully.');
        mainMenu();
        });
    });
    }

const deleteDepartment = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'id',
        message: 'Enter the ID of the department:'
        }
    ]).then((answers) => {
        pool.query('DELETE FROM department WHERE id = $1', [answers.id], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Department deleted successfully.');
        mainMenu();
        });
    });
    }

mainMenu();



app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




