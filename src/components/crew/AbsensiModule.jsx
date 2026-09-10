import React, { useState } from 'react';
import {
  CalendarCheck,
  Plus,
  Search,
  Filter,
  Download,
  Clock,
  MapPin,
  UserCheck,
  UserX,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

export default function AbsensiModule() {
  const {
    attendance,
    addAttendanceRecord,
    ships,
    crew,
    selectedShip,
    exportToCsv
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2026-09-10');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    crewId: '',
    shipId: 'ship-1',
    shift: 'Jaga Laut Standby (08:00 - 16:00)',
    location: 'Perairan Selat Sunda',
    status: 'Onboard (Hadir)',
    checkInTime: '07:45 WIB',
    checkOutTime: '16:00 WIB',
    remarks: 'Tugas operasional lancar'
  });

  // Filter attendance records
  const filteredAttendance = attendance.filter((item) => {
    const matchShip = selectedShip === 'all' || item.shipId === selectedShip;
    const matchSearch =
      item.crewName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.remarks.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === 'all' || item.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchDate = !selectedDate || item.date === selectedDate;
    return matchShip && matchSearch && matchStatus && matchDate;
  });

  // Metrics calculation
  const totalRecords = attendance.filter(a => selectedShip === 'all' || a.shipId === selectedShip);
  const totalHadir = totalRecords.filter(a => a.status.includes('Hadir') || a.status.includes('Onboard')).length;
  const totalSakitIzin = totalRecords.filter(a => a.status.includes('Sakit') || a.status.includes('Izin')).length;
  const attendanceRate = totalRecords.length ? Math.round((totalHadir / totalRecords.length) * 100) : 100;

  const handleCrewChange = (e) => {
    const cid = e.target.value;
    const found = crew.find(c => c.id === cid);
    if (found) {
      setFormData(prev => ({
        ...prev,
        crewId: cid,
        shipId: found.shipId,
        crewName: found.name,
        rank: found.rank
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.crewId) {
      alert('Silakan pilih crew terlebih dahulu.');
      return;
    }

    const selectedCrew = crew.find(c => c.id === formData.crewId);
    addAttendanceRecord({
      ...formData,
      crewName: selectedCrew ? selectedCrew.name : 'Crew Anggota',
      rank: selectedCrew ? selectedCrew.rank : 'ABK',
      date: selectedDate
    });

    setIsModalOpen(false);
  };

  const handleExport = () => {
    const exportData = filteredAttendance.map(item => ({
      Tanggal: item.date,
      Nama_Crew: item.crewName,
      Jabatan: item.rank,
      Kapal: ships.find(s => s.id === item.shipId)?.name || item.shipId,
      Shift_Jaga: item.shift,
      Status: item.status,
      Jam_Masuk: item.checkInTime,
      Jam_Keluar: item.checkOutTime,
      Lokasi: item.location,
      Catatan: item.remarks
    }));
    exportToCsv(exportData, `rekap_absensi_${selectedDate}.csv`);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <CalendarCheck size={26} color="#0284c7" />
            <span>Sistem Absensi & Presensi Crew Kapal</span>
          </h1>
          <p className="page-desc">
            Pencatatan jam dinas jaga (watchkeeping), kehadiran onboard/offboard, dan log status fisik harian per kapal.
          </p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            <span>Catat Presensi Harian</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stat-cards-grid">
        <StatCard
          title="Tingkat Kehadiran Onboard"
          value={`${attendanceRate}%`}
          meta="Kepatuhan presensi dinas kapal"
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Personil Hadir On-Duty"
          value={totalHadir}
          meta="Siap tugas navigasi & mesin"
          icon={Clock}
          color="cyan"
        />
        <StatCard
          title="Sakit / Izin Medis"
          value={totalSakitIzin}
          meta="Dalam perawatan kabin / darat"
          icon={AlertCircle}
          color="rose"
        />
        <StatCard
          title="Total Log Presensi"
          value={totalRecords.length}
          meta={`Tanggal aktif: ${selectedDate}`}
          icon={CalendarCheck}
          color="purple"
        />
      </div>

      {/* Main Table Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Log Kehadiran & Jaga Harian</h2>
            <p className="card-subtitle">
              Menampilkan {filteredAttendance.length} catatan absensi crew pada tanggal {selectedDate}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Pilih Tanggal:
            </label>
            <input
              type="date"
              className="form-control"
              style={{ width: 'auto', padding: '0.4rem 0.75rem' }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
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
                placeholder="Cari nama crew, jabatan, atau keterangan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Semua Status Presensi</option>
              <option value="hadir">Hadir / Onboard</option>
              <option value="sakit">Sakit</option>
              <option value="cuti">Cuti</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nama Personil & Jabatan</th>
                  <th>Kapal Penugasan</th>
                  <th>Shift & Tugas Jaga</th>
                  <th>Jam Masuk / Keluar</th>
                  <th>Lokasi Posisi Kapal</th>
                  <th>Status Presensi</th>
                  <th>Catatan / Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Belum ada catatan presensi untuk tanggal dan filter yang dipilih.
                    </td>
                  </tr>
                ) : (
                  filteredAttendance.map((item) => {
                    const shipObj = ships.find(s => s.id === item.shipId);
                    const isHadir = item.status.includes('Hadir') || item.status.includes('Onboard');
                    const isSakit = item.status.includes('Sakit');

                    return (
                      <tr key={item.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '50%',
                              backgroundColor: '#e0f2fe',
                              color: '#0284c7',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.8rem'
                            }}>
                              {item.crewName.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                                {item.crewName}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {item.rank}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--brand-ocean-700)' }}>
                            {shipObj ? shipObj.name : 'MV Samudera Perkasa'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Clock size={14} color="#64748b" />
                            <span>{item.shift}</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                            {item.checkInTime} - {item.checkOutTime}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                            <MapPin size={14} color="#0284c7" />
                            <span>{item.location}</span>
                          </div>
                        </td>
                        <td>
                          <Badge variant={isHadir ? 'success' : isSakit ? 'danger' : 'warning'}>
                            {item.status}
                          </Badge>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {item.remarks || '-'}
                          </span>
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

      {/* Modal: Input Presensi Harian */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Catat Presensi Harian Crew"
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Batal
            </button>
            <button type="submit" form="attendance-form" className="btn btn-primary">
              Simpan Presensi
            </button>
          </>
        }
      >
        <form id="attendance-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Pilih Crew / Personil <span className="required">*</span>
            </label>
            <select
              className="form-control"
              value={formData.crewId}
              onChange={handleCrewChange}
              required
            >
              <option value="">-- Pilih Crew --</option>
              {crew.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.rank} ({ships.find(s => s.id === c.shipId)?.name || 'Armada'})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Status Presensi <span className="required">*</span>
            </label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Onboard (Hadir)">Onboard (Hadir Dinas)</option>
              <option value="Sakit (Off-duty)">Sakit (Istirahat Kabin / Medis)</option>
              <option value="Izin Pribadi">Izin Pribadi / Khusus</option>
              <option value="Cuti Dinas">Cuti Dinas (Off-ship)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Shift / Tugas Jaga</label>
              <select
                className="form-control"
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
              >
                <option value="Jaga Laut Standby (08:00 - 16:00)">Jaga Laut Standby (08:00 - 16:00)</option>
                <option value="Jaga Navigasi I (04:00 - 08:00 & 16:00 - 20:00)">Jaga Navigasi I (04:00-08:00 & 16:00-20:00)</option>
                <option value="Jaga Mesin II (04:00 - 08:00 & 16:00 - 20:00)">Jaga Mesin II (04:00-08:00 & 16:00-20:00)</option>
                <option value="Daywork Mesin (08:00 - 17:00)">Daywork Mesin (08:00 - 17:00)</option>
                <option value="Daywork Geladak (08:00 - 16:00)">Daywork Geladak (08:00 - 16:00)</option>
                <option value="Standby Dermaga / Labuh">Standby Dermaga / Labuh</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Lokasi Operasional Kapal</label>
              <input
                type="text"
                className="form-control"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Misal: Selat Sunda / Tanjung Priok"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Jam Masuk (Check-In)</label>
              <input
                type="text"
                className="form-control"
                value={formData.checkInTime}
                onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Jam Keluar (Check-Out)</label>
              <input
                type="text"
                className="form-control"
                value={formData.checkOutTime}
                onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Catatan Operasional / Kondisi Kesehatan</label>
            <textarea
              className="form-control"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="Misal: Kondisi sehat siap berlayar, atau catatan sakit"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
