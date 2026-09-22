import React, { useState } from 'react';
import {
  WalletCards,
  Plus,
  Search,
  Filter,
  Download,
  DollarSign,
  CheckCircle2,
  Clock,
  Send,
  FileText,
  User,
  History,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/PMSContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

export default function KasbonManagement() {
  const {
    kasbon,
    addKasbonRequest,
    approveKasbonCaptain,
    approveKasbonFinance,
    disburseKasbon,
    recordKasbonPayment,
    crew,
    ships,
    selectedShip,
    exportToCsv
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [activeKasbon, setActiveKasbon] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    crewId: '',
    shipId: 'ship-1',
    crewName: '',
    rank: '',
    amount: 3000000,
    purpose: '',
    tenorMonths: 3
  });

  // Payment Form State
  const [payAmount, setPayAmount] = useState(1000000);
  const [payMethod, setPayMethod] = useState('Potong Gaji Bulanan');

  // Filter kasbon list
  const filteredKasbon = kasbon.filter((item) => {
    const matchShip = selectedShip === 'all' || item.shipId === selectedShip;
    const matchSearch =
      item.crewName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requestNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === 'all' || item.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchShip && matchSearch && matchStatus;
  });

  // KPI Calculations
  const shipKasbon = kasbon.filter(k => selectedShip === 'all' || k.shipId === selectedShip);
  const totalActiveNominal = shipKasbon
    .filter(k => k.status !== 'Lunas')
    .reduce((acc, k) => acc + (k.remainingAmount || k.amount), 0);
  const totalDisbursed = shipKasbon
    .filter(k => k.status === 'Dicairkan' || k.status === 'Lunas')
    .reduce((acc, k) => acc + k.amount, 0);
  const totalPaid = shipKasbon
    .reduce((acc, k) => acc + (k.paidAmount || 0), 0);
  const pendingApprovalCount = shipKasbon
    .filter(k => k.status.includes('Menunggu')).length;

  const handleCrewSelect = (e) => {
    const cId = e.target.value;
    const found = crew.find(c => c.id === cId);
    if (found) {
      setFormData(prev => ({
        ...prev,
        crewId: cId,
        shipId: found.shipId,
        crewName: found.name,
        rank: found.rank
      }));
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.crewId) {
      alert('Pilih nama crew pemohon.');
      return;
    }
    if (formData.amount <= 0) {
      alert('Nominal kasbon harus lebih besar dari 0.');
      return;
    }

    addKasbonRequest(formData);
    setIsCreateModalOpen(false);
    setFormData({
      crewId: '',
      shipId: 'ship-1',
      crewName: '',
      rank: '',
      amount: 3000000,
      purpose: '',
      tenorMonths: 3
    });
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    if (!activeKasbon) return;
    recordKasbonPayment(activeKasbon.id, payAmount, payMethod);
    setIsPayModalOpen(false);
  };

  const handleOpenHistory = (item) => {
    setActiveKasbon(item);
    setIsHistoryModalOpen(true);
  };

  const handleOpenPay = (item) => {
    setActiveKasbon(item);
    setPayAmount(item.monthlyDeduction || item.remainingAmount);
    setIsPayModalOpen(true);
  };

  const handleExport = () => {
    const data = filteredKasbon.map(k => ({
      No_Pengajuan: k.requestNo,
      Nama_Crew: k.crewName,
      Jabatan: k.rank,
      Kapal: ships.find(s => s.id === k.shipId)?.name || k.shipId,
      Nominal_Total: k.amount,
      Tenor_Bulan: k.tenorMonths,
      Potongan_Per_Bulan: k.monthlyDeduction,
      Sisa_Belum_Lunas: k.remainingAmount,
      Sudah_Dibayar: k.paidAmount,
      Status: k.status,
      Tanggal_Pengajuan: k.requestDate,
      Keperluan: k.purpose
    }));
    exportToCsv(data, 'laporan_kasbon_crew.csv');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <WalletCards size={26} color="#7c3aed" />
            <span>Sistem Kasbon & Pinjaman Karyawan/Crew</span>
          </h1>
          <p className="page-desc">
            Pengelolaan pinjaman darurat (cash advance), persetujuan berjenjang Nakhoda & Finance, serta rekap potongan gaji bulanan.
          </p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            <span>Export Laporan Kasbon</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={16} />
            <span>Ajukan Kasbon Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stat-cards-grid">
        <StatCard
          title="Total Kasbon Aktif (Sisa)"
          value={`Rp ${(totalActiveNominal / 1000000).toFixed(1)} Jt`}
          meta="Saldo kasbon belum lunas"
          icon={WalletCards}
          color="purple"
        />
        <StatCard
          title="Kasbon Dicairkan"
          value={`Rp ${(totalDisbursed / 1000000).toFixed(1)} Jt`}
          meta="Total dana telah ditransfer"
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Pelunasan / Potong Gaji"
          value={`Rp ${(totalPaid / 1000000).toFixed(1)} Jt`}
          meta="Sudah terpotong dari slip gaji"
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Menunggu Persetujuan"
          value={pendingApprovalCount}
          meta="Butuh review Nakhoda / Finance"
          icon={Clock}
          color={pendingApprovalCount > 0 ? 'rose' : 'cyan'}
        />
      </div>

      {/* Main Table Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Daftar Pengajuan & Histori Kasbon Crew</h2>
            <p className="card-subtitle">
              Workflow persetujuan dan monitoring status pemotongan berkala
            </p>
          </div>
        </div>

        <div className="card-body">
          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="search-input-group">
              <Search className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Cari nomor pengajuan, nama crew, atau keperluan..."
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
              <option value="menunggu">Menunggu Persetujuan</option>
              <option value="siap cair">Siap Cair</option>
              <option value="dicairkan">Dicairkan / Berjalan</option>
              <option value="lunas">Lunas</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>No. Pengajuan</th>
                  <th>Crew Pemohon</th>
                  <th>Kapal</th>
                  <th>Nominal Kasbon</th>
                  <th>Skema Tenor</th>
                  <th>Sisa Saldo</th>
                  <th>Status Workflow</th>
                  <th style={{ textAlign: 'center' }}>Tindakan & Approval</th>
                </tr>
              </thead>
              <tbody>
                {filteredKasbon.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Tidak ditemukan data pengajuan kasbon yang cocok.
                    </td>
                  </tr>
                ) : (
                  filteredKasbon.map((item) => {
                    const shipObj = ships.find(s => s.id === item.shipId);
                    const isLunas = item.status === 'Lunas';
                    const isDicairkan = item.status.includes('Dicairkan');
                    const isMenungguNakhoda = item.status.includes('Menunggu Persetujuan Nakhoda');
                    const isMenungguFinance = item.status.includes('Disetujui Nakhoda');
                    const isSiapCair = item.status.includes('Siap Cair');

                    return (
                      <tr key={item.id}>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                            {item.requestNo}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {item.requestDate}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                            {item.crewName}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {item.rank}
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.2rem', fontStyle: 'italic' }}>
                            "{item.purpose}"
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--brand-ocean-700)' }}>
                            {shipObj ? shipObj.name : 'Armada'}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 800, color: 'var(--brand-navy-900)', fontSize: '0.95rem' }}>
                            Rp {item.amount.toLocaleString('id-ID')}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{item.tenorMonths} Bulan</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Rp {item.monthlyDeduction.toLocaleString('id-ID')}/bln
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 800, color: item.remainingAmount > 0 ? '#e11d48' : '#059669' }}>
                            Rp {item.remainingAmount.toLocaleString('id-ID')}
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            Terbayar: Rp {item.paidAmount.toLocaleString('id-ID')}
                          </div>
                        </td>
                        <td>
                          <Badge
                            variant={
                              isLunas
                                ? 'success'
                                : isDicairkan
                                ? 'info'
                                : isSiapCair
                                ? 'purple'
                                : 'warning'
                            }
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {/* Step 1: Approve Nakhoda */}
                            {isMenungguNakhoda && (
                              <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={() => approveKasbonCaptain(item.id)}
                                title="Setujui sebagai Nakhoda"
                              >
                                Setujui Nakhoda
                              </button>
                            )}

                            {/* Step 2: Approve Finance */}
                            {isMenungguFinance && (
                              <button
                                type="button"
                                className="btn btn-sm btn-success"
                                onClick={() => approveKasbonFinance(item.id)}
                                title="Setujui oleh Finance"
                              >
                                Setujui Finance
                              </button>
                            )}

                            {/* Step 3: Disburse Fund */}
                            {isSiapCair && (
                              <button
                                type="button"
                                className="btn btn-sm"
                                style={{ backgroundColor: '#7c3aed', color: '#fff' }}
                                onClick={() => disburseKasbon(item.id)}
                                title="Cairkan Dana & Kirim Notifikasi WA"
                              >
                                Cairkan Dana
                              </button>
                            )}

                            {/* Step 4: Record Deduction */}
                            {isDicairkan && item.remainingAmount > 0 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                onClick={() => handleOpenPay(item)}
                                title="Catat Pemotongan Cicilan Gaji"
                              >
                                Potong Gaji
                              </button>
                            )}

                            {/* History button */}
                            <button
                              type="button"
                              className="btn btn-sm btn-secondary"
                              onClick={() => handleOpenHistory(item)}
                              title="Lihat Histori Potongan"
                            >
                              <History size={13} />
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

      {/* Modal: Ajukan Kasbon Baru */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Formulir Pengajuan Kasbon Crew"
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreateModalOpen(false)}>
              Batal
            </button>
            <button type="submit" form="create-kasbon-form" className="btn btn-primary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}>
              Kirim Pengajuan Kasbon
            </button>
          </>
        }
      >
        <form id="create-kasbon-form" onSubmit={handleCreateSubmit}>
          <div className="form-group">
            <label className="form-label">
              Pilih Crew Pemohon <span className="required">*</span>
            </label>
            <select
              className="form-control"
              value={formData.crewId}
              onChange={handleCrewSelect}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">
                Jumlah Kasbon (Rp) <span className="required">*</span>
              </label>
              <input
                type="number"
                step="100000"
                min="500000"
                max="25000000"
                className="form-control"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                required
              />
              <div className="form-hint">
                Format: Rp {Number(formData.amount).toLocaleString('id-ID')}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Tenor Potong Gaji <span className="required">*</span>
              </label>
              <select
                className="form-control"
                value={formData.tenorMonths}
                onChange={(e) => setFormData({ ...formData, tenorMonths: parseInt(e.target.value, 10) })}
              >
                <option value={1}>1 Bulan (Potong Lunas)</option>
                <option value={2}>2 Bulan Cicilan</option>
                <option value={3}>3 Bulan Cicilan</option>
                <option value={6}>6 Bulan Cicilan</option>
              </select>
              <div className="form-hint" style={{ color: '#7c3aed', fontWeight: 600 }}>
                Estimasi cicilan: Rp {Math.round(formData.amount / formData.tenorMonths).toLocaleString('id-ID')}/bulan
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Keperluan Kasbon <span className="required">*</span>
            </label>
            <textarea
              className="form-control"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="Contoh: Biaya daftar ulang sekolah anak / Darurat medis keluarga / Kebutuhan mendesak di rumah"
              required
            />
          </div>

          <div style={{
            backgroundColor: '#f5f3ff',
            border: '1px solid #ddd6fe',
            borderRadius: 'var(--radius-md)',
            padding: '0.875rem',
            fontSize: '0.8rem',
            color: '#5b21b6'
          }}>
            ℹ️ Pengajuan kasbon ini akan melalui verifikasi Nakhoda kapal terlebih dahulu sebelum disetujui dan dicairkan oleh Finance kantor pusat.
          </div>
        </form>
      </Modal>

      {/* Modal: Catat Pemotongan Cicilan Kasbon */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title={`Catat Pembayaran Kasbon: ${activeKasbon?.requestNo}`}
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setIsPayModalOpen(false)}>
              Batal
            </button>
            <button type="submit" form="pay-kasbon-form" className="btn btn-success">
              Simpan Pembayaran
            </button>
          </>
        }
      >
        <form id="pay-kasbon-form" onSubmit={handlePaySubmit}>
          {activeKasbon && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 700 }}>{activeKasbon.crewName} ({activeKasbon.rank})</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Sisa Tagihan: <strong style={{ color: '#e11d48' }}>Rp {activeKasbon.remainingAmount.toLocaleString('id-ID')}</strong> (Cicilan normal: Rp {activeKasbon.monthlyDeduction.toLocaleString('id-ID')})
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Nominal Pembayaran / Potongan (Rp)</label>
            <input
              type="number"
              className="form-control"
              value={payAmount}
              onChange={(e) => setPayAmount(parseFloat(e.target.value) || 0)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Metode Pembayaran</label>
            <select
              className="form-control"
              value={payMethod}
              onChange={(e) => setPayMethod(e.target.value)}
            >
              <option value="Potong Gaji Bulanan">Potong Gaji Bulanan (Payroll Deduction)</option>
              <option value="Transfer Mandiri Pelunasan Cepat">Transfer Mandiri Pelunasan Cepat</option>
              <option value="Potong Uang Saku / Premi Layar">Potong Uang Saku / Premi Layar</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Modal: Riwayat Potongan Kasbon */}
      <Modal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        title={`Riwayat Pembayaran & Pelunasan Kasbon`}
        maxWidth="500px"
        footer={
          <button type="button" className="btn btn-secondary" onClick={() => setIsHistoryModalOpen(false)}>
            Tutup
          </button>
        }
      >
        {activeKasbon && (
          <div>
            <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-default)', paddingBottom: '0.75rem' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--brand-navy-900)' }}>
                {activeKasbon.requestNo} - {activeKasbon.crewName}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Total Kasbon: Rp {activeKasbon.amount.toLocaleString('id-ID')} | Sisa: Rp {activeKasbon.remainingAmount.toLocaleString('id-ID')}
              </div>
            </div>

            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Log Transaksi Cicilan:</h4>
            {activeKasbon.paymentHistory && activeKasbon.paymentHistory.length > 0 ? (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeKasbon.paymentHistory.map((h, idx) => (
                  <li
                    key={idx}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#f8fafc',
                      border: '1px solid var(--border-default)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{h.method}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.date}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.9rem' }}>
                      +Rp {h.amount.toLocaleString('id-ID')}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '1rem 0' }}>
                Belum ada transaksi pembayaran atau potongan gaji yang tercatat.
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
