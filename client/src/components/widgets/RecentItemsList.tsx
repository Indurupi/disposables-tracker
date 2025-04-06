import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/disposablesData';

type RecentItemsListProps = {
  isLoading: boolean;
  items: any[];
  onViewAll: () => void;
};

const RecentItemsList: React.FC<RecentItemsListProps> = ({ isLoading, items, onViewAll }) => {
  return (
    <section className="px-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Recent Items</h2>
        <button 
          className="text-secondary text-sm font-medium"
          onClick={onViewAll}
        >
          View All
        </button>
      </div>
      
      <div className="space-y-3">
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
                <Skeleton className="h-6 w-20 rounded" />
              </div>
            </Card>
          ))
        ) : items.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-neutral-medium">No items yet</p>
            <p className="text-sm text-neutral-medium mt-2">
              Take a picture of a disposable item to add it to your list
            </p>
          </Card>
        ) : (
          // Actual items
          items.map((item, index) => (
            <Card key={index} className="p-3">
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
                    <p className="text-xs text-neutral-medium">
                      {item.dateAdded ? formatDate(item.dateAdded) : "Recent"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="material-icons text-primary mr-1">check_circle</span>
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentItemsList;
