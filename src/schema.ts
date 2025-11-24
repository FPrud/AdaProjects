import {
    pgTable,
    serial,
    text,
    date,
    integer,
    timestamp,
    primaryKey,
} from 'drizzle-orm/pg-core';
import { InferInsertModel } from 'drizzle-orm';


// 1. Table Categories
export const categories = pgTable('categories', {
    id: serial('id').notNull(),
    name: text('name').notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.id] }),
}));

// 2. Table Promotions
export const promotions = pgTable('promotions', {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    startingYear: date('starting_year', { mode: 'string' }).notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.id] }),
}));

// 3. Table Project Details
export const projectDetails = pgTable('project_details', {
    id: serial('id').notNull(),
    title: text('title').notNull(),
    slugPath: text('slug_path').notNull(),
    pictureUrl: text('picture_url').notNull(),
    repositoryUrl: text('repository_url').notNull(),
    demoUrl: text('demo_url').notNull(),
    creationDate: date('creation_date', { mode: 'string' }).notNull(),
    publicationDate: timestamp('publication_date', { precision: 0, withTimezone: false }).notNull(),
    promotionId: integer('promotion_id')
        .references(() => promotions.id)
        .notNull(),
    categoryId: integer('category_id')
        .references(() => categories.id)
        .notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.id] }),
}));

export type InsertCategory = InferInsertModel<typeof categories>;
export type InsertPromotion = InferInsertModel<typeof promotions>;
export type InsertProjectDetail = InferInsertModel<typeof projectDetails>;