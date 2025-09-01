import React from 'react';

import Button from '../../../components/ui/Button';

const PlaybackModeToggle = ({ mode, onModeChange }) => {
  const modes = [
    { id: 'ayah', label: 'Single Ayah', icon: 'Square' },
    { id: 'surah', label: 'Full Surah', icon: 'List' },
    { id: 'repeat', label: 'Repeat', icon: 'Repeat' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-surface rounded-lg p-1">
      {modes.map((modeOption) => (
        <Button
          key={modeOption.id}
          variant={mode === modeOption.id ? 'primary' : 'ghost'}
          size="xs"
          onClick={() => onModeChange(modeOption.id)}
          iconName={modeOption.icon}
          iconSize={14}
          className={`text-xs ${
            mode === modeOption.id 
              ? 'text-primary-foreground' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
          aria-label={modeOption.label}
        >
          <span className="hidden sm:inline ml-1">{modeOption.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default PlaybackModeToggle;