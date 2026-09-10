import React from 'react';
import {
  Ship,
  Wrench,
  AlertTriangle,
  FileCheck,
  Users,
  WalletCards,
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatCard from '../common/StatCard';
import Badge from '../common/Badge';

export default function FleetDashboard() {
  const {
    ships,
    selectedShip,
    setSelectedShip,
    equipment,
    workOrders,
    crew,
    attendance,
    kasbon,
    shipDocuments,
    certificates,
    setActiveTab
  } = useApp();

  const currentShip = selectedShip === 'all' ? null : ships.find(s => s.id === selectedShip);

  // Filter calculations
  const filteredEq = equipment.filter(e => selectedShip === 'all' || e.shipId === selectedShip);
  const filteredWo = workOrders.filter(w => selectedShip === 'all' || w.shipId === selectedShip);
  const filteredCrew = crew.filter(c => selectedShip === 'all' || c.shipId === selectedShip);
  const filteredDocs = shipDocuments.filter(d => selectedShip === 'all' || d.shipId === selectedShip);
  const filteredKasbon = kasbon.filter(k => selectedShip === 'all' || k.shipId === selectedShip);
  const filteredAtt = attendance.filter(a => selectedShip === 'all' || a.shipId === selectedShip);

  const overdueWo = filteredWo.filter(w => w.status === 'Overdue');
  const dueSoonWo = filteredWo.filter(w => w.status === 'Due Soon');
  const expiredDocs = filteredDocs.filter(d => d.status === 'Expired');
  const dueSoonDocs = filteredDocs.filter(d => d.status.includes('Due Soon'));
  const activeKasbonTotal = filteredKasbon.filter(k => k.status !== 'Lunas').reduce((acc, k) => acc + (k.remainingAmount || k.amount), 0);

  const onboardCrewCount = filteredCrew.filter(c => c.status === 'Onboard').length;
  const attendanceToday = filteredAtt.filter(a => a.status.includes('Hadir') || a.status.includes('Onboard')).length;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Ship size={26} color="#0284c7" />
            <span>
              {currentShip ? `Dashboard ${currentShip.name}` : 'Dashboard Terpusat Seluruh Armada Kapal'}
            </span>
          </h1>
          <p className="page-desc">
            {currentShip
              ? `${currentShip.type} • ${currentShip.imoNumber} • Port: ${currentShip.homePort}`
              : 'Monitoring real-time Planned Maintenance, kelaiklautan dokumen, kesiapan crew, kasbon & absensi armada'}
          </p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setActiveTab('wa-simulator')}
          >
            <span>Tes WhatsApp Reminder</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setActiveTab('pms-workorders')}
          >
            <Wrench size={16} />
            <span>Kelola Work Orders</span>
          </button>
        </div>
      </div>

      {/* Critical Alert Banners if any */}
      {(overdueWo.length > 0 || expiredDocs.length > 0) && (
        <div style={{
          backgroundColor: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}>
          <AlertTriangle size={24} color="#e11d48" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#9f1239', fontWeight: 700, fontSize: '0.95rem' }}>
              Perhatian Operasional Kritis Terdeteksi!
            </h4>
            <div style={{ fontSize: '0.85rem', color: '#881337', marginTop: '0.25rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {overdueWo.length > 0 && (
                <span>
                  ⚠️ <strong>{overdueWo.length} Work Order Maintenance Overdue</strong> (melebihi jam operasi)
                </span>
              )}
              {expiredDocs.length > 0 && (
                <span>
                  🚨 <strong>{expiredDocs.length} Dokumen Kapal Expired</strong> (resiko penahanan otoritas pelabuhan)
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => setActiveTab(overdueWo.length > 0 ? 'pms-workorders' : 'ship-docs')}
          >
            Tindak Lanjuti
          </button>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="stat-cards-grid">
        <StatCard
          title="Kepatuhan PMS"
          value={currentShip ? `${currentShip.maintenanceCompliance}%` : '91%'}
          meta={`${filteredWo.filter(w => w.status === 'Completed').length} WO selesai tepat waktu`}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="WO Overdue / Due Soon"
          value={`${overdueWo.length} / ${dueSoonWo.length}`}
          meta="Butuh tindakan teknisi"
          icon={Wrench}
          color={overdueWo.length > 0 ? 'rose' : 'amber'}
        />
        <StatCard
          title="Crew Onboard / Hadir"
          value={`${onboardCrewCount} Orang`}
          meta={`${attendanceToday} presensi dinas tercatat`}
          icon={Users}
          color="cyan"
        />
        <StatCard
          title="Total Kasbon Aktif"
          value={`Rp ${(activeKasbonTotal / 1000000).toFixed(1)} Jt`}
          meta={`${filteredKasbon.filter(k => k.status.includes('Menunggu')).length} pengajuan pending`}
          icon={WalletCards}
          color="purple"
        />
      </div>

      {/* Fleet Ships Overview (if viewing all ships) */}
      {selectedShip === 'all' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Armada Kapal Aktif</h2>
              <p className="card-subtitle">Status operasional, lokasi kapal, dan kelaiklautan teknis</p>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {ships.map((ship) => {
                const shipWo = workOrders.filter(w => w.shipId === ship.id);
                const shipOverdue = shipWo.filter(w => w.status === 'Overdue').length;
                const shipCrew = crew.filter(c => c.shipId === ship.id).length;

                return (
                  <div
                    key={ship.id}
                    style={{
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      boxShadow: 'var(--shadow-xs)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedShip(ship.id)}
                  >
                    <div style={{
                      height: '140px',
                      backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.6)), url(${ship.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      color: '#ffffff'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          backgroundColor: ship.status === 'Operational' ? 'rgba(5, 150, 105, 0.9)' : 'rgba(217, 119, 6, 0.9)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.725rem',
                          fontWeight: 700
                        }}>
                          {ship.status}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{ship.imoNumber}</span>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{ship.name}</h3>
                        <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>{ship.type} • {ship.grossTonnage}</p>
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Lokasi Saat Ini:</span>
                        <span style={{ fontWeight: 600, color: 'var(--brand-navy-900)' }}>{ship.currentLocation}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Chief Engineer:</span>
                        <span style={{ fontWeight: 600 }}>{ship.chiefEngineer}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Total Crew:</span>
                        <span style={{ fontWeight: 600 }}>{shipCrew} Personil</span>
                      </div>

                      <div style={{
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--border-default)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Badge variant={shipOverdue > 0 ? 'danger' : 'success'}>
                            {shipOverdue > 0 ? `${shipOverdue} Overdue WO` : 'Maintenance Normal'}
                          </Badge>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--brand-ocean-600)', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                          Buka Detail <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Two Column Layout: Work Orders & Quick Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.75rem' }}>
        {/* Recent Work Orders */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Work Order Prioritas PMS</h2>
              <p className="card-subtitle">Jadwal perawatan mesin & checklist pekerjaan</p>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => setActiveTab('pms-workorders')}
            >
              Lihat Semua
            </button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Work Order</th>
                    <th>Equipment</th>
                    <th>Prioritas</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWo.slice(0, 4).map((wo) => {
                    const eqObj = equipment.find(e => e.id === wo.equipmentId);
                    return (
                      <tr key={wo.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--brand-navy-900)' }}>{wo.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {wo.woNumber} • Due: {wo.dueDate}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                            {eqObj ? eqObj.name : 'Machinery'}
                          </span>
                        </td>
                        <td>
                          <Badge variant={wo.priority === 'Urgent' ? 'danger' : wo.priority === 'High' ? 'warning' : 'info'}>
                            {wo.priority}
                          </Badge>
                        </td>
                        <td>
                          <Badge variant={wo.status === 'Completed' ? 'success' : wo.status === 'Overdue' ? 'danger' : 'warning'}>
                            {wo.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Highlights: Kasbon & Absensi Status */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Sorotan Crew & Keuangan</h2>
              <p className="card-subtitle">Aktivitas terkini kasbon dan presensi harian</p>
            </div>
          </div>
          <div className="card-body">
            {/* Kasbon Quick Widget */}
            <div style={{
              backgroundColor: '#f5f3ff',
              border: '1px solid #ddd6fe',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#7c3aed',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <WalletCards size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#4c1d95', fontSize: '0.9rem' }}>
                    Sistem Kasbon Karyawan / Crew
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6d28d9' }}>
                    {filteredKasbon.filter(k => k.status.includes('Menunggu')).length} pengajuan menunggu approval
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm"
                style={{ backgroundColor: '#7c3aed', color: '#ffffff' }}
                onClick={() => setActiveTab('crew-kasbon')}
              >
                Buka Kasbon
              </button>
            </div>

            {/* Attendance Quick Widget */}
            <div style={{
              backgroundColor: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CalendarCheck size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0369a1', fontSize: '0.9rem' }}>
                    Presensi & Shift Jaga Crew
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#0284c7' }}>
                    {attendanceToday} crew standby dinas hari ini
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => setActiveTab('crew-absen')}
              >
                Catat Absen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
