import React from 'react';
import {
  Q1Almanackan,
  Q2Litteraturen,
  Q3NilsPaIsen,
  Q4Citroen,
  Q5Pysslingen,
  Q6Flottan,
  Q7TyngstaCitronen,
  Q8ArneWeise,
  Q9Majblomman,
} from './visualizers';

export interface DynamicSvgVisualizerProps {
  value: number;
  questionId: number;
  category?: string;
}

export const DynamicSvgVisualizer: React.FC<DynamicSvgVisualizerProps> = ({
  value,
  questionId,
}) => {
  // Render specific animated SVG scene for each question
  const renderScene = () => {
    switch (questionId) {
      case 1:
        return <Q1Almanackan value={value} />;
      case 2:
        return <Q2Litteraturen value={value} />;
      case 3:
        return <Q3NilsPaIsen value={value} />;
      case 4:
        return <Q4Citroen value={value} />;
      case 5:
        return <Q5Pysslingen value={value} />;
      case 6:
        return <Q6Flottan value={value} />;
      case 7:
        return <Q7TyngstaCitronen value={value} />;
      case 8:
        return <Q8ArneWeise value={value} />;
      case 9:
        return <Q9Majblomman value={value} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-1">
      <div className="absolute w-44 h-44 rounded-full bg-amber-200/30 blur-2xl pointer-events-none" />
      <div className="relative z-10 transition-transform duration-100">
        {renderScene()}
      </div>
    </div>
  );
};
