import React, { useState, useRef, useEffect } from 'react';
import './MultiSelectDropdown.css';

function MultiSelectDropdown({ options, selected, setSelected, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = option => {
    if (selected.includes(option)) {
      setSelected(prevSelected => prevSelected.filter(item => item !== option));
    } else {
      setSelected(prevSelected => [...prevSelected, option]);
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-button">
        {selected.join(", ") || "Select..."}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map(option => (
            <div key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleOptionClick(option)}
              />
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
