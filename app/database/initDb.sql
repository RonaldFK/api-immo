BEGIN

DROP TABLE IF EXISTS (MANAGER,APARTMENT,CUSTOMER,PARKING,LOCATION,SELLER,LEASER,RENTER);

CREATE TABLE "manager"(
    "id" INTEGER CREATED BY DEFAULT AS IDENTITDY NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
),
CREATE TABLE "seller" (
    "id" INTEGER CREATED BY DEFAULT AS IDENTITDY NOT NULL,
    "customer_id" REFERENCES "customer"("id")
),
CREATE TABLE "renter" (
    "id" INTEGER CREATED BY DEFAULT AS IDENTITDY NOT NULL,
    "customer_id" REFERENCES "customer"("id")
),
CREATE TABLE "leaser" (
    "id" INTEGER CREATED BY DEFAULT AS IDENTITDY NOT NULL,
    "customer_id" REFERENCES "customer"("id")
),
CREATE TABLE "customer" (
    "id" INTEGER CREATED BY DEFAULT AS IDENTITDY NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "tel" INTEGER NOT NULL,
    "cash_or_credit" TEXT NOT NULL,
    "date_of_selling" DATE,
    "seller_id" REFERENCES "seller"("id"),
    "renter_id" REFERENCES "renter"("id"),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
),
CREATE TABLE "location" (
    "id" INTEGER CREATED BY DEFAULT AS IDENTITDY NOT NULL,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
),
CREATE TABLE "parking" (
    "id" INTEGER CREATED BY DEFAULT AS IDENTITDY NOT NULL,
    "name" TEXT NOT NULL,
    "apartment_id" REFERENCES "apartment"("id"),
    "price" INTEGER NOT NULL,
    "location_id" REFERENCES "location"("id"),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
),
CREATE TABLE "apartment" (
    "id" INTEGER CREATED BY DEFAULT AS IDENTITDY NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "location_id" REFERENCES "location"("id"),
    "parking_id" REFERENCES "parking"("id"),
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz
)


COMMIT;