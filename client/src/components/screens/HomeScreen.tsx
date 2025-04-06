import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StatisticsWidget from '@/components/widgets/StatisticsWidget';
import RecentItemsList from '@/components/widgets/RecentItemsList';
import TipsSection from '@/components/widgets/TipsSection';

type HomeScreenProps = {
  onViewAll: () => void;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onViewAll }) => {
  // Fetch stats data
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/stats'],
    staleTime: 60000, // 1 minute
  });

  // Fetch recent items
  const { data: recentItems, isLoading: itemsLoading } = useQuery({
    queryKey: ['/api/items/recent'],
    staleTime: 30000, // 30 seconds
  });

  return (
    <div className="screen-content pb-20">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-center">My Disposables</h1>
      </header>
      
      {/* Statistics Section */}
      <StatisticsWidget 
        isLoading={statsLoading} 
        stats={statsData || { weeklyTotal: 0, monthlyTotal: 0, allTimeTotal: 0, weeklyData: [0,0,0,0,0,0,0] }}
      />
      
      {/* Recent Items Section */}
      <RecentItemsList 
        isLoading={itemsLoading} 
        items={recentItems || []} 
        onViewAll={onViewAll} 
      />
      
      {/* Tips Section */}
      <TipsSection />
    </div>
  );
};

export default HomeScreen;
