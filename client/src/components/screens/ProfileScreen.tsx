import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileScreen: React.FC = () => {
  // Fetch stats for the profile page
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/stats'],
    staleTime: 60000, // 1 minute
  });
  
  // Placeholder user data (in a real app, this would come from auth state)
  const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    initials: "JS",
    trackingSince: "Oct 2023",
  };
  
  return (
    <div className="screen-content">
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-center">My Profile</h1>
      </header>
      
      <div className="p-4">
        <Card className="p-4 mb-4 flex items-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-semibold">
            {user.initials}
          </div>
          <div className="ml-4">
            <p className="font-medium text-lg">{user.name}</p>
            <p className="text-neutral-medium">{user.email}</p>
          </div>
        </Card>
        
        <Card className="p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">My Impact</h2>
          <div className="space-y-3">
            {statsLoading ? (
              // Loading skeleton
              <>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </>
            ) : (
              // Loaded stats
              <>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="material-icons text-primary mr-2">eco</span>
                    <span>Plastic saved</span>
                  </div>
                  <span className="font-medium">
                    {stats?.allTimeTotal || 0} items
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="material-icons text-primary mr-2">trending_down</span>
                    <span>Reduction rate</span>
                  </div>
                  <span className="font-medium">
                    {stats?.weeklyTotal && stats?.monthlyTotal ? 
                      Math.round((1 - (stats.weeklyTotal / (stats.monthlyTotal / 4))) * 100) + '%' : 
                      '0%'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="material-icons text-primary mr-2">calendar_today</span>
                    <span>Tracking since</span>
                  </div>
                  <span className="font-medium">{user.trackingSince}</span>
                </div>
              </>
            )}
          </div>
        </Card>
        
        <Card className="mb-4 overflow-hidden">
          <button className="w-full py-4 px-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="material-icons text-neutral-medium mr-2">notifications</span>
              <span>Notifications</span>
            </div>
            <span className="material-icons text-neutral-medium">chevron_right</span>
          </button>
          <div className="border-t border-neutral-light"></div>
          <button className="w-full py-4 px-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="material-icons text-neutral-medium mr-2">settings</span>
              <span>Settings</span>
            </div>
            <span className="material-icons text-neutral-medium">chevron_right</span>
          </button>
          <div className="border-t border-neutral-light"></div>
          <button className="w-full py-4 px-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="material-icons text-neutral-medium mr-2">help_outline</span>
              <span>Help & Support</span>
            </div>
            <span className="material-icons text-neutral-medium">chevron_right</span>
          </button>
          <div className="border-t border-neutral-light"></div>
          <button className="w-full py-4 px-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="material-icons text-neutral-medium mr-2">info_outline</span>
              <span>About</span>
            </div>
            <span className="material-icons text-neutral-medium">chevron_right</span>
          </button>
        </Card>
        
        <Button 
          variant="outline" 
          className="w-full py-3 px-4 border border-destructive text-destructive font-medium text-center"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;
