import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';


const GlobalSearchInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([
    'Al-Fatiha',
    'Ayat al-Kursi',
    'Surah Yasin',
    'Dua',
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const searchFilters = [
    { id: 'all', label: 'All', icon: 'Search' },
    { id: 'surah', label: 'Surah', icon: 'Book' },
    { id: 'ayah', label: 'Ayah', icon: 'FileText' },
    { id: 'translation', label: 'Translation', icon: 'Languages' },
  ];

  const mockSuggestions = [
    { type: 'surah', title: 'Al-Fatiha', subtitle: 'The Opening', id: 1 },
    { type: 'surah', title: 'Al-Baqarah', subtitle: 'The Cow', id: 2 },
    { type: 'ayah', title: 'Ayat al-Kursi', subtitle: 'Al-Baqarah 2:255', id: 255 },
    { type: 'translation', title: 'In the name of Allah', subtitle: 'Bismillah', id: 'bismillah' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  const performSearch = (query) => {
    // Add to search history
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(item => item !== query)].slice(0, 5);
      return newHistory;
    });

    // Navigate to search results
    navigate(`/search-results?q=${encodeURIComponent(query)}&filter=${activeFilter}`);
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'surah') {
      navigate(`/surah-detail?id=${suggestion.id}`);
    } else if (suggestion.type === 'ayah') {
      navigate(`/surah-detail?ayah=${suggestion.id}`);
    } else {
      performSearch(suggestion.title);
    }
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleHistoryClick = (query) => {
    performSearch(query);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Compact Search Trigger */}
      {!isExpanded && (
        <button
          onClick={handleExpand}
          className="flex items-center space-x-2 px-3 py-2 bg-surface hover:bg-surface-hover rounded-lg border border-border transition-colors duration-200 w-full lg:w-64"
          aria-label="Open search"
        >
          <Icon name="Search" size={16} className="text-text-secondary" />
          <span className="text-text-secondary text-sm font-body">
            Search Quran...
          </span>
        </button>
      )}

      {/* Expanded Search Interface */}
      {isExpanded && (
        <>
          {/* Mobile Overlay */}
          <div className="lg:hidden fixed inset-0 bg-background z-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center space-x-3 p-4 border-b border-border">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
                  aria-label="Close search"
                >
                  <Icon name="ArrowLeft" size={20} className="text-text-primary" />
                </button>
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <Input
                    ref={inputRef}
                    type="search"
                    placeholder="Search Quran..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </form>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-2 p-4 border-b border-border overflow-x-auto">
                {searchFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <Icon name={filter.icon} size={16} />
                    <span className="text-sm font-caption">{filter.label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {searchQuery.trim() ? (
                  <div className="p-4">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Icon name="Loader2" size={24} className="text-text-secondary animate-spin" />
                      </div>
                    ) : suggestions.length > 0 ? (
                      <div className="space-y-2">
                        <h3 className="text-sm font-heading font-medium text-text-secondary mb-3">
                          Suggestions
                        </h3>
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full flex items-center space-x-3 p-3 hover:bg-surface-hover rounded-lg transition-colors duration-200 text-left"
                          >
                            <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon
                                name={suggestion.type === 'surah' ? 'Book' : suggestion.type === 'ayah' ? 'FileText' : 'Languages'}
                                size={16}
                                className="text-primary"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-text-primary truncate">
                                {suggestion.title}
                              </p>
                              <p className="text-xs text-text-secondary truncate">
                                {suggestion.subtitle}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-3" />
                        <p className="text-text-secondary">No results found</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4">
                    {searchHistory.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-heading font-medium text-text-secondary">
                            Recent Searches
                          </h3>
                          <button
                            onClick={clearHistory}
                            className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
                          >
                            Clear
                          </button>
                        </div>
                        {searchHistory.map((query, index) => (
                          <button
                            key={index}
                            onClick={() => handleHistoryClick(query)}
                            className="w-full flex items-center space-x-3 p-3 hover:bg-surface-hover rounded-lg transition-colors duration-200 text-left"
                          >
                            <Icon name="Clock" size={16} className="text-text-secondary" />
                            <span className="text-sm text-text-primary">{query}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Dropdown */}
          <div className="hidden lg:block absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-gentle-lg z-300 w-96">
            <div className="p-4">
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <Input
                  ref={inputRef}
                  type="search"
                  placeholder="Search Quran..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </form>

              {/* Filters */}
              <div className="flex items-center space-x-2 mb-4">
                {searchFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <Icon name={filter.icon} size={12} />
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="max-h-64 overflow-y-auto">
                {searchQuery.trim() ? (
                  isLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <Icon name="Loader2" size={20} className="text-text-secondary animate-spin" />
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="space-y-1">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full flex items-center space-x-2 p-2 hover:bg-surface-hover rounded transition-colors duration-200 text-left"
                        >
                          <Icon
                            name={suggestion.type === 'surah' ? 'Book' : suggestion.type === 'ayah' ? 'FileText' : 'Languages'}
                            size={14}
                            className="text-text-secondary"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-text-primary truncate">
                              {suggestion.title}
                            </p>
                            <p className="text-xs text-text-secondary truncate">
                              {suggestion.subtitle}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-text-secondary text-center py-4">
                      No results found
                    </p>
                  )
                ) : searchHistory.length > 0 ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-text-secondary">Recent</span>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
                      >
                        Clear
                      </button>
                    </div>
                    {searchHistory.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleHistoryClick(query)}
                        className="w-full flex items-center space-x-2 p-2 hover:bg-surface-hover rounded transition-colors duration-200 text-left"
                      >
                        <Icon name="Clock" size={14} className="text-text-secondary" />
                        <span className="text-xs text-text-primary">{query}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalSearchInterface;