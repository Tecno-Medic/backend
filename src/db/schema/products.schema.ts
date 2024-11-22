import { pgTable, serial, text, boolean, decimal } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  purchase_price: decimal('purchase_price').notNull(),
  selling_price: decimal('selling_price').notNull(),
  imageUrl: text('image_url').notNull(),
  active: boolean('active').notNull(),
});
