INSERT INTO "manager"(
        "firstname",
        "lastname",
        "password",
        "login",
        "email"
    )
VALUES (
        'John',
        'Smith',
        '123456',
        'johnsmith',
        'johnsmith@gmail.com'
    ),
    (
        'Sara',
        'Doe',
        'qwerty',
        'saradoe',
        'saradoe@gmail.com'
    ),
    (
        'Alex',
        'Jones',
        'asdfgh',
        'alexjones',
        'alexjones@gmail.com'
    ),
    (
        'Adam',
        'Johnson',
        'zxcvbn',
        'adamjohnson',
        'adamjohnson@gmail.com'
    ),
    (
        'Sam',
        'Williams',
        'password',
        'samwilliams',
        'samwilliams@gmail.com'
    ),
    (
        'Lily',
        'Brown',
        '12345678',
        'lilybrown',
        'lilybrown@gmail.com'
    ),
    (
        'Mia',
        'Miller',
        '87654321',
        'miamiller',
        'miamiller@gmail.com'
    ),
    (
        'Charlotte',
        'Davis',
        'qazwsx',
        'charlottedavis',
        'charlottedavis@gmail.com'
    ),
    (
        'James',
        'Wilson',
        '123456789',
        'jameswilson',
        'jameswilson@gmail.com'
    ),
    (
        'Emily',
        'Taylor',
        '0987654321',
        'emilytaylor',
        'emilytaylor@gmail.com'
    );
INSERT INTO "customer"(
        "firstname",
        "lastname",
        "tel",
        "type_of_customer",
        "cash_or_credit"
    )
VALUES ('Tom', 'Anderson', 0612354678, 'seller', 'cash'),
    ('Harry', 'Smith', 0698765432, 'buyer', 'credit'),
    ('Jim', 'Walker', 0634567890, 'renter', 'cash'),
    (
        'Linda',
        'Anderson',
        0645678901,
        'renterclient',
        'credit'
    ),
    ('Matthew', 'Moore', 0642345678, 'seller', 'cash'),
    ('Emma', 'Miller', 0656789012, 'buyer', 'credit'),
    ('Amy', 'Smith', 0678901234, 'renter', 'cash'),
    (
        'Jack',
        'Brown',
        0690123456,
        'renterclient',
        'credit'
    ),
    (
        'Daniel',
        'Thompson',
        0612345678,
        'seller',
        'cash'
    ),
    ('Sophia', 'Davis', 0623456789, 'buyer', 'credit');
INSERT INTO "location"("num", "street", "city", "country", "code")
VALUES (100, 'Main Street', 'New York', 'USA', 1000),
    (200, 'Park Avenue', 'Los Angeles', 'USA', 2000),
    (300, 'Oxford Street', 'London', 'UK', 3000),
    (400, 'Boulevard', 'Paris', 'France', 4000),
    (
        500,
        'Washington Avenue',
        'Washington',
        'USA',
        5000
    ),
    (600, 'Central Street', 'Berlin', 'Germany', 6000),
    (700, 'Roma Street', 'Rome', 'Italy', 7000),
    (800, 'Queen Street', 'Madrid', 'Spain', 8000),
    (900, 'Garden Avenue', 'Moscow', 'Russia', 9000),
    (1000, 'Moscow Avenue', 'Beijing', 'China', 10000);
INSERT INTO "estate"(
        "name",
        "price",
        "type",
        "date_of_selling",
        "statut"
    )
VALUES (
        'Estate 1',
        100000,
        'apartment',
        '2022-01-01',
        'a vendre'
    ),
    (
        'Estate 2',
        200000,
        'house',
        '2022-02-01',
        'a vendre'
    ),
    (
        'Estate 3',
        300000,
        'villa',
        '2022-03-01',
        'a vendre'
    ),
    (
        'Estate 4',
        400000,
        'apartment',
        '2022-04-01',
        'a vendre'
    ),
    (
        'Estate 5',
        500000,
        'house',
        '2022-05-01',
        'a vendre'
    ),
    (
        'Estate 6',
        600000,
        'villa',
        '2022-06-01',
        'a vendre'
    ),
    (
        'Estate 7',
        700000,
        'apartment',
        '2022-07-01',
        'a vendre'
    ),
    (
        'Estate 8',
        800000,
        'house',
        '2022-08-01',
        'a vendre'
    ),
    (
        'Estate 9',
        900000,
        'villa',
        '2022-09-01',
        'a vendre'
    ),
    (
        'Estate 10',
        1000000,
        'apartment',
        '2022-10-01',
        'a vendre'
    );
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 100
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'John'
            AND "lastname" = 'Smith'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Tom'
            AND "lastname" = 'Anderson'
    )
WHERE "name" = 'Estate 1';
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 200
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'Sara'
            AND "lastname" = 'Doe'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Harry'
            AND "lastname" = 'Smith'
    )
WHERE "name" = 'Estate 2';
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 300
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'Alex'
            AND "lastname" = 'Jones'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Jim'
            AND "lastname" = 'Walker'
    )
WHERE "name" = 'Estate 3';
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 400
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'Adam'
            AND "lastname" = 'Johnson'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Linda'
            AND "lastname" = 'Anderson'
    )
WHERE "name" = 'Estate 4';
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 500
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'Sam'
            AND "lastname" = 'Williams'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Matthew'
            AND "lastname" = 'Moore'
    )
WHERE "name" = 'Estate 5';
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 600
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'Lily'
            AND "lastname" = 'Brown'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Emma'
            AND "lastname" = 'Miller'
    )
WHERE "name" = 'Estate 6';
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 700
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'Mia'
            AND "lastname" = 'Miller'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Amy'
            AND "lastname" = 'Smith'
    )
WHERE "name" = 'Estate 7';
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 800
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'Charlotte'
            AND "lastname" = 'Davis'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Jack'
            AND "lastname" = 'Brown'
    )
WHERE "name" = 'Estate 8';
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 900
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'James'
            AND "lastname" = 'Wilson'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Daniel'
            AND "lastname" = 'Thompson'
    )
WHERE "name" = 'Estate 9';
UPDATE "estate"
SET location_id = (
        SELECT "id"
        FROM "location"
        WHERE "num" = 1000
    ),
    manager_id = (
        SELECT "id"
        FROM "manager"
        WHERE "firstname" = 'Emily'
            AND "lastname" = 'Taylor'
    ),
    customer_id = (
        SELECT "id"
        FROM "customer"
        WHERE "firstname" = 'Sophia'
            AND "lastname" = 'Davis'
    )
WHERE "name" = 'Estate 10';