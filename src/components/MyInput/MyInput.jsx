import React from 'react';
import './style.scss';

export const MyInput = ({
  legend,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <fieldset className='table-fieldset'>
      <legend>{legend}</legend>
      <input
        onChange={onChange}
        className='table__input'
        value={value}
        placeholder={placeholder}
      />
    </fieldset>
  );
};