import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyMap = ({ incidents, emergencyVehicles, selectedIncident, onIncidentSelect }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoomLevel, setZoomLevel] = useState(12);
  const [showTrafficLayer, setShowTrafficLayer] = useState(true);
  const [showClosures, setShowClosures] = useState(true);

  const roadClosures = [
    {
      id: 'closure-1',
      name: 'Broadway & 42nd St',
      reason: 'Major accident cleanup',
      estimatedClearance: '45 minutes',
      coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    {
      id: 'closure-2',
      name: 'FDR Drive Southbound',
      reason: 'Emergency vehicle access',
      estimatedClearance: '20 minutes',
      coordinates: { lat: 40.7505, lng: -73.9734 }
    }
  ];

  useEffect(() => {
    if (selectedIncident) {
      setMapCenter({
        lat: selectedIncident?.coordinates?.lat,
        lng: selectedIncident?.coordinates?.lng
      });
      setZoomLevel(15);
    }
  }, [selectedIncident]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#FF4444';
      case 'high': return '#FFB347';
      case 'medium': return '#4A90E2';
      case 'low': return '#00C851';
      default: return '#B8C5D6';
    }
  };

  const getVehicleStatusColor = (status) => {
    switch (status) {
      case 'responding': return '#00D4FF';
      case 'on-scene': return '#FF6B35';
      case 'available': return '#00C851';
      case 'unavailable': return '#FF4444';
      default: return '#B8C5D6';
    }
  };

  return (
    <div className="h-full bg-card rounded-lg border border-operational overflow-hidden">
      {/* Map Controls */}
      <div className="flex items-center justify-between p-4 border-b border-operational">
        <h3 className="text-lg font-semibold text-foreground">Emergency Operations Map</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowTrafficLayer(!showTrafficLayer)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-operational ${
              showTrafficLayer 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Traffic Layer
          </button>
          <button
            onClick={() => setShowClosures(!showClosures)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-operational ${
              showClosures 
                ? 'bg-warning text-warning-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Road Closures
          </button>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 18))}
              className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-md flex items-center justify-center transition-operational"
            >
              <Icon name="Plus" size={16} className="text-foreground" />
            </button>
            <button
              onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 8))}
              className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-md flex items-center justify-center transition-operational"
            >
              <Icon name="Minus" size={16} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-[calc(100%-80px)] bg-background">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Emergency Operations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
          className="absolute inset-0"
        />

        {/* Overlay Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Incident Markers */}
          {incidents?.map((incident, index) => (
            <div
              key={incident?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index % 5) * 15}%`,
                top: `${30 + Math.floor(index / 5) * 20}%`
              }}
              onClick={() => onIncidentSelect(incident)}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  selectedIncident?.id === incident?.id ? 'ring-2 ring-primary' : ''
                }`}
                style={{ backgroundColor: getSeverityColor(incident?.severity) }}
              >
                <Icon name="AlertTriangle" size={12} color="white" />
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-operational rounded-md px-2 py-1 shadow-modal min-w-max">
                <div className="text-xs font-medium text-popover-foreground">{incident?.title}</div>
                <div className="text-xs text-muted-foreground">{incident?.location}</div>
              </div>
            </div>
          ))}

          {/* Emergency Vehicle Markers */}
          {emergencyVehicles?.map((vehicle, index) => (
            <div
              key={vehicle?.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${25 + (index % 4) * 20}%`,
                top: `${40 + Math.floor(index / 4) * 15}%`
              }}
            >
              <div
                className="w-4 h-4 rounded-sm border border-white shadow-lg flex items-center justify-center"
                style={{ backgroundColor: getVehicleStatusColor(vehicle?.status) }}
              >
                <Icon name="Truck" size={8} color="white" />
              </div>
            </div>
          ))}

          {/* Road Closure Markers */}
          {showClosures && roadClosures?.map((closure, index) => (
            <div
              key={closure?.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${60 + (index % 3) * 15}%`,
                top: `${25 + Math.floor(index / 3) * 25}%`
              }}
            >
              <div className="w-6 h-6 bg-warning rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <Icon name="X" size={12} color="var(--color-warning-foreground)" />
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-operational rounded-md px-2 py-1 shadow-modal min-w-max">
                <div className="text-xs font-medium text-popover-foreground">{closure?.name}</div>
                <div className="text-xs text-muted-foreground">{closure?.reason}</div>
                <div className="text-xs text-warning">ETA: {closure?.estimatedClearance}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-popover border border-operational rounded-lg p-3 shadow-modal">
          <h4 className="text-sm font-medium text-popover-foreground mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <span className="text-xs text-muted-foreground">Critical Incident</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-xs text-muted-foreground">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-primary"></div>
              <span className="text-xs text-muted-foreground">Emergency Vehicle</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning border border-white"></div>
              <span className="text-xs text-muted-foreground">Road Closure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyMap;