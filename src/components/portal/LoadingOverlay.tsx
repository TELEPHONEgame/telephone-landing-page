import React from 'react';

type LoadingOverlayProps = {
  isLoading: boolean;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        color: '#fff',
        fontSize: '24px',
      }}
    >
      Loading...
    </div>
  );
};

export default LoadingOverlay;
