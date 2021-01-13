import React from 'react';
import './FormInput.styles.css';

const FormInput = ({ handleChange, handleBlur, ...otherProps }) => (
    <input
        className='custom--input'
        onChange={handleChange}
        onBlur={handleBlur}
        {...otherProps}
    />
);

export default FormInput;