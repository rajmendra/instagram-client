import React from 'react';

interface ButtonProps {
  is_saving: boolean;
  text: string;
  saving_text?: string;
}
const Button: React.FC<ButtonProps> = ({
  is_saving,
  text,
  saving_text = 'Loading...',
}) => (
  <button>
    {is_saving ? (
      <div className="loading-container">
        <span
          className="spinner-grow spinner-grow-sm"
          aria-hidden="true"
        ></span>
        <span role="status">{saving_text}</span>
      </div>
    ) : (
      <span>{text}</span>
    )}
  </button>
);

export default Button;
