import { useState, useEffect } from 'react';

/**
 * Reusable carousel component for books
 * Shows multiple items simultaneously
 * 
 * @param {Array} items - Array of objects with images
 * @param {number} itemsToShow - Number of items to display simultaneously (default: 5)
 * @param {boolean} autoPlay - Automatic scrolling (default: true)
 * @param {number} slideInterval - Auto-scroll interval in ms (default: 3000)
 * @param {boolean} showNav - Whether to show navigation arrows (default: true)
 */
export default function BooksCarousel({ 
  items, 
  itemsToShow = 5,
  autoPlay = true,
  slideInterval = 3000,
  showNav = true
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Calculate maximum index
  const maxIndex = Math.max(0, items.length - itemsToShow);

  // Auto-scroll
  useEffect(() => {
    if (!autoPlay || isPaused || maxIndex <= 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0; // Return to beginning
        }
        return prevIndex + 1;
      });
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, maxIndex, slideInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  // Get items to display
  const visibleItems = items.slice(currentIndex, currentIndex + itemsToShow);

  // If items count is less than itemsToShow, show all
  if (items.length <= itemsToShow) {
    return (
      <div className="relative">
        <div className="grid grid-cols-5 gap-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <img 
                src={item.original} 
                alt={item.description || `Item ${index + 1}`}
                className="w-full h-auto object-cover cursor-pointer hover:opacity-80 transition-opacity"
              />
              {item.description && (
                <p className="text-sm text-center">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {showNav && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      <div className="grid grid-cols-5 gap-4">
        {visibleItems.map((item, index) => (
          <div key={currentIndex + index} className="flex flex-col items-center gap-2">
            <img 
              src={item.original} 
              alt={item.description || `Item ${currentIndex + index + 1}`}
              className="w-full h-auto object-cover cursor-pointer hover:opacity-80 transition-opacity"
            />
            {item.description && (
              <p className="text-sm text-center">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

