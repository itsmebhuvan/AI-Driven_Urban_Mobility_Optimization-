import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import FilterControls from './components/FilterControls';
import TrafficPatternsChart from './components/TrafficPatternsChart';
import RoutePerformanceTable from './components/RoutePerformanceTable';
import BottleneckAnalysis from './components/BottleneckAnalysis';
import PredictiveAnalytics from './components/PredictiveAnalytics';

import Button from '../../components/ui/Button';

const TrafficAnalyticsHub = () => {
  const [filters, setFilters] = useState({
    period: 'last-week',
    route: 'all',
    vehicleType: 'all',
    comparisonMode: false,
    customDateRange: { start: '', end: '' }
  });
  const [savedViews, setSavedViews] = useState([]);
  const [currentView, setCurrentView] = useState('default');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock KPI data
  const kpiData = [
    {
      title: 'Average Traffic Volume',
      value: '2,847',
      unit: 'veh/hr',
      change: '+12.3%',
      changeType: 'positive',
      icon: 'Car',
      trend: [65, 72, 68, 75, 82, 78, 85, 92, 88, 95]
    },
    {
      title: 'Average Travel Time',
      value: '18.7',
      unit: 'min',
      change: '-8.5%',
      changeType: 'positive',
      icon: 'Clock',
      trend: [85, 82, 78, 75, 72, 68, 65, 62, 58, 55]
    },
    {
      title: 'Congestion Reduction',
      value: '23.4',
      unit: '%',
      change: '+15.2%',
      changeType: 'positive',
      icon: 'TrendingDown',
      trend: [45, 48, 52, 55, 58, 62, 65, 68, 72, 75]
    },
    {
      title: 'Infrastructure Utilization',
      value: '76.8',
      unit: '%',
      change: '+4.1%',
      changeType: 'positive',
      icon: 'Activity',
      trend: [70, 72, 74, 75, 76, 77, 78, 77, 76, 78]
    }
  ];

  useEffect(() => {
    // Simulate data refresh every 15 minutes
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 900000); // 15 minutes

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters updated:', newFilters);
  };

  const handleSaveView = () => {
    const viewName = prompt('Enter a name for this view:');
    if (viewName) {
      const newView = {
        id: Date.now()?.toString(),
        name: viewName,
        filters: { ...filters },
        timestamp: new Date()?.toISOString()
      };
      setSavedViews(prev => [...prev, newView]);
      setCurrentView(newView?.id);
    }
  };

  const handleLoadView = (viewId) => {
    const view = savedViews?.find(v => v?.id === viewId);
    if (view) {
      setFilters(view?.filters);
      setCurrentView(viewId);
    }
  };

  const handleExportData = (format) => {
    // Mock export functionality
    console.log(`Exporting data in ${format} format with filters:`, filters);
    // In a real app, this would trigger actual export
  };

  const handleKPICardClick = (kpiTitle) => {
    console.log(`Drilling down into ${kpiTitle}`);
    // In a real app, this would open detailed analytics for that KPI
  };

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date?.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-heading mb-2">
                Traffic Analytics Hub
              </h1>
              <p className="text-muted-foreground">
                Comprehensive data exploration and strategic infrastructure planning insights
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Saved Views Dropdown */}
              {savedViews?.length > 0 && (
                <div className="relative">
                  <select
                    value={currentView}
                    onChange={(e) => handleLoadView(e?.target?.value)}
                    className="px-4 py-2 bg-card border border-operational rounded-lg text-foreground text-sm"
                  >
                    <option value="default">Default View</option>
                    {savedViews?.map(view => (
                      <option key={view?.id} value={view?.id}>
                        {view?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <Button variant="outline" onClick={handleSaveView} iconName="Bookmark">
                Save View
              </Button>
              
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportData('pdf')}
                  iconName="FileText"
                >
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportData('csv')}
                  iconName="Download"
                >
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportData('pptx')}
                  iconName="Presentation"
                >
                  PPT
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls onFiltersChange={handleFiltersChange} />

          {/* KPI Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                trend={kpi?.trend}
                onClick={() => handleKPICardClick(kpi?.title)}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Traffic Patterns Chart - 8 columns */}
            <div className="lg:col-span-8">
              <TrafficPatternsChart />
            </div>
            
            {/* Route Performance Table - 4 columns */}
            <div className="lg:col-span-4">
              <RoutePerformanceTable />
            </div>
          </div>

          {/* Bottleneck Analysis */}
          <div className="mb-8">
            <BottleneckAnalysis />
          </div>

          {/* Predictive Analytics Section */}
          <div className="mb-8">
            <PredictiveAnalytics />
          </div>

          {/* Data Status Footer */}
          <div className="bg-card border border-operational rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-foreground">Live Data Stream</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last refresh: {formatLastUpdate(lastRefresh)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Next update: {formatLastUpdate(new Date(lastRefresh.getTime() + 15 * 60 * 1000))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setLastRefresh(new Date())}
                  iconName="RefreshCw"
                >
                  Refresh Now
                </Button>
                <Button variant="outline" size="sm" iconName="Settings">
                  Data Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrafficAnalyticsHub;