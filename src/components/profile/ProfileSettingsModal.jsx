import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  Bell,
  CheckCircle2,
  Lock,
  Ship,
  Save,
  KeyRound,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import Badge from '../common/Badge';

export default function ProfileSettingsModal() {
  const {
    userProfile,
    updateUserProfile,
    isProfileModalOpen,
    setIsProfileModalOpen,
    ships,
    logout
  } = useApp();

  const [formData, setFormData] = useState(userProfile);
  const [activeTab, setActiveTab] = useState('biodata'); // 'biodata', 'notifications', 'security'

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile, isProfileModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsProfileModalOpen(false);
  };

  return (
    <Modal
      isOpen={isProfileModalOpen}
      onClose={() => setIsProfileModalOpen(false)}
      title="Pengaturan Profil Pengguna & Hak Akses"
      maxWidth="620px"
      footer={
        <>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsProfileModalOpen(false)}
          >
            Batal
          </button>
          <button
            type="submit"
            form="profile-form"
            className="btn btn-primary"
          >
            <Save size={15} />
            <span>Simpan Perubahan</span>
          </button>
        </>
      }
    >
      {/* Profile Header Summary */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem',
        backgroundColor: '#f8fafc',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-default)',
        marginBottom: '1.25rem'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1.25rem',
          boxShadow: '0 4px 10px rgba(2, 132, 199, 0.25)',
          flexShrink: 0
        }}>
          {formData.avatarInitials || 'FA'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-navy-900)' }}>
              {formData.name}
            </h3>
            <Badge variant="purple">
              {formData.role}
            </Badge>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            {formData.email} • {formData.phone}
          </div>
        </div>
      </div>

      {/* Settings Tab Navigation */}
      <div className="tabs-header" style={{ marginBottom: '1.25rem' }}>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'biodata' ? 'active' : ''}`}
          onClick={() => setActiveTab('biodata')}
        >
          <User size={15} />
          <span>Biodata & Jabatan</span>
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={15} />
          <span>Preferensi Notifikasi</span>
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <Shield size={15} />
          <span>Keamanan & Sandi</span>
        </button>
      </div>

      <form id="profile-form" onSubmit={handleSubmit}>
        {/* TAB 1: Biodata */}
        {activeTab === 'biodata' && (
          <div>
            <div className="form-group">
              <label className="form-label">
                Nama Lengkap & Gelar <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Capt. Bambang Prasetyo, M.Mar"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">
                  Alamat Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Nomor Handphone / WhatsApp <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+628123456789"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Role & Hak Akses Sistem</label>
                <select
                  className="form-control"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Super Admin & Port Capt.">Super Admin & Port Capt.</option>
                  <option value="Fleet Manager / DPA">Fleet Manager / DPA</option>
                  <option value="Nakhoda / Master Kapal">Nakhoda / Master Kapal</option>
                  <option value="Chief Engineer / C/E">Chief Engineer / C/E</option>
                  <option value="Personalia & Crewing HR">Personalia & Crewing HR</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Wilayah Armada Ditugaskan</label>
                <select
                  className="form-control"
                  value={formData.assignedFleet}
                  onChange={(e) => setFormData({ ...formData, assignedFleet: e.target.value })}
                >
                  <option value="all">⚓ Seluruh Armada (Fleet Level)</option>
                  {ships.map((s) => (
                    <option key={s.id} value={s.id}>
                      🚢 {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Notifikasi */}
        {activeTab === 'notifications' && (
          <div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Atur channel pengiriman reminder otomatis untuk perawatan mesin, dokumen kapal, dan sertifikat pelaut:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  style={{ width: '16px', height: '16px', accentColor: '#008069' }}
                  checked={formData.notifyWhatsapp}
                  onChange={(e) => setFormData({ ...formData, notifyWhatsapp: e.target.checked })}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--brand-navy-900)' }}>
                    Notifikasi WhatsApp Business API
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Kirim pesan pengingat jatuh tempo H-30 & H-7 langsung ke nomor {formData.phone}
                  </div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  style={{ width: '16px', height: '16px', accentColor: '#1a73e8' }}
                  checked={formData.notifyEmail}
                  onChange={(e) => setFormData({ ...formData, notifyEmail: e.target.checked })}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--brand-navy-900)' }}>
                    Pengingat & Undangan Google Calendar
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Secara otomatis sinkronkan acara WO & surat kapal ke Google Calendar akun {formData.email}
                  </div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  style={{ width: '16px', height: '16px', accentColor: '#0284c7' }}
                  checked={formData.notifyPush}
                  onChange={(e) => setFormData({ ...formData, notifyPush: e.target.checked })}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--brand-navy-900)' }}>
                    Push Notification HP & Browser
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Tampilkan banner pop-up real-time saat ada status kasbon baru atau WO overdue
                  </div>
                </div>
              </label>
            </div>

            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Konfigurasi Threshold Jatuh Tempo</label>
              <input
                type="text"
                className="form-control"
                value={formData.thresholdReminder}
                onChange={(e) => setFormData({ ...formData, thresholdReminder: e.target.value })}
              />
              <div className="form-hint">
                Format: H-90, H-60, H-30, H-14, H-7, H-1 (Peringatan dikirim sebelum tanggal kadaluarsa)
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Keamanan */}
        {activeTab === 'security' && (
          <div>
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <CheckCircle2 size={22} color="#059669" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#065f46' }}>
                  Autentikasi Dua Faktor (2FA) Aktif
                </div>
                <div style={{ fontSize: '0.75rem', color: '#047857' }}>
                  Akun Anda dilindungi dengan enkripsi SHA-256 dan protokol keamanan ISM Code.
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Kata Sandi Saat Ini</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••••••"
                readOnly
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Kata Sandi Baru</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Masukkan sandi baru..."
                />
              </div>
              <div className="form-group">
                <label className="form-label">Konfirmasi Kata Sandi Baru</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ulangi sandi baru..."
                />
              </div>
            </div>

            {/* Logout Session Card */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #fecdd3',
              backgroundColor: '#fff1f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#9f1239' }}>
                  Keluar dari Sesi Akun
                </div>
                <div style={{ fontSize: '0.75rem', color: '#881337' }}>
                  Kembali ke portal login atau beralih ke role user lain
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
                onClick={() => {
                  setIsProfileModalOpen(false);
                  logout();
                }}
              >
                <LogOut size={14} />
                <span>Logout Sekarang</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}
