import { useState } from 'react';

type TabId = 'home' | 'list' | 'camera' | 'stats' | 'profile' | 'results';

export function useTabNavigation(defaultTab: TabId = 'home') {
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab);
  
  const navigateToTab = (tabId: TabId) => {
    setActiveTab(tabId);
  };
  
  return {
    activeTab,
    navigateToTab
  };
}
