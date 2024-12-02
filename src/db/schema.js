import { check, varchar, uuid, timestamp, pgTable, integer, primaryKey, boolean } from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    username: varchar({ length: 255 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }),
    created_at: timestamp().notNull().defaultNow()
});

export const plans = pgTable("plans", {
    id: uuid().defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 1023 }),
    user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
    private: boolean("private").default(false),
    created_at: timestamp("created_at").notNull().defaultNow(),
});

export const steps = pgTable("steps", {
    index: integer("index").notNull(),
    plan_id: uuid("plan_id").notNull().references(() => plans.id, { onDelete: 'cascade' }),
    repetition_index: integer("repetition_index"),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 1023 }),
    seconds: integer("seconds").default(0),
    minutes: integer("minutes").default(0),
    hours: integer("hours").default(0),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.plan_id, table.index] }),
    }
});

export const bookmarks = pgTable("bookmarks", {
    user_id: uuid("user_id").notNull().references(() => users.id),
    plan_id: uuid("plan_id").notNull().references(() => plans.id)
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.user_id, table.plan_id] }),
    }
});

export const confirmationCodes = pgTable("confirmation_codes", {
    email: varchar("email", { length: 255 }).notNull().primaryKey(),
    code: varchar("code", { length: 255 }).notNull(),
    expires_at: timestamp("expires_at").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    plans: many(plans),
    bookmarks: many(bookmarks)
}));

export const planRelations = relations(plans, ({ one, many }) => ({
    user: one(users, {
        fields: [plans.user_id],
        references: [users.id]
    }),
    steps: many(steps)
}));

export const stepRelations = relations(steps, ({ one }) => ({
    plan: one(plans, {
        fields: [steps.plan_id],
        references: [plans.id]
    }),
}));

export const bookmarkRelations = relations(bookmarks, ({ many }) => ({
    user: one(users, {
        fields: [bookmarks.user_id],
        references: [users.id]
    }),
    plans: many(plans),
}));
