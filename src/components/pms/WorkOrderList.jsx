import React, { useState } from 'react';
import {
  ClipboardList,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Wrench,
  Download,
  Calendar,
  CheckSquare,
  Square
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

export default function WorkOrderList() {
  const {
    workOrders,
    equipment,
    ships,
    selectedShip,
    toggleChecklistItem,
    completeWorkOrder,
    addWorkOrder,
    exportToCsv
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New WO form
  const [formData, setFormData] = useState({
    title: '',
    equipmentId: '',
    shipId: 'ship-1',
    type: 'Running Hours Service (500h)',
    priority: 'High',
    assignedTo: 'Chief Engineer Agus',
    dueDate: '2026-09-18',
    notes: '',
    tasks: 'Inspeksi clearance dan uji tekanan\nPembersihan saringan dan filter\nRunning test 15 menit'
  });

  const filteredWo = workOrders.filter((wo) => {
    const matchShip = selectedShip === 'all' || wo.shipId === selectedShip;
    const matchSearch =
      wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.woNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || wo.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchPriority = priorityFilter === 'all' || wo.priority.toLowerCase().includes(priorityFilter.toLowerCase());
    return matchShip && matchSearch && matchStatus && matchPriority;
  });

  const totalWo = filteredWo.length;
  const overdueWo = filteredWo.filter(w => w.status === 'Overdue').length;
  const completedWo = filteredWo.filter(w => w.status === 'Completed').length;
  const inProgressWo = filteredWo.filter(w => w.status === 'Due Soon' || w.status === 'In Progress').length;

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.equipmentId) {
      alert('Pilih equipment terkait.');
      return;
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const taskItems = formData.tasks.split('\n').filter(t => t.trim() !== '').map((task, idx) => ({
      id: `c-${Date.now()}-${idx}`,
      task: task.trim(),
      done: false
    }));

    const newWo = {
      id: `wo-${Date.now()}`,
      woNumber: `WO-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${randomSuffix}`,
      shipId: formData.shipId,
      equipmentId: formData.equipmentId,
      title: formData.title,
      type: formData.type,
      priority: formData.priority,
      status: 'Due Soon',
      assignedTo: formData.assignedTo,
      dueDate: formData.dueDate,
      checklist: taskItems,
      requiredParts: [],
      notes: formData.notes
    };

    addWorkOrder(newWo);
    setIsCreateModalOpen(false);
    setFormData({
      title: '',
      equipmentId: '',
      shipId: 'ship-1',
      type: 'Running Hours Service (500h)',
      priority: 'High',
      assignedTo: 'Chief Engineer Agus',
      dueDate: '2026-09-18',
      notes: '',
      tasks: 'Inspeksi clearance dan uji tekanan\nPembersihan saringan dan filter\nRunning test 15 menit'
    });
  };

  const handleExport = () => {
    const data = filteredWo.map(w => ({
      No_WO: w.woNumber,
      Judul_Pekerjaan: w.title,
      Kapal: ships.find(s => s.id === w.shipId)?.name || w.shipId,
      Equipment: equipment.find(e => e.id === w.equipmentId)?.name || w.equipmentId,
      Tipe: w.type,
      Prioritas: w.priority,
      Status: w.status,
      Teknisi: w.assignedTo,
      Jatuh_Tempo: w.dueDate,
      Tanggal_Selesai: w.completedDate || '-'
    }));
    exportToCsv(data, 'daftar_work_orders_pms.csv');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <ClipboardList size={26} color="#0284c7" />
            <span>Manajemen Work Orders Perawatan Kapal</span>
          </h1>
          <p className="page-desc">
            Instruksi kerja teknis, penugasan chief engineer, checklist item verifikasi, dan pelaporan realisasi.
          </p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={16} />
            <span>Buat Work Order Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stat-cards-grid">
        <StatCard
          title="Total Work Orders"
          value={totalWo}
          meta="Tercatat dalam siklus PMS"
          icon={ClipboardList}
          color="blue"
        />
        <StatCard
          title="WO Selesai (Completed)"
          value={completedWo}
          meta="Tervalidasi logbook servis"
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Dalam Proses / Due Soon"
          value={inProgressWo}
          meta="Sedang dikerjakan teknisi"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Overdue (Jatuh Tempo)"
          value={overdueWo}
          meta="Prioritas perbaikan segera"
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* WO List */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Daftar Instruksi Work Order (WO)</h2>
            <p className="card-subtitle">Centang checklist untuk memverifikasi pekerjaan teknisi kamar mesin/geladak</p>
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
                placeholder="Cari nomor WO, nama pekerjaan, atau nama teknisi..."
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
              <option value="overdue">Overdue</option>
              <option value="due soon">Due Soon</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="filter-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">Semua Prioritas</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>

          {/* Cards of Work Orders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredWo.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                Tidak ada Work Order yang sesuai dengan kriteria filter.
              </div>
            ) : (
              filteredWo.map((wo) => {
                const shipObj = ships.find(s => s.id === wo.shipId);
                const eqObj = equipment.find(e => e.id === wo.equipmentId);
                const isCompleted = wo.status === 'Completed';
                const isOverdue = wo.status === 'Overdue';

                const totalTasks = wo.checklist ? wo.checklist.length : 0;
                const completedTasks = wo.checklist ? wo.checklist.filter(c => c.done).length : 0;
                const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 100;

                return (
                  <div
                    key={wo.id}
                    style={{
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.25rem 1.5rem',
                      backgroundColor: '#ffffff',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--brand-ocean-700)' }}>
                            {wo.woNumber}
                          </span>
                          <Badge variant={isCompleted ? 'success' : isOverdue ? 'danger' : 'warning'}>
                            {wo.status}
                          </Badge>
                          <Badge variant={wo.priority === 'Urgent' ? 'danger' : wo.priority === 'High' ? 'warning' : 'info'}>
                            Prioritas: {wo.priority}
                          </Badge>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-navy-900)', marginTop: '0.35rem' }}>
                          {wo.title}
                        </h3>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          🚢 <strong>{shipObj ? shipObj.name : 'Armada'}</strong> • ⚙️ <strong>{eqObj ? eqObj.name : 'Equipment'}</strong> ({wo.type})
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {!isCompleted && (
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => completeWorkOrder(wo.id)}
                            title="Tandai Selesai Pekerjaan"
                          >
                            <CheckCircle size={14} />
                            <span>Selesaikan WO</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar & Meta */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.825rem' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Ditugaskan Ke: </span>
                          <strong>{wo.assignedTo}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Batas Target: </span>
                          <strong style={{ color: isOverdue ? '#e11d48' : 'inherit' }}>{wo.dueDate}</strong>
                        </div>
                        {wo.completedDate && (
                          <div>
                            <span style={{ color: 'var(--text-muted)' }}>Selesai Pada: </span>
                            <strong style={{ color: '#059669' }}>{wo.completedDate}</strong>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                          Checklist: {completedTasks}/{totalTasks} ({progressPct}%)
                        </span>
                        <div style={{ width: '120px', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: isCompleted ? '#059669' : '#2563eb' }} />
                        </div>
                      </div>
                    </div>

                    {/* Task Checklist Interactive */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                        Langkah Checklist Pekerjaan Teknis:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {wo.checklist && wo.checklist.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              fontSize: '0.825rem',
                              cursor: isCompleted ? 'default' : 'pointer',
                              color: item.done ? 'var(--text-muted)' : 'var(--text-primary)',
                              textDecoration: item.done ? 'line-through' : 'none'
                            }}
                            onClick={() => !isCompleted && toggleChecklistItem(wo.id, item.id)}
                          >
                            {item.done ? (
                              <CheckSquare size={16} color="#059669" />
                            ) : (
                              <Square size={16} color="#94a3b8" />
                            )}
                            <span>{item.task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {wo.notes && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.5rem' }}>
                        Catatan: {wo.notes}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal: Buat Work Order Baru */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Buat Instruksi Work Order (PMS) Baru"
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreateModalOpen(false)}>
              Batal
            </button>
            <button type="submit" form="create-wo-form" className="btn btn-primary">
              Simpan & Tugaskan WO
            </button>
          </>
        }
      >
        <form id="create-wo-form" onSubmit={handleCreateSubmit}>
          <div className="form-group">
            <label className="form-label">
              Judul Pekerjaan Maintenance <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Misal: Overhaul Fuel Injection Pump / Ganti Filter Oli"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">
                Pilih Equipment Mesin <span className="required">*</span>
              </label>
              <select
                className="form-control"
                value={formData.equipmentId}
                onChange={(e) => {
                  const eqId = e.target.value;
                  const eqObj = equipment.find(eq => eq.id === eqId);
                  setFormData({
                    ...formData,
                    equipmentId: eqId,
                    shipId: eqObj ? eqObj.shipId : 'ship-1'
                  });
                }}
                required
              >
                <option value="">-- Pilih Equipment --</option>
                {equipment.map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.code} - {eq.name} ({ships.find(s => s.id === eq.shipId)?.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Prioritas</label>
              <select
                className="form-control"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Urgent">Urgent (Mendesak)</option>
                <option value="High">High (Tinggi)</option>
                <option value="Medium">Medium (Sedang)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Ditugaskan Kepada</label>
              <input
                type="text"
                className="form-control"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                placeholder="Misal: Chief Engineer / 2nd Engineer"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Batas Waktu (Due Date)</label>
              <input
                type="date"
                className="form-control"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Daftar Checklist Tugas (1 baris per tugas)
            </label>
            <textarea
              className="form-control"
              style={{ minHeight: '90px' }}
              value={formData.tasks}
              onChange={(e) => setFormData({ ...formData, tasks: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Instruksi Khusus & Catatan Safety</label>
            <textarea
              className="form-control"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Misal: Gunakan APD sarung tangan anti-panas & gembok valve suction (LOTO)"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
