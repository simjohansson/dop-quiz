import React from 'react';
import { VisualizerProps } from './types';

export const Q2Litteraturen: React.FC<VisualizerProps> = ({ value }) => {
  let currentImg = '/images/nils/stage-3-teen.png?v=2';

  if (value <= 3) {
    currentImg = '/images/nils/stage-1-baby.png?v=2';
  } else if (value <= 8) {
    currentImg = '/images/nils/stage-2-child.png?v=2';
  } else if (value <= 17) {
    currentImg = '/images/nils/stage-3-teen.png?v=2';
  } else if (value <= 40) {
    currentImg = '/images/nils/stage-4-adult.png?v=2';
  } else if (value <= 65) {
    currentImg = '/images/nils/stage-5-middle.png?v=2';
  } else {
    currentImg = '/images/nils/stage-6-elderly.png?v=2';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      {/* Character & Goose Image Container */}
      <div className="relative flex items-end justify-center h-48 w-64 px-2">
        {/* Soft floor shadow */}
        <div className="absolute bottom-1 w-48 h-3.5 bg-slate-300/60 rounded-full blur-[2px]" />

        <img
          src={currentImg}
          alt="Nils och gåsen"
          className="max-h-48 max-w-full object-contain drop-shadow-md transition-all duration-150 relative z-10 select-none"
          draggable={false}
        />
      </div>
    </div>
  );
};
