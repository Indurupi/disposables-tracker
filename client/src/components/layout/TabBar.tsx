import React from 'react';
import { HomeIcon, CheckSquareIcon, PieChartIcon, UserIcon } from '@/icons/TabIcons';

type TabBarProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-bar bg-white border-t border-neutral-light flex items-center justify-around">
      <button 
        className={`tab-button flex flex-col items-center justify-center pt-2 w-full ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <HomeIcon isActive={activeTab === 'home'} />
        <span className={`text-xs mt-1 ${activeTab === 'home' ? 'text-primary' : 'text-neutral-medium'}`}>Home</span>
      </button>
      
      <button 
        className={`tab-button flex flex-col items-center justify-center pt-2 w-full ${activeTab === 'list' ? 'active' : ''}`}
        onClick={() => onTabChange('list')}
      >
        <CheckSquareIcon isActive={activeTab === 'list'} />
        <span className={`text-xs mt-1 ${activeTab === 'list' ? 'text-primary' : 'text-neutral-medium'}`}>List</span>
      </button>
      
      <div className="w-full"></div> {/* Spacer for camera button */}
      
      <button 
        className={`tab-button flex flex-col items-center justify-center pt-2 w-full ${activeTab === 'stats' ? 'active' : ''}`}
        onClick={() => onTabChange('stats')}
      >
        <PieChartIcon isActive={activeTab === 'stats'} />
        <span className={`text-xs mt-1 ${activeTab === 'stats' ? 'text-primary' : 'text-neutral-medium'}`}>Stats</span>
      </button>
      
      <button 
        className={`tab-button flex flex-col items-center justify-center pt-2 w-full ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => onTabChange('profile')}
      >
        <UserIcon isActive={activeTab === 'profile'} />
        <span className={`text-xs mt-1 ${activeTab === 'profile' ? 'text-primary' : 'text-neutral-medium'}`}>Profile</span>
      </button>
    </div>
  );
};

export default TabBar;
