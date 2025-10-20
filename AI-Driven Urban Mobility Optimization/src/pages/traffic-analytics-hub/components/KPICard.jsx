import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, change, changeType, icon, trend, onClick }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div 
      className="bg-card border border-operational rounded-lg p-6 hover:shadow-elevated transition-operational cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-foreground font-data">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span className="text-sm font-medium">{change}</span>
          </div>
          {trend && (
            <div className="w-16 h-8 mt-2">
              <svg viewBox="0 0 64 32" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  points={trend?.map((point, index) => `${(index / (trend?.length - 1)) * 64},${32 - (point / 100) * 32}`)?.join(' ')}
                  className={getChangeColor()}
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;