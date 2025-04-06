import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { DisposableItem } from '@/lib/disposablesData';

export function useDisposablesData() {
  // Get all disposable items
  const { 
    data: items = [], 
    isLoading: isItemsLoading,
    isError: isItemsError
  } = useQuery<DisposableItem[]>({
    queryKey: ['/api/items'],
  });
  
  // Get recent disposable items
  const { 
    data: recentItems = [], 
    isLoading: isRecentLoading,
    isError: isRecentError
  } = useQuery<DisposableItem[]>({
    queryKey: ['/api/items/recent'],
  });
  
  // Get stats data
  const { 
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError
  } = useQuery({
    queryKey: ['/api/stats'],
  });
  
  // Add a new disposable item
  const addItemMutation = useMutation({
    mutationFn: async (newItem: Omit<DisposableItem, 'id' | 'dateAdded'>) => {
      return apiRequest('POST', '/api/items', newItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/items/recent'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  });
  
  // Update an existing disposable item
  const updateItemMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: number, [key: string]: any }) => {
      return apiRequest('PATCH', `/api/items/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/items/recent'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  });
  
  // Delete a disposable item
  const deleteItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/items/recent'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  });
  
  return {
    items,
    recentItems,
    stats,
    isLoading: isItemsLoading || isRecentLoading || isStatsLoading,
    isError: isItemsError || isRecentError || isStatsError,
    addItem: addItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
    isAdding: addItemMutation.isPending,
    isUpdating: updateItemMutation.isPending,
    isDeleting: deleteItemMutation.isPending
  };
}
