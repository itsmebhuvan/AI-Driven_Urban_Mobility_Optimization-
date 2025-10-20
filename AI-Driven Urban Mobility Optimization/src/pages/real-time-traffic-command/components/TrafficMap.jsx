import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrafficMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [mapLayer, setMapLayer] = useState('traffic');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(12);

  const districts = [
    { id: 'all', name: 'All Districts', color: 'text-foreground' },
    { id: 'downtown', name: 'Downtown', color: 'text-primary' },
    { id: 'north', name: 'North District', color: 'text-secondary' },
    { id: 'south', name: 'South District', color: 'text-accent' },
    { id: 'east', name: 'East District', color: 'text-success' },
    { id: 'west', name: 'West District', color: 'text-warning' }
  ];

  const mapLayers = [
    { id: 'traffic', name: 'Traffic Flow', icon: 'Navigation' },
    { id: 'incidents', name: 'Incidents', icon: 'AlertTriangle' },
    { id: 'signals', name: 'Traffic Signals', icon: 'Traffic' },
    { id: 'construction', name: 'Construction', icon: 'Wrench' }
  ];

  const mockIncidents = [
    {
      id: 1,
      type: 'accident',
      severity: 'critical',
      lat: 40.7589,
      lng: -73.9851,
      title: 'Multi-Vehicle Collision',
      description: 'Three-car collision blocking two lanes on I-95 Northbound',
      estimatedClearTime: '45 minutes',
      unitsResponding: 3,
      trafficImpact: 'Severe delays, 2.3 mile backup'
    },
    {
      id: 2,
      type: 'congestion',
      severity: 'high',
      lat: 40.7614,
      lng: -73.9776,
      title: 'Heavy Congestion',
      description: 'Signal malfunction causing traffic backup',
      estimatedClearTime: '20 minutes',
      unitsResponding: 1,
      trafficImpact: 'Moderate delays, alternative routes recommended'
    },
    {
      id: 3,
      type: 'construction',
      severity: 'medium',
      lat: 40.7505,
      lng: -73.9934,
      title: 'Road Maintenance',
      description: 'Lane closure for pothole repair',
      estimatedClearTime: '2 hours',
      unitsResponding: 2,
      trafficImpact: 'Minor delays, one lane affected'
    }
  ];

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 8));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error border-error text-error-foreground';
      case 'high': return 'bg-warning border-warning text-warning-foreground';
      case 'medium': return 'bg-accent border-accent text-accent-foreground';
      case 'low': return 'bg-success border-success text-success-foreground';
      default: return 'bg-muted border-border text-muted-foreground';
    }
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'accident': return 'Car';
      case 'congestion': return 'Clock';
      case 'construction': return 'Wrench';
      case 'weather': return 'Cloud';
      default: return 'AlertTriangle';
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border border-operational rounded-lg overflow-hidden">
      {/* Map Controls Header */}
      <div className="flex items-center justify-between p-4 border-b border-operational bg-muted/30">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Traffic Command Map</h3>
          </div>
          
          {/* District Selector */}
          <div className="flex items-center space-x-1">
            {districts?.map((district) => (
              <Button
                key={district?.id}
                variant={selectedDistrict === district?.id ? 'default' : 'ghost'}
                size="xs"
                onClick={() => setSelectedDistrict(district?.id)}
                className={district?.color}
              >
                {district?.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Layer Controls */}
        <div className="flex items-center space-x-2">
          {mapLayers?.map((layer) => (
            <Button
              key={layer?.id}
              variant={mapLayer === layer?.id ? 'default' : 'outline'}
              size="xs"
              iconName={layer?.icon}
              iconPosition="left"
              onClick={() => setMapLayer(layer?.id)}
            >
              {layer?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="flex-1 relative bg-muted">
        {/* Mock Map with Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Real-time Traffic Command Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7589,-73.9851&z=12&output=embed"
          className="w-full h-full"
        />

        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {/* Zoom Controls */}
          <div className="bg-card border border-operational rounded-lg shadow-elevated">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              className="rounded-b-none border-b border-operational"
            >
              <Icon name="Plus" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              className="rounded-t-none"
            >
              <Icon name="Minus" size={16} />
            </Button>
          </div>

          {/* Layer Legend */}
          <div className="bg-card border border-operational rounded-lg p-3 shadow-elevated">
            <h4 className="text-sm font-medium text-foreground mb-2">Traffic Flow</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-success rounded"></div>
                <span className="text-xs text-muted-foreground">Free Flow</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-warning rounded"></div>
                <span className="text-xs text-muted-foreground">Moderate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-error rounded"></div>
                <span className="text-xs text-muted-foreground">Congested</span>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {mockIncidents?.map((incident) => (
            <div
              key={incident?.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${30 + incident?.id * 15}%`,
                top: `${25 + incident?.id * 10}%`
              }}
              onClick={() => handleIncidentClick(incident)}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-elevated animate-pulse ${getSeverityColor(incident?.severity)}`}>
                <Icon name={getIncidentIcon(incident?.type)} size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Incident Details Popup */}
        {selectedIncident && (
          <div className="absolute bottom-4 left-4 w-80 bg-popover border border-operational rounded-lg shadow-modal p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${getSeverityColor(selectedIncident?.severity)}`}>
                  <Icon name={getIncidentIcon(selectedIncident?.type)} size={14} />
                </div>
                <h4 className="font-semibold text-foreground">{selectedIncident?.title}</h4>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedIncident(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-popover-foreground">{selectedIncident?.description}</p>
              
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-operational">
                <div>
                  <span className="text-muted-foreground">Est. Clear Time:</span>
                  <p className="font-medium text-foreground">{selectedIncident?.estimatedClearTime}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Units Responding:</span>
                  <p className="font-medium text-foreground">{selectedIncident?.unitsResponding}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-operational">
                <span className="text-muted-foreground">Traffic Impact:</span>
                <p className="font-medium text-foreground">{selectedIncident?.trafficImpact}</p>
              </div>

              <div className="flex space-x-2 pt-3">
                <Button variant="default" size="sm" fullWidth>
                  Dispatch Unit
                </Button>
                <Button variant="outline" size="sm" fullWidth>
                  Update Status
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Connection Status */}
        <div className="absolute bottom-4 right-4 bg-card border border-operational rounded-lg px-3 py-2 shadow-elevated">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live Data Active</span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-xs text-muted-foreground">Zoom: {zoomLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;