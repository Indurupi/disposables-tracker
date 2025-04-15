import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { disposableCategories } from '@/lib/disposablesData';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { formatDate } from '@/lib/disposablesData';
import AddItemForm from '@/components/forms/AddItemForm';

const ListScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  
  // Define item type
  type Item = {
    id: number;
    name: string;
    category: string;
    imageUrl?: string;
    dateAdded?: string;
    count?: number;
  };

  // Fetch all items or filtered by category
  const { data: items = [] as Item[], isLoading } = useQuery<Item[]>({
    queryKey: [selectedCategory ? `/api/items/category/${selectedCategory}` : '/api/items'],
    staleTime: 30000, // 30 seconds
  });
  
  // Mutation for incrementing item count (simulated)
  const incrementMutation = useMutation({
    mutationFn: async (itemId: number) => {
      return apiRequest('PATCH', `/api/items/${itemId}`, { count: 'increment' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  });
  
  // Mutation for decrementing item count (simulated)
  const decrementMutation = useMutation({
    mutationFn: async (itemId: number) => {
      return apiRequest('PATCH', `/api/items/${itemId}`, { count: 'decrement' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  });
  
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  const handleIncrement = (itemId: number) => {
    incrementMutation.mutate(itemId);
  };
  
  const handleDecrement = (itemId: number) => {
    decrementMutation.mutate(itemId);
  };
  
  return (
    <div className="screen-content">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Checklist</h1>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-secondary"
            onClick={() => setIsAddItemOpen(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <button className="text-secondary">
            <span className="material-icons">filter_list</span>
          </button>
        </div>
      </header>
      
      {/* Add Item Form */}
      <AddItemForm 
        open={isAddItemOpen} 
        onOpenChange={setIsAddItemOpen} 
        onSuccess={() => {
          // Refresh queries when an item is added
          queryClient.invalidateQueries({ queryKey: ['/api/items'] });
          queryClient.invalidateQueries({ queryKey: [selectedCategory ? `/api/items/category/${selectedCategory}` : '/api/items'] });
        }}
      />
      
      {/* Category filters */}
      <div className="px-4 py-3 bg-white border-b border-neutral-light overflow-x-auto whitespace-nowrap">
        <div className="inline-flex space-x-2">
          <button 
            className={`px-4 py-1.5 rounded-full ${!selectedCategory ? 'bg-secondary text-white' : 'bg-neutral-light text-neutral-dark'} text-sm`}
            onClick={() => handleCategoryChange(null)}
          >
            All
          </button>
          
          {disposableCategories.map((category) => (
            <button 
              key={category}
              className={`px-4 py-1.5 rounded-full ${selectedCategory === category ? 'bg-secondary text-white' : 'bg-neutral-light text-neutral-dark'} text-sm`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Items list */}
      <div className="p-4 space-y-3">
        {isLoading ? (
          // Loading skeletons
          Array(3).fill(0).map((_, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-lg mr-3" />
                  <div>
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16 rounded" />
              </div>
            </Card>
          ))
        ) : items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-medium">No items found</p>
            <p className="text-sm text-neutral-medium mt-2">
              Take a picture of a disposable item or click the + button to add items to your list
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddItemOpen(true)}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item Manually
            </Button>
          </div>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neutral-light rounded-lg overflow-hidden mr-3">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary bg-opacity-10">
                        <span className="material-icons text-secondary">photo</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center">
                      <span className="text-xs bg-neutral-light text-neutral-medium px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      {item.dateAdded && (
                        <span className="text-xs text-neutral-medium ml-2">
                          {formatDate(item.dateAdded)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-medium mr-2">{item.count || 1}</span>
                  <div className="flex flex-col">
                    <button 
                      className="text-secondary p-1" 
                      onClick={() => handleIncrement(item.id)}
                      disabled={incrementMutation.isPending}
                    >
                      <span className="material-icons text-sm">add</span>
                    </button>
                    <button 
                      className="text-neutral-medium p-1" 
                      onClick={() => handleDecrement(item.id)}
                      disabled={decrementMutation.isPending || (item.count || 1) <= 1}
                    >
                      <span className="material-icons text-sm">remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ListScreen;
