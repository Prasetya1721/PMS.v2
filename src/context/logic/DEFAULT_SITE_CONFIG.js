/**
 * DEFAULT_SITE_CONFIG.js
 * Konfigurasi bawaan CMS halaman login (branding, latar, teks formulir)
 * White-label commercial release tanpa keterikatan PT tertentu.
 */
export const DEFAULT_SITE_CONFIG = {
  // Tipe Latar Belakang: 'bawaan' | 'solid' | 'gradasi' | 'wallpaper'
  bgType: 'wallpaper',
  solidColor: '#0c1a30',
  gradientFrom: '#0c1a30',
  gradientVia: '#0f2942',
  gradientTo: '#060d19',
  gradientDirection: 'to bottom right',
  wallpaperUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
  wallpaperBlur: 0,
  wallpaperOverlay: 40,
  glowBlobs: true,
  glowColor1: 'rgba(2, 132, 199, 0.25)',
  glowColor2: 'rgba(6, 182, 212, 0.2)',
  // Tema Kontras: 'light' (Latar Terang) | 'dark' (Latar Gelap)
  textColorTheme: 'light',

  // Panel Kiri (Branding Komersial)
  logoMode: 'maritime',
  customLogoUrl: '',
  companyBadge: 'MARITIME FLEET MANAGEMENT SYSTEM',
  systemTitle: 'SISTEM PMS ARMADA MARITIM',
  companySubtitle: 'Fleet Management & Planned Maintenance System',
  portalDescription: 'Pusat sistem digital operasional armada kapal tunda (tugboat), tongkang, dan kapal kargo niaga jalur pelayaran nasional dan internasional.',
  officeAddress: 'Kompleks Pelabuhan & Industri Maritim Terpadu, Indonesia',
  officePhone: '(021) 555-0199 / 555-0198',
  officeEmail: 'admin@pms-maritim.com',

  // Panel Kanan (Formulir Login)
  formCardStyle: 'dark_glass',
  formTitle: 'Masuk ke Portal PMS',
  formSubtitle: 'Gunakan akun korporat Sistem PMS Armada Maritim',
  usernamePlaceholder: 'admin@demo-pms.com',
  passwordPlaceholder: '•••',
  buttonText: 'Masuk ke Sistem PMS →',
  showQuickLogin: true,
  quickLoginLabel: '⚡ Akses Cepat Demo (Klik Akun):',
  quickAccounts: [
    { name: 'Capt. Robert Sitorus', role: 'Super Admin', email: 'admin@pms-maritim.com' },
    { name: 'Ir. H. Gunawan', role: 'Fleet Manager', email: 'fleet.ops@pms-maritim.com' },
    { name: 'Capt. Hendra Gunawan', role: 'Admin Kapal / Nakhoda', email: 'nakhoda@pms-maritim.com' },
    { name: 'Ir. Bambang Wijaya (KKM)', role: 'Teknisi / Chief Engineer', email: 'kkm@pms-maritim.com' },
    { name: 'Suryadi Pratama', role: 'Crew / ABK', email: 'abk@pms-maritim.com' },
    { name: 'Siti Rahmawati', role: 'HR / Personalia', email: 'hr@pms-maritim.com' }
  ],
  formFooterNotice: '🔒 Portal Resmi Sistem PMS Armada Maritim • ISM Code Compliant',
  footerText: '© 2026 Sistem PMS Armada Maritim • All Rights Reserved'
};
