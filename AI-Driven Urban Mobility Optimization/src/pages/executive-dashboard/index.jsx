import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import PerformanceChart from './components/PerformanceChart';
import BudgetImpactTable from './components/BudgetImpactTable';
import SustainabilityGauge from './components/SustainabilityGauge';
import TimePeriodSelector from './components/TimePeriodSelector';

const ExecutiveDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4-2024');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock KPI data
  const kpiData = [
    {
      title: "Traffic Efficiency Score",
      value: "87.3",
      unit: "%",
      trend: "up",
      trendValue: "+5.2%",
      description: "Overall city-wide traffic flow optimization compared to baseline",
      icon: "Gauge",
      color: "success"
    },
    {
      title: "Congestion Reduction",
      value: "23.8",
      unit: "%",
      trend: "up",
      trendValue: "+8.1%",
      description: "Peak hour congestion decrease vs. previous fiscal quarter",
      icon: "TrendingDown",
      color: "primary"
    },
    {
      title: "Air Quality Index",
      value: "42",
      unit: "AQI",
      trend: "down",
      trendValue: "-12.5%",
      description: "Average air quality improvement through traffic optimization",
      icon: "Wind",
      color: "success"
    },
    {
      title: "Citizen Satisfaction",
      value: "4.2",
      unit: "/5.0",
      trend: "up",
      trendValue: "+0.3",
      description: "Public transport and traffic management satisfaction rating",
      icon: "Users",
      color: "warning"
    }
  ];

  // Mock traffic flow improvement data
  const trafficFlowData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 68 },
    { name: 'Mar', value: 72 },
    { name: 'Apr', value: 75 },
    { name: 'May', value: 78 },
    { name: 'Jun', value: 82 },
    { name: 'Jul', value: 85 },
    { name: 'Aug', value: 87 },
    { name: 'Sep', value: 89 },
    { name: 'Oct', value: 87 }
  ];

  // Mock infrastructure ROI data
  const infrastructureROIData = [
    { name: 'Smart Signals', value: 145 },
    { name: 'Traffic Sensors', value: 132 },
    { name: 'Route Optimization', value: 128 },
    { name: 'Public Transport', value: 118 },
    { name: 'Parking Systems', value: 95 },
    { name: 'Emergency Response', value: 87 }
  ];

  // Mock budget impact data
  const budgetImpactData = [
    {
      name: "Smart Traffic Signal Upgrade",
      description: "AI-powered signal optimization across 150 intersections",
      budget: 2500000,
      spent: 2100000,
      roi: 145,
      status: "excellent",
      impact: "35% reduction in wait times"
    },
    {
      name: "IoT Sensor Network Deployment",
      description: "Real-time traffic monitoring infrastructure",
      budget: 1800000,
      spent: 1650000,
      roi: 132,
      status: "good",
      impact: "Real-time data coverage: 85%"
    },
    {
      name: "Public Transport Integration",
      description: "Multi-modal transport coordination system",
      budget: 3200000,
      spent: 2950000,
      roi: 118,
      status: "good",
      impact: "15% increase in ridership"
    },
    {
      name: "Emergency Response Optimization",
      description: "Automated incident detection and response",
      budget: 1500000,
      spent: 1420000,
      roi: 87,
      status: "warning",
      impact: "12% faster response times"
    },
    {
      name: "Parking Management System",
      description: "Dynamic parking allocation and pricing",
      budget: 950000,
      spent: 890000,
      roi: 65,
      status: "poor",
      impact: "8% reduction in search time"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdated = () => {
    return lastUpdated?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Executive Dashboard - Urban Mobility Intelligence</title>
        <meta name="description" content="Strategic insights and performance metrics for municipal traffic management and urban mobility decision-making" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-heading">
                  Executive Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                  Strategic insights and performance metrics for municipal decision-making
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium text-foreground font-data">
                  {formatLastUpdated()}
                </p>
              </div>
            </div>

            {/* Time Period and District Selector */}
            <TimePeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              selectedDistrict={selectedDistrict}
              onDistrictChange={setSelectedDistrict}
            />
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                trend={kpi?.trend}
                trendValue={kpi?.trendValue}
                description={kpi?.description}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Main Visualization Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PerformanceChart
              title="Traffic Flow Improvements (%)"
              data={trafficFlowData}
              type="area"
              color="primary"
            />
            <PerformanceChart
              title="Infrastructure ROI Comparison (%)"
              data={infrastructureROIData}
              type="bar"
              color="success"
            />
          </div>

          {/* Sustainability Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SustainabilityGauge
              title="Carbon Emission Reduction"
              value={23.8}
              target={30}
              unit="% reduction"
              description="Progress toward 30% emission reduction target by end of fiscal year"
            />
            <SustainabilityGauge
              title="Fuel Consumption Savings"
              value={18.5}
              target={25}
              unit="million gallons"
              description="Annual fuel savings through traffic optimization initiatives"
            />
            <SustainabilityGauge
              title="Green Transport Adoption"
              value={42.3}
              target={50}
              unit="% modal share"
              description="Public and sustainable transport usage vs. private vehicle dependency"
            />
          </div>

          {/* Budget Impact Analysis */}
          <BudgetImpactTable
            title="Project Performance & Budget Impact Analysis"
            data={budgetImpactData}
          />
        </div>
      </main>
    </div>
  );
};

export default ExecutiveDashboard;