import React from 'react';
import Camera from '@/components/ui/camera';

type CameraScreenProps = {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
};

const CameraScreen: React.FC<CameraScreenProps> = ({ onCapture, onClose }) => {
  return (
    <div className="screen-content">
      <Camera onCapture={onCapture} onClose={onClose} />
    </div>
  );
};

export default CameraScreen;
