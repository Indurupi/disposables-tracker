import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAlternativesForItem } from '@/lib/disposablesData';
import { useToast } from '@/hooks/use-toast';

type ResultsScreenProps = {
  item: any;
  onAddItem: () => void;
  onReset: () => void;
  onBack: () => void;
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  item, 
  onAddItem, 
  onReset, 
  onBack 
}) => {
  const { toast } = useToast();
  
  // If no item is provided, show a placeholder
  if (!item) {
    return (
      <div className="screen-content flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-lg font-medium mb-4">No item identified</p>
          <Button onClick={onReset}>Try Again</Button>
        </div>
      </div>
    );
  }
  
  // Mutation for adding the item to the list
  const addItemMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/items', {
        name: item.name,
        category: item.category,
        imageUrl: item.imageUrl,
        userId: 1 // Default user ID
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/items/recent'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({
        title: "Item Added",
        description: `${item.name} has been added to your list.`,
      });
      onAddItem();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive"
      });
      console.error("Failed to add item:", error);
    }
  });
  
  // Handle add item button click
  const handleAddItem = () => {
    addItemMutation.mutate();
  };
  
  // Get alternatives for this item
  const alternatives = getAlternativesForItem(item.name);
  
  return (
    <div className="screen-content">
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <button className="text-secondary" onClick={onBack}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h1 className="text-xl font-semibold">Item Identified</h1>
        <div className="w-6"></div> {/* Spacer */}
      </header>
      
      <div className="p-4">
        <Card className="p-4 mb-4">
          <h2 className="text-lg font-medium mb-3 text-center">{item.name}</h2>
          <div className="flex justify-center mb-4">
            <div className="w-48 h-48 bg-neutral-light rounded-lg overflow-hidden">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary bg-opacity-10">
                  <span className="material-icons text-4xl text-secondary">photo</span>
                </div>
              )}
            </div>
          </div>
          
          {item.nonBiodegradable && (
            <div className="text-center mb-5">
              <div className="flex justify-center items-center mb-2">
                <span className="material-icons text-destructive mr-1">warning</span>
                <span className="font-medium">Non-biodegradable</span>
              </div>
              <p className="text-sm text-neutral-medium">
                Most {item.name.toLowerCase()}s take up to {item.decompositionTime} to decompose.
              </p>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="material-icons text-primary mr-2">category</span>
              <span className="font-medium">Category:</span>
              <span className="ml-2">{item.category}</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-primary mr-2">countertops</span>
              <span className="font-medium">Your usage:</span>
              <span className="ml-2">{item.usageCount} this month</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 mb-4">
          <h3 className="font-medium mb-3">Alternatives to Consider</h3>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {alternatives.map((alt, index) => (
              <div key={index} className="flex-shrink-0 w-36">
                <div className="h-24 bg-neutral-light rounded-lg overflow-hidden mb-2">
                  <img 
                    src={alt.imageUrl} 
                    alt={alt.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium">{alt.name}</p>
                <p className="text-xs text-neutral-medium">{alt.description}</p>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="flex space-x-3">
          <Button 
            className="flex-1 py-3 bg-primary text-white font-medium text-center shadow-sm"
            onClick={handleAddItem}
            disabled={addItemMutation.isPending}
          >
            {addItemMutation.isPending ? "Adding..." : "Add to My List"}
          </Button>
          <Button 
            variant="outline" 
            className="py-3 px-4 bg-white text-secondary font-medium shadow-sm"
            onClick={onReset}
          >
            <span className="material-icons">restart_alt</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
