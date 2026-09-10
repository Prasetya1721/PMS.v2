import React, { useState } from 'react';
import {
  Award,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

export default function CrewCertificates() {
  const { certificates, crew, ships, selectedShip, exportToCsv, sendSimulatedWhatsApp } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [previewCert, setPreviewCert] = useState(null);

  const filteredCerts = certificates.filter((cert) => {
    const crewMember = crew.find(c => c.id === cert.crewId);
    const matchShip = selectedShip === 'all' || (crewMember && crewMember.shipId === selectedShip);
    const matchSearch =
      cert.crewName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || cert.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchShip && matchSearch && matchStatus;
  });

  const totalCerts = filteredCerts.length;
  const expiredCount = filteredCerts.filter(c => c.status === 'Expired').length;
  const dueSoonCount = filteredCerts.filter(c => c.status.includes('Due Soon')).length;

  const handleSendReminderWA = (cert) => {
    const crewMember = crew.find(c => c.id === cert.crewId);
    const phone = crewMember?.phone || '+628123456789';
    sendSimulatedWhatsApp(
      cert.crewName,
      phone,
      'Sertifikat Kadaluarsa / Renewal',
      `🔔 [REMINDER SERTIFIKAT] Yth. ${cert.crewName}. Sertifikat ${cert.certName} (${cert.certNo}) masa berlaku hingga ${cert.expiryDate}. Harap segera persiapkan dokumen perpanjangan / revalidasi.`
    );
  };

  const handleExport = () => {
    const data = filteredCerts.map(c => ({
      Nama_Crew: c.crewName,
      Jenis_Sertifikat: c.certType,
      Nama_Sertifikat: c.certName,
      Nomor_Reg: c.certNo,
      Penerbit: c.issuingAuthority,
      Tanggal_Terbit: c.issueDate,
      Tanggal_Kadaluarsa: c.expiryDate,
      Sisa_Hari: c.daysToExpiry,
      Status: c.status
    }));
    exportToCsv(data, 'sertifikat_crew_pelaut.csv');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Award size={26} color="#0284c7" />
            <span>Sertifikasi & Kelaiklautan Crew (STCW)</span>
          </h1>
          <p className="page-desc">
            Pemantauan sertifikat kompetensi (COC), keahlian (COP: BST, AFF, SCRB, MEFA), dan tes kesehatan pelaut (MCU).
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
          title="Total Sertifikat Terpantau"
          value={totalCerts}
          meta="COC, COP, MCU aktif"
          icon={Award}
          color="blue"
        />
        <StatCard
          title="Mendekati Expired (<60 Hari)"
          value={dueSoonCount}
          meta="Perlu pengajuan kursus/revalidasi"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Sertifikat Expired (Kadaluarsa)"
          value={expiredCount}
          meta="Tidak layak berlayar sebelum diperpanjang"
          icon={AlertTriangle}
          color={expiredCount > 0 ? 'rose' : 'green'}
        />
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Daftar Sertifikat & Masa Berlaku</h2>
            <p className="card-subtitle">Sistem otomatis mendeteksi threshold H-90, H-60, H-30 untuk notifikasi WhatsApp</p>
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
                placeholder="Cari nama crew, jenis sertifikat, nomor register..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status Masa Berlaku</option>
              <option value="aktif">Aktif</option>
              <option value="due soon">Due Soon (Mendekati Expired)</option>
              <option value="expired">Expired (Kadaluarsa)</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nama Personil</th>
                  <th>Jenis & Nama Sertifikat</th>
                  <th>Nomor Register</th>
                  <th>Penerbit (Authority)</th>
                  <th>Tanggal Kadaluarsa</th>
                  <th>Sisa Waktu</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredCerts.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Tidak ditemukan sertifikat yang cocok.
                    </td>
                  </tr>
                ) : (
                  filteredCerts.map((cert) => {
                    const isExpired = cert.status === 'Expired';
                    const isDueSoon = cert.status.includes('Due Soon');

                    return (
                      <tr key={cert.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                            {cert.crewName}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--brand-ocean-700)' }}>
                            {cert.certName}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Tipe: {cert.certType}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                            {cert.certNo}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {cert.issuingAuthority}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: isExpired ? '#e11d48' : 'var(--text-primary)' }}>
                            {cert.expiryDate}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: isExpired ? '#e11d48' : isDueSoon ? '#d97706' : '#059669' }}>
                            {isExpired ? `Lewat ${Math.abs(cert.daysToExpiry)} hari` : `${cert.daysToExpiry} hari lagi`}
                          </span>
                        </td>
                        <td>
                          <Badge variant={isExpired ? 'danger' : isDueSoon ? 'warning' : 'success'}>
                            {cert.status}
                          </Badge>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="btn btn-sm btn-secondary"
                              onClick={() => setPreviewCert(cert)}
                              title="Lihat Scan Digital"
                            >
                              <Eye size={13} />
                              <span>Lihat Scan</span>
                            </button>
                            {(isExpired || isDueSoon) && (
                              <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={() => handleSendReminderWA(cert)}
                                title="Kirim Pengingat WhatsApp"
                              >
                                Kirim WA
                              </button>
                            )}
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

      {/* Modal: Preview Sertifikat Scan Simulator */}
      <Modal
        isOpen={!!previewCert}
        onClose={() => setPreviewCert(null)}
        title={`Scan Digital: ${previewCert?.certName}`}
        footer={
          <button type="button" className="btn btn-secondary" onClick={() => setPreviewCert(null)}>
            Tutup Preview
          </button>
        }
      >
        {previewCert && (
          <div style={{
            border: '2px dashed var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            backgroundColor: '#f8fafc',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Award size={32} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-navy-900)' }}>
              {previewCert.certName}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Nomor: <strong>{previewCert.certNo}</strong> • Pemilik: <strong>{previewCert.crewName}</strong>
            </p>

            <div style={{
              marginTop: '1.5rem',
              backgroundColor: '#ffffff',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              textAlign: 'left',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Otoritas Penerbit:</div>
                  <strong>{previewCert.issuingAuthority}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Tanggal Diterbitkan:</div>
                  <strong>{previewCert.issueDate}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Tanggal Kadaluarsa:</div>
                  <strong style={{ color: previewCert.status === 'Expired' ? '#e11d48' : 'inherit' }}>
                    {previewCert.expiryDate}
                  </strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Status Validasi:</div>
                  <Badge variant={previewCert.status === 'Expired' ? 'danger' : 'success'}>
                    {previewCert.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              🔒 Dokumen digital terverifikasi dengan tanda tangan elektronik otoritas maritim.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
