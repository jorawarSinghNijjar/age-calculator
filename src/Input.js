import React, { useState } from "react";

const Input = ({ label, name, id, placeholder, value, onChange, valid, errorMessage }) => {
    // console.log(label,valid)
  return (
    <div className="form-group">
      <label htmlFor={id} className={`label ${valid ? "": "error"}`}>{label}</label>
      <input
        style={{ borderColor: valid ? "hsl(259, 100%, 65%)" : "hsl(0, 100%, 67%)" }}
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className={`info-message ${valid ? "": "error"}`}><small>{errorMessage}</small></label>
    </div>
  );
};

export default Input;
