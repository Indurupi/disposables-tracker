import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { defaultTips } from '@/lib/disposablesData';

const TipsSection: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const viewMoreTips = () => {
    setCurrentTipIndex((prev) => (prev + 1) % defaultTips.length);
  };
  
  const currentTip = defaultTips[currentTipIndex];
  
  return (
    <section className="px-4 mb-6">
      <h2 className="text-lg font-medium mb-3">Tips to Reduce</h2>
      <Card className="p-4">
        <h3 className="font-medium text-secondary mb-2">{currentTip.title}</h3>
        <p className="text-sm text-neutral-medium mb-3">{currentTip.content}</p>
        <button 
          className="text-secondary text-sm font-medium"
          onClick={viewMoreTips}
        >
          More Tips
        </button>
      </Card>
    </section>
  );
};

export default TipsSection;
