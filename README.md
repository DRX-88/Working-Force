# Working Force

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Welcome to Working Force
Welcome to Working Force this application is a command-line application designed to manage a company's employee database. It helps administrators keep track of employees, managers, departments, and roles by providing a series of prompts that guide the user through various tasks. This application is built using Node.js, Inquirer, and PostgreSQL.


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schemas](#database-schema)
- [Contributions](#contributions)
- [Technologies](#technologies)
- [Link](#link)
- [Questions](#questions)
- [License](#license)

## Features
- **Add Employees**: Enter details to add new employees.
- **View Employees**: Display a list of all employees.
- **Update Employee Roles**: Change the role of an existing employee.
- **Add Departments**: Enter details to add new departments.
- **Add Roles**: Enter details to add new roles.
- **View Departments**: Display a list of all departments.
- **View Roles**: Display a list of all roles.
- **Delete Employees, Roles, Departments**: Remove entries from the database.

### Demo
![image](https://github.com/DRX-88/Working-Force/assets/162182740/7e21b016-0f54-4319-8fb7-cd66d1c8c4e6)

## Installation

1. Clone the repository to your local machine:
    ```bash
    npm install
    ```
2. Sign into your postgres using:
    ```bash
    psql -U postgres
    ```
3. Create the database:
    ```bash
    \i ./db/schema.sql
    ```
4. Seed the database:
    ```bash
    \i ./db/schema.sql
    ```
Make sure to also put in your Postgres username and password located in the server.js file on server.js:13:

```javascript
module.exports = {
    user: 'your-username',
    password: 'your-password',
    host: 'localhost',
    database: 'your-database-name',
    port: 5432,
};
```

## Usage

1. Start the application by running:
    ```bash
    npm start
    ```
2. Follow the prompts to interact with the employee tracker:
    - Select an option from the main menu.
    - Enter the required information when prompted.

## Database Schema

- **Departments Table**: Contains department details.
    - `id`: SERIAL PRIMARY KEY
    - `name`: VARCHAR(30)
    
- **Roles Table**: Contains role details.
    - `id`: SERIAL PRIMARY KEY
    - `title`: VARCHAR(30) 
    - `salary`: DECIMAL L
    - `department_id`: INTEGER REFERENCES department(id)

- **Employees Table**: Contains employee details.
    - `id`: SERIAL PRIMARY KEY
    - `first_name`: VARCHAR(30) 
    - `last_name`: VARCHAR(30) 
    - `role_id`: INTEGER REFERENCES role(id)
    - `manager_id`: INTEGER REFERENCES employee(id)

## Contributions

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add new feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Open a pull request.

## Technologies

- [Node.js](https://nodejs.org/)
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [PostgreSQL](https://www.postgresql.org/)


## Link
[Github Repo](https://github.com/DRX-88/SVG-Maker)

## Questions
If you have any questions, you can reach me through the following:
- GitHub: [DRX-88](https://github.com/yourusername)
- Email: [nrm@gmail.com](mailto:youremail@example.com)

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)
    
    Copyright (c) 2024 

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 

    The above copyright notice and this permission notice (including the next paragraph) shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
