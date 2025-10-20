import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceDashboard = ({ emergencyVehicles, trafficSignals, communicationLogs, onOverrideSignal, onContactUnit }) => {
  const [activeTab, setActiveTab] = useState('vehicles');

  const getVehicleStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'responding': return 'text-primary';
      case 'on-scene': return 'text-warning';
      case 'unavailable': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getVehicleStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'responding': return 'Navigation';
      case 'on-scene': return 'MapPin';
      case 'unavailable': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getSignalStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success';
      case 'override': return 'text-warning';
      case 'emergency': return 'text-error';
      case 'maintenance': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const vehiclesByStatus = emergencyVehicles?.reduce((acc, vehicle) => {
    acc[vehicle.status] = (acc?.[vehicle?.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="h-full bg-card rounded-lg border border-operational">
      {/* Header */}
      <div className="p-4 border-b border-operational">
        <h3 className="text-lg font-semibold text-foreground mb-3">Resource Management</h3>
        <div className="flex space-x-1">
          {[
            { id: 'vehicles', label: 'Vehicles', icon: 'Truck' },
            { id: 'signals', label: 'Signals', icon: 'Traffic' },
            { id: 'comms', label: 'Comms', icon: 'Radio' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-operational
                ${activeTab === tab?.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-4 h-[calc(100%-120px)] overflow-y-auto">
        {activeTab === 'vehicles' && (
          <div className="space-y-4">
            {/* Status Summary */}
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(vehiclesByStatus)?.map(([status, count]) => (
                <div key={status} className="bg-muted rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize">{status}</span>
                    <Icon 
                      name={getVehicleStatusIcon(status)} 
                      size={16} 
                      className={getVehicleStatusColor(status)} 
                    />
                  </div>
                  <div className="text-2xl font-bold text-foreground font-data">{count}</div>
                </div>
              ))}
            </div>

            {/* Vehicle List */}
            <div className="space-y-2">
              {emergencyVehicles?.map((vehicle) => (
                <div key={vehicle?.id} className="bg-muted rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Truck" size={16} className="text-muted-foreground" />
                      <span className="font-medium text-foreground">{vehicle?.callSign}</span>
                      <span className="text-xs text-muted-foreground">({vehicle?.type})</span>
                    </div>
                    <Icon 
                      name={getVehicleStatusIcon(vehicle?.status)} 
                      size={16} 
                      className={getVehicleStatusColor(vehicle?.status)} 
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {vehicle?.location} • ETA: {vehicle?.eta}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Last Update: {formatTime(vehicle?.lastUpdate)}
                    </span>
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="Radio"
                      onClick={() => onContactUnit(vehicle?.id)}
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'signals' && (
          <div className="space-y-3">
            {trafficSignals?.map((signal) => (
              <div key={signal?.id} className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Traffic" size={16} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{signal?.intersection}</span>
                  </div>
                  <Icon 
                    name="Circle" 
                    size={12} 
                    className={getSignalStatusColor(signal?.status)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Status: <span className="capitalize">{signal?.status}</span>
                    {signal?.overrideActive && (
                      <span className="ml-2 text-warning">• Override Active</span>
                    )}
                  </div>
                  <Button
                    variant={signal?.overrideActive ? "warning" : "outline"}
                    size="xs"
                    iconName={signal?.overrideActive ? "Square" : "Play"}
                    onClick={() => onOverrideSignal(signal?.id)}
                  >
                    {signal?.overrideActive ? 'Stop' : 'Override'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'comms' && (
          <div className="space-y-3">
            {communicationLogs?.map((log) => (
              <div key={log?.id} className="bg-muted rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Radio" size={16} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{log?.unit}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(log?.timestamp)}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    log?.priority === 'high' ? 'bg-error text-error-foreground' :
                    log?.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                    'bg-success text-success-foreground'
                  }`}>
                    {log?.priority?.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{log?.message}</p>
                {log?.response && (
                  <div className="mt-2 pl-4 border-l-2 border-primary">
                    <p className="text-sm text-foreground">{log?.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDashboard;