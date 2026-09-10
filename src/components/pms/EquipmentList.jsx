import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Plus,
  Clock,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

export default function EquipmentList() {
  const { equipment, ships, selectedShip, updateRunningHours, exportToCsv } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeEq, setActiveEq] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newHoursInput, setNewHoursInput] = useState('');
  const [notesInput, setNotesInput] = useState('');

  const filteredEquipment = equipment.filter((eq) => {
    const matchShip = selectedShip === 'all' || eq.shipId === selectedShip;
    const matchSearch =
      eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.maker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || eq.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchShip && matchSearch && matchStatus;
  });

  const totalEq = filteredEquipment.length;
  const overdueCount = filteredEquipment.filter(e => e.status === 'Overdue').length;
  const dueSoonCount = filteredEquipment.filter(e => e.status === 'Due Soon').length;
  const normalCount = filteredEquipment.filter(e => e.status === 'Normal').length;

  const handleOpenUpdate = (eq) => {
    setActiveEq(eq);
    setNewHoursInput(eq.currentHours);
    setNotesInput('Pengecekan rutin logbook kamar mesin');
    setIsUpdateModalOpen(true);
  };

  const handleSaveHours = (e) => {
    e.preventDefault();
    if (!activeEq) return;
    updateRunningHours(activeEq.id, newHoursInput, notesInput);
    setIsUpdateModalOpen(false);
  };

  const handleExport = () => {
    const data = filteredEquipment.map(e => ({
      Kode: e.code,
      Nama_Equipment: e.name,
      Kategori: e.category,
      Maker_Model: e.maker,
      Serial_Number: e.serialNo,
      Jam_Operasi_Saat_Ini: e.currentHours,
      Jadwal_Servis_Berikutnya: e.nextServiceHours,
      Interval_Jam: e.intervalHours,
      Status: e.status,
      Lokasi_Kapal: e.location
    }));
    exportToCsv(data, 'daftar_equipment_pms.csv');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Wrench size={26} color="#0284c7" />
            <span>Master Equipment & Tracking Running Hours</span>
          </h1>
          <p className="page-desc">
            Manajemen jam operasi mesin (Main Engine, Genset, Pompa, Kompresor) dan interval Planned Maintenance.
          </p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stat-cards-grid">
        <StatCard
          title="Total Equipment Aktif"
          value={totalEq}
          meta="Terdaftar di database PMS"
          icon={Gauge}
          color="blue"
        />
        <StatCard
          title="Kondisi Normal"
          value={normalCount}
          meta="Running hours dalam batas aman"
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Due Soon (<100 Jam)"
          value={dueSoonCount}
          meta="Segera butuh servis rutin"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Overdue (Melewati Batas)"
          value={overdueCount}
          meta="Perlu tindakan segera"
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* Equipment Table Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Daftar Mesin & Peralatan Kapal</h2>
            <p className="card-subtitle">Klik 'Update Jam' untuk memperbarui running hours dari logbook mesin</p>
          </div>
        </div>

        <div className="card-body">
          {/* Filters */}
          <div className="filter-bar">
            <div className="search-input-group">
              <Search className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Cari kode mesin, nama alat, merk/maker, kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status Jam Kerja</option>
              <option value="normal">Normal</option>
              <option value="due soon">Due Soon</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Kode & Mesin</th>
                  <th>Kapal</th>
                  <th>Kategori & Maker</th>
                  <th>Running Hours</th>
                  <th>Servis Berikutnya</th>
                  <th>Interval</th>
                  <th>Status Jam</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Tidak ada equipment yang cocok dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredEquipment.map((eq) => {
                    const shipObj = ships.find(s => s.id === eq.shipId);
                    const isOverdue = eq.status === 'Overdue';
                    const isDueSoon = eq.status === 'Due Soon';

                    return (
                      <tr key={eq.id}>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand-ocean-700)' }}>
                            {eq.code}
                          </div>
                          <div style={{ fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                            {eq.name}
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            Loc: {eq.location}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>
                            {shipObj ? shipObj.name : 'Armada'}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{eq.category}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{eq.maker}</div>
                        </td>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--brand-navy-900)' }}>
                            {eq.currentHours.toLocaleString('id-ID')} Jam
                          </div>
                        </td>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: isOverdue ? '#e11d48' : 'var(--text-secondary)' }}>
                            {eq.nextServiceHours.toLocaleString('id-ID')} Jam
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            Sisa: {eq.nextServiceHours - eq.currentHours} Jam
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                            Tiap {eq.intervalHours} Jam
                          </span>
                        </td>
                        <td>
                          <Badge variant={isOverdue ? 'danger' : isDueSoon ? 'warning' : 'success'}>
                            {eq.status}
                          </Badge>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleOpenUpdate(eq)}
                            title="Update Running Hours"
                          >
                            <Edit3 size={13} />
                            <span>Update Jam</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Update Running Hours */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title={`Update Jam Kerja: ${activeEq?.code} - ${activeEq?.name}`}
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setIsUpdateModalOpen(false)}>
              Batal
            </button>
            <button type="submit" form="update-hours-form" className="btn btn-primary">
              Simpan Running Hours
            </button>
          </>
        }
      >
        <form id="update-hours-form" onSubmit={handleSaveHours}>
          {activeEq && (
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '0.875rem',
              marginBottom: '1rem',
              fontSize: '0.825rem'
            }}>
              <div><strong>Maker / Seri:</strong> {activeEq.maker} ({activeEq.serialNo})</div>
              <div><strong>Target Servis Berikutnya:</strong> {activeEq.nextServiceHours} Jam (Interval {activeEq.intervalHours} Jam)</div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              Running Hours Baru (Jam Operasi Mesin) <span className="required">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              value={newHoursInput}
              onChange={(e) => setNewHoursInput(e.target.value)}
              required
            />
            <div className="form-hint">
              Sistem akan menghitung otomatis apakah mesin masuk status Overdue atau Due Soon.
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Catatan Logbook Mesin</label>
            <textarea
              className="form-control"
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="Misal: Pembacaan meteran jam 08:00 WIB oleh Masinis Jaga"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
