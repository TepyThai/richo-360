import React from 'react';
import css from './LoadMoreButton.module.css';

function LoadMoreButton({ onClick, children, ...rest }) {
  return (
    <button className={css['load_more']} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default LoadMoreButton;
