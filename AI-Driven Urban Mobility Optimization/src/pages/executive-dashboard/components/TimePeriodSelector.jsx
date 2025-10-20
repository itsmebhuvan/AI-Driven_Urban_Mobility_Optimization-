import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TimePeriodSelector = ({ selectedPeriod, onPeriodChange, selectedDistrict, onDistrictChange }) => {
  const timePeriods = [
    { value: 'Q1-2024', label: 'Q1 2024' },
    { value: 'Q2-2024', label: 'Q2 2024' },
    { value: 'Q3-2024', label: 'Q3 2024' },
    { value: 'Q4-2024', label: 'Q4 2024' },
    { value: 'YTD-2024', label: 'YTD 2024' }
  ];

  const districts = [
    { value: 'all', label: 'All Districts' },
    { value: 'downtown', label: 'Downtown' },
    { value: 'midtown', label: 'Midtown' },
    { value: 'uptown', label: 'Uptown' },
    { value: 'suburbs', label: 'Suburbs' }
  ];

  return (
    <div className="bg-card border border-operational rounded-lg p-4 shadow-elevated">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Fiscal Period:</span>
          </div>
          <div className="flex items-center space-x-1">
            {timePeriods?.map((period) => (
              <Button
                key={period?.value}
                variant={selectedPeriod === period?.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onPeriodChange(period?.value)}
              >
                {period?.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">District:</span>
          </div>
          <div className="flex items-center space-x-1">
            {districts?.map((district) => (
              <Button
                key={district?.value}
                variant={selectedDistrict === district?.value ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onDistrictChange(district?.value)}
              >
                {district?.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export PDF
          </Button>
          <Button variant="outline" size="sm" iconName="Printer" iconPosition="left">
            Print Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimePeriodSelector;