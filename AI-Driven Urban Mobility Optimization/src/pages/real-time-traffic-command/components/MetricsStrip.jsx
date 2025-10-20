import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MetricsStrip = () => {
  const [metrics, setMetrics] = useState({});
  const [timeRange, setTimeRange] = useState('1h');

  const mockMetrics = {
    averageSpeed: {
      current: 28.5,
      previous: 31.2,
      unit: 'mph',
      trend: 'down',
      sparkline: [32, 31, 29, 28, 30, 29, 28.5],
      target: 35,
      status: 'warning'
    },
    incidentCount: {
      current: 7,
      previous: 4,
      unit: 'active',
      trend: 'up',
      sparkline: [2, 3, 4, 6, 5, 6, 7],
      target: 3,
      status: 'critical'
    },
    signalEfficiency: {
      current: 87.3,
      previous: 89.1,
      unit: '%',
      trend: 'down',
      sparkline: [90, 89, 88, 87, 88, 87, 87.3],
      target: 90,
      status: 'warning'
    },
    responseTime: {
      current: 4.2,
      previous: 3.8,
      unit: 'min',
      trend: 'up',
      sparkline: [3.5, 3.8, 4.1, 4.0, 3.9, 4.1, 4.2],
      target: 3.5,
      status: 'warning'
    },
    trafficVolume: {
      current: 15420,
      previous: 14890,
      unit: 'vehicles/h',
      trend: 'up',
      sparkline: [14500, 14800, 15100, 15000, 14900, 15200, 15420],
      target: 16000,
      status: 'good'
    },
    airQuality: {
      current: 68,
      previous: 72,
      unit: 'AQI',
      trend: 'down',
      sparkline: [75, 74, 72, 70, 69, 68, 68],
      target: 50,
      status: 'moderate'
    }
  };

  useEffect(() => {
    setMetrics(mockMetrics);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        averageSpeed: {
          ...prev?.averageSpeed,
          current: prev?.averageSpeed?.current + (Math.random() - 0.5) * 2
        },
        incidentCount: {
          ...prev?.incidentCount,
          current: Math.max(0, prev?.incidentCount?.current + Math.floor((Math.random() - 0.7) * 2))
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success border-success bg-success/10';
      case 'warning': return 'text-warning border-warning bg-warning/10';
      case 'critical': return 'text-error border-error bg-error/10';
      case 'moderate': return 'text-accent border-accent bg-accent/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend, isGoodWhenUp = true) => {
    const isPositive = isGoodWhenUp ? trend === 'up' : trend === 'down';
    return isPositive ? 'text-success' : 'text-error';
  };

  const formatNumber = (num, unit) => {
    if (unit === 'vehicles/h' && num >= 1000) {
      return `${(num / 1000)?.toFixed(1)}k`;
    }
    return num?.toFixed(1);
  };

  const renderSparkline = (data, color) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <svg width="60" height="20" className="opacity-60">
        <polyline
          points={data?.map((value, index) => 
            `${(index * 60) / (data?.length - 1)},${20 - ((value - min) / range) * 20}`
          )?.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          className="drop-shadow-sm"
        />
      </svg>
    );
  };

  const MetricCard = ({ title, metric, icon, isGoodWhenUp = true }) => {
    if (!metric) return null;

    const change = ((metric?.current - metric?.previous) / metric?.previous * 100)?.toFixed(1);
    const sparklineColor = getStatusColor(metric?.status)?.includes('success') ? '#00C851' : 
                          getStatusColor(metric?.status)?.includes('warning') ? '#FFB347' : '#FF4444';

    return (
      <div className={`bg-card border rounded-lg p-4 hover:shadow-elevated transition-operational ${getStatusColor(metric?.status)}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name={icon} size={18} className="text-current" />
            <span className="text-sm font-medium text-foreground">{title}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon 
              name={getTrendIcon(metric?.trend)} 
              size={14} 
              className={getTrendColor(metric?.trend, isGoodWhenUp)}
            />
            <span className={`text-xs font-medium ${getTrendColor(metric?.trend, isGoodWhenUp)}`}>
              {change}%
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground font-data">
              {formatNumber(metric?.current, metric?.unit)}
            </div>
            <div className="text-xs text-muted-foreground">
              {metric?.unit} • Target: {formatNumber(metric?.target, metric?.unit)}
            </div>
          </div>
          <div className="flex flex-col items-end">
            {renderSparkline(metric?.sparkline, sparklineColor)}
            <span className="text-xs text-muted-foreground mt-1">Last {timeRange}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background border-t border-operational p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Key Performance Metrics</h3>
          <div className="flex items-center space-x-1 ml-4">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live Updates</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Time Range:</span>
          {['15m', '1h', '4h', '24h']?.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-operational ${
                timeRange === range 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Avg Speed"
          metric={metrics?.averageSpeed}
          icon="Gauge"
          isGoodWhenUp={true}
        />
        <MetricCard
          title="Active Incidents"
          metric={metrics?.incidentCount}
          icon="AlertTriangle"
          isGoodWhenUp={false}
        />
        <MetricCard
          title="Signal Efficiency"
          metric={metrics?.signalEfficiency}
          icon="Traffic"
          isGoodWhenUp={true}
        />
        <MetricCard
          title="Response Time"
          metric={metrics?.responseTime}
          icon="Clock"
          isGoodWhenUp={false}
        />
        <MetricCard
          title="Traffic Volume"
          metric={metrics?.trafficVolume}
          icon="Car"
          isGoodWhenUp={true}
        />
        <MetricCard
          title="Air Quality"
          metric={metrics?.airQuality}
          icon="Wind"
          isGoodWhenUp={false}
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-operational">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>Last Updated: {new Date()?.toLocaleTimeString()}</span>
          <span>•</span>
          <span>Data Refresh: Every 5 seconds</span>
          <span>•</span>
          <span>System Status: Operational</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={16} className="text-muted-foreground" />
          <button className="text-xs text-muted-foreground hover:text-foreground transition-operational">
            Export Metrics
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetricsStrip;