import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ isOpen, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState({
    contentType: searchParams.get('type') || 'all',
    revelationType: searchParams.get('revelation') || 'all',
    surahLength: searchParams.get('length') || 'all',
    riwayah: searchParams.get('riwayah') || 'hafs'
  });

  const contentTypes = [
    { id: 'all', label: 'All Content', icon: 'Search' },
    { id: 'surah', label: 'Surahs', icon: 'Book' },
    { id: 'ayah', label: 'Ayahs', icon: 'FileText' },
    { id: 'translation', label: 'Translations', icon: 'Languages' },
    { id: 'reciter', label: 'Reciters', icon: 'Mic' }
  ];

  const revelationTypes = [
    { id: 'all', label: 'All' },
    { id: 'meccan', label: 'Meccan' },
    { id: 'medinan', label: 'Medinan' }
  ];

  const surahLengths = [
    { id: 'all', label: 'All Lengths' },
    { id: 'short', label: 'Short (1-20 Ayahs)' },
    { id: 'medium', label: 'Medium (21-100 Ayahs)' },
    { id: 'long', label: 'Long (100+ Ayahs)' }
  ];

  const riwayahMethods = [
    { id: 'hafs', label: 'Hafs an Asim' },
    { id: 'warsh', label: 'Warsh an Nafi' },
    { id: 'qalun', label: 'Qalun an Nafi' },
    { id: 'duri', label: 'Ad-Duri an Abi Amr' }
  ];

  const handleFilterChange = (category, value) => {
    const newFilters = { ...activeFilters, [category]: value };
    setActiveFilters(newFilters);
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value !== 'all') {
        newParams.set(key === 'contentType' ? 'type' : key, value);
      } else {
        newParams.delete(key === 'contentType' ? 'type' : key);
      }
    });
    
    setSearchParams(newParams);
    onClose();
  };

  const resetFilters = () => {
    const resetFilters = {
      contentType: 'all',
      revelationType: 'all',
      surahLength: 'all',
      riwayah: 'hafs'
    };
    setActiveFilters(resetFilters);
    
    const newParams = new URLSearchParams(searchParams);
    ['type', 'revelation', 'length', 'riwayah'].forEach(param => {
      newParams.delete(param);
    });
    newParams.set('riwayah', 'hafs');
    setSearchParams(newParams);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden fixed inset-0 z-300">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-lg shadow-gentle-lg max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-heading font-semibold text-text-primary">
                Search Filters
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
                aria-label="Close filters"
              >
                <Icon name="X" size={20} className="text-text-primary" />
              </button>
            </div>

            {/* Filter Sections */}
            <div className="space-y-6">
              {/* Content Type */}
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Content Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleFilterChange('contentType', type.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors duration-200 ${
                        activeFilters.contentType === type.id
                          ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      <Icon name={type.icon} size={16} />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Revelation Type */}
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Revelation</h3>
                <div className="space-y-2">
                  {revelationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleFilterChange('revelationType', type.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
                        activeFilters.revelationType === type.id
                          ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      <span className="text-sm font-medium">{type.label}</span>
                      {activeFilters.revelationType === type.id && (
                        <Icon name="Check" size={16} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Surah Length */}
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Surah Length</h3>
                <div className="space-y-2">
                  {surahLengths.map((length) => (
                    <button
                      key={length.id}
                      onClick={() => handleFilterChange('surahLength', length.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
                        activeFilters.surahLength === length.id
                          ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      <span className="text-sm font-medium">{length.label}</span>
                      {activeFilters.surahLength === length.id && (
                        <Icon name="Check" size={16} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Riwayah Method */}
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Riwayah Method</h3>
                <div className="space-y-2">
                  {riwayahMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleFilterChange('riwayah', method.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
                        activeFilters.riwayah === method.id
                          ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      <span className="text-sm font-medium">{method.label}</span>
                      {activeFilters.riwayah === method.id && (
                        <Icon name="Check" size={16} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 mt-6 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={resetFilters}
                className="flex-1"
              >
                Reset
              </Button>
              <Button
                variant="primary"
                onClick={applyFilters}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed right-0 top-32 bottom-0 w-80 bg-background border-l border-border shadow-gentle-lg z-300 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Search Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
              aria-label="Close filters"
            >
              <Icon name="X" size={20} className="text-text-primary" />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="space-y-6">
            {/* Content Type */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Content Type</h3>
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleFilterChange('contentType', type.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors duration-200 ${
                      activeFilters.contentType === type.id
                        ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <Icon name={type.icon} size={16} />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Other filter sections with same structure */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Revelation</h3>
              <div className="space-y-2">
                {revelationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleFilterChange('revelationType', type.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
                      activeFilters.revelationType === type.id
                        ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <span className="text-sm font-medium">{type.label}</span>
                    {activeFilters.revelationType === type.id && (
                      <Icon name="Check" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Surah Length</h3>
              <div className="space-y-2">
                {surahLengths.map((length) => (
                  <button
                    key={length.id}
                    onClick={() => handleFilterChange('surahLength', length.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
                      activeFilters.surahLength === length.id
                        ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <span className="text-sm font-medium">{length.label}</span>
                    {activeFilters.surahLength === length.id && (
                      <Icon name="Check" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Riwayah Method</h3>
              <div className="space-y-2">
                {riwayahMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleFilterChange('riwayah', method.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
                      activeFilters.riwayah === method.id
                        ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <span className="text-sm font-medium">{method.label}</span>
                    {activeFilters.riwayah === method.id && (
                      <Icon name="Check" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6 pt-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              variant="primary"
              onClick={applyFilters}
              className="flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilters;