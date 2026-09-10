import React, { useState } from 'react';
import {
  LifeBuoy,
  Calendar,
  Users,
  CheckCircle,
  Plus,
  Shield,
  Clock,
  MapPin,
  Flame,
  Ship
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

export default function CrewLeaveAndDrill() {
  const { leaveRequests, drills, crew, ships, selectedShip, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('leave'); // 'leave' or 'drills'
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isDrillModalOpen, setIsDrillModalOpen] = useState(false);

  // New Leave State
  const [leaveData, setLeaveData] = useState({
    crewId: '',
    shipId: 'ship-1',
    startDate: '2026-09-25',
    endDate: '2026-10-05',
    totalDays: 10,
    reason: 'Cuti istirahat giliran darat dan keluarga',
    signOffPort: 'Tanjung Priok'
  });

  // New Drill State
  const [drillData, setDrillData] = useState({
    drillType: 'Emergency Steering Gear Failure Drill',
    date: '2026-09-10',
    location: 'Selat Sunda',
    participantsCount: 15,
    conductedBy: 'Capt. Bambang Wijaya',
    outcome: 'Satisfactory (Kemudi darurat aktif dalam waktu 3 menit)'
  });

  const filteredLeave = leaveRequests.filter(l => selectedShip === 'all' || l.shipId === selectedShip);
  const filteredDrills = drills.filter(d => selectedShip === 'all' || d.shipId === selectedShip);

  const handleCreateLeave = (e) => {
    e.preventDefault();
    const found = crew.find(c => c.id === leaveData.crewId);
    showToast(`Pengajuan cuti untuk ${found ? found.name : 'Crew'} berhasil diajukan ke Fleet Manager.`, 'success');
    setIsLeaveModalOpen(false);
  };

  const handleCreateDrill = (e) => {
    e.preventDefault();
    showToast(`Safety Drill "${drillData.drillType}" berhasil dicatat di logbook kapal.`, 'success');
    setIsDrillModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <LifeBuoy size={26} color="#0284c7" />
            <span>Manajemen Cuti & Pelatihan Safety Drill</span>
          </h1>
          <p className="page-desc">
            Alur pengajuan cuti berjenjang dan dokumentasi wajib latihan keselamatan (SOLAS / ISM Code) di kapal.
          </p>
        </div>
        <div className="header-actions">
          {activeTab === 'leave' ? (
            <button type="button" className="btn btn-primary" onClick={() => setIsLeaveModalOpen(true)}>
              <Plus size={16} />
              <span>Pengajuan Cuti Baru</span>
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => setIsDrillModalOpen(true)}>
              <Plus size={16} />
              <span>Catat Safety Drill</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-header">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'leave' ? 'active' : ''}`}
          onClick={() => setActiveTab('leave')}
        >
          <Calendar size={16} />
          <span>Pengajuan & Jadwal Cuti Crew</span>
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'drills' ? 'active' : ''}`}
          onClick={() => setActiveTab('drills')}
        >
          <Flame size={16} />
          <span>Logbook Latihan Keselamatan (Drills)</span>
        </button>
      </div>

      {/* LEAVE TAB CONTENT */}
      {activeTab === 'leave' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Daftar Pengajuan Cuti Crew</h2>
              <p className="card-subtitle">Approval berjenjang Nakhoda dan Fleet Manager darat</p>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Nama Crew</th>
                    <th>Kapal</th>
                    <th>Periode Cuti</th>
                    <th>Durasi</th>
                    <th>Pelabuhan Sign-Off</th>
                    <th>Alasan</th>
                    <th>Status Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeave.map((l) => {
                    const shipObj = ships.find(s => s.id === l.shipId);
                    return (
                      <tr key={l.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                            {l.crewName}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>{shipObj ? shipObj.name : 'Armada'}</span>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>
                            {l.startDate} s/d {l.endDate}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: '#0284c7' }}>{l.totalDays} Hari</span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem' }}>📍 {l.signOffPort}</span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{l.reason}</span>
                        </td>
                        <td>
                          <Badge variant={l.status.includes('Disetujui') ? 'success' : 'warning'}>
                            {l.status}
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
      )}

      {/* DRILLS TAB CONTENT */}
      {activeTab === 'drills' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Logbook Pelaksanaan Safety Drill</h2>
              <p className="card-subtitle">Kepatuhan regulasi SOLAS bulanan (Fire Drill, Abandon Ship, Man Overboard)</p>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredDrills.map((d) => {
                const shipObj = ships.find(s => s.id === d.shipId);
                return (
                  <div
                    key={d.id}
                    style={{
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.25rem',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Flame size={18} color="#e11d48" />
                        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--brand-navy-900)' }}>
                          {d.drillType}
                        </h3>
                      </div>
                      <Badge variant="success">Terdokumentasi</Badge>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span>📅 Tanggal: <strong>{d.date}</strong></span>
                      <span>📍 Lokasi: <strong>{d.location}</strong></span>
                      <span>🚢 Kapal: <strong>{shipObj ? shipObj.name : 'Armada'}</strong></span>
                      <span>👥 Partisipan: <strong>{d.participantsCount} Crew</strong></span>
                    </div>

                    <div style={{
                      backgroundColor: '#f8fafc',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.825rem',
                      marginTop: '0.25rem'
                    }}>
                      <strong>Hasil Evaluasi & Catatan:</strong> {d.outcome} (Dipimpin oleh: {d.conductedBy})
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Pengajuan Cuti */}
      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        title="Formulir Pengajuan Cuti Crew"
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setIsLeaveModalOpen(false)}>
              Batal
            </button>
            <button type="submit" form="leave-form" className="btn btn-primary">
              Kirim Pengajuan
            </button>
          </>
        }
      >
        <form id="leave-form" onSubmit={handleCreateLeave}>
          <div className="form-group">
            <label className="form-label">Pilih Crew Pemohon</label>
            <select
              className="form-control"
              value={leaveData.crewId}
              onChange={(e) => setLeaveData({ ...leaveData, crewId: e.target.value })}
              required
            >
              <option value="">-- Pilih Crew --</option>
              {crew.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.rank} (Sisa cuti: {c.remainingLeave} hari)
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Tanggal Mulai Cuti</label>
              <input
                type="date"
                className="form-control"
                value={leaveData.startDate}
                onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tanggal Selesai Cuti</label>
              <input
                type="date"
                className="form-control"
                value={leaveData.endDate}
                onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Pelabuhan Rencana Sign-Off</label>
            <input
              type="text"
              className="form-control"
              value={leaveData.signOffPort}
              onChange={(e) => setLeaveData({ ...leaveData, signOffPort: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Alasan Pengajuan Cuti</label>
            <textarea
              className="form-control"
              value={leaveData.reason}
              onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Modal: Catat Drill */}
      <Modal
        isOpen={isDrillModalOpen}
        onClose={() => setIsDrillModalOpen(false)}
        title="Catat Pelaksanaan Safety Drill (SOLAS)"
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setIsDrillModalOpen(false)}>
              Batal
            </button>
            <button type="submit" form="drill-form" className="btn btn-primary">
              Simpan Drill Log
            </button>
          </>
        }
      >
        <form id="drill-form" onSubmit={handleCreateDrill}>
          <div className="form-group">
            <label className="form-label">Jenis Latihan Keselamatan (Drill)</label>
            <select
              className="form-control"
              value={drillData.drillType}
              onChange={(e) => setDrillData({ ...drillData, drillType: e.target.value })}
            >
              <option value="Abandon Ship & Lifeboat Drill">Abandon Ship & Sekoci Penolong</option>
              <option value="Engine Room Fire Drill">Fire Drill (Kamar Mesin & Geladak)</option>
              <option value="Man Overboard (MOB) Rescue">Man Overboard (MOB / Korban Jatuh ke Laut)</option>
              <option value="Enclosed Space Entry Rescue">Masuk Ruang Tertutup (Enclosed Space)</option>
              <option value="Oil Spill Response Drill">Penanggulangan Tumpahan Minyak (SOPEP)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Tanggal Pelaksanaan</label>
              <input
                type="date"
                className="form-control"
                value={drillData.date}
                onChange={(e) => setDrillData({ ...drillData, date: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Jumlah Personil Partisipan</label>
              <input
                type="number"
                className="form-control"
                value={drillData.participantsCount}
                onChange={(e) => setDrillData({ ...drillData, participantsCount: parseInt(e.target.value, 10) })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Hasil Evaluasi & Waktu Tanggap</label>
            <textarea
              className="form-control"
              value={drillData.outcome}
              onChange={(e) => setDrillData({ ...drillData, outcome: e.target.value })}
              placeholder="Misal: Waktu muster 3 menit, seluruh APD berfungsi baik"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
