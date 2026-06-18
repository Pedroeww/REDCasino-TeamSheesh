import React, { useState, useEffect } from 'react';

interface MobilePoppingImageProps {
  previewOnly?: boolean;
}

export default function MobilePoppingImage({ previewOnly = false }: MobilePoppingImageProps) {
  // Storing the visibility state of the character
  const [isVisible, setIsVisible] = useState(false);

  // Manage the 10-second active and 5-second rest cycle seamlessly using an async loop
  useEffect(() => {
    let active = true;

    const runInfiniteCycle = async () => {
      // Small 1 second initial delay so the landing page and links animate into view first
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!active) return;

      while (active) {
        // Step 1: Animate Onscreen and wait/show for 10 seconds (duration per instructions)
        setIsVisible(true);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        if (!active) break;

        // Step 2: Slide Offscreen and wait/stay hidden for 5 seconds (duration per instructions)
        setIsVisible(false);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (!active) break;
      }
    };

    runInfiniteCycle();

    return () => {
      active = false;
    };
  }, []);

  // Determine container dimensions and layout
  // - Top and bottom are 0 to span from border to border vertically.
  // - Position is absolute in the mockup (container has overflow-hidden) and fixed in live view.
  // - Transform is decoupled from the horizontal scale flip, so it translates perfectly on standard Cartesian axes.
  const containerStyle: React.CSSProperties = {
    position: previewOnly ? 'absolute' : 'fixed',
    top: '25%', // Move down lower, starting in the middle-to-bottom region of the screen
    bottom: 0,
    right: 0,
    height: previewOnly ? '75%' : '75vh',
    maxHeight: previewOnly ? '75%' : '75dvh',
    zIndex: 9999, // Render on top of link components
    pointerEvents: 'none', // Allow clicking/scrolling behind the image
    transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1)', // Smooth slide transition
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end', // Sit lower down on the screen
    margin: 0,
    padding: 0,
  };

  // Flip/invert the image horizontally inside the container
  const imgStyle: React.CSSProperties = {
    height: '100%',
    width: 'auto',
    maxWidth: previewOnly ? '90%' : '90vw', // Bound of screen space limit, enlarged by 100% (was 45vw)
    objectFit: 'contain',
    transform: 'scaleX(-1)', // Mirrored/flipped horizontally
    pointerEvents: 'none',
    opacity: 0.98,
  };

  return (
    <div 
      id="mobile-popping-image-wrapper"
      style={containerStyle}
    >
      <img
        src="https://i.imgur.com/FidvecZ.png"
        alt="Popping character"
        style={imgStyle}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Robust fallback is applied if the user's secure direct link fails to resolve
          console.warn('Imgur character asset failed to load, applying fallback image.');
          e.currentTarget.src = 'https://i.imgur.com/6FVAmTL.png';
        }}
      />
    </div>
  );
}
