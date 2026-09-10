import React, { useState } from 'react';
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Download,
  ShoppingBag,
  TrendingDown,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

export default function SparepartTable() {
  const { spareparts, ships, selectedShip, requestSparepartStock, exportToCsv } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [activePart, setActivePart] = useState(null);
  const [restockQty, setRestockQty] = useState(5);

  const filteredParts = spareparts.filter((sp) => {
    const matchShip = selectedShip === 'all' || sp.shipId === selectedShip;
    const matchSearch =
      sp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sp.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sp.applicableEquipment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || sp.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchShip && matchSearch && matchStatus;
  });

  const totalParts = filteredParts.length;
  const lowStockCount = filteredParts.filter(sp => sp.status === 'Low').length;
  const totalValue = filteredParts.reduce((acc, sp) => acc + (sp.stockQty * sp.unitPrice), 0);

  const handleOpenRestock = (sp) => {
    setActivePart(sp);
    setRestockQty(5);
    setIsRestockModalOpen(true);
  };

  const handleSaveRestock = (e) => {
    e.preventDefault();
    if (!activePart) return;
    requestSparepartStock(activePart.id, restockQty);
    setIsRestockModalOpen(false);
  };

  const handleExport = () => {
    const data = filteredParts.map(sp => ({
      Nomor_Part: sp.partNo,
      Nama_Sparepart: sp.name,
      Kategori: sp.category,
      Equipment: sp.applicableEquipment,
      Stok_Saat_Ini: sp.stockQty,
      Batas_Min_Stok: sp.minQty,
      Satuan: sp.unit,
      Harga_Satuan: sp.unitPrice,
      Total_Nilai: sp.stockQty * sp.unitPrice,
      Lokasi_Rak: sp.rackLocation,
      Status_Stok: sp.status
    }));
    exportToCsv(data, 'inventaris_sparepart_kapal.csv');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Package size={26} color="#0284c7" />
            <span>Manajemen Sparepart & Inventaris Kapal</span>
          </h1>
          <p className="page-desc">
            Katalog suku cadang kritis mesin, minimum stock alerts, lokasi penyimpanan rak kapal, dan pengajuan restock.
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
          title="Total Item Sparepart"
          value={totalParts}
          meta="Tercatat di gudang mesin kapal"
          icon={Layers}
          color="blue"
        />
        <StatCard
          title="Stok Menipis (Low Alert)"
          value={lowStockCount}
          meta="Perlu pengajuan PR pembelian"
          icon={AlertTriangle}
          color={lowStockCount > 0 ? 'rose' : 'green'}
        />
        <StatCard
          title="Total Nilai Inventaris"
          value={`Rp ${(totalValue / 1000000).toFixed(1)} Jt`}
          meta="Valuasi suku cadang di atas kapal"
          icon={ShoppingBag}
          color="purple"
        />
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Katalog Suku Cadang & Status Ketersediaan</h2>
            <p className="card-subtitle">Sistem otomatis memberi peringatan bila stok menyentuh ambang batas minimum</p>
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
                placeholder="Cari nomor part, nama sparepart, peruntukan alat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status Stok</option>
              <option value="safe">Stok Aman (Safe)</option>
              <option value="low">Stok Menipis (Low)</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nomor Part & Nama</th>
                  <th>Kapal</th>
                  <th>Peruntukan Mesin</th>
                  <th>Stok / Min</th>
                  <th>Harga Satuan</th>
                  <th>Lokasi Penyimpanan</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredParts.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Tidak ada data sparepart yang sesuai.
                    </td>
                  </tr>
                ) : (
                  filteredParts.map((sp) => {
                    const shipObj = ships.find(s => s.id === sp.shipId);
                    const isLow = sp.status === 'Low';

                    return (
                      <tr key={sp.id}>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand-navy-900)' }}>
                            {sp.partNo}
                          </div>
                          <div style={{ fontWeight: 700, color: 'var(--brand-ocean-700)' }}>
                            {sp.name}
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            Kat: {sp.category}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>{shipObj ? shipObj.name : 'Armada'}</span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{sp.applicableEquipment}</span>
                        </td>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.95rem', color: isLow ? '#e11d48' : 'var(--brand-navy-900)' }}>
                            {sp.stockQty} {sp.unit}
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            Min: {sp.minQty} {sp.unit}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                            Rp {sp.unitPrice.toLocaleString('id-ID')}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            📍 {sp.rackLocation}
                          </span>
                        </td>
                        <td>
                          <Badge variant={isLow ? 'danger' : 'success'}>
                            {isLow ? 'Stok Menipis' : 'Stok Aman'}
                          </Badge>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleOpenRestock(sp)}
                            title="Tambah Stok / Pengadaan"
                          >
                            <Plus size={13} />
                            <span>Restock</span>
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

      {/* Modal: Restock */}
      <Modal
        isOpen={isRestockModalOpen}
        onClose={() => setIsRestockModalOpen(false)}
        title={`Restock Sparepart: ${activePart?.partNo}`}
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setIsRestockModalOpen(false)}>
              Batal
            </button>
            <button type="submit" form="restock-form" className="btn btn-primary">
              Simpan Penambahan Stok
            </button>
          </>
        }
      >
        <form id="restock-form" onSubmit={handleSaveRestock}>
          {activePart && (
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '0.875rem',
              marginBottom: '1rem',
              fontSize: '0.825rem'
            }}>
              <div><strong>Nama Barang:</strong> {activePart.name}</div>
              <div><strong>Stok Saat Ini:</strong> {activePart.stockQty} {activePart.unit} (Min: {activePart.minQty} {activePart.unit})</div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              Jumlah Penambahan Stok ({activePart?.unit}) <span className="required">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="500"
              className="form-control"
              value={restockQty}
              onChange={(e) => setRestockQty(e.target.value)}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
