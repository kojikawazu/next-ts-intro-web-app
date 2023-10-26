import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ScrollComponent from '@/app/components/common/scroll/ScrollComponent';

describe('ScrollComponent', () => {
  it('should call window.scroll when clicking "Scroll to Top"', () => {
    const scrollMock = jest.fn();
    window.scroll = scrollMock;

    render(<ScrollComponent />);

    fireEvent.click(screen.getByText('Scroll to Top'));

    expect(scrollMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('should call scrollIntoView when clicking "Scroll to Ref"', () => {
    const scrollMock = jest.fn();
    HTMLElement.prototype.scrollIntoView = scrollMock;

    render(<ScrollComponent />);

    const scrollDiv = screen.getByTestId('scroll-div');
    scrollDiv.scrollIntoView = scrollMock;

    fireEvent.click(screen.getByText('Scroll to Ref'));

    expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});