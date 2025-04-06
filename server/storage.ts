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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private disposableItems: Map<number, DisposableItem>;
  private currentUserId: number;
  private currentItemId: number;
  
  constructor() {
    this.users = new Map();
    this.disposableItems = new Map();
    this.currentUserId = 1;
    this.currentItemId = 1;
    
    // Add default user for testing
    this.createUser({
      username: "testuser",
      password: "password"
    });
    
    // Add some sample items
    const sampleItems = [
      { name: "Plastic Cup", category: "Drink", imageUrl: "", userId: 1 },
      { name: "Plastic Bag", category: "Shopping", imageUrl: "", userId: 1 },
      { name: "Plastic Straw", category: "Drink", imageUrl: "", userId: 1 },
      { name: "Food Container", category: "Food", imageUrl: "", userId: 1 }
    ];
    
    sampleItems.forEach(item => this.createDisposableItem(item));
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Disposable item operations
  async getDisposableItems(userId: number): Promise<DisposableItem[]> {
    return Array.from(this.disposableItems.values()).filter(
      (item) => item.userId === userId
    );
  }
  
  async getDisposableItemsByCategory(userId: number, category: string): Promise<DisposableItem[]> {
    return Array.from(this.disposableItems.values()).filter(
      (item) => item.userId === userId && item.category === category
    );
  }
  
  async getRecentDisposableItems(userId: number, limit: number): Promise<DisposableItem[]> {
    return Array.from(this.disposableItems.values())
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, limit);
  }
  
  async getDisposableItem(id: number): Promise<DisposableItem | undefined> {
    return this.disposableItems.get(id);
  }
  
  async createDisposableItem(insertItem: InsertDisposableItem): Promise<DisposableItem> {
    const id = this.currentItemId++;
    const item: DisposableItem = { 
      ...insertItem, 
      id, 
      dateAdded: new Date() 
    };
    this.disposableItems.set(id, item);
    return item;
  }
  
  async updateDisposableItem(id: number, updatedFields: Partial<InsertDisposableItem>): Promise<DisposableItem | undefined> {
    const existingItem = this.disposableItems.get(id);
    if (!existingItem) return undefined;
    
    const updatedItem = { ...existingItem, ...updatedFields };
    this.disposableItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async deleteDisposableItem(id: number): Promise<boolean> {
    return this.disposableItems.delete(id);
  }
  
  // Stats operations
  async getDisposableItemStats(userId: number): Promise<DisposableItemStats> {
    const items = await this.getDisposableItems(userId);
    const now = new Date();
    
    // Get items from the last week
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyItems = items.filter(item => new Date(item.dateAdded) >= weekAgo);
    
    // Get items from the last month
    const monthAgo = new Date(now);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const monthlyItems = items.filter(item => new Date(item.dateAdded) >= monthAgo);
    
    // Initialize the stats by category
    const byCategory: Partial<Record<string, number>> = {};
    disposableItemCategories.forEach(category => {
      byCategory[category] = items.filter(item => item.category === category).length;
    });
    
    return {
      weeklyTotal: weeklyItems.length,
      monthlyTotal: monthlyItems.length,
      allTimeTotal: items.length,
      byCategory: byCategory as Record<typeof disposableItemCategories[number], number>
    };
  }
}

export const storage = new MemStorage();
