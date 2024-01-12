import React from 'react';

const Loader: React.FC<any> = () => (
      <div className="loading-container">
        <span
          className="spinner-grow spinner-grow-sm"
          aria-hidden="true"
        ></span>
      </div>);

export default Loader;
