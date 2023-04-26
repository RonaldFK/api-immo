BEGIN;
-- Je vide mes tables.
TRUNCATE TABLE "manager" CASCADE;
TRUNCATE TABLE "customer" CASCADE;
TRUNCATE TABLE "location" CASCADE;
TRUNCATE TABLE "estate" CASCADE;
TRUNCATE TABLE "photo" CASCADE;
-- Je remets mes séquences à zéro.
ALTER SEQUENCE "manager_id_seq" RESTART WITH 1;
ALTER SEQUENCE "customer_id_seq" RESTART WITH 1;
ALTER SEQUENCE "location_id_seq" RESTART WITH 1;
ALTER SEQUENCE "estate_id_seq" RESTART WITH 1;
ALTER SEQUENCE "photo_id_seq" RESTART WITH 1;
-- si nécessaire, je supprime ensuite mes tables.
DROP TABLE IF EXISTS "customer" CASCADE;
DROP TABLE IF EXISTS "estate" CASCADE;
DROP TABLE IF EXISTS "location" CASCADE;
DROP TABLE IF EXISTS "manager" CASCADE;
DROP TABLE IF EXISTS "photo" CASCADE;
-- Je commence le processus de création de la base de données
CREATE TABLE "manager"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "login" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "activ" BOOLEAN NOT NULL DEFAULT true,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE ("firstname", "lastname", "login", "email")
);
CREATE TABLE "customer" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "tel" BIGINT NOT NULL UNIQUE,
    "type_of_customer" TEXT NOT NULL,
    "cash_or_credit" TEXT,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE (
        "firstname",
        "lastname",
        "tel",
        "cash_or_credit"
    )
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
    UNIQUE ("num", "street", "city", "country", "code")
);
CREATE TABLE "estate" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "date_of_selling" DATE,
    "bio" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'a vendre',
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
);
CREATE TABLE "photo" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "manager_id" INTEGER REFERENCES "manager"("id"),
    "estate_id" INTEGER REFERENCES "estate"("id"),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz,
    UNIQUE(name, estate_id),
    UNIQUE(name, manager_id)
);
-- J'ajoute les colonnes suplémentaires quand toutes mes tables sont disponibles.
ALTER TABLE estate
ADD COLUMN location_id INTEGER REFERENCES "location"("id"),
    ADD COLUMN manager_id INTEGER REFERENCES "manager"("id"),
    ADD COLUMN customer_id INTEGER REFERENCES "customer"("id") ON DELETE CASCADE;
ALTER TABLE customer
ADD COLUMN estate_id INTEGER REFERENCES "estate"("id");
-- Création de plusieurs vues afin de mettre à disposition certaines données.
CREATE VIEW "sellers" AS
SELECT *
FROM "customer"
WHERE "type_of_customer" = 'seller';
CREATE VIEW "renters" AS
SELECT *
FROM "customer"
WHERE "type_of_customer" = 'renter';
CREATE VIEW "buyers" AS
SELECT *
FROM "customer"
WHERE "type_of_customer" = 'buyer';
CREATE VIEW "renter_clients" AS
SELECT *
FROM "customer"
WHERE "type_of_customer" = 'renterclient';
COMMIT;