INSERT INTO department (name) VALUES
   ('Sales'),
   ('Finance'),
   ('Service'),
   ('HR'),
   ('Customer Service'),
   ('Parts');

INSERT INTO role (title, salary, department_id) VALUES
   ('Sales Manager', 100000.00, 1),
   ('Sales Rep', 80000.00, 1),
   ('Finance Manager', 120000.00, 2),
   ('Finance Rep', 90000.00, 2),
   ('Service Manager', 110000.00, 3),
   ('Service Rep', 85000.00, 3),
   ('HR Manager', 95000.00, 4),
   ('HR Rep', 75000.00, 4),
   ('Customer Service Manager', 105000.00, 5),
   ('Customer Service Rep', 80000.00, 5),
   ('Parts Manager', 100000.00, 6),
   ('Parts Rep', 80000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
   ('John', 'Doe', 1, NULL),
   ('Jane', 'Doe', 2, 1),
   ('Jim', 'Smith', 3, NULL),
   ('Jill', 'Smith', 4, 3),
   ('Jack', 'Jones', 5, NULL),
   ('Jill', 'Jones', 6, 5),
   ('Joe', 'Johnson', 7, NULL),
   ('Jill', 'Johnson', 8, 7),
   ('Jill', 'Johnson', 9, NULL),
   ('Joe', 'Johnson', 10, 9),
   ('Jill', 'Johnson', 11, NULL),
   ('Joe', 'Johnson', 12, 11);


