import React, { useState } from 'react';
import './dropdown.css';

const Dropdown = () => {
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown">
       
        <select id="dropdown1" value={option1} onChange={handleOption1Change}>
          <option value="">Category</option>
          <option value="option1_value1">Comedy</option>
          <option value="option1_value2">Roamntic</option>
          <option value="option1_value2">Detective</option>
          <option value="option1_value2">Ation</option>
        </select>
      </div>

      <div className="dropdown">
        
        <select id="dropdown2" value={option2} onChange={handleOption2Change}>
          <option value="">Rating</option>
          <option value="option2_value1">⋆</option>
          <option value="option2_value2">⋆⋆</option>
          <option value="option2_value2">⋆⋆⋆</option>
          <option value="option2_value2">⋆⋆⋆⋆</option>
          <option value="option2_value2">⋆⋆⋆⋆⋆</option>
        </select>
      </div>
    </div>
  );
};

export default Dropdown;