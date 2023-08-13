import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Movie from './MovieCard';

describe('<Movie />', () => {
  const mockMovie = {
    EventImageUrl: 'https://sample-url.com/img.jpg',
    EventTitle: 'Sample Movie',
    ShowDate: new Date().toISOString(), 
    ratings: {
      wtsPerc: 75,
      totalWTSCount: 1200
    }
  };

  it('renders without crashing', () => {
    render(<Movie movie={mockMovie} onPlayClicked={() => {}} />);
    expect(screen.getByAltText('Sample Movie')).toBeInTheDocument();
  });

  it('displays the correct rating icon', () => {
    mockMovie.ratings.wtsPerc = 95;
    render(<Movie movie={mockMovie} onPlayClicked={() => {}} />);
    expect(screen.getByText('👍')).toBeInTheDocument();

    mockMovie.ratings.wtsPerc = 65;
    render(<Movie movie={mockMovie} onPlayClicked={() => {}} />);
    expect(screen.getByText('🔶')).toBeInTheDocument();

    mockMovie.ratings.wtsPerc = 45;
    render(<Movie movie={mockMovie} onPlayClicked={() => {}} />);
    expect(screen.getByText('👎')).toBeInTheDocument();
  });

  it('formats the vote count correctly', () => {
    mockMovie.ratings.totalWTSCount = 200;
    render(<Movie movie={mockMovie} onPlayClicked={() => {}} />);
    expect(screen.getByText('200 🗳️')).toBeInTheDocument();

    mockMovie.ratings.totalWTSCount = 1234;
    render(<Movie movie={mockMovie} onPlayClicked={() => {}} />);
    expect(screen.getByText('1.2K 🗳️')).toBeInTheDocument();

    mockMovie.ratings.totalWTSCount = 1_234_567;
    render(<Movie movie={mockMovie} onPlayClicked={() => {}} />);
    expect(screen.getByText('1.23M 🗳️')).toBeInTheDocument();
  });
});
