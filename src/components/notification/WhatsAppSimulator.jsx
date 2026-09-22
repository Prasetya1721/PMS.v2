import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  CheckCheck,
  Phone,
  Clock,
  Sparkles,
  Smartphone,
  AlertTriangle,
  Award,
  Wrench,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/PMSContext';

export default function WhatsAppSimulator() {
  const { sendSimulatedWhatsApp, crew, ships } = useApp();

  const [selectedTemplate, setSelectedTemplate] = useState('doc_expired');
  const [targetRecipient, setTargetRecipient] = useState('bambang');
  const [customPhone, setCustomPhone] = useState('+6281298765432');
  const [isSending, setIsSending] = useState(false);
  const [lastSentTime, setLastSentTime] = useState(null);

  const templates = {
    doc_expired: {
      title: '🚨 Dokumen Kapal Expired (IOPP / SMC)',
      type: 'Statutory Document Expired Alert',
      recipientName: 'Capt. Bambang Wijaya (Nakhoda)',
      phone: '+6281298765432',
      content: `⚠️ *[PERINGATAN RESMI PMS ARMADA]*\n\nYth. *Capt. Bambang Wijaya*, Nakhoda MV Samudera Perkasa.\n\nSertifikat statutory berikut telah memasuki status *EXPIRED*:\n📋 *Dokumen:* International Oil Pollution Prevention (IOPP)\n🔢 *No. Sertifikat:* IOPP-99231-JKT\n📅 *Jatuh Tempo:* 20 Agustus 2026 (Lewat 21 Hari)\n\nMohon segera tindak lanjuti bersama Port Agent & Biro Klasifikasi BKI untuk verifikasi survey pembaharuan.\n\n_Sistem Otomatis Fleet PMS Terpadu_`
    },
    crew_cert: {
      title: '🔔 Sertifikat Crew Mendekati Expired (H-35)',
      type: 'Crew Certificate Renewal Reminder',
      recipientName: 'Agus Setiawan, C/E',
      phone: '+6281312345678',
      content: `🔔 *[PENGINGAT SERTIFIKAT PELAUT]*\n\nYth. *Agus Setiawan, C/E* (Chief Engineer MV Samudera Perkasa).\n\nSertifikat keahlian Anda akan jatuh tempo dalam *35 hari*:\n📜 *Sertifikat:* Advanced Fire Fighting (COP AFF)\n🔢 *No. Reg:* AFF-882910-SUB\n📅 *Batas Berlaku:* 15 Oktober 2026\n\nSilakan ajukan cuti darat atau koordinasikan jadwal refreshing course bersama HR Personalia.\n\n_Departemen Personalia & Crewing PMS_`
    },
    maintenance_overdue: {
      title: '⚙️ Maintenance WO Overdue (>100 Jam)',
      type: 'Maintenance Overdue Alert',
      recipientName: 'Rudi Hartono (2nd Engineer)',
      phone: '+6285288991122',
      content: `⚙️ *[PMS MAINTENANCE OVERDUE]*\n\nYth. *Rudi Hartono* (2nd Engineer MV Samudera Perkasa).\n\nWork Order berikut telah melebihi jam operasional:\n🔧 *WO:* Overhaul Impeller & Mechanical Seal Pompa Bilge\n🔢 *No. WO:* WO-2026-09-001\n⏱️ *Running Hours:* 4,120 Jam (Batas: 4,000 Jam)\n\nSuku cadang mechanical seal 45mm telah disiapkan di Engine Store Rak B4. Segera laksanakan saat kapal labuh jangkar.\n\n_PMS Technical Engine Superintendent_`
    },
    kasbon_disbursed: {
      title: '💵 Pencairan Kasbon Crew Disetujui',
      type: 'Cash Advance Disbursed Alert',
      recipientName: 'Joko Susilo (Bosun)',
      phone: '+6281356781290',
      content: `💵 *[PENCAIRAN KASBON BERHASIL]*\n\nYth. *Joko Susilo* (Bosun MV Samudera Perkasa).\n\nPengajuan Kasbon Anda telah *DISETUJUI & DICAIRKAN* oleh Finance:\n💳 *No. Pengajuan:* KSB-2026-09-001\n💰 *Nominal Dana:* Rp 3.500.000\n📅 *Tenor:* 3 Bulan (Potongan Rp 1.166.667 / bulan)\n\nDana telah ditransfer ke rekening payroll Anda. Terima kasih.\n\n_Finance & Payroll Department_`
    }
  };

  const currentTemplate = templates[selectedTemplate];

  const handleSendTest = () => {
    setIsSending(true);
    setTimeout(() => {
      sendSimulatedWhatsApp(
        currentTemplate.recipientName,
        customPhone || currentTemplate.phone,
        currentTemplate.type,
        currentTemplate.content
      );
      setIsSending(false);
      setLastSentTime(new Date().toLocaleTimeString('id-ID'));
    }, 600);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <MessageSquare size={26} color="#008069" />
            <span>Simulator Notifikasi WhatsApp Business API</span>
          </h1>
          <p className="page-desc">
            Uji coba pengiriman pesan otomatis pengingat jatuh tempo surat kapal, sertifikat crew, jadwal maintenance, dan konfirmasi kasbon.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2rem' }}>
        {/* Left Side: Control Panel */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Konfigurasi Pengujian Pesan</h2>
              <p className="card-subtitle">Pilih template skenario notifikasi otomatis PMS</p>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Pilih Skenario Template Reminder</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {Object.keys(templates).map((key) => {
                  const t = templates[key];
                  const isSelected = selectedTemplate === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      style={{
                        textAlign: 'left',
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid #008069' : '1px solid var(--border-default)',
                        backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onClick={() => {
                        setSelectedTemplate(key);
                        setCustomPhone(templates[key].phone);
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: isSelected ? '#008069' : 'var(--brand-navy-900)' }}>
                        {t.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Penerima: {t.recipientName} ({t.phone})
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Nomor WhatsApp Tujuan (Simulasi)</label>
              <input
                type="text"
                className="form-control"
                value={customPhone}
                onChange={(e) => setCustomPhone(e.target.value)}
              />
              <div className="form-hint">
                Pesan akan diformat resmi sesuai standar template WhatsApp Business Cloud API.
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  backgroundColor: '#008069',
                  borderColor: '#008069',
                  padding: '0.75rem',
                  fontSize: '0.95rem'
                }}
                disabled={isSending}
                onClick={handleSendTest}
              >
                {isSending ? (
                  <span>Mengirimkan Pesan...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Kirim Pesan WhatsApp Uji Coba</span>
                  </>
                )}
              </button>
            </div>

            {lastSentTime && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCheck size={18} color="#008069" />
                <span>Pesan simulasi berhasil dikirim pada pukul <strong>{lastSentTime} WIB</strong>!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Simulated WhatsApp Phone View */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Pratinjau Tampilan Layar HP Crew / Admin</h2>
              <p className="card-subtitle">Format pesan real-time yang diterima di WhatsApp pengguna</p>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '380px' }}>
              {/* WhatsApp Smartphone Frame */}
              <div style={{
                border: '12px solid #1f2937',
                borderRadius: '36px',
                overflow: 'hidden',
                backgroundColor: '#efeae2',
                boxShadow: 'var(--shadow-xl)'
              }}>
                {/* Status Bar */}
                <div style={{
                  backgroundColor: '#008069',
                  color: '#ffffff',
                  padding: '0.5rem 1rem 0.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.7rem'
                }}>
                  <span>09:41</span>
                  <span>📶 4G • 98%</span>
                </div>

                {/* WhatsApp Chat Top Header */}
                <div style={{
                  backgroundColor: '#008069',
                  color: '#ffffff',
                  padding: '0.65rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#008069',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    PMS
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                      Fleet PMS Reminder Bot
                    </div>
                    <div style={{ fontSize: '0.675rem', opacity: 0.9 }}>
                      Official Business Account
                    </div>
                  </div>
                </div>

                {/* Chat Background & Message Bubbles */}
                <div className="wa-chat-frame" style={{ minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <div style={{
                    alignSelf: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.7rem',
                    color: '#54656f',
                    marginBottom: '1rem',
                    boxShadow: '0 1px 1px rgba(0,0,0,0.05)'
                  }}>
                    HARI INI
                  </div>

                  <div className="wa-bubble">
                    <div className="wa-header">
                      <MessageSquare size={14} />
                      <span>{currentTemplate.type}</span>
                    </div>
                    <div style={{ whiteSpace: 'pre-line', fontSize: '0.8rem' }}>
                      {currentTemplate.content}
                    </div>
                    <div className="wa-timestamp">
                      {lastSentTime || '09:41 WIB'} <CheckCheck size={14} color="#53bdeb" style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
