import React, { useState } from 'react';
import {
  BellRing,
  Search,
  CheckCheck,
  Download,
  Filter,
  Clock,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';

export default function NotificationHistory() {
  const { notifications, exportToCsv } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = notifications.filter((n) =>
    n.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.targetItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.messageType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const data = filtered.map(n => ({
      Waktu_Kirim: n.timestamp,
      Saluran: n.channel,
      Nama_Penerima: n.recipientName,
      Nomor_Tujuan: n.recipientPhone,
      Jenis_Notifikasi: n.messageType,
      Status: n.status,
      Isi_Pesan: n.content
    }));
    exportToCsv(data, 'riwayat_notifikasi_terkirim.csv');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <BellRing size={26} color="#0284c7" />
            <span>Audit Trail & Riwayat Notifikasi Terkirim</span>
          </h1>
          <p className="page-desc">
            Log histori seluruh pengiriman reminder otomatis via WhatsApp Business API dan Push Notification HP.
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
          title="Total Notifikasi Terkirim"
          value={notifications.length}
          meta="Tercatat dalam log audit"
          icon={BellRing}
          color="blue"
        />
        <StatCard
          title="Delivery Rate Berhasil"
          value="100%"
          meta="0 pesan gagal / bounce"
          icon={CheckCheck}
          color="green"
        />
        <StatCard
          title="Channel Utama"
          value="WhatsApp API"
          meta="Kirim langsung ke smartphone pelaut"
          icon={MessageSquare}
          color="purple"
        />
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Daftar Log Pengiriman Reminder</h2>
            <p className="card-subtitle">Riwayat audit kepatuhan ISO / ISM Code reminder berkala</p>
          </div>
        </div>

        <div className="card-body">
          <div className="filter-bar">
            <div className="search-input-group">
              <Search className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Cari penerima, judul pesan, atau nomor telepon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Waktu Pengiriman</th>
                  <th>Penerima & Kontak</th>
                  <th>Perihal Notifikasi</th>
                  <th>Channel</th>
                  <th>Isi Pesan / Snippet</th>
                  <th>Status Pengiriman</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        {item.timestamp}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                        {item.recipientName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.recipientPhone}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--brand-ocean-700)' }}>
                        {item.messageType}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem' }}>{item.channel}</span>
                    </td>
                    <td>
                      <div style={{
                        maxWidth: '360px',
                        fontSize: '0.775rem',
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {item.content}
                      </div>
                    </td>
                    <td>
                      <Badge variant="success" icon={CheckCheck}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
