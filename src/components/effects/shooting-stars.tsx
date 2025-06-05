import React from 'react';

export const ShootingStars = () => {
  return (
    <div className="shooting-stars">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="shooting-star"
          style={{
            '--delay': `${Math.random() * 3}s`,
            '--top': `${Math.random() * 100}%`,
            '--left': `${Math.random() * 80}%`,
            '--duration': `${1 + Math.random() * 9}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
