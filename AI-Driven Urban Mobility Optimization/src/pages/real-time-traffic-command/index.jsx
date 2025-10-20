import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AlertFeed from './components/AlertFeed';
import TrafficMap from './components/TrafficMap';
import MetricsStrip from './components/MetricsStrip';
import GlobalControls from './components/GlobalControls';

const RealTimeTrafficCommand = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [systemHealth, setSystemHealth] = useState('operational');

  useEffect(() => {
    // Simulate initial data loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Simulate system health monitoring
    const healthInterval = setInterval(() => {
      const healthStates = ['operational', 'degraded', 'maintenance'];
      const randomState = healthStates?.[Math.floor(Math.random() * healthStates?.length)];
      setSystemHealth(randomState);
    }, 30000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(healthInterval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Initializing Traffic Command Center</h2>
          <p className="text-muted-foreground">Loading real-time traffic data and system components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Real-Time Traffic Command | Urban Mobility Intelligence</title>
        <meta name="description" content="Real-time traffic monitoring and command center for city-wide transportation management" />
      </Helmet>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="pt-16 h-screen flex flex-col">
        {/* Global Controls */}
        <GlobalControls />

        {/* Main Dashboard Grid */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Alert Feed */}
          <div className="w-96 flex-shrink-0 p-4 border-r border-operational">
            <AlertFeed />
          </div>

          {/* Main Content Area - Traffic Map */}
          <div className="flex-1 p-4">
            <TrafficMap />
          </div>
        </div>

        {/* Bottom Metrics Strip */}
        <MetricsStrip />
      </div>

      {/* System Status Overlay */}
      {systemHealth !== 'operational' && (
        <div className="fixed top-20 right-4 z-50">
          <div className={`px-4 py-2 rounded-lg shadow-modal border ${
            systemHealth === 'degraded' ?'bg-warning text-warning-foreground border-warning' :'bg-accent text-accent-foreground border-accent'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
              <span className="text-sm font-medium">
                System Status: {systemHealth === 'degraded' ? 'Performance Degraded' : 'Maintenance Mode'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeTrafficCommand;