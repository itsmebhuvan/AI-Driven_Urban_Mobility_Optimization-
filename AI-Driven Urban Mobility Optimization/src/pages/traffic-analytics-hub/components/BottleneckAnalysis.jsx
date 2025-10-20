import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BottleneckAnalysis = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('current');
  const [viewMode, setViewMode] = useState('list');

  const bottleneckData = [
    {
      id: 'btn-001',
      location: 'Main St & 5th Ave Intersection',
      severity: 'critical',
      delayTime: '8.5 min',
      affectedVehicles: 1250,
      congestionScore: 95,
      causes: ['Signal timing', 'Lane closure', 'High volume'],
      estimatedImpact: '$12,400/hr',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      trend: 'increasing',
      duration: '2h 15m',
      recommendations: [
        'Optimize signal timing',
        'Deploy traffic officers',
        'Implement dynamic lane management'
      ]
    },
    {
      id: 'btn-002',
      location: 'Highway 101 Exit Ramp',
      severity: 'high',
      delayTime: '6.2 min',
      affectedVehicles: 890,
      congestionScore: 78,
      causes: ['Merge conflicts', 'Construction'],
      estimatedImpact: '$8,900/hr',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      trend: 'stable',
      duration: '1h 45m',
      recommendations: [
        'Adjust merge signage',
        'Temporary traffic control',
        'Alternative route guidance'
      ]
    },
    {
      id: 'btn-003',
      location: 'Business District Bridge',
      severity: 'moderate',
      delayTime: '4.1 min',
      affectedVehicles: 650,
      congestionScore: 62,
      causes: ['Peak hour volume', 'Weather conditions'],
      estimatedImpact: '$5,200/hr',
      coordinates: { lat: 40.7614, lng: -73.9776 },
      trend: 'decreasing',
      duration: '45m',
      recommendations: [
        'Monitor weather impact',
        'Encourage off-peak travel',
        'Public transport promotion'
      ]
    },
    {
      id: 'btn-004',
      location: 'Industrial Zone Roundabout',
      severity: 'high',
      delayTime: '7.3 min',
      affectedVehicles: 720,
      congestionScore: 82,
      causes: ['Heavy truck traffic', 'Poor visibility'],
      estimatedImpact: '$9,800/hr',
      coordinates: { lat: 40.7282, lng: -74.0776 },
      trend: 'increasing',
      duration: '3h 20m',
      recommendations: [
        'Truck route optimization',
        'Improve lighting',
        'Enhanced signage'
      ]
    },
    {
      id: 'btn-005',
      location: 'Airport Access Tunnel',
      severity: 'moderate',
      delayTime: '3.8 min',
      affectedVehicles: 480,
      congestionScore: 58,
      causes: ['Tourist traffic', 'Lane restrictions'],
      estimatedImpact: '$4,100/hr',
      coordinates: { lat: 40.6413, lng: -73.7781 },
      trend: 'stable',
      duration: '1h 10m',
      recommendations: [
        'Dynamic lane allocation',
        'Tourist traffic guidance',
        'Real-time information displays'
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'moderate': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'high': return 'bg-warning/10 border-warning/20';
      case 'moderate': return 'bg-success/10 border-success/20';
      default: return 'bg-muted/10 border-muted/20';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': return 'text-error';
      case 'decreasing': return 'text-success';
      case 'stable': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const timeframeOptions = [
    { value: 'current', label: 'Current' },
    { value: 'last-hour', label: 'Last Hour' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' }
  ];

  return (
    <div className="bg-card border border-operational rounded-lg">
      <div className="p-6 border-b border-operational">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Bottleneck Identification</h3>
            <p className="text-sm text-muted-foreground">Critical congestion points and optimization opportunities</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {timeframeOptions?.map(option => (
                <button
                  key={option?.value}
                  onClick={() => setSelectedTimeframe(option?.value)}
                  className={`
                    px-3 py-1 text-sm rounded-md transition-operational
                    ${selectedTimeframe === option?.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  {option?.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`
                  p-2 rounded-md transition-operational
                  ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                <Icon name="List" size={16} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`
                  p-2 rounded-md transition-operational
                  ${viewMode === 'map' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                <Icon name="Map" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-error font-data">3</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning font-data">2</div>
            <div className="text-xs text-muted-foreground">High</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success font-data">1</div>
            <div className="text-xs text-muted-foreground">Moderate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary font-data">$40.4K</div>
            <div className="text-xs text-muted-foreground">Total Impact/hr</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {bottleneckData?.map((bottleneck, index) => (
              <div 
                key={bottleneck?.id} 
                className={`
                  border rounded-lg p-4 transition-operational hover:shadow-elevated
                  ${getSeverityBg(bottleneck?.severity)}
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg text-sm font-bold text-primary">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{bottleneck?.location}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Duration: {bottleneck?.duration}</span>
                        <span>•</span>
                        <span>Delay: {bottleneck?.delayTime}</span>
                        <span>•</span>
                        <span>{bottleneck?.affectedVehicles} vehicles affected</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className={`text-sm font-semibold capitalize ${getSeverityColor(bottleneck?.severity)}`}>
                        {bottleneck?.severity}
                      </div>
                      <div className="text-xs text-muted-foreground">Score: {bottleneck?.congestionScore}</div>
                    </div>
                    <div className={`flex items-center space-x-1 ${getTrendColor(bottleneck?.trend)}`}>
                      <Icon name={getTrendIcon(bottleneck?.trend)} size={16} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Causes */}
                  <div>
                    <h5 className="text-xs font-medium text-muted-foreground mb-2">Primary Causes</h5>
                    <div className="flex flex-wrap gap-1">
                      {bottleneck?.causes?.map((cause, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-muted text-xs text-foreground rounded-md"
                        >
                          {cause}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div>
                    <h5 className="text-xs font-medium text-muted-foreground mb-2">Economic Impact</h5>
                    <div className="text-lg font-bold text-foreground font-data">{bottleneck?.estimatedImpact}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="outline" size="sm" iconName="MapPin">
                      View on Map
                    </Button>
                    <Button variant="outline" size="sm" iconName="Zap">
                      Quick Fix
                    </Button>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mt-4 pt-4 border-t border-operational">
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Recommended Actions</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {bottleneck?.recommendations?.map((rec, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-foreground">
                        <Icon name="CheckCircle" size={14} className="text-success" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="Map" size={48} className="text-muted-foreground mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Interactive Bottleneck Map</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Visualize congestion hotspots and their real-time impact across the city
              </p>
              <Button variant="outline" iconName="ExternalLink">
                Open Full Map View
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-muted border-t border-operational">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Last updated: 2 minutes ago • Auto-refresh: ON
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottleneckAnalysis;