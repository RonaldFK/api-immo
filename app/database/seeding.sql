

INSERT INTO location(id,"number", street, city, country,code)
VALUES (1,14, 'rue des poids chiche','Paris','France',75002);

INSERT INTO location(id,"number", street, city, country,code)
VALUES (2,8, 'rue des parisiens','Paris','France',75008);

INSERT INTO location(id,"number", street, city, country,code)
VALUES (3,10, 'rue de la ville','Bry sur marne','France',94360);

INSERT INTO location(id,"number", street, city, country,code)
VALUES (4,20, 'rue sans nom','Neuilly','France',92200);

INSERT INTO location(id,"number", street, city, country,code)
VALUES (5,45, 'rue de puy des domes','Clermont Ferrand','France',63000);

INSERT INTO parking (id,name,price,location_id)
VALUES(1,'Box Paris 7 à louer',150000,1);

INSERT INTO parking (id,name,price,location_id)
VALUES(2,'Parking appartement Clermont',150000,1);

INSERT INTO estate(name, price,location_id, parking_id)
VALUES ('Appartement de Clermont',200000, 5,2 );

INSERT INTO estate(name, price,location_id, parking_id)
VALUES ('Maison à Bry',1000000, 3,1 );

INSERT INTO parking (name,price,location_id, estate_id)
VALUES('Parking de la maison de Paris 8',150000,2,2);


