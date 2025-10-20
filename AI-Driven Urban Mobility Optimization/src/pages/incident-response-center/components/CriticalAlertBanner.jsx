import React from 'react';
import Icon from '../../../components/AppIcon';

const CriticalAlertBanner = ({ activeIncidents }) => {
  const criticalIncident = activeIncidents?.find(incident => incident?.severity === 'critical');
  
  if (!criticalIncident) return null;

  const getElapsedTime = (timestamp) => {
    const now = new Date();
    const incident = new Date(timestamp);
    const diff = Math.floor((now - incident) / 1000 / 60);
    return `${diff}m`;
  };

  return (
    <div className="w-full bg-error border-l-4 border-error p-4 mb-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 bg-error-foreground rounded-full">
            <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-error-foreground">
              CRITICAL INCIDENT ACTIVE
            </h2>
            <p className="text-error-foreground opacity-90">
              {criticalIncident?.title} - {criticalIncident?.location}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-error-foreground">
          <div className="text-center">
            <div className="text-2xl font-bold font-data">
              {getElapsedTime(criticalIncident?.timestamp)}
            </div>
            <div className="text-xs opacity-80">ELAPSED</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-data">
              {criticalIncident?.impactRadius}km
            </div>
            <div className="text-xs opacity-80">IMPACT</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-data">
              {criticalIncident?.resourcesDeployed}
            </div>
            <div className="text-xs opacity-80">UNITS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriticalAlertBanner;