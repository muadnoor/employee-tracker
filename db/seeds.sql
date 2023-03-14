INSERT INTO department (id, department_name)
VALUES (1, "Board"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Finance"),
       (5, "Legal");

-- Role seeds
INSERT INTO roles (department_id, title, salary)
VALUES (1, "CEO", 1000000),
       (2, "Sales Lead", 100000),
       (2, "Salesperson", 80000),
       (3, "Lead Engineer", 150000),
       (3, "Software Engineer", 120000),
       (4, "Accountant Manager", 160000),
       (4, "Accountant", 125000),
       (5, "Legal Team Lead", 250000),
       (5, "Lawyer", 190000);

-- Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Patrick", "Mahomes", 1, null),
       ("Aaron", "Donald", 2, 1),
       ("Aaron", "Rodgers", 3, 3),
       ("Derrik", "Henry", 4, 1),
       ("Travis", "Kelce", 5, 4), 
       ("Davante", "Adams", 6, 1),
       ("Tom", "Brady", 7, 5),
       ("DeAndre", "Hopkins", 8, 1),
       ("Myles", "Garret", 9, 6);