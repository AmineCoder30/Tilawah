import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureCards = ({ onBrowseClick, onContinueReading, onFeaturedReciter, lastReadingSurah, featuredReciter }) => {
  const features = [
    {
      id: 'browse',
      title: 'Browse All Surahs',
      description: 'Explore the complete Quran with 114 Surahs',
      icon: 'Book',
      action: onBrowseClick,
      primary: true
    },
    {
      id: 'continue',
      title: 'Continue Reading',
      description: lastReadingSurah ? `Resume from ${lastReadingSurah.name}` : 'Start your journey',
      icon: 'BookOpen',
      action: onContinueReading,
      disabled: !lastReadingSurah
    },
    {
      id: 'featured',
      title: 'Featured Reciter',
      description: `Listen to ${featuredReciter.name}`,
      icon: 'Headphones',
      action: onFeaturedReciter,
      accent: true
    }
  ];

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={feature.action}
            disabled={feature.disabled}
            className={`group p-6 rounded-lg border-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
              feature.primary
                ? 'border-primary bg-primary-50 hover:bg-primary-100 hover:border-primary-600'
                : feature.accent
                ? 'border-accent bg-accent-50 hover:bg-accent-100 hover:border-accent-600' :'border-border bg-background hover:border-primary-200 hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                feature.primary
                  ? 'bg-primary text-primary-foreground group-hover:bg-primary-600'
                  : feature.accent
                  ? 'bg-accent text-accent-foreground group-hover:bg-accent-600'
                  : 'bg-surface text-text-primary group-hover:bg-primary group-hover:text-primary-foreground'
              }`}>
                <Icon name={feature.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`text-lg font-heading font-semibold mb-2 transition-colors duration-200 ${
                  feature.primary
                    ? 'text-primary group-hover:text-primary-700'
                    : feature.accent
                    ? 'text-accent group-hover:text-accent-700' :'text-text-primary'
                }`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                  {feature.description}
                </p>
              </div>
              
              <Icon 
                name="ChevronRight" 
                size={20} 
                className={`text-text-secondary group-hover:text-text-primary transition-colors duration-200 ${
                  feature.disabled ? 'opacity-50' : ''
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;