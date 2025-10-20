import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetImpactTable = ({ title, data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success bg-success/10';
      case 'good': return 'text-primary bg-primary/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'poor': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'CheckCircle';
      case 'good': return 'Circle';
      case 'warning': return 'AlertTriangle';
      case 'poor': return 'XCircle';
      default: return 'Minus';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-operational rounded-lg shadow-elevated">
      <div className="p-6 border-b border-operational">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Project</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Budget</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Spent</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">ROI</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Impact</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((project, index) => (
              <tr key={index} className="border-b border-operational/50 hover:bg-muted/10 transition-operational">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{project?.name}</span>
                    <span className="text-sm text-muted-foreground">{project?.description}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-data text-foreground">{formatCurrency(project?.budget)}</span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-data text-foreground">{formatCurrency(project?.spent)}</span>
                    <span className="text-xs text-muted-foreground">
                      {((project?.spent / project?.budget) * 100)?.toFixed(1)}% utilized
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`font-data ${project?.roi > 0 ? 'text-success' : 'text-error'}`}>
                    {project?.roi > 0 ? '+' : ''}{project?.roi}%
                  </span>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project?.status)}`}>
                    <Icon name={getStatusIcon(project?.status)} size={14} />
                    <span className="capitalize">{project?.status}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{project?.impact}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetImpactTable;