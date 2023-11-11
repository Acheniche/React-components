import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { App } from '../../App';
import ErrorBoundary from '../ErrorBoundary/Error';

describe('App component', () => {
  it('renders without crashing', () => {
    act(() => {
      render(
        <React.StrictMode>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </React.StrictMode>
      );
    });
    expect(screen.getByText('Click to error')).toBeInTheDocument();
  });
});
