import React from 'react';
import {
  PieChart,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Package,
  Wrench,
  Anchor,
  Download,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';

export default function CostOverview() {
  const { costData, exportToCsv } = useApp();

  const handleExport = () => {
    const data = costData.breakdownByShip.map(b => ({
      Kapal: b.shipName,
      Anggaran_Budget: b.budget,
      Realisasi_Actual: b.actual,
      Selisih_Variance: b.budget - b.actual,
      Status: b.status
    }));
    exportToCsv(data, 'laporan_biaya_pms_armada.csv');
  };

  const budgetUsedPct = Math.round((costData.totalActual / costData.monthlyBudget) * 100);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <PieChart size={26} color="#0284c7" />
            <span>Manajemen Biaya Perawatan & Budget Armada</span>
          </h1>
          <p className="page-desc">
            Komparasi anggaran vs realisasi (Budget vs Actual), kontrol pengeluaran sparepart, docking galangan, dan jasa teknisi.
          </p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            <span>Export Laporan Biaya</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stat-cards-grid">
        <StatCard
          title="Anggaran Bulanan Fleet"
          value={`Rp ${(costData.monthlyBudget / 1000000).toFixed(0)} Jt`}
          meta="Alokasi pagu anggaran armada"
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Total Realisasi Biaya"
          value={`Rp ${(costData.totalActual / 1000000).toFixed(1)} Jt`}
          meta={`${budgetUsedPct}% dari total pagu terserap`}
          icon={TrendingUp}
          color="cyan"
        />
        <StatCard
          title="Efisiensi / Variance"
          value={`+Rp ${(costData.variance / 1000000).toFixed(1)} Jt`}
          meta="Surplus anggaran hemat"
          icon={TrendingDown}
          color="green"
        />
      </div>

      {/* Cost Breakdown Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
        {/* Spareparts Cost */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Belanja Sparepart & Filter</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-navy-900)' }}>
                Rp {(costData.actualSpareparts / 1000000).toFixed(1)} Jt
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Penggantian filter oli, mechanical seal, fuel nozzle, dan sacrificial zinc anode.
          </p>
        </div>

        {/* Maintenance Services Cost */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wrench size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Jasa Teknisi & Overhaul</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-navy-900)' }}>
                Rp {(costData.actualMaintenanceServices / 1000000).toFixed(1)} Jt
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Jasa spesialis overhaul turbocharger, kalibrasi governor, dan uji beban generator.
          </p>
        </div>

        {/* Drydock & Docking */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Anchor size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Galangan & Docking</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-navy-900)' }}>
                Rp {(costData.actualDockingDrydock / 1000000).toFixed(1)} Jt
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Biaya sandar galangan, hydroblasting lambung kapal, dan inspeksi biro klasifikasi BKI.
          </p>
        </div>
      </div>

      {/* Breakdown per Kapal */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Realisasi Anggaran Biaya per Kapal</h2>
            <p className="card-subtitle">Perbandingan alokasi budget dan pengeluaran aktual per unit armada</p>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nama Kapal</th>
                  <th>Alokasi Budget</th>
                  <th>Realisasi Aktual</th>
                  <th>Tingkat Penyerapan</th>
                  <th>Selisih (Variance)</th>
                  <th>Status Anggaran</th>
                </tr>
              </thead>
              <tbody>
                {costData.breakdownByShip.map((b, idx) => {
                  const pct = Math.round((b.actual / b.budget) * 100);
                  const isOver = b.status === 'Over Budget';
                  const diff = b.budget - b.actual;

                  return (
                    <tr key={idx}>
                      <td>
                        <strong style={{ color: 'var(--brand-navy-900)' }}>{b.shipName}</strong>
                      </td>
                      <td>Rp {b.budget.toLocaleString('id-ID')}</td>
                      <td>
                        <strong>Rp {b.actual.toLocaleString('id-ID')}</strong>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{pct}%</span>
                          <div style={{ width: '100px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', backgroundColor: isOver ? '#e11d48' : '#059669' }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: diff >= 0 ? '#059669' : '#e11d48' }}>
                          {diff >= 0 ? `+Rp ${diff.toLocaleString('id-ID')}` : `-Rp ${Math.abs(diff).toLocaleString('id-ID')}`}
                        </span>
                      </td>
                      <td>
                        <Badge variant={isOver ? 'danger' : 'success'}>
                          {b.status}
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
    </div>
  );
}
