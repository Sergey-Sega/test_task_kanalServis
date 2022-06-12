/* eslint-disable array-callback-return */
import React from "react";

export const MySelect = ({options,onChange, defaultValue,value, className, legend}) => {
    return (
        <fieldset className='table-fieldset'>
      <legend>{legend}</legend>
        <select
        className={className}
        value={value}
         onChange={event => onChange(event.target.value)}>
            <option value="default">{defaultValue}</option>
            {options.map(option => 
                 <option key={option.value} value={option.value}>
                    {option.name}
                 </option>
            )}
        </select>
        </fieldset>
    )
}