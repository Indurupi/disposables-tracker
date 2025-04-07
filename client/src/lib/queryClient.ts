import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { 
  getMockItems, 
  getMockRecentItems, 
  getMockItemsByCategory, 
  getMockItemById, 
  getMockStats,
  isClientOnlyMode
} from "./mockApi";

// Check if we're in client-only mode (running locally)
const clientOnly = isClientOnlyMode();

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // If in client-only mode, simulate a successful response
  if (clientOnly) {
    // Create a mock response
    const mockResponse = new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
    // Give a bit of delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockResponse;
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // If in client-only mode (running locally), use mock data
    if (clientOnly) {
      const path = queryKey[0] as string;
      
      // Match the API endpoint and return appropriate mock data
      if (path === '/api/items') {
        return await getMockItems();
      }
      if (path === '/api/items/recent') {
        return await getMockRecentItems();
      }
      if (path.startsWith('/api/items/category/')) {
        const category = path.split('/').pop();
        return await getMockItemsByCategory(category || '');
      }
      if (path.startsWith('/api/items/') && !path.includes('category')) {
        const id = parseInt(path.split('/').pop() || '0');
        return await getMockItemById(id);
      }
      if (path === '/api/stats') {
        return await getMockStats();
      }
      
      // Default fallback
      return [];
    }

    // Normal API fetch for production
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
