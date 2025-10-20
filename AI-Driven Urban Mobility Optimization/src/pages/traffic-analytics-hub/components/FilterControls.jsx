import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFiltersChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('last-week');
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });

  const periodOptions = [
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const routeOptions = [
    { value: 'all', label: 'All Routes' },
    { value: 'downtown-core', label: 'Downtown Core' },
    { value: 'highway-101', label: 'Highway 101' },
    { value: 'business-district', label: 'Business District' },
    { value: 'residential-zones', label: 'Residential Zones' },
    { value: 'industrial-area', label: 'Industrial Area' }
  ];

  const vehicleTypeOptions = [
    { value: 'all', label: 'All Vehicles' },
    { value: 'passenger', label: 'Passenger Cars' },
    { value: 'commercial', label: 'Commercial Vehicles' },
    { value: 'public-transport', label: 'Public Transport' },
    { value: 'emergency', label: 'Emergency Vehicles' },
    { value: 'motorcycles', label: 'Motorcycles' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      period: selectedPeriod,
      route: selectedRoute,
      vehicleType: selectedVehicleType,
      comparisonMode,
      customDateRange,
      [filterType]: value
    };

    switch (filterType) {
      case 'period':
        setSelectedPeriod(value);
        break;
      case 'route':
        setSelectedRoute(value);
        break;
      case 'vehicleType':
        setSelectedVehicleType(value);
        break;
      case 'comparisonMode':
        setComparisonMode(value);
        break;
      case 'customDateRange':
        setCustomDateRange(value);
        break;
    }

    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-card border border-operational rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Date Range Selector */}
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={(value) => handleFilterChange('period', value)}
            placeholder="Select period"
            className="w-40"
          />
        </div>

        {/* Custom Date Range */}
        {selectedPeriod === 'custom' && (
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={customDateRange?.start}
              onChange={(e) => handleFilterChange('customDateRange', { ...customDateRange, start: e?.target?.value })}
              className="px-3 py-2 bg-input border border-operational rounded-md text-sm text-foreground"
            />
            <span className="text-muted-foreground">to</span>
            <input
              type="date"
              value={customDateRange?.end}
              onChange={(e) => handleFilterChange('customDateRange', { ...customDateRange, end: e?.target?.value })}
              className="px-3 py-2 bg-input border border-operational rounded-md text-sm text-foreground"
            />
          </div>
        )}

        {/* Route Selector */}
        <div className="flex items-center space-x-2">
          <Icon name="Route" size={16} className="text-muted-foreground" />
          <Select
            options={routeOptions}
            value={selectedRoute}
            onChange={(value) => handleFilterChange('route', value)}
            placeholder="Select route"
            className="w-48"
          />
        </div>

        {/* Vehicle Type Filter */}
        <div className="flex items-center space-x-2">
          <Icon name="Car" size={16} className="text-muted-foreground" />
          <Select
            options={vehicleTypeOptions}
            value={selectedVehicleType}
            onChange={(value) => handleFilterChange('vehicleType', value)}
            placeholder="Vehicle type"
            className="w-48"
          />
        </div>

        {/* Comparison Mode Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={comparisonMode ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange('comparisonMode', !comparisonMode)}
            iconName="GitCompare"
            iconPosition="left"
          >
            Compare Periods
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-auto">
          <Button variant="outline" size="sm" iconName="Bookmark">
            Save View
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;