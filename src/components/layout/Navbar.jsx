import React from 'react';
import { Ship, Bell, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar({ onOpenQuickAction }) {
  const {
    selectedShip,
    setSelectedShip,
    ships,
    notifications,
    setActiveTab,
    kasbon,
    workOrders,
    shipDocuments,
    userProfile,
    setIsProfileModalOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();

  // Count pending alerts
  const pendingKasbon = kasbon.filter(k => k.status.includes('Menunggu')).length;
  const overdueWo = workOrders.filter(w => w.status === 'Overdue').length;
  const expiredDocs = shipDocuments.filter(d => d.status === 'Expired').length;
  const totalAlerts = pendingKasbon + overdueWo + expiredDocs;

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          className="mobile-menu-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          title={isMobileMenuOpen ? 'Tutup Navigasi' : 'Buka Navigasi'}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="ship-selector-wrapper">
          <label className="ship-select-label" htmlFor="ship-select">
            <Ship size={15} color="#0284c7" />
            <span className="ship-label-text">Kapal:</span>
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

        {/* User Profile Badge (Clickable) */}
        <div
          className="user-profile-badge"
          style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
          onClick={() => setIsProfileModalOpen(true)}
          title="Klik untuk membuka Pengaturan Profil Pengguna"
        >
          <div className="user-avatar">{userProfile?.avatarInitials || 'FA'}</div>
          <div className="user-info">
            <span className="user-name">{userProfile?.name || 'Fleet Admin'}</span>
            <span className="user-role">{userProfile?.role || 'Super Admin'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
