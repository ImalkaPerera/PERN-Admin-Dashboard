import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  make:varchar("make",{length:100}).notNull(),
  model:varchar("model",{length:100}).notNull(),
  year:integer("year").notNull(),
  price:integer("price").notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});