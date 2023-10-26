import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntroDataProvider, useIntroData } from '@/app/contexts/introContext';
import { mockInitialData, mockRefData } from '@/test/mocks/mockData';

// Mocks
const MockComponent = () => {
    const { introData, refData } = useIntroData();
    return (
      <div>
        <span>{introData?.navbar_data.about_name}</span>
        <span data-testid="aboutRef">{refData?.aboutRef.current?.id}</span>
      </div>
    );
};

describe('IntroDataProvider and useIntroData hook', () => {
  it('provides data via context', () => {
    render(
      <IntroDataProvider initialData={mockInitialData} initialRefData={mockRefData}>
        <MockComponent />
      </IntroDataProvider>
    );

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByTestId('aboutRef')).toBeInTheDocument();
  });

  it('throws an error when useIntroData is used outside of the provider', () => {
    const mockError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<MockComponent />);
    }).toThrow('useIntroData must be used within a DataProvider');

    mockError.mockRestore();
  });
});