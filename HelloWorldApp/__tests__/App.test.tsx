import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders the Hello World greeting', () => {
    render(<App />);
    expect(screen.getByText('Hello, World! 👋')).toBeTruthy();
  });

  it('renders the subtitle', () => {
    render(<App />);
    expect(screen.getByText('Your Expo app is ready to go 🚀')).toBeTruthy();
  });
});
