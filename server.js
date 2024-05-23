const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
  {
    user: '',
    password: '',
    host: 'localhost',
    database: 'workforce_db',
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



app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




