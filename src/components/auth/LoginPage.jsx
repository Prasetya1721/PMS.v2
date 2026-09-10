import React, { useState } from 'react';
import {
  Anchor,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  CheckCircle2,
  Ship,
  Wrench,
  Users,
  WalletCards,
  Award,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';

export default function LoginPage() {
  const { login, DEMO_ACCOUNTS } = useApp();

  const [email, setEmail] = useState('admin@maritim.com');
  const [password, setPassword] = useState('password123');
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
    <div className="login-page-container">
      {/* Background Subtle Gradient */}
      <div className="login-bg-decor" />

      <div className="login-card-wrapper">
        {/* Top Branding Header */}
        <div className="login-brand-header">
          <div className="login-brand-logo">
            <Anchor size={32} />
          </div>
          <div className="login-brand-text">
            <h1 className="login-brand-title">PMS MARITIM</h1>
            <p className="login-brand-subtitle">Integrated Planned Maintenance & Fleet Operations</p>
          </div>
        </div>

        <div className="login-main-card">
          {/* Welcome Message */}
          <div className="login-welcome-box">
            <h2 className="login-heading">Portal Masuk Sistem</h2>
            <p className="login-subheading">
              Gunakan kredensial akun maritim Anda untuk mengakses monitoring kapal dan armada terpadu.
            </p>
          </div>

          {/* Standard Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">
                Alamat Email / NIP Pelaut
              </label>
              <div className="login-input-wrap">
                <Mail size={17} className="login-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className="form-control login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@maritim.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="login-password">
                  Kata Sandi Sistem
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Untuk presentasi demo, Anda dapat langsung mengklik salah satu akun demo di bawah.');
                  }}
                  className="login-forgot-link"
                >
                  Lupa Sandi?
                </a>
              </div>
              <div className="login-input-wrap">
                <Lock size={17} className="login-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="login-toggle-pwd"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="login-options-row">
              <label className="login-remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#0284c7' }}
                />
                <span>Ingat akun saya di perangkat ini</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary login-submit-btn">
              <LogIn size={18} />
              <span>Masuk ke Sistem PMS</span>
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>PILIH ROLE DEMO CEPAT (1-KLIK UNTUK PRESENTASI)</span>
          </div>

          {/* Quick Demo Role Selector */}
          <div className="demo-accounts-grid">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.id}
                type="button"
                className="demo-account-card"
                onClick={() => handleQuickLogin(account)}
                title={`Klik untuk langsung masuk sebagai ${account.role}`}
              >
                <div className="demo-avatar-circle">
                  {account.avatarInitials}
                </div>
                <div className="demo-account-details">
                  <div className="demo-account-name-row">
                    <span className="demo-account-name">{account.name}</span>
                    <Badge variant={account.badgeVariant}>
                      {account.role.split('/')[0].trim()}
                    </Badge>
                  </div>
                  <div className="demo-account-desc">{account.description}</div>
                </div>
                <div className="demo-login-action">
                  <span>Pilih</span>
                  <ArrowRight size={13} />
                </div>
              </button>
            ))}
          </div>

          {/* Security Compliance Guarantee */}
          <div className="login-security-footer">
            <div className="security-item">
              <ShieldCheck size={16} color="#059669" />
              <span>Enkripsi TLS 256-Bit</span>
            </div>
            <span className="security-dot">•</span>
            <div className="security-item">
              <CheckCircle2 size={16} color="#0284c7" />
              <span>Standar ISM Code & ISO 27001</span>
            </div>
          </div>
        </div>

        {/* System copyright */}
        <div className="login-footer-copy">
          © 2026 PT Pelayaran Samudera Armada • Sistem PMS v2.4 Enterprise Edition
        </div>
      </div>
    </div>
  );
}
