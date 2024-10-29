import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('score', {
  id: integer('id').primaryKey(),
  username: text('username').unique(),
  score: integer('score'),
});
