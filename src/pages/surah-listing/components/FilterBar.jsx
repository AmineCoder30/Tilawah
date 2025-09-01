import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  ayahRange, 
  onAyahRangeChange, 
  selectedRiwayah, 
  onRiwayahChange,
  activeFilters,
  onClearFilter,
  resultCount,
  isExpanded,
  onToggleExpanded
}) => {
  const [localAyahRange, setLocalAyahRange] = useState(ayahRange);

  const riwayahOptions = [
    { value: 'all', label: 'All Riwayat' },
    { value: 'hafs', label: 'Hafs an Asim' },
    { value: 'warsh', label: 'Warsh an Nafi' },
    { value: 'qalun', label: 'Qalun an Nafi' },
    { value: 'duri', label: 'Ad-Duri an Abi Amr' }
  ];

  const handleAyahRangeChange = (type, value) => {
    const newRange = { ...localAyahRange, [type]: parseInt(value) };
    setLocalAyahRange(newRange);
    onAyahRangeChange(newRange);
  };

  return (
    <div className="sticky top-32 lg:top-32 z-50 bg-background border-b border-border shadow-gentle">
      <div className="px-4 lg:px-6 py-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="Search Surahs by name or number..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-12"
          />
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <button
            onClick={onToggleExpanded}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface-hover rounded transition-colors duration-200"
            aria-label="Toggle filters"
          >
            <Icon
              name={isExpanded ? 'ChevronUp' : 'SlidersHorizontal'}
              size={18}
              className="text-text-secondary"
            />
          </button>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 animate-fade-in">
            {/* Ayah Count Range */}
            <div className="space-y-2">
              <label className="text-sm font-heading font-medium text-text-primary">
                Ayah Count Range
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary">Min:</span>
                  <Input
                    type="number"
                    min="1"
                    max="286"
                    value={localAyahRange.min}
                    onChange={(e) => handleAyahRangeChange('min', e.target.value)}
                    className="w-16 text-center"
                  />
                </div>
                <div className="flex-1 px-2">
                  <div className="h-1 bg-surface rounded-full relative">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        marginLeft: `${(localAyahRange.min / 286) * 100}%`,
                        width: `${((localAyahRange.max - localAyahRange.min) / 286) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary">Max:</span>
                  <Input
                    type="number"
                    min="1"
                    max="286"
                    value={localAyahRange.max}
                    onChange={(e) => handleAyahRangeChange('max', e.target.value)}
                    className="w-16 text-center"
                  />
                </div>
              </div>
            </div>

            {/* Riwayah Selection */}
            <div className="space-y-2">
              <label className="text-sm font-heading font-medium text-text-primary">
                Recitation Method (Riwayah)
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {riwayahOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onRiwayahChange(option.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-caption transition-colors duration-200 ${
                      selectedRiwayah === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters & Results */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2 flex-wrap">
            {activeFilters.length > 0 && (
              <>
                {activeFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 bg-primary-50 text-primary px-2 py-1 rounded-full text-xs"
                  >
                    <span>{filter.label}</span>
                    <button
                      onClick={() => onClearFilter(filter.type)}
                      className="hover:bg-primary-100 rounded-full p-0.5 transition-colors duration-200"
                      aria-label={`Remove ${filter.label} filter`}
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onClearFilter('all')}
                  className="text-text-secondary hover:text-text-primary"
                >
                  Clear all
                </Button>
              </>
            )}
          </div>
          <div className="text-sm text-text-secondary font-caption">
            {resultCount} Surahs
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;