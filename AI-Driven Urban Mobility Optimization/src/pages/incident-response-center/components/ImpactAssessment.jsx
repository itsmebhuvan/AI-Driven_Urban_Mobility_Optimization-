import React from 'react';
import Icon from '../../../components/AppIcon';

const ImpactAssessment = ({ impactMetrics, recoveryTimeline }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  const getImpactLevel = (percentage) => {
    if (percentage >= 75) return { color: 'text-error', bg: 'bg-error/20', label: 'Severe' };
    if (percentage >= 50) return { color: 'text-warning', bg: 'bg-warning/20', label: 'High' };
    if (percentage >= 25) return { color: 'text-secondary', bg: 'bg-secondary/20', label: 'Medium' };
    return { color: 'text-success', bg: 'bg-success/20', label: 'Low' };
  };

  const trafficImpact = getImpactLevel(impactMetrics?.trafficReduction);
  const economicImpact = getImpactLevel((impactMetrics?.estimatedDelayCost / 100000) * 10);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Traffic Volume Impact */}
      <div className="bg-card rounded-lg border border-operational p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Traffic Volume</h4>
          <Icon name="Car" size={16} className="text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground font-data">
            {formatNumber(impactMetrics?.affectedVehicles)}
          </div>
          <div className="text-xs text-muted-foreground">Vehicles Affected</div>
          <div className={`flex items-center space-x-1 ${trafficImpact?.color}`}>
            <Icon name="TrendingDown" size={12} />
            <span className="text-xs font-medium">
              {impactMetrics?.trafficReduction}% reduction
            </span>
          </div>
          <div className={`w-full h-2 rounded-full ${trafficImpact?.bg}`}>
            <div 
              className={`h-full rounded-full ${trafficImpact?.color?.replace('text-', 'bg-')}`}
              style={{ width: `${impactMetrics?.trafficReduction}%` }}
            />
          </div>
        </div>
      </div>
      {/* Economic Impact */}
      <div className="bg-card rounded-lg border border-operational p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Economic Cost</h4>
          <Icon name="DollarSign" size={16} className="text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground font-data">
            {formatCurrency(impactMetrics?.estimatedDelayCost)}
          </div>
          <div className="text-xs text-muted-foreground">Estimated Delay Cost</div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span className="text-xs">
              {impactMetrics?.avgDelayTime} min avg delay
            </span>
          </div>
          <div className="text-xs text-warning">
            +{formatCurrency(impactMetrics?.hourlyIncrease)}/hour
          </div>
        </div>
      </div>
      {/* Recovery Timeline */}
      <div className="bg-card rounded-lg border border-operational p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Recovery ETA</h4>
          <Icon name="Timer" size={16} className="text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground font-data">
            {recoveryTimeline?.estimatedClearance}
          </div>
          <div className="text-xs text-muted-foreground">Until Normal Flow</div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground">{recoveryTimeline?.progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${recoveryTimeline?.progress}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-success">
            Confidence: {recoveryTimeline?.confidence}%
          </div>
        </div>
      </div>
      {/* Environmental Impact */}
      <div className="bg-card rounded-lg border border-operational p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Air Quality</h4>
          <Icon name="Wind" size={16} className="text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground font-data">
            {impactMetrics?.airQualityIndex}
          </div>
          <div className="text-xs text-muted-foreground">AQI Level</div>
          <div className="flex items-center space-x-1 text-warning">
            <Icon name="TrendingUp" size={12} />
            <span className="text-xs font-medium">
              +{impactMetrics?.emissionIncrease}% emissions
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            CO₂: +{impactMetrics?.co2Increase} tons/hour
          </div>
        </div>
      </div>
      {/* Recovery Milestones */}
      <div className="lg:col-span-4 bg-card rounded-lg border border-operational p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Recovery Milestones</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {recoveryTimeline?.milestones?.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${milestone?.completed 
                  ? 'bg-success text-success-foreground' 
                  : milestone?.active 
                    ? 'bg-primary text-primary-foreground animate-pulse' 
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {milestone?.completed ? (
                  <Icon name="Check" size={16} />
                ) : milestone?.active ? (
                  <Icon name="Clock" size={16} />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{milestone?.title}</div>
                <div className="text-xs text-muted-foreground">{milestone?.eta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactAssessment;