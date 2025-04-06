import React from 'react';

type CameraFabProps = {
  onClick: () => void;
};

const CameraFab: React.FC<CameraFabProps> = ({ onClick }) => {
  return (
    <button 
      className="absolute bottom-24 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-10"
      onClick={onClick}
      aria-label="Take a picture"
    >
      <span className="material-icons">photo_camera</span>
    </button>
  );
};

export default CameraFab;
