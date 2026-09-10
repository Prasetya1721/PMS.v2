import React from 'react';
import { Ship, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar({ onOpenQuickAction }) {
  const { selectedShip, setSelectedShip, ships, notifications, setActiveTab, kasbon, workOrders, shipDocuments } = useApp();

  // Count pending alerts
  const pendingKasbon = kasbon.filter(k => k.status.includes('Menunggu')).length;
  const overdueWo = workOrders.filter(w => w.status === 'Overdue').length;
  const expiredDocs = shipDocuments.filter(d => d.status === 'Expired').length;
  const totalAlerts = pendingKasbon + overdueWo + expiredDocs;

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <div className="ship-selector-wrapper">
          <label className="ship-select-label" htmlFor="ship-select">
            <Ship size={15} color="#0284c7" />
            <span>Kapal:</span>
          </label>
          <select
            id="ship-select"
            className="ship-select-dropdown"
            value={selectedShip}
            onChange={(e) => setSelectedShip(e.target.value)}
          >
            <option value="all">⚓ Semua Armada (Level Fleet)</option>
            {ships.map((s) => (
              <option key={s.id} value={s.id}>
                🚢 {s.name} ({s.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="navbar-right">

        {/* Notification Bell */}
        <button
          type="button"
          className="icon-btn"
          onClick={() => setActiveTab('notifications')}
          title="Lihat Riwayat Notifikasi & Alerts"
        >
          <Bell size={18} />
          {totalAlerts > 0 && <span className="notification-badge-dot" />}
        </button>

        {/* User Badge */}
        <div className="user-profile-badge">
          <div className="user-avatar">FA</div>
          <div className="user-info">
            <span className="user-name">Fleet Admin</span>
            <span className="user-role">Super Admin & Port Capt.</span>
          </div>
        </div>
      </div>
    </header>
  );
}
