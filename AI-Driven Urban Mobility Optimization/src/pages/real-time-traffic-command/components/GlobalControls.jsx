import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GlobalControls = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(15);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const districtOptions = [
    { value: 'all', label: 'All Districts' },
    { value: 'downtown', label: 'Downtown Core' },
    { value: 'north', label: 'North District' },
    { value: 'south', label: 'South District' },
    { value: 'east', label: 'East District' },
    { value: 'west', label: 'West District' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical Only' },
    { value: 'high', label: 'High & Critical' },
    { value: 'medium', label: 'Medium & Above' }
  ];

  const refreshIntervalOptions = [
    { value: 5, label: '5 seconds' },
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' }
  ];

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        setLastUpdate(new Date());
        // Simulate occasional connection issues
        if (Math.random() < 0.05) {
          setConnectionStatus('warning');
          setTimeout(() => setConnectionStatus('connected'), 2000);
        }
      }, refreshInterval * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshInterval]);

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'Wifi';
      case 'warning': return 'WifiOff';
      case 'error': return 'AlertCircle';
      default: return 'Loader';
    }
  };

  const handleEmergencyMode = () => {
    console.log('Emergency mode activated');
    // Emergency mode logic would go here
  };

  const handleSystemReset = () => {
    console.log('System reset initiated');
    // System reset logic would go here
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-card border-b border-operational px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Filters */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="min-w-[180px]">
              <Select
                options={districtOptions}
                value={selectedDistrict}
                onChange={setSelectedDistrict}
                placeholder="Select District"
              />
            </div>

            <div className="min-w-[160px]">
              <Select
                options={severityOptions}
                value={severityFilter}
                onChange={setSeverityFilter}
                placeholder="Filter Severity"
              />
            </div>
          </div>

          <div className="h-6 w-px bg-border"></div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Zap"
              iconPosition="left"
              onClick={handleEmergencyMode}
            >
              Emergency Mode
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleSystemReset}
            >
              Reset View
            </Button>
          </div>
        </div>

        {/* Right Section - System Status & Controls */}
        <div className="flex items-center space-x-6">
          {/* Auto Refresh Controls */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-operational ${
                  autoRefresh 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-card'
                }`}
              >
                <Icon 
                  name={autoRefresh ? 'Play' : 'Pause'} 
                  size={14} 
                />
                <span className="text-sm font-medium">
                  {autoRefresh ? 'Auto' : 'Manual'}
                </span>
              </button>
            </div>

            {autoRefresh && (
              <div className="min-w-[120px]">
                <Select
                  options={refreshIntervalOptions}
                  value={refreshInterval}
                  onChange={setRefreshInterval}
                />
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-border"></div>

          {/* Connection Status */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getConnectionIcon()} 
                size={16} 
                className={`${getConnectionStatusColor()} ${connectionStatus !== 'connected' ? 'animate-pulse' : ''}`}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {connectionStatus === 'connected' ? 'Online' : 
                   connectionStatus === 'warning' ? 'Degraded' : 'Offline'}
                </span>
                <span className="text-xs text-muted-foreground font-data">
                  {formatTime(lastUpdate)}
                </span>
              </div>
            </div>

            {/* WebSocket Status Indicator */}
            <div className="flex items-center space-x-2 px-2 py-1 bg-muted rounded-md">
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-success animate-pulse' : 
                connectionStatus === 'warning' ? 'bg-warning' : 'bg-error'
              }`}></div>
              <span className="text-xs text-muted-foreground">
                WebSocket {connectionStatus === 'connected' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-border"></div>

          {/* System Info */}
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Database" size={14} />
              <span>1,247 sensors</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Activity" size={14} />
              <span>98.7% uptime</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>12 operators</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-3 pt-3 border-t border-operational">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>System Version: v2.4.1</span>
            <span>•</span>
            <span>Data Latency: &lt;200ms</span>
            <span>•</span>
            <span>Active Alerts: 7</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Current Time: {formatTime(new Date())}</span>
            <span>•</span>
            <span>Timezone: EST</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;