import React from 'react';
import {
  LayoutDashboard,
  Wrench,
  ClipboardList,
  Package,
  PieChart,
  Users,
  CalendarCheck,
  WalletCards,
  Award,
  LifeBuoy,
  FileText,
  MessageSquare,
  BellRing,
  Anchor,
  CheckCircle2,
  CalendarPlus,
  UserCog,
  X,
  LogIn
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    workOrders,
    kasbon,
    shipDocuments,
    certificates,
    setIsProfileModalOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    logout
  } = useApp();

  const overdueWoCount = workOrders.filter(w => w.status === 'Overdue').length;
  const pendingKasbonCount = kasbon.filter(k => k.status.includes('Menunggu')).length;
  const expiredDocsCount = shipDocuments.filter(d => d.status === 'Expired').length + certificates.filter(c => c.status === 'Expired').length;

  const menuGroups = [
    {
      groupTitle: 'Armada & Ikhtisar',
      items: [
        { key: 'dashboard', label: 'Dashboard Fleet', icon: LayoutDashboard }
      ]
    },
    {
      groupTitle: 'Planned Maintenance (PMS)',
      items: [
        { key: 'pms-equipment', label: 'Equipment & Jam Kerja', icon: Wrench },
        {
          key: 'pms-workorders',
          label: 'Work Orders',
          icon: ClipboardList,
          badge: overdueWoCount > 0 ? `${overdueWoCount} Overdue` : null,
          badgeVariant: 'danger'
        }
      ]
    },
    {
      groupTitle: 'Logistik & Biaya',
      items: [
        { key: 'inventory', label: 'Sparepart & Stok', icon: Package },
        { key: 'cost-mgmt', label: 'Biaya & Budget', icon: PieChart }
      ]
    },
    {
      groupTitle: 'Manajemen Crew Kapal',
      items: [
        { key: 'crew-list', label: 'Master Data Crew', icon: Users },
        {
          key: 'crew-absen',
          label: 'Sistem Absensi (Harian)',
          icon: CalendarCheck,
          highlight: true
        },
        {
          key: 'crew-kasbon',
          label: 'Sistem Kasbon Crew',
          icon: WalletCards,
          badge: pendingKasbonCount > 0 ? `${pendingKasbonCount} Baru` : null,
          badgeVariant: 'purple',
          highlight: true
        },
        { key: 'crew-certs', label: 'Sertifikat Kompetensi', icon: Award },
        { key: 'crew-leave', label: 'Cuti & Safety Drill', icon: LifeBuoy }
      ]
    },
    {
      groupTitle: 'Legalitas & Dokumen',
      items: [
        {
          key: 'ship-docs',
          label: 'Surat & Dokumen Kapal',
          icon: FileText,
          badge: expiredDocsCount > 0 ? `${expiredDocsCount} Exp` : null,
          badgeVariant: 'danger'
        }
      ]
    },
    {
      groupTitle: 'Notifikasi & Kalender',
      items: [
        { key: 'google-calendar', label: 'Google Calendar Sync', icon: CalendarPlus, highlight: true },
        { key: 'wa-simulator', label: 'WhatsApp Simulator', icon: MessageSquare },
        { key: 'notifications', label: 'Log Reminder Terkirim', icon: BellRing }
      ]
    },
    {
      groupTitle: 'Pengaturan & Akun',
      items: [
        { key: 'profile-settings', label: 'Pengaturan Profil', icon: UserCog },
        { key: 'menu-login', label: 'Menu Login / Ganti Akun', icon: LogIn }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Tutup menu samping"
        />
      )}

      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-icon-box" style={{ background: '#08142b', border: '1px solid rgba(37,99,235,0.4)' }}>
            <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
              <polygon points="24,5 41,23 7,23" fill="#16a34a" />
              <path d="M7,25 H41 C40,33 34,36 24,36 C14,36 8,33 7,25 Z" fill="#0284c7" />
              <path d="M8,32 C12,42 17,44 24,44 C31,44 36,42 40,32 C34,41 14,41 8,32 Z" fill="#eab308" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div className="brand-title" style={{ fontSize: '0.98rem' }}>PMS ARMADA</div>
            <div className="brand-subtitle">Fleet Maintenance System</div>
          </div>
          {/* Mobile close button */}
          <button
            type="button"
            className="mobile-sidebar-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menus */}
        <nav className="sidebar-menu">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <div className="menu-group-title">{group.groupTitle}</div>
              <ul className="menu-list">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        className={`nav-item-btn ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          if (item.key === 'profile-settings') {
                            setIsProfileModalOpen(true);
                          } else if (item.key === 'menu-login') {
                            logout();
                          } else {
                            setActiveTab(item.key);
                          }
                        }}
                      style={item.highlight && !isActive ? { borderLeft: '3px solid #0284c7' } : undefined}
                    >
                      <Icon className="nav-icon" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span
                          className="nav-badge"
                          style={{
                            backgroundColor: item.badgeVariant === 'danger' ? '#fff1f2' : '#f5f3ff',
                            color: item.badgeVariant === 'danger' ? '#e11d48' : '#7c3aed',
                            border: `1px solid ${item.badgeVariant === 'danger' ? '#fecdd3' : '#ddd6fe'}`
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer with system status */}
      <div className="sidebar-footer">
        <div className="system-status-indicator">
          <span className="pulse-dot" />
          <span>Sistem Online • Sync Aktif</span>
        </div>
      </div>
    </aside>
    </>
  );
}
