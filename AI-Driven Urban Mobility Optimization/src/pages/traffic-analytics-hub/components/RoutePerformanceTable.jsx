import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoutePerformanceTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'efficiency', direction: 'desc' });
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  const routeData = [
    {
      id: 'rt-001',
      name: 'Downtown Express',
      avgTravelTime: '18.5 min',
      efficiency: 92,
      congestionLevel: 'Low',
      throughput: '2,450 veh/hr',
      incidents: 2,
      status: 'optimal',
      trend: 'up',
      lastUpdated: '2 min ago'
    },
    {
      id: 'rt-002',
      name: 'Highway 101 North',
      avgTravelTime: '25.2 min',
      efficiency: 78,
      congestionLevel: 'Moderate',
      throughput: '3,200 veh/hr',
      incidents: 5,
      status: 'warning',
      trend: 'down',
      lastUpdated: '1 min ago'
    },
    {
      id: 'rt-003',
      name: 'Business District Loop',
      avgTravelTime: '22.8 min',
      efficiency: 85,
      congestionLevel: 'Low',
      throughput: '1,890 veh/hr',
      incidents: 1,
      status: 'optimal',
      trend: 'stable',
      lastUpdated: '3 min ago'
    },
    {
      id: 'rt-004',
      name: 'Industrial Corridor',
      avgTravelTime: '31.7 min',
      efficiency: 65,
      congestionLevel: 'High',
      throughput: '2,100 veh/hr',
      incidents: 8,
      status: 'critical',
      trend: 'down',
      lastUpdated: '1 min ago'
    },
    {
      id: 'rt-005',
      name: 'Residential Connector',
      avgTravelTime: '15.3 min',
      efficiency: 88,
      congestionLevel: 'Low',
      throughput: '1,650 veh/hr',
      incidents: 0,
      status: 'optimal',
      trend: 'up',
      lastUpdated: '4 min ago'
    },
    {
      id: 'rt-006',
      name: 'Airport Access Road',
      avgTravelTime: '28.9 min',
      efficiency: 72,
      congestionLevel: 'Moderate',
      throughput: '2,800 veh/hr',
      incidents: 4,
      status: 'warning',
      trend: 'stable',
      lastUpdated: '2 min ago'
    }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...routeData];
    if (sortConfig?.key) {
      sortableData?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        // Handle numeric values
        if (sortConfig?.key === 'efficiency' || sortConfig?.key === 'incidents') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [routeData, sortConfig]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'optimal': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      case 'stable': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getCongestionColor = (level) => {
    switch (level) {
      case 'Low': return 'text-success';
      case 'Moderate': return 'text-warning';
      case 'High': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const toggleRouteSelection = (routeId) => {
    setSelectedRoutes(prev => 
      prev?.includes(routeId) 
        ? prev?.filter(id => id !== routeId)
        : [...prev, routeId]
    );
  };

  const selectAllRoutes = () => {
    if (selectedRoutes?.length === routeData?.length) {
      setSelectedRoutes([]);
    } else {
      setSelectedRoutes(routeData?.map(route => route?.id));
    }
  };

  return (
    <div className="bg-card border border-operational rounded-lg">
      <div className="p-6 border-b border-operational">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Route Performance Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Real-time efficiency metrics and rankings</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-operational">
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedRoutes?.length === routeData?.length}
                  onChange={selectAllRoutes}
                  className="w-4 h-4 rounded border-operational"
                />
              </th>
              <th 
                className="text-left p-4 cursor-pointer hover:bg-muted transition-operational"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-foreground">Route Name</span>
                  <Icon 
                    name={sortConfig?.key === 'name' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="text-muted-foreground" 
                  />
                </div>
              </th>
              <th 
                className="text-left p-4 cursor-pointer hover:bg-muted transition-operational"
                onClick={() => handleSort('efficiency')}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-foreground">Efficiency</span>
                  <Icon 
                    name={sortConfig?.key === 'efficiency' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="text-muted-foreground" 
                  />
                </div>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Travel Time</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Congestion</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Throughput</span>
              </th>
              <th 
                className="text-left p-4 cursor-pointer hover:bg-muted transition-operational"
                onClick={() => handleSort('incidents')}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-foreground">Incidents</span>
                  <Icon 
                    name={sortConfig?.key === 'incidents' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="text-muted-foreground" 
                  />
                </div>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Status</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Trend</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((route, index) => (
              <tr 
                key={route?.id} 
                className={`
                  border-b border-operational hover:bg-muted/50 transition-operational
                  ${selectedRoutes?.includes(route?.id) ? 'bg-primary/5' : ''}
                `}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRoutes?.includes(route?.id)}
                    onChange={() => toggleRouteSelection(route?.id)}
                    className="w-4 h-4 rounded border-operational"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg text-xs font-bold text-primary">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{route?.name}</div>
                      <div className="text-xs text-muted-foreground font-data">{route?.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          route?.efficiency >= 85 ? 'bg-success' :
                          route?.efficiency >= 70 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${route?.efficiency}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground font-data">{route?.efficiency}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground font-data">{route?.avgTravelTime}</span>
                </td>
                <td className="p-4">
                  <span className={`text-sm font-medium ${getCongestionColor(route?.congestionLevel)}`}>
                    {route?.congestionLevel}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground font-data">{route?.throughput}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    {route?.incidents > 0 && (
                      <Icon name="AlertTriangle" size={14} className="text-warning" />
                    )}
                    <span className="text-sm text-foreground font-data">{route?.incidents}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getStatusIcon(route?.status)} 
                      size={16} 
                      className={getStatusColor(route?.status)} 
                    />
                    <span className={`text-sm font-medium capitalize ${getStatusColor(route?.status)}`}>
                      {route?.status}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getTrendIcon(route?.trend)} 
                      size={14} 
                      className={getTrendColor(route?.trend)} 
                    />
                    <span className="text-xs text-muted-foreground">{route?.lastUpdated}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedRoutes?.length > 0 && (
        <div className="p-4 bg-muted border-t border-operational">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedRoutes?.length} route{selectedRoutes?.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="BarChart3">
                Compare
              </Button>
              <Button variant="outline" size="sm" iconName="Settings">
                Optimize
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutePerformanceTable;