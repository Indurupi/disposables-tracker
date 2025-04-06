import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const disposableItems = pgTable("disposable_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  userId: integer("user_id").notNull().references(() => users.id),
  dateAdded: timestamp("date_added").notNull().defaultNow(),
});

export const disposableItemCategories = [
  "Drink",
  "Food",
  "Shopping",
  "Others"
] as const;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDisposableItemSchema = createInsertSchema(disposableItems).omit({
  id: true,
  dateAdded: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDisposableItem = z.infer<typeof insertDisposableItemSchema>;
export type DisposableItem = typeof disposableItems.$inferSelect;

export type DisposableItemCategory = typeof disposableItemCategories[number];

// Track item counts by category for statistics
export interface DisposableItemStats {
  weeklyTotal: number;
  monthlyTotal: number;
  allTimeTotal: number;
  byCategory: Record<DisposableItemCategory, number>;
}
