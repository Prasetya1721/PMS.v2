import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  ChevronRight,
  Heart
} from 'lucide-react';
import logoAt from '../../assets/logo-at.png';
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
              <div className="bhk-logo-icon">
                <img src={logoAt} alt="AT Logo" className="bhk-brand-logo-img" />
              </div>
              <h1 className="bhk-company-name">
                SISTEM PMS ARMADA NUSANTARA
              </h1>
            </div>

            {/* Description */}
            <p className="bhk-company-desc">
              Pusat sistem digital operasional armada kapal niaga terpadu untuk monitoring perawatan terencana (PMS), logistik suku cadang, kelaiklautan dokumen, absensi dinas, dan kasbon crew pelayaran Nusantara.
            </p>
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
          <div className="bhk-footer-credit">
            Dibuat dengan <Heart size={14} className="bhk-heart-icon" fill="#ef4444" color="#ef4444" /> oleh <span className="bhk-author-name">Pras</span>
          </div>
          <div className="bhk-footer-compliance">
            © 2026 Sistem PMS Armada Nusantara • ISM Code & Biro Klasifikasi Indonesia (BKI) Compliant
          </div>
        </footer>
      </div>
    </div>
  );
}
