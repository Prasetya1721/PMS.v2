import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  FileCheck,
  Calendar,
  Download,
  WalletCards,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

export default function CrewList() {
  const { crew, ships, selectedShip, exportToCsv, setActiveTab } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCrew = crew.filter((c) => {
    const matchShip = selectedShip === 'all' || c.shipId === selectedShip;
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.seamanBookNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchShip && matchSearch && matchStatus;
  });

  const totalCrew = filteredCrew.length;
  const onboardCrew = filteredCrew.filter(c => c.status === 'Onboard').length;

  const handleExport = () => {
    const data = filteredCrew.map(c => ({
      Nama_Lengkap: c.name,
      Jabatan_Rank: c.rank,
      Kapal: ships.find(s => s.id === c.shipId)?.name || c.shipId,
      No_Buku_Pelaut: c.seamanBookNo,
      No_Handphone: c.phone,
      Status: c.status,
      Sign_On: c.signOnDate,
      Akhir_Kontrak: c.contractEnd,
      Sisa_Cuti: `${c.remainingLeave} Hari`
    }));
    exportToCsv(data, 'master_data_crew.csv');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Users size={26} color="#0284c7" />
            <span>Master Data Personil Crew Kapal</span>
          </h1>
          <p className="page-desc">
            Manajemen data pelaut, masa berlaku kontrak PKL, penempatan kapal, nomor buku pelaut, dan jatah cuti.
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
          title="Total Crew Terdaftar"
          value={`${totalCrew} Pelaut`}
          meta="Perwira & ABK aktif"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Crew Onboard Dinas"
          value={`${onboardCrew} Personil`}
          meta="Sedang berlayar / jaga kapal"
          icon={CalendarCheck}
          color="green"
        />
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Daftar Personil & Kontak</h2>
            <p className="card-subtitle">Informasi profil lengkap, penugasan kapal, dan akses cepat modul kasbon/absen</p>
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
                placeholder="Cari nama personil, jabatan, buku pelaut..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="onboard">Onboard (Di Kapal)</option>
              <option value="standby">Standby / Cuti</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nama & Jabatan</th>
                  <th>Kapal Penempatan</th>
                  <th>Buku Pelaut (Seaman Book)</th>
                  <th>Kontak HP & WhatsApp</th>
                  <th>Periode Kontrak</th>
                  <th>Sisa Cuti</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Aksi Cepat</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrew.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Tidak ada crew yang cocok dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredCrew.map((c) => {
                    const shipObj = ships.find(s => s.id === c.shipId);
                    return (
                      <tr key={c.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                              src={c.avatar}
                              alt={c.name}
                              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                                {c.name}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {c.rank}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--brand-ocean-700)' }}>
                            {shipObj ? shipObj.name : 'Armada'}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', fontWeight: 600 }}>
                            {c.seamanBookNo}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {c.phone}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8rem' }}>
                            {c.signOnDate} s/d {c.contractEnd}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: '#0284c7' }}>
                            {c.remainingLeave} Hari
                          </span>
                          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            {' '}/ {c.leaveQuota}
                          </span>
                        </td>
                        <td>
                          <Badge variant={c.status === 'Onboard' ? 'success' : 'gray'}>
                            {c.status}
                          </Badge>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="btn btn-sm btn-secondary"
                              onClick={() => setActiveTab('crew-absen')}
                              title="Lihat / Catat Presensi"
                            >
                              <CalendarCheck size={13} color="#0284c7" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-secondary"
                              onClick={() => setActiveTab('crew-kasbon')}
                              title="Buka Data Kasbon"
                            >
                              <WalletCards size={13} color="#7c3aed" />
                            </button>
                          </div>
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
    </div>
  );
}
