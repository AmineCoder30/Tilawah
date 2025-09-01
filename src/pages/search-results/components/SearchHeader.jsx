import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ onFilterToggle, resultCount, isLoading }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [recentSearches, setRecentSearches] = useState([
    'Al-Fatiha',
    'Ayat al-Kursi',
    'Surah Yasin',
    'Rahman',
    'Mulk'
  ]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', searchQuery.trim());
      setSearchParams(newParams);
      
      // Add to recent searches
      setRecentSearches(prev => {
        const newSearches = [searchQuery.trim(), ...prev.filter(item => item !== searchQuery.trim())].slice(0, 5);
        return newSearches;
      });
    }
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('q', query);
    setSearchParams(newParams);
  };

  const clearSearch = () => {
    setSearchQuery('');
    navigate('/search-results');
  };

  return (
    <div className="bg-background border-b border-border shadow-gentle sticky top-16 lg:top-32 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search Quran, Surahs, Ayahs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 text-base"
            />
            <Icon
              name="Search"
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
                aria-label="Clear search"
              >
                <Icon name="X" size={18} />
              </button>
            )}
          </div>
        </form>

        {/* Search Info and Filters */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            {searchQuery && (
              <div className="text-sm text-text-secondary">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Searching...</span>
                  </div>
                ) : (
                  <span>
                    {resultCount} results for "{searchQuery}"
                  </span>
                )}
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            onClick={onFilterToggle}
            iconName="Filter"
            iconPosition="left"
            className="text-sm"
          >
            Filters
          </Button>
        </div>

        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(query)}
                  className="px-3 py-1 bg-surface hover:bg-surface-hover rounded-full text-sm text-text-primary transition-colors duration-200 border border-border"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;