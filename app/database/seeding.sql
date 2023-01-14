INSERT INTO location("num", street, city, country,code)
VALUES (14, 'rue des poids chiche','Paris','France',75002);

INSERT INTO location("num", street, city, country,code)
VALUES (8, 'rue des parisiens','Paris','France',75008);

INSERT INTO location("num", street, city, country,code)
VALUES (10, 'rue de la ville','Bry sur marne','France',94360);

INSERT INTO location("num", street, city, country,code)
VALUES (20, 'rue sans nom','Neuilly','France',92200);

INSERT INTO location("num", street, city, country,code)
VALUES (45, 'rue de puy des domes','Clermont Ferrand','France',63000);

INSERT INTO estate(name, price,type)
VALUES ('Appartement de Clermont',200000,'appartement');

INSERT INTO estate(name, price,type)
VALUES ('Maison à Bry',1000000, 'Maison');

INSERT INTO estate(name, price,type)
VALUES ('Box Paris 7 à louer',150000,'parking');

INSERT INTO estate(name, price,type)
VALUES ('Parking 1',50000, 'parking');

INSERT INTO estate(name, price,type)
VALUES ('Maison centre Paris',20000000,'maison');

INSERT INTO estate(name, price,type)
VALUES ('parking 2',20000, 'parking');

INSERT INTO estate(name, price,type)
VALUES ('Appartement Chells',150000,'appartement');

INSERT INTO estate(name, price,type)
VALUES ('Appartement Chelles',50000, 'appartement');

INSERT INTO manager(firstname,lastname,password,login,email)
VALUES ('bobi','jean','test','bobi.jean','bobi@gmail.com');

INSERT INTO manager(firstname,lastname,password,login,email)
VALUES ('john','doe','test','john.doe','john@gmail.com');

INSERT INTO customer(firstname,lastname,tel,type_of_customer)
VALUES ('client1','client1','06','seller');

INSERT INTO customer(firstname,lastname,tel,type_of_customer)
VALUES ('client2','client2','07','renter');

INSERT INTO customer(firstname,lastname,tel,type_of_customer,cash_or_credit)
VALUES ('client3','client3','06','buyer','cash');

INSERT INTO customer(firstname,lastname,tel,type_of_customer,cash_or_credit)
VALUES ('client4','client4','08','renterclient','cash');