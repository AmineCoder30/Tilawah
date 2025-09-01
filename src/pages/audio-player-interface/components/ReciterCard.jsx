import React from 'react';
import Image from '../../../components/AppImage';

const ReciterCard = ({ reciter, isSelected, onClick, riwayahFilter }) => {
  // Filter reciters based on selected Riwayah
  const isCompatible = !riwayahFilter || reciter.riwayah.includes(riwayahFilter);
  
  if (!isCompatible) return null;

  return (
    <button
      onClick={() => onClick(reciter)}
      className={`flex-shrink-0 w-24 lg:w-28 p-3 rounded-lg transition-all duration-200 ${
        isSelected
          ? 'bg-primary text-primary-foreground shadow-gentle-md'
          : 'bg-surface hover:bg-surface-hover text-text-primary'
      }`}
      aria-label={`Select ${reciter.name} reciter`}
    >
      <div className="text-center">
        <div className={`w-12 h-12 lg:w-14 lg:h-14 mx-auto mb-2 rounded-full overflow-hidden border-2 ${
          isSelected ? 'border-primary-foreground' : 'border-border'
        }`}>
          <Image
            src={reciter.photo}
            alt={reciter.name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs font-caption font-medium truncate mb-1">
          {reciter.name}
        </p>
        <p className="text-xs opacity-75 truncate">
          {reciter.riwayah[0]}
        </p>
      </div>
    </button>
  );
};

export default ReciterCard;