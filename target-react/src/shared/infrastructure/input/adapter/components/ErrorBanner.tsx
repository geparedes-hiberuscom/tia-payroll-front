import React from 'react';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry }) => {
  return (
    <div style={{ padding: '1rem', background: '#fee', border: '1px solid #c00', borderRadius: 8 }}>
      <p style={{ color: '#c00', margin: 0 }}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: '0.5rem' }}>Reintentar</button>
      )}
    </div>
  );
};
