import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const conversationsTable = pgTable('conversations_table', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: uuid('userId')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export const messagesTable = pgTable('messages_table', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  content: text('content'),
  role: text('role').$type<'user' | 'assistant'>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  conversationId: uuid('conversationId')
    .references(() => conversationsTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  conversations: many(conversationsTable),
}));

export const conversationRelations = relations(
  conversationsTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [conversationsTable.userId],
      references: [usersTable.id],
    }),
    messages: many(messagesTable),
  })
);

export const messageRelations = relations(messagesTable, ({ one }) => ({
  conversation: one(conversationsTable, {
    fields: [messagesTable.id],
    references: [conversationsTable.id],
  }),
}));

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
