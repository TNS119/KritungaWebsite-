import React from 'react';

export function SpiceIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Hot Royal Spice / Chili Pod */}
      <path d="M14.5 3.5C14.5 3.5 13 2 11 2C9.5 2 8 3 8 4.5C8 5.5 8.5 6.5 9 7C5 9 3 13 3 17C3 20 5.5 22 8.5 22C13.5 22 19 16.5 20.5 11.5C21 10 20.5 8.5 19 8C17.5 7.5 16 8 15 9" />
      <path d="M12 2C13 4 14 6 16 7" />
    </svg>
  );
}

export default SpiceIcon;
