import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchFilter from './components/searchFilter';

global.fetch = jest.fn();

describe('SearchFilter Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('shows loading state initially until response fetched', () => {
    fetch.mockImplementation(() =>
      new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve([]),
      }), 100))
    );
    
    render(<SearchFilter />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows users after fetching response successfully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
        ]),
      })
    );

    render(<SearchFilter />);

    await waitFor(() => screen.getByText('John Doe'));

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('displays error message when the API call fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network response was not ok'))
    );

    render(<SearchFilter />);

    await waitFor(() => screen.getByText(/error/i));

    expect(screen.getByText(/error: network response was not ok/i)).toBeInTheDocument();
  });
});
