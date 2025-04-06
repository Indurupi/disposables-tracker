import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

type CameraProps = {
  onCapture: (imageSrc: string) => void;
  onClose?: () => void;
};

const Camera: React.FC<CameraProps> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');

  // Toggle flash mode
  const toggleFlash = () => {
    setFlashMode(prev => prev === 'off' ? 'on' : 'off');
  };

  // Handle camera ready state
  const handleUserMedia = () => {
    setIsCameraReady(true);
  };

  // Handle camera errors
  const handleCameraError = (error: string | DOMException) => {
    console.error('Camera error:', error);
    alert('Unable to access the camera. Please make sure you have given permission to access the camera and try again.');
  };

  // Capture the current frame
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      }
    }
  }, [onCapture]);

  return (
    <div className="relative h-full bg-neutral-dark flex flex-col">
      {/* Camera preview area */}
      <div className="flex-1 relative flex items-center justify-center">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: 'environment',
          }}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleCameraError}
          className="absolute inset-0 w-full h-full object-cover"
          mirrored={false}
        />
        
        {/* Camera controls overlay */}
        <div className="absolute top-4 right-4 flex space-x-4">
          <button 
            className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white"
            onClick={toggleFlash}
          >
            <span className="material-icons">
              {flashMode === 'off' ? 'flash_off' : 'flash_on'}
            </span>
          </button>
          {onClose && (
            <button 
              className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white"
              onClick={onClose}
            >
              <span className="material-icons">close</span>
            </button>
          )}
        </div>
        
        {/* Camera guidance box */}
        <div className="w-64 h-64 border-2 border-white border-opacity-70 rounded-lg">
          <div className="w-full h-full flex items-center justify-center text-white text-opacity-70">
            <span>Center the disposable item</span>
          </div>
        </div>
      </div>
      
      {/* Camera controls */}
      <div className="h-24 bg-black flex items-center justify-center">
        <button 
          className="w-16 h-16 rounded-full bg-white capture-button"
          onClick={capture}
          disabled={!isCameraReady}
        >
          {/* Empty, styling in CSS */}
        </button>
      </div>
    </div>
  );
};

export default Camera;
