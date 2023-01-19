BEGIN;

DROP TABLE "manager","estate","customer","parking","location" CASCADE;


CREATE TABLE "manager"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "checkPassword" TEXT NOT NULL,
    "login" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "type" TEXT NOT NULL DEFAULT 'nonAdmin',
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE ("firstname","lastname","login","email")
);
CREATE TABLE "customer" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "tel" INTEGER NOT NULL UNIQUE,
    "type_of_customer" TEXT NOT NULL,
    "cash_or_credit" TEXT,
    "date_of_selling" DATE,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE ("firstname","lastname","tel","cash_or_credit","date_of_selling")
);

CREATE TABLE "location" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "num" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE ("num","street","city","country","code")
);
CREATE TABLE "estate" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
);


ALTER TABLE estate
ADD COLUMN location_id INTEGER REFERENCES "location"("id"),
ADD COLUMN manager_id INTEGER REFERENCES "manager"("id"),
ADD COLUMN customer_id INTEGER REFERENCES "customer"("id");

ALTER TABLE customer
ADD COLUMN estate_id INTEGER REFERENCES "estate"("id");

CREATE VIEW "sellers"
AS
SELECT * FROM "customer"
WHERE "type_of_customer" = 'seller';

CREATE VIEW "renters"
AS
SELECT * FROM "customer"
WHERE "type_of_customer" = 'renter';

CREATE VIEW "buyers"
AS
SELECT * FROM "customer"
WHERE "type_of_customer" = 'buyer';

CREATE VIEW "renter_clients"
AS
SELECT * FROM "customer"
WHERE "type_of_customer" = 'renterclient';