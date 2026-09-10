import React, { useState } from 'react';
import {
  FileText,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  ShieldCheck,
  Send,
  CalendarPlus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';
import { openGoogleCalendarEvent } from '../../utils/calendarUtils';

export default function ShipDocuments() {
  const { shipDocuments, ships, selectedShip, exportToCsv, sendSimulatedWhatsApp } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeDoc, setActiveDoc] = useState(null);

  const filteredDocs = shipDocuments.filter((d) => {
    const matchShip = selectedShip === 'all' || d.shipId === selectedShip;
    const matchSearch =
      d.docName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.certNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.docType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.issuingAuthority.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || d.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchShip && matchSearch && matchStatus;
  });

  const totalDocs = filteredDocs.length;
  const expiredDocs = filteredDocs.filter(d => d.status === 'Expired').length;
  const dueSoonDocs = filteredDocs.filter(d => d.status.includes('Due Soon')).length;

  const handleSendWaAlert = (doc) => {
    const shipObj = ships.find(s => s.id === doc.shipId);
    sendSimulatedWhatsApp(
      `${shipObj ? shipObj.captain : 'Nakhoda'} (${doc.shipName})`,
      '+6281298765432',
      'Surat Kapal Expired / Jatuh Tempo',
      `🚨 [PERINGATAN SURAT KAPAL] Dokumen legalitas ${doc.docName} (${doc.certNo}) kapal ${doc.shipName} status ${doc.status} (Jatuh tempo: ${doc.expiryDate}). Segera hubungi biro klasifikasi / Syahbandar untuk survey pembaharuan.`
    );
  };

  const handleExport = () => {
    const data = filteredDocs.map(d => ({
      Kapal: d.shipName,
      Nama_Dokumen: d.docName,
      Kategori: d.docType,
      Nomor_Sertifikat: d.certNo,
      Otoritas_Penerbit: d.issuingAuthority,
      Tanggal_Terbit: d.issueDate,
      Tanggal_Kadaluarsa: d.expiryDate,
      Sisa_Hari: d.daysToExpiry,
      Status: d.status
    }));
    exportToCsv(data, 'legalitas_surat_kapal.csv');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FileText size={26} color="#0284c7" />
            <span>Surat & Dokumen Kelaiklautan Kapal</span>
          </h1>
          <p className="page-desc">
            Monitoring masa berlaku sertifikat statutory, biro klasifikasi (BKI), keselamatan konstruksi, radio, dan asuransi P&I armada.
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
          title="Total Dokumen Legal"
          value={totalDocs}
          meta="Tercatat dalam registri armada"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Mendekati Expired (<60 Hari)"
          value={dueSoonDocs}
          meta="Perlu dijadwalkan renewal survey"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Dokumen Expired (Kritis)"
          value={expiredDocs}
          meta="Risiko penahanan kapal (detained)"
          icon={AlertTriangle}
          color={expiredDocs > 0 ? 'rose' : 'green'}
        />
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Daftar Dokumen Statutory & Sertifikasi Kapal</h2>
            <p className="card-subtitle">Sistem otomatis memicu peringatan berjenjang H-90, H-60, H-30, H-14, H-7</p>
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
                placeholder="Cari nama sertifikat, nomor register, otoritas penerbit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status Dokumen</option>
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
                  <th>Nama Dokumen & Jenis</th>
                  <th>Kapal</th>
                  <th>Nomor Sertifikat</th>
                  <th>Penerbit (Issuer)</th>
                  <th>Tanggal Terbit / Expired</th>
                  <th>Sisa Waktu</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Tidak ada dokumen kapal yang sesuai dengan filter.
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => {
                    const isExpired = doc.status === 'Expired';
                    const isDueSoon = doc.status.includes('Due Soon');

                    return (
                      <tr key={doc.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                            {doc.docName}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Tipe: {doc.docType}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--brand-ocean-700)' }}>
                            {doc.shipName}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem' }}>
                            {doc.certNo}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {doc.issuingAuthority}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8rem' }}>
                            <div>Terbit: {doc.issueDate}</div>
                            <div style={{ fontWeight: 700, color: isExpired ? '#e11d48' : 'var(--text-primary)' }}>
                              Exp: {doc.expiryDate}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: isExpired ? '#e11d48' : isDueSoon ? '#d97706' : '#059669' }}>
                            {isExpired ? `Lewat ${Math.abs(doc.daysToExpiry)} hari` : `${doc.daysToExpiry} hari lagi`}
                          </span>
                        </td>
                        <td>
                          <Badge variant={isExpired ? 'danger' : isDueSoon ? 'warning' : 'success'}>
                            {doc.status}
                          </Badge>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="btn btn-sm btn-secondary"
                              onClick={() => setActiveDoc(doc)}
                              title="Lihat Pratinjau Sertifikat"
                            >
                              <Eye size={13} />
                              <span>Lihat</span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-secondary"
                              onClick={() => openGoogleCalendarEvent({
                                title: `[DOKUMEN KAPAL] Jatuh Tempo: ${doc.docName} (${doc.shipName})`,
                                details: `Peringatan Masa Berlaku Surat Kapal:\nDokumen: ${doc.docName}\nNomor: ${doc.certNo}\nKapal: ${doc.shipName}\nPenerbit: ${doc.issuingAuthority}\nStatus: ${doc.status}`,
                                startDate: doc.expiryDate,
                                location: doc.shipName
                              })}
                              title="Tambahkan Pengingat ke Google Calendar"
                            >
                              <CalendarPlus size={13} color="#1a73e8" />
                            </button>
                            {(isExpired || isDueSoon) && (
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => handleSendWaAlert(doc)}
                                title="Kirim Peringatan WhatsApp"
                              >
                                <Send size={13} />
                                <span>Kirim WA</span>
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

      {/* Modal: Pratinjau Dokumen Kapal */}
      <Modal
        isOpen={!!activeDoc}
        onClose={() => setActiveDoc(null)}
        title={`Arsip Digital: ${activeDoc?.docName}`}
        footer={
          <button type="button" className="btn btn-secondary" onClick={() => setActiveDoc(null)}>
            Tutup Pratinjau
          </button>
        }
      >
        {activeDoc && (
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
              <ShieldCheck size={32} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-navy-900)' }}>
              {activeDoc.docName}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Kapal: <strong>{activeDoc.shipName}</strong> • Sertifikat: <strong>{activeDoc.certNo}</strong>
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
                  <div style={{ color: 'var(--text-muted)' }}>Otoritas / Biro Klasifikasi:</div>
                  <strong>{activeDoc.issuingAuthority}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Klasifikasi / Tipe:</div>
                  <strong>{activeDoc.docType}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Tanggal Berlaku:</div>
                  <strong>{activeDoc.issueDate}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Tanggal Kadaluarsa:</div>
                  <strong style={{ color: activeDoc.status === 'Expired' ? '#e11d48' : 'inherit' }}>
                    {activeDoc.expiryDate}
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              🔒 Salinan digital terenkripsi tersimpan pada object storage cloud PMS.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
