import { 
  disposableItems, 
  type DisposableItem, 
  type InsertDisposableItem, 
  users, 
  type User, 
  type InsertUser,
  type DisposableItemStats,
  disposableItemCategories
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, count, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Disposable item operations
  getDisposableItems(userId: number): Promise<DisposableItem[]>;
  getDisposableItemsByCategory(userId: number, category: string): Promise<DisposableItem[]>;
  getRecentDisposableItems(userId: number, limit: number): Promise<DisposableItem[]>;
  getDisposableItem(id: number): Promise<DisposableItem | undefined>;
  createDisposableItem(item: InsertDisposableItem): Promise<DisposableItem>;
  updateDisposableItem(id: number, item: Partial<InsertDisposableItem>): Promise<DisposableItem | undefined>;
  deleteDisposableItem(id: number): Promise<boolean>;
  
  // Stats operations
  getDisposableItemStats(userId: number): Promise<DisposableItemStats>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize DB connection
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Disposable item operations
  async getDisposableItems(userId: number): Promise<DisposableItem[]> {
    return db.select().from(disposableItems).where(eq(disposableItems.userId, userId));
  }
  
  async getDisposableItemsByCategory(userId: number, category: string): Promise<DisposableItem[]> {
    return db.select().from(disposableItems).where(
      and(
        eq(disposableItems.userId, userId),
        eq(disposableItems.category, category)
      )
    );
  }
  
  async getRecentDisposableItems(userId: number, limit: number): Promise<DisposableItem[]> {
    return db.select().from(disposableItems)
      .where(eq(disposableItems.userId, userId))
      .orderBy(desc(disposableItems.dateAdded))
      .limit(limit);
  }
  
  async getDisposableItem(id: number): Promise<DisposableItem | undefined> {
    const [item] = await db.select().from(disposableItems).where(eq(disposableItems.id, id));
    return item;
  }
  
  async createDisposableItem(insertItem: InsertDisposableItem): Promise<DisposableItem> {
    const [item] = await db.insert(disposableItems).values(insertItem).returning();
    return item;
  }
  
  async updateDisposableItem(id: number, updatedFields: Partial<InsertDisposableItem>): Promise<DisposableItem | undefined> {
    const [updatedItem] = await db.update(disposableItems)
      .set(updatedFields)
      .where(eq(disposableItems.id, id))
      .returning();
    return updatedItem;
  }
  
  async deleteDisposableItem(id: number): Promise<boolean> {
    const result = await db.delete(disposableItems)
      .where(eq(disposableItems.id, id))
      .returning({ id: disposableItems.id });
    return result.length > 0;
  }
  
  // Stats operations
  async getDisposableItemStats(userId: number): Promise<DisposableItemStats> {
    // Get all-time total
    const [allTimeResult] = await db.select({ 
      count: count() 
    }).from(disposableItems).where(eq(disposableItems.userId, userId));
    
    const allTimeTotal = Number(allTimeResult?.count || 0);
    
    // Get weekly total (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const [weeklyResult] = await db.select({ 
      count: count() 
    }).from(disposableItems).where(
      and(
        eq(disposableItems.userId, userId),
        sql`${disposableItems.dateAdded} >= ${weekAgo}`
      )
    );
    
    const weeklyTotal = Number(weeklyResult?.count || 0);
    
    // Get monthly total (last 30 days)
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    
    const [monthlyResult] = await db.select({ 
      count: count() 
    }).from(disposableItems).where(
      and(
        eq(disposableItems.userId, userId),
        sql`${disposableItems.dateAdded} >= ${monthAgo}`
      )
    );
    
    const monthlyTotal = Number(monthlyResult?.count || 0);
    
    // Get counts by category
    const byCategory: Record<string, number> = {};
    
    // Initialize all categories with 0 count
    disposableItemCategories.forEach(category => {
      byCategory[category] = 0;
    });
    
    // Get actual counts
    const categoryCounts = await db.select({
      category: disposableItems.category,
      count: count()
    })
    .from(disposableItems)
    .where(eq(disposableItems.userId, userId))
    .groupBy(disposableItems.category);
    
    // Update counts
    categoryCounts.forEach(result => {
      byCategory[result.category] = Number(result.count);
    });
    
    return {
      weeklyTotal,
      monthlyTotal,
      allTimeTotal,
      byCategory: byCategory as Record<typeof disposableItemCategories[number], number>
    };
  }
}

// Initialize with database storage
export const storage = new DatabaseStorage();
