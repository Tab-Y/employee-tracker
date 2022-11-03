-- beginning structure for database
INSERT INTO department (name)
VALUES  ("Human Resources"),
        ("Sales"),
        ("Front End"),
        ("Shipping"),
        ("Maintenance");

INSERT INTO role (title, salary, department_id)
VALUES  ("Lead", 65443, 1),
        ("Assistant Director", 255432, 1),
        ("Customer Service", 34500, 3),
        ("Cold-calls", 37500, 2),
        ("Receiving clerk", 45623, 4),
        ("Janitor", 28554, 5),
        ("Server Tech", 146995, 5),
        ("Developer", 64523, 3),
        ("Cashier", 28554, 2),
        ("Operator", 48621, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (100001, "Tony", "Stark", 2, null),
        (8675309, "Tommy", "Twotone", 1, 100001),
        (8008135, "Betty", "Boop", 7, 8675309),
        (4738347, "Fusajiro", "Yamauchi", 2, null),
        (123456, "filler", "fillington", 6, 4738347);


