import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', padding = 'px-4 py-2' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${padding} rounded text-white bg-black border border-black hover:bg-white hover:text-black cursor-pointer transition ${className}`}
    >
      {children}
    </button>
  );
};


export default Button;
