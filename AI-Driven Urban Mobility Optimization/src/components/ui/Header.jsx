import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/real-time-traffic-command');
  const [systemStatus, setSystemStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [incidentCount, setIncidentCount] = useState(3);
  const [userRole, setUserRole] = useState('Traffic Operator');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigationItems = [
    {
      label: 'Command Center',
      path: '/real-time-traffic-command',
      icon: 'Monitor',
      description: 'Real-time city-wide traffic monitoring'
    },
    {
      label: 'Incident Response',
      path: '/incident-response-center',
      icon: 'AlertTriangle',
      description: 'Emergency coordination and crisis management',
      badge: incidentCount > 0 ? incidentCount : null
    },
    {
      label: 'Analytics',
      path: '/traffic-analytics-hub',
      icon: 'BarChart3',
      description: 'Strategic traffic analysis and planning'
    },
    {
      label: 'Executive',
      path: '/executive-dashboard',
      icon: 'TrendingUp',
      description: 'High-level performance insights'
    }
  ];

  const userRoles = [
    'Traffic Operator',
    'Urban Planner',
    'Municipal Official',
    'Emergency Coordinator'
  ];

  useEffect(() => {
    setActiveTab(location?.pathname);
  }, [location?.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (path) => {
    setActiveTab(path);
    window.location.href = path;
  };

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (systemStatus) {
      case 'connected': return 'Wifi';
      case 'warning': return 'WifiOff';
      case 'error': return 'AlertCircle';
      default: return 'Loader';
    }
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
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-operational h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Navigation" size={24} color="var(--color-primary-foreground)" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground font-heading">
              Urban Mobility Intelligence
            </h1>
            <span className="text-xs text-muted-foreground font-data">
              Traffic Management System
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleTabClick(item?.path)}
              className={`
                relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-operational
                ${activeTab === item?.path 
                  ? 'bg-primary text-primary-foreground shadow-elevated' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              title={item?.description}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className={activeTab === item?.path ? 'text-primary-foreground' : 'text-current'} 
              />
              <span className="font-medium text-sm">{item?.label}</span>
              {item?.badge && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold bg-error text-error-foreground rounded-full animate-pulse-glow">
                  {item?.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* System Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-lg">
            <Icon 
              name={getStatusIcon()} 
              size={16} 
              className={`${getStatusColor()} ${systemStatus === 'connected' ? '' : 'animate-pulse'}`}
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground">
                {systemStatus === 'connected' ? 'Online' : 
                 systemStatus === 'warning' ? 'Degraded' : 'Offline'}
              </span>
              <span className="text-xs text-muted-foreground font-data">
                {formatTime(lastUpdate)}
              </span>
            </div>
          </div>

          {/* User Context Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg hover:bg-card transition-operational"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-secondary-foreground)" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">{userRole}</span>
                <span className="text-xs text-muted-foreground">Active Role</span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-muted-foreground transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-operational rounded-lg shadow-modal z-200">
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-operational">
                    Switch Role
                  </div>
                  {userRoles?.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setUserRole(role);
                        setShowUserMenu(false);
                      }}
                      className={`
                        w-full text-left px-3 py-2 text-sm rounded-md transition-operational
                        ${role === userRole 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-popover-foreground hover:bg-muted'
                        }
                      `}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;