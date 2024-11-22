import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: databaseUrl,
          ssl: true,
        });
        return drizzle(pool, {
          schema,
        }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}

/*
https://github.com/vahid-nejad/Drizzle-ORM-NestJS/blob/master/src/post/post.service.ts
https://www.youtube.com/watch?v=vLze97zZKsU
https://dev.to/franciscomendes10866/getting-started-with-drizzle-orm-a-beginners-tutorial-4782


CREATE SEQUENCE IF NOT EXISTS customers_id_seq;
CREATE TABLE IF NOT EXISTS customers (
  id integer NOT NULL PRIMARY KEY DEFAULT nextval('customers_id_seq'),
  names varchar,
  firstSurname varchar,
  secondSurname varchar,
  documentType char,
  documentNumber varchar,
  email varchar,
  mobile varchar,
  phoneNumber varchar,
  address varchar,
  createdAt timestamp with time zone,
  updatedAt timestamp with time zone
);

CREATE SEQUENCE IF NOT EXISTS products_id_seq;
CREATE TABLE IF NOT EXISTS products (
  id integer NOT NULL PRIMARY KEY DEFAULT nextval('products_id_seq'),
  name varchar,
  description varchar,
  purchasePrice decimal,
  sellingPrice decimal,
  image varchar,
  active boolean
);

CREATE SEQUENCE IF NOT EXISTS profiles_id_seq;
CREATE TABLE IF NOT EXISTS profiles (
  id integer NOT NULL PRIMARY KEY DEFAULT nextval('profiles_id_seq'),
  name varchar,
  metadata jsonb
);

CREATE TABLE IF NOT EXISTS quotationDetail (
  id serial NOT NULL PRIMARY KEY,
  quotationId integer,
  productId integer,
  quantity integer,
  price decimal,
  total decimal
);

CREATE SEQUENCE IF NOT EXISTS quotations_id_seq;
CREATE TABLE IF NOT EXISTS quotations (
  id integer NOT NULL PRIMARY KEY DEFAULT nextval('quotations_id_seq'),
  customerId integer,
  userId integer,
  date timestamp with time zone,
  totalPrice decimal,
  expirationDate timestamp
);

CREATE SEQUENCE IF NOT EXISTS users_id_seq;
CREATE TABLE IF NOT EXISTS users (
  id integer NOT NULL PRIMARY KEY DEFAULT nextval('users_id_seq'),
  names varchar,
  firstSurname varchar,
  secondSurname varchar,
  email varchar,
  address varchar,
  birthDate timestamp without time zone,
  gender char,
  countryCode varchar,
  mobilePhoneNumber varchar,
  profileId integer,
  status integer,
  createdAt timestamp with time zone,
  updatedAt timestamp with time zone
);

ALTER TABLE customers ADD CONSTRAINT customers_id_fk FOREIGN KEY (id) REFERENCES quotations (customerId);
ALTER TABLE products ADD CONSTRAINT products_id_fk FOREIGN KEY (id) REFERENCES quotationDetail (productId);
ALTER TABLE profiles ADD CONSTRAINT profile_id_fk FOREIGN KEY (id) REFERENCES users (profileId);
ALTER TABLE quotations ADD CONSTRAINT quotations_id_fk FOREIGN KEY (id) REFERENCES quotationDetail (quotationId);
ALTER TABLE users ADD CONSTRAINT users_id_fk FOREIGN KEY (id) REFERENCES quotations (userId);
*/
