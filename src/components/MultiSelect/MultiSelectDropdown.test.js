import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultiSelectDropdown from './MultiselectDropdown';

describe('<MultiSelectDropdown />', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  let selected = [];
  const setSelected = jest.fn((newSelected) => {
    selected = newSelected;
  });

  beforeEach(() => {
    render(
      <MultiSelectDropdown 
        options={options} 
        selected={selected} 
        setSelected={setSelected} 
        label="Test Dropdown" 
      />
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByText(/Select.../i)).toBeInTheDocument();
  });

  it('opens dropdown on button click', () => {
    fireEvent.click(screen.getByText(/Select.../i));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
  
});

