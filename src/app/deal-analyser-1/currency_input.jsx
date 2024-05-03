import React, { useState, useEffect } from 'react';
import InputMask from 'react-text-mask'; 

const CurrencyInput = ({ name, value, onChange, ...otherProps }) => {
  const [formattedValue, setFormattedValue] = useState('');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value || 0);
  };

  useEffect(() => {
    setFormattedValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e) => {
    const { value } = e.target;
    const parsedValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    onChange(name, parsedValue);
  };

  return (
    <InputMask
      name={name}
      mask={['$', numStr => numStr.replace(/\D/g, ''), '.', /\d{2}/]} 
      guide={false}
      value={formattedValue}
      onChange={handleChange}
      {...otherProps}
    />
  );
};

export default CurrencyInput;