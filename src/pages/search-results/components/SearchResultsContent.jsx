import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SurahResultCard from './SurahResultCard';
import AyahResultCard from './AyahResultCard';
import ReciterResultCard from './ReciterResultCard';

const SearchResultsContent = ({ searchQuery, isLoading, results, onLoadMore, hasMore }) => {
  const { surahs = [], ayahs = [], reciters = [], translations = [] } = results;
  const totalResults = surahs.length + ayahs.length + reciters.length + translations.length;

  if (isLoading && totalResults === 0) {
    return (
      <div className="space-y-4">
        {/* Loading Skeleton */}
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-surface rounded-lg p-4 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-surface-hover rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-hover rounded w-3/4"></div>
                <div className="h-3 bg-surface-hover rounded w-1/2"></div>
                <div className="h-3 bg-surface-hover rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="text-center py-12">
        <Icon name="Search" size={64} className="text-text-secondary mx-auto mb-4" />
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Search the Quran
        </h2>
        <p className="text-text-secondary max-w-md mx-auto">
          Enter a search term to find Surahs, Ayahs, translations, or reciters. 
          You can search in both Arabic and English.
        </p>
      </div>
    );
  }

  if (totalResults === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <Icon name="SearchX" size={64} className="text-text-secondary mx-auto mb-4" />
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          No results found
        </h2>
        <p className="text-text-secondary max-w-md mx-auto mb-6">
          We couldn't find any results for "{searchQuery}". Try adjusting your search terms or filters.
        </p>
        <div className="space-y-2 text-sm text-text-secondary">
          <p className="font-medium">Search suggestions:</p>
          <ul className="space-y-1">
            <li>• Try searching for Surah names like "Fatiha" or "Baqarah"</li>
            <li>• Search for specific topics like "prayer" or "patience"</li>
            <li>• Use Arabic text or transliteration</li>
            <li>• Check your spelling and try different variations</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Surahs Section */}
      {surahs.length > 0 && (
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Book" size={20} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Surahs ({surahs.length})
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {surahs.map((surah) => (
              <SurahResultCard
                key={surah.id}
                surah={surah}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </section>
      )}

      {/* Ayahs Section */}
      {ayahs.length > 0 && (
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="FileText" size={20} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Ayahs ({ayahs.length})
            </h2>
          </div>
          <div className="space-y-4">
            {ayahs.map((ayah) => (
              <AyahResultCard
                key={`${ayah.surahId}-${ayah.number}`}
                ayah={ayah}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </section>
      )}

      {/* Reciters Section */}
      {reciters.length > 0 && (
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Mic" size={20} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Reciters ({reciters.length})
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {reciters.map((reciter) => (
              <ReciterResultCard
                key={reciter.id}
                reciter={reciter}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </section>
      )}

      {/* Translations Section */}
      {translations.length > 0 && (
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Languages" size={20} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Translations ({translations.length})
            </h2>
          </div>
          <div className="space-y-4">
            {translations.map((translation, index) => (
              <div
                key={index}
                className="bg-surface hover:bg-surface-hover border border-border rounded-lg p-4 transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  // Navigate to translation context
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary mb-2">
                      {translation.surahName} - Ayah {translation.ayahNumber}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {translation.text}
                    </p>
                  </div>
                  <Icon name="ExternalLink" size={16} className="text-text-secondary ml-4 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={isLoading}
            iconName={isLoading ? "Loader2" : "ChevronDown"}
            iconPosition="right"
            className={isLoading ? "animate-spin" : ""}
          >
            {isLoading ? 'Loading...' : 'Load More Results'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsContent;