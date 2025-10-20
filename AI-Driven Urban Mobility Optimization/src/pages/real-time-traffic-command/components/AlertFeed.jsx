import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertFeed = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  const mockAlerts = [
    {
      id: 1,
      severity: 'critical',
      type: 'accident',
      title: 'Multi-Vehicle Collision',
      location: 'I-95 Northbound, Mile 42',
      timestamp: new Date(Date.now() - 300000),
      description: 'Three-car collision blocking two lanes. Emergency services dispatched.',
      status: 'active',
      responseTime: '00:05:23',
      units: ['Unit-7', 'EMS-12']
    },
    {
      id: 2,
      severity: 'high',
      type: 'congestion',
      title: 'Heavy Traffic Congestion',
      location: 'Downtown Core - 5th & Main',
      timestamp: new Date(Date.now() - 600000),
      description: 'Traffic backup extending 2.3 miles due to signal malfunction.',
      status: 'responding',
      responseTime: '00:10:45',
      units: ['Tech-3']
    },
    {
      id: 3,
      severity: 'medium',
      type: 'signal',
      title: 'Traffic Signal Malfunction',
      location: 'Oak Street & 2nd Avenue',
      timestamp: new Date(Date.now() - 900000),
      description: 'Signal stuck on red phase. Manual override activated.',
      status: 'resolved',
      responseTime: '00:15:12',
      units: ['Tech-1']
    },
    {
      id: 4,
      severity: 'low',
      type: 'maintenance',
      title: 'Scheduled Road Maintenance',
      location: 'Highway 101 - Lane 3',
      timestamp: new Date(Date.now() - 1200000),
      description: 'Routine pothole repair causing minor delays.',
      status: 'scheduled',
      responseTime: '02:30:00',
      units: ['Maint-5']
    },
    {
      id: 5,
      severity: 'critical',
      type: 'weather',
      title: 'Severe Weather Alert',
      location: 'City-wide - All Districts',
      timestamp: new Date(Date.now() - 1800000),
      description: 'Heavy rainfall causing reduced visibility and slippery conditions.',
      status: 'monitoring',
      responseTime: 'N/A',
      units: ['Weather-1']
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error border-error bg-error/10';
      case 'high': return 'text-warning border-warning bg-warning/10';
      case 'medium': return 'text-accent border-accent bg-accent/10';
      case 'low': return 'text-success border-success bg-success/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'accident': return 'Car';
      case 'congestion': return 'Clock';
      case 'signal': return 'Traffic';
      case 'maintenance': return 'Wrench';
      case 'weather': return 'Cloud';
      default: return 'AlertTriangle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-error';
      case 'responding': return 'text-warning';
      case 'resolved': return 'text-success';
      case 'scheduled': return 'text-secondary';
      case 'monitoring': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.severity === filter);

  const handleQuickResponse = (alertId, action) => {
    console.log(`Quick response: ${action} for alert ${alertId}`);
  };

  return (
    <div className="h-full flex flex-col bg-card border border-operational rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-operational">
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Live Alerts</h3>
          <span className="px-2 py-1 text-xs font-medium bg-error text-error-foreground rounded-full">
            {alerts?.filter(a => a?.status === 'active')?.length}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'critical' ? 'destructive' : 'ghost'}
            size="xs"
            onClick={() => setFilter('critical')}
          >
            Critical
          </Button>
          <Button
            variant={filter === 'high' ? 'warning' : 'ghost'}
            size="xs"
            onClick={() => setFilter('high')}
          >
            High
          </Button>
        </div>
      </div>
      {/* Alert List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-4 border-b border-operational hover:bg-muted/50 transition-operational ${getSeverityColor(alert?.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getTypeIcon(alert?.type)} 
                  size={16} 
                  className="text-current" 
                />
                <span className="text-sm font-medium text-foreground">
                  {alert?.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTime(alert?.timestamp)}
              </span>
            </div>

            <div className="mb-2">
              <p className="text-xs text-muted-foreground mb-1">
                {alert?.location}
              </p>
              <p className="text-sm text-foreground">
                {alert?.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {alert?.responseTime}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {alert?.units?.join(', ')}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium ${getStatusColor(alert?.status)}`}>
                  {alert?.status?.toUpperCase()}
                </span>
                {alert?.status === 'active' && (
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleQuickResponse(alert?.id, 'respond')}
                  >
                    Respond
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-operational bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live Feed Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertFeed;