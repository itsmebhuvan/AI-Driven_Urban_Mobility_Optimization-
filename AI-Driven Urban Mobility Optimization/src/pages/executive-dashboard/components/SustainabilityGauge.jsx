import React from 'react';
import Icon from '../../../components/AppIcon';

const SustainabilityGauge = ({ title, value, target, unit, description }) => {
  const percentage = Math.min((value / target) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 90) return '#00C851';
    if (percentage >= 70) return '#00D4FF';
    if (percentage >= 50) return '#FFB347';
    return '#FF4444';
  };

  const getStatus = () => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 70) return 'Good';
    if (percentage >= 50) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <div className="bg-card border border-operational rounded-lg p-6 shadow-elevated">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Icon name="Leaf" size={20} className="text-success" />
      </div>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={getColor()}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground font-data">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-muted-foreground">Target:</span>
          <span className="text-sm font-medium text-foreground font-data">{target} {unit}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-muted-foreground">Progress:</span>
          <span className="text-sm font-medium" style={{ color: getColor() }}>
            {percentage?.toFixed(1)}% - {getStatus()}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-3">{description}</p>
      </div>
    </div>
  );
};

export default SustainabilityGauge;