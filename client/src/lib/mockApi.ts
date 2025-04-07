// This file provides mock data for local development when running in client-only mode

import { DisposableItem, DisposableItemDetail, UserStats, disposableCategories } from './disposablesData';

// Sample mock data
const mockItems: DisposableItem[] = [
  {
    id: 1,
    name: "Coffee Cup",
    category: "Drink",
    imageUrl: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600&auto=format&fit=crop",
    dateAdded: new Date(2023, 3, 15).toISOString(),
  },
  {
    id: 2,
    name: "Plastic Bag",
    category: "Shopping",
    imageUrl: "https://images.unsplash.com/photo-1593355349258-5738f1a12755?w=600&auto=format&fit=crop",
    dateAdded: new Date(2023, 3, 16).toISOString(),
  },
  {
    id: 3,
    name: "Food Container",
    category: "Food",
    imageUrl: "https://images.unsplash.com/photo-1545211801-7e7f6e10460d?w=600&auto=format&fit=crop",
    dateAdded: new Date(2023, 3, 17).toISOString(),
  },
  {
    id: 4,
    name: "Plastic Cutlery",
    category: "Food",
    imageUrl: "https://images.unsplash.com/photo-1630027426604-a302b4696566?w=600&auto=format&fit=crop",
    dateAdded: new Date(2023, 3, 18).toISOString(),
  },
  {
    id: 5,
    name: "Water Bottle",
    category: "Drink",
    imageUrl: "https://images.unsplash.com/photo-1604099705232-71c34181dd67?w=600&auto=format&fit=crop",
    dateAdded: new Date(2023, 3, 19).toISOString(),
  }
];

const mockItemDetails: Record<number, DisposableItemDetail> = {
  1: {
    ...mockItems[0],
    nonBiodegradable: true,
    decompositionTime: "30 years",
    usageCount: 15
  },
  2: {
    ...mockItems[1],
    nonBiodegradable: true,
    decompositionTime: "20-1000 years",
    usageCount: 8
  },
  3: {
    ...mockItems[2],
    nonBiodegradable: true,
    decompositionTime: "50-80 years",
    usageCount: 12
  },
  4: {
    ...mockItems[3],
    nonBiodegradable: true,
    decompositionTime: "450 years",
    usageCount: 20
  },
  5: {
    ...mockItems[4],
    nonBiodegradable: true,
    decompositionTime: "450 years",
    usageCount: 25
  }
};

const mockStats: UserStats = {
  weeklyTotal: 8,
  monthlyTotal: 35,
  allTimeTotal: 120,
  weeklyData: [2, 1, 3, 0, 2, 0, 0]
};

// Mock API functions
export async function getMockItems(): Promise<DisposableItem[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockItems];
}

export async function getMockRecentItems(limit: number = 3): Promise<DisposableItem[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockItems].sort((a, b) => 
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  ).slice(0, limit);
}

export async function getMockItemsByCategory(category: string): Promise<DisposableItem[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockItems.filter(item => item.category === category);
}

export async function getMockItemById(id: number): Promise<DisposableItemDetail | undefined> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockItemDetails[id];
}

export async function getMockStats(): Promise<UserStats> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {...mockStats};
}

// Helper to determine if we're in client-only mode
// This is set by the define option in the Vite config
export const isClientOnlyMode = () => {
  // When running locally, this will determine we're in client-only mode
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return true;
  }
  
  // On Replit, we're not in client-only mode
  return false;
}