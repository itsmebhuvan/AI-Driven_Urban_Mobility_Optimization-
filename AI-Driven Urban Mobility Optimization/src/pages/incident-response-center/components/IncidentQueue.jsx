import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentQueue = ({ incidents, onIncidentSelect, selectedIncident, onEscalate, onAssignResource }) => {
  const [filter, setFilter] = useState('all');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'responding': return 'Navigation';
      case 'resolved': return 'CheckCircle2';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  const filteredIncidents = incidents?.filter(incident => {
    if (filter === 'all') return true;
    return incident?.severity === filter;
  });

  const getElapsedTime = (timestamp) => {
    const now = new Date();
    const incident = new Date(timestamp);
    const diff = Math.floor((now - incident) / 1000 / 60);
    if (diff < 60) return `${diff}m`;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="h-full bg-card rounded-lg border border-operational p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Incident Queue</h3>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="bg-input border border-operational rounded-md px-3 py-1 text-sm text-foreground"
          >
            <option value="all">All Incidents</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredIncidents?.map((incident) => (
          <div
            key={incident?.id}
            onClick={() => onIncidentSelect(incident)}
            className={`
              p-4 rounded-lg border cursor-pointer transition-operational
              ${selectedIncident?.id === incident?.id 
                ? 'border-primary bg-primary/10' :'border-operational hover:border-primary/50 hover:bg-muted/50'
              }
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident?.severity)}`}>
                  <Icon name={getSeverityIcon(incident?.severity)} size={12} className="inline mr-1" />
                  {incident?.severity?.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground font-data">
                  ID: {incident?.id}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name={getStatusIcon(incident?.status)} size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {getElapsedTime(incident?.timestamp)}
                </span>
              </div>
            </div>

            <h4 className="font-medium text-foreground mb-1">{incident?.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{incident?.location}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Score: {incident?.severityScore}</span>
                <span>Resources: {incident?.resourcesDeployed}</span>
                <span>ETA: {incident?.eta}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="xs"
                  iconName="ArrowUp"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onEscalate(incident?.id);
                  }}
                >
                  Escalate
                </Button>
                <Button
                  variant="secondary"
                  size="xs"
                  iconName="Users"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onAssignResource(incident?.id);
                  }}
                >
                  Assign
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentQueue;