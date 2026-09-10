import React from 'react';
import { Ship, Bell, PlusCircle, ShieldCheck, DollarSign, CalendarCheck, Calendar } from 'lucide-react';
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
        {/* Quick Actions */}
        <button
          type="button"
          className="quick-action-btn secondary"
          onClick={() => setActiveTab('google-calendar')}
          title="Buka Sinkronisasi Google Calendar"
        >
          <Calendar size={16} color="#1a73e8" />
          <span>Google Calendar</span>
        </button>

        <button
          type="button"
          className="quick-action-btn secondary"
          onClick={() => setActiveTab('crew-absen')}
          title="Catat Presensi Harian Crew"
        >
          <CalendarCheck size={16} color="#0284c7" />
          <span>Presensi Absen</span>
        </button>

        <button
          type="button"
          className="quick-action-btn secondary"
          onClick={() => setActiveTab('crew-kasbon')}
          title="Buka Modul Pengajuan Kasbon"
        >
          <DollarSign size={16} color="#7c3aed" />
          <span>Sistem Kasbon</span>
          {pendingKasbon > 0 && (
            <span style={{
              backgroundColor: '#e11d48',
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '0.1rem 0.4rem',
              fontSize: '0.7rem',
              fontWeight: '700'
            }}>
              {pendingKasbon}
            </span>
          )}
        </button>

        <button
          type="button"
          className="quick-action-btn"
          onClick={() => setActiveTab('wa-simulator')}
          title="Kirim Pesan WhatsApp Reminder Simulator"
        >
          <PlusCircle size={16} />
          <span>Simulasi WA Alert</span>
        </button>

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
