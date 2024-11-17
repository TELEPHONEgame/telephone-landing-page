import React from 'react';

type LoadingOverlayProps = {
  readonly isLoading: boolean;
  readonly message?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, message }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        display: "flex",
        fontSize: "24px",
        height: "100%",
        justifyContent: "center",
        left: 0,
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? undefined : "none",
        position: "fixed",
        top: 0,
        transition: "opacity 200ms",
        width: "100%",
        zIndex: 1000,
      }}
    >
      {message ?? "Loading..."}
    </div>
  );
};

export default LoadingOverlay;
