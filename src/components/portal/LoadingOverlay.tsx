import React from "react";

type LoadingOverlayProps = {
  readonly isLoading: boolean;
  readonly message?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, message }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        color: "#fff",
        fontSize: "24px",
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? undefined : "none",
        transition: "opacity 200ms",
      }}
    >
      {message ?? "Loading..."}
    </div>
  );
};

export default LoadingOverlay;
