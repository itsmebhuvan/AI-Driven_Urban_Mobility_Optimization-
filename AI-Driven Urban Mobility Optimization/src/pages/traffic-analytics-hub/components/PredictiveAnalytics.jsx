import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictiveAnalytics = () => {
  const [selectedModel, setSelectedModel] = useState('traffic-flow');
  const [predictionHorizon, setPredictionHorizon] = useState('24h');
  const [confidenceLevel, setConfidenceLevel] = useState(95);

  const predictionData = [
    { 
      time: '00:00', 
      actual: 120, 
      predicted: 118, 
      upperBound: 135, 
      lowerBound: 102, 
      confidence: 92,
      weather: 'Clear',
      events: []
    },
    { 
      time: '02:00', 
      actual: 80, 
      predicted: 85, 
      upperBound: 98, 
      lowerBound: 72, 
      confidence: 94,
      weather: 'Clear',
      events: []
    },
    { 
      time: '04:00', 
      actual: 60, 
      predicted: 62, 
      upperBound: 75, 
      lowerBound: 49, 
      confidence: 96,
      weather: 'Clear',
      events: []
    },
    { 
      time: '06:00', 
      actual: 200, 
      predicted: 195, 
      upperBound: 220, 
      lowerBound: 170, 
      confidence: 88,
      weather: 'Clear',
      events: ['Rush Hour Start']
    },
    { 
      time: '08:00', 
      actual: 450, 
      predicted: 445, 
      upperBound: 485, 
      lowerBound: 405, 
      confidence: 85,
      weather: 'Clear',
      events: ['Peak Traffic']
    },
    { 
      time: '10:00', 
      actual: null, 
      predicted: 320, 
      upperBound: 365, 
      lowerBound: 275, 
      confidence: 87,
      weather: 'Partly Cloudy',
      events: []
    },
    { 
      time: '12:00', 
      actual: null, 
      predicted: 380, 
      upperBound: 425, 
      lowerBound: 335, 
      confidence: 83,
      weather: 'Partly Cloudy',
      events: ['Lunch Rush']
    },
    { 
      time: '14:00', 
      actual: null, 
      predicted: 340, 
      upperBound: 385, 
      lowerBound: 295, 
      confidence: 86,
      weather: 'Cloudy',
      events: []
    },
    { 
      time: '16:00', 
      actual: null, 
      predicted: 420, 
      upperBound: 475, 
      lowerBound: 365, 
      confidence: 82,
      weather: 'Light Rain',
      events: ['School Dismissal']
    },
    { 
      time: '18:00', 
      actual: null, 
      predicted: 520, 
      upperBound: 580, 
      lowerBound: 460, 
      confidence: 78,
      weather: 'Light Rain',
      events: ['Evening Rush', 'Concert Event']
    },
    { 
      time: '20:00', 
      actual: null, 
      predicted: 380, 
      upperBound: 430, 
      lowerBound: 330, 
      confidence: 84,
      weather: 'Clear',
      events: []
    },
    { 
      time: '22:00', 
      actual: null, 
      predicted: 250, 
      upperBound: 285, 
      lowerBound: 215, 
      confidence: 90,
      weather: 'Clear',
      events: []
    }
  ];

  const modelOptions = [
    { value: 'traffic-flow', label: 'Traffic Flow', icon: 'TrendingUp' },
    { value: 'congestion', label: 'Congestion Levels', icon: 'AlertTriangle' },
    { value: 'incidents', label: 'Incident Probability', icon: 'Zap' },
    { value: 'travel-time', label: 'Travel Times', icon: 'Clock' }
  ];

  const horizonOptions = [
    { value: '6h', label: '6 Hours' },
    { value: '12h', label: '12 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '48h', label: '48 Hours' },
    { value: '7d', label: '7 Days' }
  ];

  const modelMetrics = {
    'traffic-flow': {
      accuracy: 87.5,
      mape: 12.3,
      rmse: 45.2,
      lastTrained: '2025-10-19 14:30',
      dataPoints: '2.4M',
      features: ['Historical patterns', 'Weather data', 'Event calendar', 'Day of week']
    },
    'congestion': {
      accuracy: 82.1,
      mape: 15.7,
      rmse: 8.9,
      lastTrained: '2025-10-19 16:45',
      dataPoints: '1.8M',
      features: ['Traffic density', 'Signal timing', 'Incidents', 'Construction']
    },
    'incidents': {
      accuracy: 74.3,
      mape: 22.1,
      rmse: 0.31,
      lastTrained: '2025-10-20 08:15',
      dataPoints: '850K',
      features: ['Weather conditions', 'Traffic volume', 'Historical incidents', 'Road conditions']
    },
    'travel-time': {
      accuracy: 89.2,
      mape: 9.8,
      rmse: 3.2,
      lastTrained: '2025-10-19 20:20',
      dataPoints: '3.1M',
      features: ['Real-time speeds', 'Route complexity', 'Traffic signals', 'Weather impact']
    }
  };

  const currentMetrics = modelMetrics?.[selectedModel];

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 80) return 'text-warning';
    return 'text-error';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-operational rounded-lg p-3 shadow-modal">
          <p className="font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {data?.actual !== null && (
            <p className="text-sm text-success">
              {`Actual: ${data?.actual} vehicles/hour`}
            </p>
          )}
          <p className="text-sm text-primary">
            {`Predicted: ${data?.predicted} vehicles/hour`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Confidence: ${data?.confidence}%`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Range: ${data?.lowerBound} - ${data?.upperBound}`}
          </p>
          {data?.events?.length > 0 && (
            <div className="mt-2 pt-2 border-t border-operational">
              <p className="text-xs font-medium text-foreground">Events:</p>
              {data?.events?.map((event, idx) => (
                <p key={idx} className="text-xs text-warning">{event}</p>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-operational rounded-lg">
      <div className="p-6 border-b border-operational">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">AI-Powered Traffic Forecasting</h3>
            <p className="text-sm text-muted-foreground">Machine learning predictions with confidence intervals</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Settings">
              Model Config
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export Forecast
            </Button>
          </div>
        </div>

        {/* Model Selection */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {modelOptions?.map(model => (
            <button
              key={model?.value}
              onClick={() => setSelectedModel(model?.value)}
              className={`
                flex items-center space-x-2 p-3 rounded-lg border transition-operational
                ${selectedModel === model?.value 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-muted text-muted-foreground border-operational hover:text-foreground'
                }
              `}
            >
              <Icon name={model?.icon} size={16} />
              <span className="text-sm font-medium">{model?.label}</span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Horizon:</span>
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                {horizonOptions?.map(option => (
                  <button
                    key={option?.value}
                    onClick={() => setPredictionHorizon(option?.value)}
                    className={`
                      px-3 py-1 text-sm rounded-md transition-operational
                      ${predictionHorizon === option?.value 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    {option?.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Confidence:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="80"
                  max="99"
                  value={confidenceLevel}
                  onChange={(e) => setConfidenceLevel(Number(e?.target?.value))}
                  className="w-20"
                />
                <span className="text-sm font-medium text-foreground font-data">{confidenceLevel}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Predicted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary/30 rounded-full"></div>
              <span className="text-muted-foreground">Confidence Band</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Chart */}
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#B8C5D6" fontSize={12} />
              <YAxis stroke="#B8C5D6" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Confidence Band */}
              <Area
                type="monotone"
                dataKey="upperBound"
                stackId="confidence"
                stroke="none"
                fill="#00D4FF"
                fillOpacity={0.1}
                name="Upper Confidence"
              />
              <Area
                type="monotone"
                dataKey="lowerBound"
                stackId="confidence"
                stroke="none"
                fill="#FFFFFF"
                fillOpacity={1}
                name="Lower Confidence"
              />
              
              {/* Predicted Line */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#00D4FF"
                strokeWidth={2}
                dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
                name="Predicted Values"
              />
              
              {/* Actual Line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#00C851"
                strokeWidth={2}
                dot={{ fill: '#00C851', strokeWidth: 2, r: 4 }}
                connectNulls={false}
                name="Actual Values"
              />
              
              {/* Current Time Reference */}
              <ReferenceLine x="08:00" stroke="#FF6B35" strokeDasharray="2 2" label="Current Time" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Model Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-4">Model Performance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-primary font-data">{currentMetrics?.accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground font-data">{currentMetrics?.mape}%</div>
                <div className="text-xs text-muted-foreground">MAPE</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground font-data">{currentMetrics?.rmse}</div>
                <div className="text-xs text-muted-foreground">RMSE</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground font-data">{currentMetrics?.dataPoints}</div>
                <div className="text-xs text-muted-foreground">Training Data</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-operational">
              <div className="text-xs text-muted-foreground">
                Last trained: {currentMetrics?.lastTrained}
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-4">Model Features</h4>
            <div className="space-y-2">
              {currentMetrics?.features?.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-operational">
              <Button variant="outline" size="sm" iconName="RefreshCw" fullWidth>
                Retrain Model
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-muted border-t border-operational">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Predictions updated every 15 minutes • Next update in 8 minutes
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="AlertTriangle">
              Set Alerts
            </Button>
            <Button variant="outline" size="sm" iconName="Share">
              Share Forecast
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;