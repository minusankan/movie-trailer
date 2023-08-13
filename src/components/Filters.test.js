import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filters from './Filters';

describe('<Filters />', () => {
  const mockProps = {
    languages: ['English', 'French'],
    genres: ['Action', 'Drama'],
    selectedLanguages: [],
    setSelectedLanguages: jest.fn(),
    selectedGenres: [],
    setSelectedGenres: jest.fn(),
    searchTerm: '',
    setSearchTerm: jest.fn(),
    sortCriteria: 'newest',
    setSortCriteria: jest.fn(),
    onClearAll: jest.fn()
  };

  beforeEach(() => {
    render(<Filters {...mockProps} />);
  });

  it('renders without crashing', () => {
    expect(screen.getByText(/Sort By:/i)).toBeInTheDocument();
  });

  it('allows input in the search field', () => {
    const input = screen.getByPlaceholderText('Search by title...');
    fireEvent.change(input, { target: { value: 'Inception' } });
    expect(mockProps.setSearchTerm).toHaveBeenCalledWith('Inception');
  });

  it('calls the onClearAll function when "Clear All Filters" is clicked', () => {
    fireEvent.click(screen.getByText(/Clear All Filters/i));
    expect(mockProps.onClearAll).toHaveBeenCalled();
  });

});

