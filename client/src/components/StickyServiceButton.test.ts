import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StickyServiceButton } from './StickyServiceButton';

describe('StickyServiceButton', () => {
  let mockOnOpenQuotePopup: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnOpenQuotePopup = vi.fn();
    // Reset scroll position
    window.scrollY = 0;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when scroll position is less than 300px', () => {
    const { container } = render(
      <StickyServiceButton 
        onOpenQuotePopup={mockOnOpenQuotePopup} 
        serviceTitle="Structural Steel Frames" 
      />
    );
    
    // Component should not be visible initially
    const stickyButton = container.querySelector('[class*="fixed"]');
    expect(stickyButton).toBeNull();
  });

  it('should render when scroll position exceeds 300px', () => {
    const { container } = render(
      <StickyServiceButton 
        onOpenQuotePopup={mockOnOpenQuotePopup} 
        serviceTitle="Structural Steel Frames" 
      />
    );

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    fireEvent.scroll(window);

    // Component should now be visible
    const stickyButton = container.querySelector('[class*="fixed"]');
    expect(stickyButton).not.toBeNull();
  });

  it('should call onOpenQuotePopup when Request a Site Survey button is clicked', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    
    render(
      <StickyServiceButton 
        onOpenQuotePopup={mockOnOpenQuotePopup} 
        serviceTitle="Rust Removal" 
      />
    );
    fireEvent.scroll(window);

    const surveyButton = screen.getByText(/Request a Site Survey/i);
    fireEvent.click(surveyButton);

    expect(mockOnOpenQuotePopup).toHaveBeenCalledOnce();
  });

  it('should display correct service title in header', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    
    render(
      <StickyServiceButton 
        onOpenQuotePopup={mockOnOpenQuotePopup} 
        serviceTitle="Bridge Steelwork" 
      />
    );
    fireEvent.scroll(window);

    expect(screen.getByText(/Bridge Steelwork/i)).toBeInTheDocument();
  });

  it('should have phone call link with correct number', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    
    render(
      <StickyServiceButton 
        onOpenQuotePopup={mockOnOpenQuotePopup} 
        serviceTitle="Factory Cladding" 
      />
    );
    fireEvent.scroll(window);

    const phoneLink = screen.getByText(/07970 566409/i).closest('a');
    expect(phoneLink).toHaveAttribute('href', 'tel:07970566409');
  });

  it('should have back to top button that scrolls to top', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    const scrollToSpy = vi.spyOn(window, 'scrollTo');
    
    render(
      <StickyServiceButton 
        onOpenQuotePopup={mockOnOpenQuotePopup} 
        serviceTitle="Intumescent Painting" 
      />
    );
    fireEvent.scroll(window);

    const backToTopButton = screen.getByText(/Back to Top/i);
    fireEvent.click(backToTopButton);

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('should display trust indicators in footer', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    
    render(
      <StickyServiceButton 
        onOpenQuotePopup={mockOnOpenQuotePopup} 
        serviceTitle="Mill Scale Removal" 
      />
    );
    fireEvent.scroll(window);

    expect(screen.getByText(/Free consultation/i)).toBeInTheDocument();
    expect(screen.getByText(/No obligation/i)).toBeInTheDocument();
    expect(screen.getByText(/Same-day response/i)).toBeInTheDocument();
  });

  it('should be hidden on mobile devices (md breakpoint)', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    
    const { container } = render(
      <StickyServiceButton 
        onOpenQuotePopup={mockOnOpenQuotePopup} 
        serviceTitle="Powder Coating" 
      />
    );
    fireEvent.scroll(window);

    // Check for md:fixed class which indicates hidden on mobile
    const stickyDiv = container.querySelector('[class*="md:fixed"]');
    expect(stickyDiv).not.toBeNull();
  });
});
