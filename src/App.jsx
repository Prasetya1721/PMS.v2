import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import FleetDashboard from './components/dashboard/FleetDashboard';
import EquipmentList from './components/pms/EquipmentList';
import WorkOrderList from './components/pms/WorkOrderList';
import SparepartTable from './components/inventory/SparepartTable';
import CostOverview from './components/finance/CostOverview';
import CrewList from './components/crew/CrewList';
import AbsensiModule from './components/crew/AbsensiModule';
import KasbonManagement from './components/finance/KasbonManagement';
import CrewCertificates from './components/crew/CrewCertificates';
import CrewLeaveAndDrill from './components/crew/CrewLeaveAndDrill';
import ShipDocuments from './components/documents/ShipDocuments';
import WhatsAppSimulator from './components/notification/WhatsAppSimulator';
import NotificationHistory from './components/notification/NotificationHistory';
import GoogleCalendarModule from './components/calendar/GoogleCalendarModule';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function App() {
  const { activeTab, toast } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <FleetDashboard />;
      case 'pms-equipment':
        return <EquipmentList />;
      case 'pms-workorders':
        return <WorkOrderList />;
      case 'inventory':
        return <SparepartTable />;
      case 'cost-mgmt':
        return <CostOverview />;
      case 'crew-list':
        return <CrewList />;
      case 'crew-absen':
        return <AbsensiModule />;
      case 'crew-kasbon':
        return <KasbonManagement />;
      case 'crew-certs':
        return <CrewCertificates />;
      case 'crew-leave':
        return <CrewLeaveAndDrill />;
      case 'ship-docs':
        return <ShipDocuments />;
      case 'wa-simulator':
        return <WhatsAppSimulator />;
      case 'google-calendar':
        return <GoogleCalendarModule />;
      case 'notifications':
        return <NotificationHistory />;
      default:
        return <FleetDashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Nav */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Navbar />
        <main className="content-viewport">
          {renderContent()}
        </main>
      </div>

      {/* Toast Alert Banner */}
      {toast && (
        <div className="toast-notification">
          {toast.type === 'success' ? (
            <CheckCircle2 size={20} color="#059669" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle size={20} color="#d97706" />
          ) : (
            <Info size={20} color="#0284c7" />
          )}
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand-navy-900)' }}>
            {toast.message}
          </span>
        </div>
      )}
    </div>
  );
}
