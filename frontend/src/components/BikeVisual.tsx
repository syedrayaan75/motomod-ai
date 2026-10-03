import React from 'react';
import type { BikeSpec } from '../data/mockData';

export const BikeVisual: React.FC<{ bike: BikeSpec }> = ({ bike }) => {
  return (
    <div className="bike-image-box">
      <img
        src={bike.imageUrl}
        alt={`${bike.brand} ${bike.model}`}
      />
      <span className="best-for-badge">{bike.bestFor}</span>
    </div>
  );
};
