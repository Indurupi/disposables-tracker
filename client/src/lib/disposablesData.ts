import { DisposableItemCategory } from "@shared/schema";

// Types for frontend data handling
export interface DisposableItem {
  id: number;
  name: string;
  category: DisposableItemCategory;
  imageUrl: string;
  dateAdded: string;
}

export interface DisposableItemDetail extends DisposableItem {
  nonBiodegradable: boolean;
  decompositionTime: string;
  usageCount: number;
}

export interface Alternative {
  name: string;
  imageUrl: string;
  description: string;
}

export interface UserStats {
  weeklyTotal: number;
  monthlyTotal: number;
  allTimeTotal: number;
  weeklyData: number[];
}

export const disposableCategories: DisposableItemCategory[] = [
  "Drink",
  "Food",
  "Shopping",
  "Others"
];

export const defaultTips = [
  {
    title: "Try Reusable Alternatives",
    content: "Bring your own reusable cup next time you get coffee and save 10-12 disposable cups per month."
  },
  {
    title: "Shop With Cloth Bags",
    content: "Using cloth bags instead of plastic can save hundreds of plastic bags per year."
  },
  {
    title: "Choose Paper Over Plastic",
    content: "When given the option, choose paper-based packaging that decomposes faster than plastic."
  }
];

export const defaultAlternatives: Record<string, Alternative[]> = {
  "Plastic Straw": [
    {
      name: "Metal Straw",
      imageUrl: "https://images.unsplash.com/photo-1629187755974-0641029cc2fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWV0YWwlMjBzdHJhd3xlbnwwfHwwfHx8MA%3D%3D",
      description: "Reusable, durable"
    },
    {
      name: "Bamboo Straw",
      imageUrl: "https://images.unsplash.com/photo-1572009084476-912198ab0d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFtYm9vJTIwc3RyYXd8ZW58MHx8MHx8fDA%3D",
      description: "Biodegradable"
    },
    {
      name: "Paper Straw",
      imageUrl: "https://images.unsplash.com/photo-1624923656310-2ea90aef4909?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFwZXIlMjBzdHJhd3xlbnwwfHwwfHx8MA%3D%3D",
      description: "Compostable"
    }
  ],
  "Plastic Cup": [
    {
      name: "Glass Cup",
      imageUrl: "https://images.unsplash.com/photo-1514866747592-c2d279258a78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2xhc3MlMjBjdXB8ZW58MHx8MHx8fDA%3D",
      description: "Reusable, durable"
    },
    {
      name: "Metal Tumbler",
      imageUrl: "https://images.unsplash.com/photo-1575377625484-b4182e345622?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWV0YWwlMjB0dW1ibGVyfGVufDB8fDB8fHww",
      description: "Insulated, reusable"
    },
    {
      name: "Paper Cup",
      imageUrl: "https://images.unsplash.com/photo-1531706039562-7df062605c9a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZXIlMjBjdXB8ZW58MHx8MHx8fDA%3D",
      description: "Biodegradable"
    }
  ],
  "Plastic Bag": [
    {
      name: "Cloth Bag",
      imageUrl: "https://images.unsplash.com/photo-1592205644721-2d0c3a6349e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGglMjBiYWd8ZW58MHx8MHx8fDA%3D",
      description: "Washable, reusable"
    },
    {
      name: "Jute Bag",
      imageUrl: "https://images.unsplash.com/photo-1592390881831-1178f10a61c8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8anV0ZSUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
      description: "Biodegradable, durable"
    },
    {
      name: "Paper Bag",
      imageUrl: "https://images.unsplash.com/photo-1572983423767-fa0ff3d2bf81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZXIlMjBiYWd8ZW58MHx8MHx8fDA%3D",
      description: "Recyclable"
    }
  ]
};

// Get alternatives for an item, with a fallback to default alternatives
export function getAlternativesForItem(itemName: string): Alternative[] {
  if (defaultAlternatives[itemName]) {
    return defaultAlternatives[itemName];
  }
  
  // Return a default set of alternatives if no specific ones exist
  return defaultAlternatives["Plastic Straw"];
}

// Format a date in a human-readable format
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const isToday = dateObj.getDate() === now.getDate() && 
                  dateObj.getMonth() === now.getMonth() && 
                  dateObj.getFullYear() === now.getFullYear();
  
  const isYesterday = dateObj.getDate() === now.getDate() - 1 && 
                      dateObj.getMonth() === now.getMonth() && 
                      dateObj.getFullYear() === now.getFullYear();
  
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const timeString = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  
  if (isToday) {
    return `Today, ${timeString}`;
  } else if (isYesterday) {
    return `Yesterday, ${timeString}`;
  } else {
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }) + `, ${timeString}`;
  }
}
