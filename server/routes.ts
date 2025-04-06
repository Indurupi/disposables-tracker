import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDisposableItemSchema, 
  disposableItemCategories 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // Get all disposable items
  apiRouter.get("/items", async (req: Request, res: Response) => {
    try {
      // In a real app, userId would come from authenticated session
      const userId = 1; // Default test user
      const items = await storage.getDisposableItems(userId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch items" });
    }
  });
  
  // Get recent disposable items
  apiRouter.get("/items/recent", async (req: Request, res: Response) => {
    try {
      const userId = 1; // Default test user
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const items = await storage.getRecentDisposableItems(userId, limit);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent items" });
    }
  });
  
  // Get items by category
  apiRouter.get("/items/category/:category", async (req: Request, res: Response) => {
    try {
      const userId = 1; // Default test user
      const category = req.params.category;
      
      if (!disposableItemCategories.includes(category as any)) {
        return res.status(400).json({ message: "Invalid category" });
      }
      
      const items = await storage.getDisposableItemsByCategory(userId, category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch items by category" });
    }
  });
  
  // Get a single disposable item
  apiRouter.get("/items/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getDisposableItem(id);
      
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch item" });
    }
  });
  
  // Create a new disposable item
  apiRouter.post("/items", async (req: Request, res: Response) => {
    try {
      const userId = 1; // Default test user
      
      // Validate request body
      const validatedData = insertDisposableItemSchema.parse({
        ...req.body,
        userId
      });
      
      const newItem = await storage.createDisposableItem(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create item" });
    }
  });
  
  // Update a disposable item
  apiRouter.patch("/items/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const existingItem = await storage.getDisposableItem(id);
      
      if (!existingItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      
      // Validate request body
      const validatedData = insertDisposableItemSchema.partial().parse(req.body);
      
      const updatedItem = await storage.updateDisposableItem(id, validatedData);
      res.json(updatedItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update item" });
    }
  });
  
  // Delete a disposable item
  apiRouter.delete("/items/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteDisposableItem(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete item" });
    }
  });
  
  // Get statistics
  apiRouter.get("/stats", async (req: Request, res: Response) => {
    try {
      const userId = 1; // Default test user
      const stats = await storage.getDisposableItemStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });
  
  // Register API routes with /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
