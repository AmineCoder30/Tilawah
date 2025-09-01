import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Surahs',
      value: stats.totalSurahs,
      icon: 'Book',
      color: 'primary'
    },
    {
      label: 'Total Ayahs',
      value: stats.totalAyahs,
      icon: 'FileText',
      color: 'secondary'
    },
    {
      label: 'Available Reciters',
      value: stats.totalReciters,
      icon: 'Headphones',
      color: 'accent'
    },
    {
      label: 'Reading Progress',
      value: `${stats.readingProgress}%`,
      icon: 'TrendingUp',
      color: 'success'
    }
  ];

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-background border border-border rounded-lg p-4 text-center hover:border-primary-200 hover:bg-surface-hover transition-all duration-200"
          >
            <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${
              item.color === 'primary' ? 'bg-primary-50 text-primary' :
              item.color === 'secondary' ? 'bg-secondary-50 text-secondary' :
              item.color === 'accent'? 'bg-accent-50 text-accent' : 'bg-success-50 text-success'
            }`}>
              <Icon name={item.icon} size={24} />
            </div>
            <p className="text-2xl font-heading font-bold text-text-primary mb-1">
              {item.value}
            </p>
            <p className="text-sm text-text-secondary">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;