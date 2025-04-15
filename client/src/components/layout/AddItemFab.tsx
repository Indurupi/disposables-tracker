import React from 'react';
import { Plus } from 'lucide-react';

type AddItemFabProps = {
  onClick: () => void;
};

const AddItemFab: React.FC<AddItemFabProps> = ({ onClick }) => {
  return (
    <button 
      className="absolute bottom-[7.5rem] right-6 w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg z-10"
      onClick={onClick}
      aria-label="Add item manually"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default AddItemFab;