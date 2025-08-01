import React from 'react';

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-spinner">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="text-muted">{message}</h5>
      </div>
    </div>
  );
};

export default Loading;
