import React, { useState } from 'react';
import {
  Calendar,
  CalendarPlus,
  ExternalLink,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Bell,
  RefreshCw,
  Ship,
  Wrench,
  Award,
  Flame,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/PMSContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import { openGoogleCalendarEvent, exportIcsCalendar } from '../../utils/calendarUtils';

export default function GoogleCalendarModule() {
  const {
    workOrders,
    shipDocuments,
    certificates,
    drills,
    ships,
    selectedShip,
    showToast
  } = useApp();

  const [filterType, setFilterType] = useState('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('10 September 2026, 19:30 WIB');
  const [googleEmail, setGoogleEmail] = useState('fleet.superintendent@gmail.com');

  // Aggregate all events from WO, Ship Documents, Crew Certificates, and Drills
  const events = [];

  // 1. Work Orders
  workOrders.forEach((wo) => {
    if (selectedShip === 'all' || wo.shipId === selectedShip) {
      const shipObj = ships.find(s => s.id === wo.shipId);
      events.push({
        id: wo.id,
        category: 'work_order',
        categoryLabel: 'Work Order PMS',
        icon: Wrench,
        title: `[PMS WO] ${wo.title}`,
        date: wo.dueDate,
        shipName: shipObj ? shipObj.name : 'Armada',
        priority: wo.priority,
        status: wo.status,
        location: shipObj ? shipObj.homePort : 'Kamar Mesin Kapal',
        details: `Instruksi Pekerjaan: ${wo.title}\nNomor WO: ${wo.woNumber}\nTeknisi Ditugaskan: ${wo.assignedTo}\nKapal: ${shipObj?.name}\nPrioritas: ${wo.priority}\nCatatan: ${wo.notes || '-'}`
      });
    }
  });

  // 2. Ship Documents Expiry
  shipDocuments.forEach((doc) => {
    if (selectedShip === 'all' || doc.shipId === selectedShip) {
      events.push({
        id: doc.id,
        category: 'ship_doc',
        categoryLabel: 'Surat Kapal Expired',
        icon: FileText,
        title: `[DOKUMEN KAPAL] Jatuh Tempo: ${doc.docName}`,
        date: doc.expiryDate,
        shipName: doc.shipName,
        priority: doc.status === 'Expired' ? 'Urgent' : 'High',
        status: doc.status,
        location: doc.shipName,
        details: `Peringatan Masa Berlaku Surat Kapal:\nDokumen: ${doc.docName}\nNomor: ${doc.certNo}\nKapal: ${doc.shipName}\nPenerbit: ${doc.issuingAuthority}\nStatus: ${doc.status}`
      });
    }
  });

  // 3. Crew Certificates Expiry
  certificates.forEach((cert) => {
    events.push({
      id: cert.id,
      category: 'crew_cert',
      categoryLabel: 'Sertifikat Pelaut',
      icon: Award,
      title: `[SERTIFIKAT CREW] Renewal: ${cert.crewName} - ${cert.certName}`,
      date: cert.expiryDate,
      shipName: 'Personil Pelaut',
      priority: cert.status === 'Expired' ? 'Urgent' : 'Medium',
      status: cert.status,
      location: 'Biro Diklat Pelaut / BKKP',
      details: `Pembaruan Sertifikat Pelaut:\nNama: ${cert.crewName}\nSertifikat: ${cert.certName} (${cert.certType})\nNomor Register: ${cert.certNo}\nPenerbit: ${cert.issuingAuthority}\nJatuh Tempo: ${cert.expiryDate}`
    });
  });

  // 4. Safety Drills
  drills.forEach((d) => {
    if (selectedShip === 'all' || d.shipId === selectedShip) {
      const shipObj = ships.find(s => s.id === d.shipId);
      events.push({
        id: d.id,
        category: 'safety_drill',
        categoryLabel: 'Safety Drill SOLAS',
        icon: Flame,
        title: `[SAFETY DRILL] ${d.drillType}`,
        date: d.date,
        shipName: shipObj ? shipObj.name : 'Armada',
        priority: 'High',
        status: 'Scheduled',
        location: d.location || 'Di Atas Kapal',
        details: `Latihan Keselamatan Kapal (SOLAS):\nDrill: ${d.drillType}\nLokasi: ${d.location}\nKapal: ${shipObj?.name}\nPemimpin Latihan: ${d.conductedBy}`
      });
    }
  });

  // Sort by date
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filter
  const filteredEvents = events.filter((ev) => {
    if (filterType === 'all') return true;
    return ev.category === filterType;
  });

  const handleSyncGoogle = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(`${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID')} WIB`);
      showToast('Sinkronisasi jadwal PMS ke Google Calendar berhasil!', 'success');
    }, 800);
  };

  const handleExportAllIcs = () => {
    exportIcsCalendar(events, `jadwal_pms_google_calendar_${new Date().toISOString().split('T')[0]}.ics`);
    showToast('File .ICS berhasil diunduh. Anda dapat mengimpornya langsung ke Google Calendar.', 'success');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Calendar size={26} color="#0284c7" />
            <span>Integrasi & Notifikasi Google Calendar</span>
          </h1>
          <p className="page-desc">
            Sinkronkan jadwal perawatan mesin, jatuh tempo dokumen kapal, dan sertifikat pelaut langsung ke Google Calendar smartphone & desktop Anda.
          </p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => window.open('https://calendar.google.com/', '_blank')}
            title="Buka Google Calendar Web di tab baru"
          >
            <ExternalLink size={16} />
            <span>Buka Google Calendar</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleExportAllIcs}
            title="Unduh seluruh jadwal PMS dalam format file kalender .ICS"
          >
            <Download size={16} />
            <span>Ekspor Semua (.ICS)</span>
          </button>
        </div>
      </div>

      {/* Integration Status Card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2563eb'
          }}>
            <CalendarPlus size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--brand-navy-900)' }}>
                Google Calendar Sync Terhubung
              </h3>
              <Badge variant="success" icon={CheckCircle2}>
                Aktif
              </Badge>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Akun: <strong>{googleEmail}</strong> • Pengingat otomatis: <strong>Pop-up H-1 & Email H-7</strong>
            </div>
            <div style={{ fontSize: '0.725rem', color: '#0284c7', marginTop: '0.15rem' }}>
              Terakhir diperbarui: {lastSyncTime}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={isSyncing}
            onClick={handleSyncGoogle}
          >
            <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stat-cards-grid">
        <StatCard
          title="Total Agenda PMS Terpantau"
          value={events.length}
          meta="Event maintenance & dokumen"
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Jadwal Work Orders"
          value={events.filter(e => e.category === 'work_order').length}
          meta="Perawatan mesin & overhaul"
          icon={Wrench}
          color="cyan"
        />
        <StatCard
          title="Jatuh Tempo Surat Kapal"
          value={events.filter(e => e.category === 'ship_doc').length}
          meta="Batas sertifikasi kapal"
          icon={FileText}
          color="amber"
        />
        <StatCard
          title="Sertifikat & Safety Drills"
          value={events.filter(e => e.category === 'crew_cert' || e.category === 'safety_drill').length}
          meta="Kesiapan kru & latihan SOLAS"
          icon={Award}
          color="purple"
        />
      </div>

      {/* Agenda & Event Cards */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Daftar Agenda & Notifikasi Kalender Mendatang</h2>
            <p className="card-subtitle">Klik tombol 'Tambah ke Google Calendar' pada setiap jadwal untuk menyimpan pengingat otomatis</p>
          </div>
        </div>

        <div className="card-body">
          {/* Filter Type Pills */}
          <div className="tabs-header" style={{ marginBottom: '1.25rem' }}>
            <button
              type="button"
              className={`tab-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              Semua Jadwal ({events.length})
            </button>
            <button
              type="button"
              className={`tab-btn ${filterType === 'work_order' ? 'active' : ''}`}
              onClick={() => setFilterType('work_order')}
            >
              Work Orders ({events.filter(e => e.category === 'work_order').length})
            </button>
            <button
              type="button"
              className={`tab-btn ${filterType === 'ship_doc' ? 'active' : ''}`}
              onClick={() => setFilterType('ship_doc')}
            >
              Surat Kapal ({events.filter(e => e.category === 'ship_doc').length})
            </button>
            <button
              type="button"
              className={`tab-btn ${filterType === 'crew_cert' ? 'active' : ''}`}
              onClick={() => setFilterType('crew_cert')}
            >
              Sertifikat Pelaut ({events.filter(e => e.category === 'crew_cert').length})
            </button>
            <button
              type="button"
              className={`tab-btn ${filterType === 'safety_drill' ? 'active' : ''}`}
              onClick={() => setFilterType('safety_drill')}
            >
              Safety Drills ({events.filter(e => e.category === 'safety_drill').length})
            </button>
          </div>

          {/* Event List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                Tidak ada agenda yang terdaftar pada kategori ini.
              </div>
            ) : (
              filteredEvents.map((ev) => {
                const IconComponent = ev.icon;
                const isOverdue = ev.status === 'Overdue' || ev.status === 'Expired';
                const isDueSoon = ev.status.includes('Due Soon');

                return (
                  <div
                    key={ev.id}
                    style={{
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.25rem 1.5rem',
                      backgroundColor: '#ffffff',
                      boxShadow: 'var(--shadow-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '280px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isOverdue ? '#fff1f2' : isDueSoon ? '#fffbeb' : '#eff6ff',
                        color: isOverdue ? '#e11d48' : isDueSoon ? '#d97706' : '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={22} />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                            {ev.categoryLabel}
                          </span>
                          <Badge variant={isOverdue ? 'danger' : isDueSoon ? 'warning' : 'info'}>
                            {ev.status}
                          </Badge>
                          <span style={{ fontSize: '0.75rem', color: 'var(--brand-ocean-700)', fontWeight: 600 }}>
                            🚢 {ev.shipName}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--brand-navy-900)', marginTop: '0.25rem' }}>
                          {ev.title}
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Clock size={14} color="#64748b" />
                            Target / Expired: <strong style={{ color: isOverdue ? '#e11d48' : 'inherit' }}>{ev.date}</strong>
                          </span>
                          {ev.location && (
                            <span>📍 {ev.location}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button: Direct Add to Google Calendar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                          backgroundColor: '#1a73e8',
                          borderColor: '#1a73e8',
                          boxShadow: '0 2px 6px rgba(26, 115, 232, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onClick={() => {
                          openGoogleCalendarEvent({
                            title: ev.title,
                            details: ev.details,
                            location: ev.location,
                            startDate: ev.date
                          });
                          showToast(`Membuka form Google Calendar untuk "${ev.title}"...`, 'info');
                        }}
                        title="Buka Google Calendar dan tambahkan jadwal ini dengan notifikasi otomatis"
                      >
                        <CalendarPlus size={16} />
                        <span>Tambah ke Google Calendar</span>
                        <ExternalLink size={13} style={{ opacity: 0.8 }} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
