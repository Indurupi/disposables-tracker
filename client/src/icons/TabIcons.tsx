import React from 'react';

// Base icon props type
type IconProps = {
  isActive: boolean;
};

// Home tab icon
export const HomeIcon: React.FC<IconProps> = ({ isActive }) => {
  return (
    <span className={`material-icons ${isActive ? 'text-primary' : 'text-neutral-medium'}`}>
      home
    </span>
  );
};

// List tab icon (checklist)
export const CheckSquareIcon: React.FC<IconProps> = ({ isActive }) => {
  return (
    <span className={`material-icons ${isActive ? 'text-primary' : 'text-neutral-medium'}`}>
      checklist
    </span>
  );
};

// Stats tab icon (pie chart)
export const PieChartIcon: React.FC<IconProps> = ({ isActive }) => {
  return (
    <span className={`material-icons ${isActive ? 'text-primary' : 'text-neutral-medium'}`}>
      insights
    </span>
  );
};

// Profile tab icon (user)
export const UserIcon: React.FC<IconProps> = ({ isActive }) => {
  return (
    <span className={`material-icons ${isActive ? 'text-primary' : 'text-neutral-medium'}`}>
      person
    </span>
  );
};

// Camera icon for the floating action button
export const CameraIcon: React.FC = () => {
  return (
    <span className="material-icons">photo_camera</span>
  );
};
