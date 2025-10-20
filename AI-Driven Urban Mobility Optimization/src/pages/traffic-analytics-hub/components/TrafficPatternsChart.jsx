import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';

import Button from '../../../components/ui/Button';

const TrafficPatternsChart = () => {
  const [chartType, setChartType] = useState('line');
  const [selectedMetrics, setSelectedMetrics] = useState(['traffic', 'weather']);

  const trafficData = [
    { time: '00:00', traffic: 120, weather: 85, congestion: 15, incidents: 2, temperature: 18 },
    { time: '02:00', traffic: 80, weather: 88, congestion: 8, incidents: 1, temperature: 16 },
    { time: '04:00', traffic: 60, weather: 90, congestion: 5, incidents: 0, temperature: 15 },
    { time: '06:00', traffic: 200, weather: 82, congestion: 25, incidents: 3, temperature: 17 },
    { time: '08:00', traffic: 450, weather: 75, congestion: 65, incidents: 8, temperature: 20 },
    { time: '10:00', traffic: 320, weather: 78, congestion: 45, incidents: 5, temperature: 23 },
    { time: '12:00', traffic: 380, weather: 70, congestion: 55, incidents: 6, temperature: 26 },
    { time: '14:00', traffic: 340, weather: 72, congestion: 50, incidents: 4, temperature: 28 },
    { time: '16:00', traffic: 420, weather: 68, congestion: 70, incidents: 9, temperature: 27 },
    { time: '18:00', traffic: 520, weather: 65, congestion: 85, incidents: 12, temperature: 25 },
    { time: '20:00', traffic: 380, weather: 70, congestion: 60, incidents: 7, temperature: 22 },
    { time: '22:00', traffic: 250, weather: 78, congestion: 35, incidents: 4, temperature: 20 }
  ];

  const chartTypes = [
    { type: 'line', icon: 'TrendingUp', label: 'Line Chart' },
    { type: 'bar', icon: 'BarChart3', label: 'Bar Chart' },
    { type: 'area', icon: 'Activity', label: 'Area Chart' },
    { type: 'composed', icon: 'Layers', label: 'Combined View' }
  ];

  const metrics = [
    { key: 'traffic', label: 'Traffic Volume', color: '#00D4FF', enabled: true },
    { key: 'weather', label: 'Weather Impact', color: '#4A90E2', enabled: true },
    { key: 'congestion', label: 'Congestion Level', color: '#FF6B35', enabled: false },
    { key: 'incidents', label: 'Incidents', color: '#FF4444', enabled: false },
    { key: 'temperature', label: 'Temperature', color: '#00C851', enabled: false }
  ];

  const toggleMetric = (metricKey) => {
    setSelectedMetrics(prev => 
      prev?.includes(metricKey) 
        ? prev?.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  const renderChart = () => {
    const commonProps = {
      data: trafficData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#B8C5D6" fontSize={12} />
            <YAxis stroke="#B8C5D6" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A1F2E', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#FFFFFF'
              }} 
            />
            <Legend />
            {selectedMetrics?.map(metric => {
              const metricConfig = metrics?.find(m => m?.key === metric);
              return (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={metricConfig?.color}
                  strokeWidth={2}
                  dot={{ fill: metricConfig?.color, strokeWidth: 2, r: 4 }}
                  name={metricConfig?.label}
                />
              );
            })}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#B8C5D6" fontSize={12} />
            <YAxis stroke="#B8C5D6" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A1F2E', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#FFFFFF'
              }} 
            />
            <Legend />
            {selectedMetrics?.map(metric => {
              const metricConfig = metrics?.find(m => m?.key === metric);
              return (
                <Bar
                  key={metric}
                  dataKey={metric}
                  fill={metricConfig?.color}
                  name={metricConfig?.label}
                />
              );
            })}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#B8C5D6" fontSize={12} />
            <YAxis stroke="#B8C5D6" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A1F2E', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#FFFFFF'
              }} 
            />
            <Legend />
            {selectedMetrics?.map(metric => {
              const metricConfig = metrics?.find(m => m?.key === metric);
              return (
                <Area
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stackId="1"
                  stroke={metricConfig?.color}
                  fill={metricConfig?.color}
                  fillOpacity={0.3}
                  name={metricConfig?.label}
                />
              );
            })}
          </AreaChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#B8C5D6" fontSize={12} />
            <YAxis stroke="#B8C5D6" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A1F2E', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#FFFFFF'
              }} 
            />
            <Legend />
            <Bar dataKey="traffic" fill="#00D4FF" name="Traffic Volume" />
            <Line type="monotone" dataKey="weather" stroke="#4A90E2" strokeWidth={2} name="Weather Impact" />
            <Area type="monotone" dataKey="congestion" fill="#FF6B35" fillOpacity={0.3} name="Congestion Level" />
          </ComposedChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-operational rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Traffic Patterns Analysis</h3>
          <p className="text-sm text-muted-foreground">Multi-dimensional traffic data with weather correlation</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {chartTypes?.map(({ type, icon, label }) => (
            <Button
              key={type}
              variant={chartType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType(type)}
              iconName={icon}
              title={label}
            />
          ))}
        </div>
      </div>
      {/* Metric Toggles */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-muted rounded-lg">
        <span className="text-sm font-medium text-foreground mr-2">Metrics:</span>
        {metrics?.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => toggleMetric(key)}
            className={`
              flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-operational
              ${selectedMetrics?.includes(key) 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: selectedMetrics?.includes(key) ? '#FFFFFF' : color }}
            />
            <span>{label}</span>
          </button>
        ))}
      </div>
      {/* Chart Container */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      {/* Chart Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-operational">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Data refreshed: 2 minutes ago</span>
          <span>•</span>
          <span>15-minute intervals</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="ZoomIn">
            Zoom
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export Chart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrafficPatternsChart;