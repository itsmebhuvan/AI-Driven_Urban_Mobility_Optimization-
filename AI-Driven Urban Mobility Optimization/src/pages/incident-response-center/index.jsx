import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CriticalAlertBanner from './components/CriticalAlertBanner';
import IncidentQueue from './components/IncidentQueue';
import EmergencyMap from './components/EmergencyMap';
import ResourceDashboard from './components/ResourceDashboard';
import ImpactAssessment from './components/ImpactAssessment';

const IncidentResponseCenter = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock data for incidents
  const [incidents] = useState([
    {
      id: 'INC-2024-001',
      title: 'Multi-Vehicle Collision',
      location: 'I-95 Northbound, Mile Marker 42',
      severity: 'critical',
      status: 'active',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      coordinates: { lat: 40.7580, lng: -73.9855 },
      severityScore: 95,
      resourcesDeployed: 8,
      eta: '5 min',
      impactRadius: 2.5,
      description: `Major collision involving 4 vehicles blocking 3 lanes of northbound traffic.\nMultiple injuries reported, emergency medical services on scene.\nTraffic backup extending 3 miles with severe congestion.`
    },
    {
      id: 'INC-2024-002',
      title: 'Traffic Signal Malfunction',
      location: 'Broadway & 42nd Street',
      severity: 'high',
      status: 'responding',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      coordinates: { lat: 40.7505, lng: -73.9734 },
      severityScore: 78,
      resourcesDeployed: 3,
      eta: '8 min',
      impactRadius: 0.8,
      description: `Traffic signal system failure at major intersection.\nManual traffic control being established.\nSignificant delays in all directions during peak hours.`
    },
    {
      id: 'INC-2024-003',
      title: 'Emergency Vehicle Response',
      location: 'FDR Drive Southbound',
      severity: 'medium',
      status: 'responding',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      coordinates: { lat: 40.7282, lng: -73.9942 },
      severityScore: 65,
      resourcesDeployed: 2,
      eta: '12 min',
      impactRadius: 1.2,
      description: `Fire department response to building emergency requiring highway access.\nTemporary lane closures for emergency vehicle corridor.\nTraffic being diverted to alternate routes.`
    },
    {
      id: 'INC-2024-004',
      title: 'Road Construction Delay',
      location: 'West Side Highway & 23rd St',
      severity: 'low',
      status: 'active',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      coordinates: { lat: 40.7465, lng: -74.0014 },
      severityScore: 42,
      resourcesDeployed: 1,
      eta: '25 min',
      impactRadius: 0.5,
      description: `Scheduled construction work running over planned time.\nSingle lane closure causing minor delays.\nWork crew coordinating with traffic management.`
    }
  ]);

  // Mock data for emergency vehicles
  const [emergencyVehicles] = useState([
    {
      id: 'UNIT-001',
      callSign: 'Engine 42',
      type: 'Fire Truck',
      status: 'responding',
      location: 'En route to I-95 MM42',
      eta: '3 min',
      lastUpdate: new Date(Date.now() - 120000),
      coordinates: { lat: 40.7520, lng: -73.9800 }
    },
    {
      id: 'UNIT-002',
      callSign: 'Ambulance 15',
      type: 'EMS',
      status: 'on-scene',
      location: 'I-95 Northbound MM42',
      eta: 'On Scene',
      lastUpdate: new Date(Date.now() - 60000),
      coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    {
      id: 'UNIT-003',
      callSign: 'Traffic Unit 7',
      type: 'Traffic Control',
      status: 'available',
      location: 'Broadway & 34th St',
      eta: 'Available',
      lastUpdate: new Date(Date.now() - 300000),
      coordinates: { lat: 40.7505, lng: -73.9876 }
    },
    {
      id: 'UNIT-004',
      callSign: 'Police 23',
      type: 'Police',
      status: 'responding',
      location: 'En route to Broadway & 42nd',
      eta: '6 min',
      lastUpdate: new Date(Date.now() - 180000),
      coordinates: { lat: 40.7489, lng: -73.9845 }
    },
    {
      id: 'UNIT-005',
      callSign: 'Rescue 1',
      type: 'Heavy Rescue',
      status: 'unavailable',
      location: 'Station Maintenance',
      eta: 'Unavailable',
      lastUpdate: new Date(Date.now() - 1800000),
      coordinates: { lat: 40.7400, lng: -73.9900 }
    }
  ]);

  // Mock data for traffic signals
  const [trafficSignals] = useState([
    {
      id: 'SIG-001',
      intersection: 'Broadway & 42nd Street',
      status: 'emergency',
      overrideActive: true,
      lastUpdate: new Date(Date.now() - 300000)
    },
    {
      id: 'SIG-002',
      intersection: 'FDR Drive & 23rd Street',
      status: 'override',
      overrideActive: true,
      lastUpdate: new Date(Date.now() - 600000)
    },
    {
      id: 'SIG-003',
      intersection: '5th Avenue & 34th Street',
      status: 'normal',
      overrideActive: false,
      lastUpdate: new Date(Date.now() - 120000)
    },
    {
      id: 'SIG-004',
      intersection: 'West Side Highway & 14th St',
      status: 'maintenance',
      overrideActive: false,
      lastUpdate: new Date(Date.now() - 900000)
    }
  ]);

  // Mock data for communication logs
  const [communicationLogs] = useState([
    {
      id: 'LOG-001',
      unit: 'Engine 42',
      timestamp: new Date(Date.now() - 180000),
      priority: 'high',
      message: `On scene at I-95 MM42. Multiple vehicle collision confirmed.\nRequesting additional EMS units and heavy rescue equipment.\nEstimating 45 minutes for scene clearance.`,
      response: `Additional units dispatched. Rescue 1 en route, ETA 8 minutes.`
    },
    {
      id: 'LOG-002',
      unit: 'Traffic Unit 7',
      timestamp: new Date(Date.now() - 300000),
      priority: 'medium',
      message: `Broadway signal override successful. Manual traffic control established.\nTraffic flow improving in all directions.\nRequesting signal technician for permanent repair.`,
      response: null
    },
    {
      id: 'LOG-003',
      unit: 'Ambulance 15',
      timestamp: new Date(Date.now() - 120000),
      priority: 'high',
      message: `Two patients transported to Metro General Hospital.\nOne critical, one stable condition.\nScene medical operations complete.`,
      response: `Acknowledged. Hospital notified of incoming patients.`
    },
    {
      id: 'LOG-004',
      unit: 'Police 23',
      timestamp: new Date(Date.now() - 240000),
      priority: 'low',
      message: `Traffic investigation complete at Broadway intersection.\nNo citations issued, equipment failure confirmed.\nRecommending priority repair scheduling.`,
      response: `Report filed. Maintenance crew scheduled for 0600 hours.`
    }
  ]);

  // Mock data for impact metrics
  const [impactMetrics] = useState({
    affectedVehicles: 12847,
    trafficReduction: 68,
    estimatedDelayCost: 284750,
    avgDelayTime: 23,
    hourlyIncrease: 45200,
    airQualityIndex: 156,
    emissionIncrease: 34,
    co2Increase: 12.7
  });

  // Mock data for recovery timeline
  const [recoveryTimeline] = useState({
    estimatedClearance: '42 min',
    progress: 35,
    confidence: 87,
    milestones: [
      {
        title: 'Scene Secured',
        eta: 'Complete',
        completed: true,
        active: false
      },
      {
        title: 'Medical Clear',
        eta: '8 min',
        completed: false,
        active: true
      },
      {
        title: 'Vehicle Removal',
        eta: '25 min',
        completed: false,
        active: false
      },
      {
        title: 'Traffic Restored',
        eta: '42 min',
        completed: false,
        active: false
      }
    ]
  });

  useEffect(() => {
    // Auto-select first critical incident
    const criticalIncident = incidents?.find(incident => incident?.severity === 'critical');
    if (criticalIncident && !selectedIncident) {
      setSelectedIncident(criticalIncident);
    }
  }, [incidents, selectedIncident]);

  useEffect(() => {
    // Update timestamp every 30 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleIncidentSelect = (incident) => {
    setSelectedIncident(incident);
  };

  const handleEscalate = (incidentId) => {
    console.log('Escalating incident:', incidentId);
    // Implementation for escalating incident
  };

  const handleAssignResource = (incidentId) => {
    console.log('Assigning resource to incident:', incidentId);
    // Implementation for resource assignment
  };

  const handleOverrideSignal = (signalId) => {
    console.log('Overriding traffic signal:', signalId);
    // Implementation for signal override
  };

  const handleContactUnit = (unitId) => {
    console.log('Contacting unit:', unitId);
    // Implementation for unit communication
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Incident Response Center - Urban Mobility Intelligence</title>
        <meta name="description" content="Emergency coordination and crisis management dashboard for real-time incident response and traffic management during critical situations." />
      </Helmet>

      <Header />

      <main className="pt-16 p-6">
        {/* Critical Alert Banner */}
        <CriticalAlertBanner activeIncidents={incidents} />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-24 gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Incident Queue (8 columns) */}
          <div className="col-span-24 lg:col-span-8">
            <IncidentQueue
              incidents={incidents}
              onIncidentSelect={handleIncidentSelect}
              selectedIncident={selectedIncident}
              onEscalate={handleEscalate}
              onAssignResource={handleAssignResource}
            />
          </div>

          {/* Center Panel - Emergency Map (12 columns) */}
          <div className="col-span-24 lg:col-span-12">
            <EmergencyMap
              incidents={incidents}
              emergencyVehicles={emergencyVehicles}
              selectedIncident={selectedIncident}
              onIncidentSelect={handleIncidentSelect}
            />
          </div>

          {/* Right Panel - Resource Dashboard (4 columns) */}
          <div className="col-span-24 lg:col-span-4">
            <ResourceDashboard
              emergencyVehicles={emergencyVehicles}
              trafficSignals={trafficSignals}
              communicationLogs={communicationLogs}
              onOverrideSignal={handleOverrideSignal}
              onContactUnit={handleContactUnit}
            />
          </div>
        </div>

        {/* Bottom Section - Impact Assessment */}
        <div className="mt-6">
          <ImpactAssessment
            impactMetrics={impactMetrics}
            recoveryTimeline={recoveryTimeline}
          />
        </div>
      </main>
    </div>
  );
};

export default IncidentResponseCenter;