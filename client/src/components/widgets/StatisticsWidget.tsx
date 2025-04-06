import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type StatisticsWidgetProps = {
  isLoading: boolean;
  stats: {
    weeklyTotal: number;
    monthlyTotal: number;
    allTimeTotal: number;
    weeklyData?: number[];
  };
};

const StatisticsWidget: React.FC<StatisticsWidgetProps> = ({ isLoading, stats }) => {
  // Default weekly data if not provided
  const weeklyData = stats.weeklyData || [40, 25, 60, 35, 45, 70, 55];
  
  // Days of the week for the chart
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <section className="p-4">
      <h2 className="text-lg font-medium mb-3">Your Impact</h2>
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          {isLoading ? (
            // Loading state skeletons
            <>
              <div className="text-center">
                <Skeleton className="h-8 w-12 mb-1 mx-auto" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="text-center">
                <Skeleton className="h-8 w-12 mb-1 mx-auto" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="text-center">
                <Skeleton className="h-8 w-12 mb-1 mx-auto" />
                <Skeleton className="h-4 w-20" />
              </div>
            </>
          ) : (
            // Data display
            <>
              <div className="text-center">
                <p className="text-2xl font-semibold text-primary">{stats.weeklyTotal}</p>
                <p className="text-xs text-neutral-medium">This Week</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-secondary">{stats.monthlyTotal}</p>
                <p className="text-xs text-neutral-medium">This Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-destructive">{stats.allTimeTotal}</p>
                <p className="text-xs text-neutral-medium">All Time</p>
              </div>
            </>
          )}
        </div>
        {isLoading ? (
          <Skeleton className="h-16 w-full rounded-lg" />
        ) : (
          <>
            <div className="h-16 bg-neutral-light rounded-lg overflow-hidden relative" aria-label="Usage trend chart">
              {/* Simplified chart visualization */}
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                {weeklyData.map((height, index) => (
                  <div key={index} className="flex-1 flex items-end justify-center">
                    <div 
                      className="w-4 bg-primary rounded-t-sm" 
                      style={{ height: `${Math.min(Math.max(height, 10), 90)}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-neutral-medium">
              {daysOfWeek.map((day, index) => (
                <span key={index}>{day}</span>
              ))}
            </div>
          </>
        )}
      </Card>
    </section>
  );
};

export default StatisticsWidget;
