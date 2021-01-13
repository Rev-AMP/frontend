import React from 'react';
import './Button.styles.css';

const Button = ({buttonType, handleClick, children, ...otherProps}) => (
    <button
        className={`custom--button ${buttonType}`}
        onClick={handleClick}
        {...otherProps}
    >
        {children}
    </button>
);

export default Button;