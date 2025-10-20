import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TrafficAnalyticsHub from './pages/traffic-analytics-hub';
import RealTimeTrafficCommand from './pages/real-time-traffic-command';
import ExecutiveDashboard from './pages/executive-dashboard';
import IncidentResponseCenter from './pages/incident-response-center';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<RealTimeTrafficCommand />} />
        <Route path="/traffic-analytics-hub" element={<TrafficAnalyticsHub />} />
        <Route path="/real-time-traffic-command" element={<RealTimeTrafficCommand />} />
        <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
        <Route path="/incident-response-center" element={<IncidentResponseCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
