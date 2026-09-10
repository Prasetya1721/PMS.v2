import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  MapPin,
  Phone,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LoginPage() {
  const { login, DEMO_ACCOUNTS } = useApp();

  const [email, setEmail] = useState('admin@pmsarmada.id');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
  };

  const handleQuickLogin = (account) => {
    setEmail(account.email);
    login(account);
  };

  return (
    <div className="bhk-login-wrapper">
      {/* Background Ambient Glows */}
      <div className="bhk-ambient-glow bhk-glow-top-right" />
      <div className="bhk-ambient-glow bhk-glow-bottom-left" />

      <div className="bhk-login-container">
        <div className="bhk-login-columns">
          {/* ================= LEFT COLUMN: Corporate Info ================= */}
          <div className="bhk-left-col">
            {/* Pill Badge */}
            <div className="bhk-pill-badge">
              MARITIME FLEET MANAGEMENT SYSTEM
            </div>

            {/* Company Logo & Brand Name */}
            <div className="bhk-brand-header">
              {/* Geometric Maritime Boat Emblem (Green sail, Blue & Yellow Hull) */}
              <div className="bhk-logo-icon">
                <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                  {/* Top Sail: Green Triangle */}
                  <polygon points="24,5 41,23 7,23" fill="#16a34a" />
                  {/* Upper Hull: Ocean Blue */}
                  <path d="M7,25 H41 C40,33 34,36 24,36 C14,36 8,33 7,25 Z" fill="#0284c7" />
                  {/* Lower Curved Keel: Golden Yellow */}
                  <path d="M8,32 C12,42 17,44 24,44 C31,44 36,42 40,32 C34,41 14,41 8,32 Z" fill="#eab308" />
                </svg>
              </div>
              <h1 className="bhk-company-name">
                SISTEM PMS ARMADA NUSANTARA
              </h1>
            </div>

            {/* Description */}
            <p className="bhk-company-desc">
              Pusat sistem digital operasional armada kapal niaga terpadu untuk monitoring perawatan terencana (PMS), logistik suku cadang, kelaiklautan dokumen, absensi dinas, dan kasbon crew pelayaran Nusantara.
            </p>

            {/* Head Office Address & Contact Card */}
            <div className="bhk-contact-card">
              <div className="bhk-contact-item">
                <MapPin size={18} className="bhk-pin-icon" />
                <div className="bhk-contact-text">
                  <span className="bhk-contact-label">Pusat Komando & Operasional:</span>{' '}
                  Maritime Fleet Operations & Port Command Center, Kawasan Pelabuhan Tanjung Priok, Jakarta Utara - Indonesia
                </div>
              </div>

              <div className="bhk-contact-footer-row">
                <div className="bhk-contact-subitem">
                  <Phone size={14} className="bhk-phone-icon" />
                  <span>Telp: (021) 4390-8800 / 24-Jam Support</span>
                </div>
                <div className="bhk-contact-subitem">
                  <Mail size={14} className="bhk-mail-icon" />
                  <span>support@pmsarmada.id</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Login Card ================= */}
          <div className="bhk-right-col">
            <div className="bhk-login-card">
              {/* Card Header */}
              <div className="bhk-card-header">
                <h2 className="bhk-card-title">Masuk ke Portal PMS</h2>
                <p className="bhk-card-subtitle">
                  Gunakan akun kredensial resmi untuk mengakses sistem monitoring armada kapal
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="bhk-form">
                <div className="bhk-form-group">
                  <label className="bhk-label" htmlFor="bhk-email">
                    Email / Akun Pengguna
                  </label>
                  <div className="bhk-input-wrap">
                    <Mail size={16} className="bhk-input-icon" />
                    <input
                      id="bhk-email"
                      type="email"
                      className="bhk-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@pmsarmada.id"
                      required
                    />
                  </div>
                </div>

                <div className="bhk-form-group">
                  <label className="bhk-label" htmlFor="bhk-password">
                    Kata Sandi
                  </label>
                  <div className="bhk-input-wrap">
                    <Lock size={16} className="bhk-input-icon" />
                    <input
                      id="bhk-password"
                      type={showPassword ? 'text' : 'password'}
                      className="bhk-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••"
                      required
                    />
                    <button
                      type="button"
                      className="bhk-toggle-eye"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember & Default Credential Hint */}
                <div className="bhk-meta-row">
                  <label className="bhk-remember-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="bhk-checkbox"
                    />
                    <span>Ingat sesi saya</span>
                  </label>
                  <span className="bhk-demo-hint">
                    Default Sandi Demo: <strong>123</strong>
                  </span>
                </div>

                {/* Submit Button */}
                <button type="submit" className="bhk-submit-btn">
                  <span>Masuk ke Sistem PMS</span>
                  <ArrowRight size={17} />
                </button>
              </form>

              {/* Quick Demo Access Section */}
              <div className="bhk-quick-section">
                <div className="bhk-quick-header">
                  <div className="bhk-quick-title">
                    <Zap size={14} className="bhk-zap-icon" />
                    <span>Akses Cepat Demo (Klik Akun):</span>
                  </div>
                  <span className="bhk-quick-tag">1-Click Role Access</span>
                </div>

                {/* 2-Column Grid for Demo Accounts */}
                <div className="bhk-quick-grid">
                  {DEMO_ACCOUNTS.map((account) => (
                    <button
                      key={account.id}
                      type="button"
                      className="bhk-account-btn"
                      onClick={() => handleQuickLogin(account)}
                      title={`Masuk sebagai ${account.role} (${account.name})`}
                    >
                      <div className="bhk-account-info">
                        <div className="bhk-account-name">{account.name}</div>
                        <div className="bhk-account-role">{account.role}</div>
                      </div>
                      <ChevronRight size={14} className="bhk-chevron" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom System Disclaimer & Compliance Footer */}
        <footer className="bhk-page-footer">
          © 2026 Sistem PMS Armada Nusantara • ISM Code & Biro Klasifikasi Indonesia (BKI) Compliant
        </footer>
      </div>
    </div>
  );
}
