BEGIN;

DROP TABLE IF EXISTS "manager","estate","customer","parking","location","seller","leaser","renter";


CREATE TABLE "manager"(
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
);
CREATE TABLE "customer" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "tel" INTEGER NOT NULL,
    "cash_or_credit" TEXT NOT NULL,
    "date_of_selling" DATE,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
);
CREATE TABLE "seller" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "customer_id" INTEGER REFERENCES "customer"("id")
);
CREATE TABLE "renter" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "customer_id" INTEGER REFERENCES "customer"("id")
);
CREATE TABLE "leaser" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "customer_id" INTEGER REFERENCES "customer"("id")
);
CREATE TABLE "location" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
    UNIQUE ("num","street","city","country","code")
);
CREATE TABLE "estate" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
);
CREATE TABLE "parking" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "price" INTEGER NOT NULL,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
);

ALTER TABLE estate
ADD COLUMN location_id INTEGER REFERENCES "location"("id"),
ADD COLUMN parking_id INTEGER REFERENCES "parking"("id");

ALTER TABLE parking
ADD COLUMN location_id INTEGER REFERENCES "location"("id");

COMMIT;
