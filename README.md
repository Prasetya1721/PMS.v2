# PMS.v2 - Sistem Planned Maintenance System (PMS) Kapal & Manajemen Armada Terpadu

Dashboard Planned Maintenance System (PMS) berbasis web dengan tema **Light Mode Modern** untuk pengelolaan kelaiklautan armada kapal, monitoring jam kerja mesin (*running hours*), inventaris sparepart, surat kapal statutory, serta modul khusus: **Manajemen Crew**, **Sistem Kasbon Karyawan/Crew**, dan **Sistem Absensi Harian**.

---

## ⚓ Fitur Utama

1. **Dashboard Fleet & Per-Kapal (Light Theme)**:
   - Monitoring KPI operasional armada secara terpusat atau filter per kapal spesifik (*MV Samudera Perkasa*, *TB Nusantara VII*, *SPOB Barito Star*).
   - Deteksi otomatis peringatan kritis (Work Order overdue, surat kapal expired, kasbon pending).

2. **Sistem Absensi (Presensi Crew Harian)**:
   - Pencatatan shift tugas jaga (*Watchkeeping*: Navigasi, Mesin, Daywork).
   - Status presensi: *Onboard (Hadir)*, *Sakit (Off-duty)*, *Izin*, *Cuti Dinas*.
   - Pencatatan lokasi posisi koordinat/pelabuhan kapal.
   - Fitur ekspor rekapitulasi ke format CSV/Excel.

3. **Sistem Kasbon Crew (Cash Advance)**:
   - Pengajuan pinjaman darurat dengan pilihan skema tenor potong gaji (1x lunas, 2 bln, 3 bln, 6 bln).
   - Alur persetujuan bertingkat (*Approval Workflow*): Nakhoda ➔ Finance ➔ Pencairan Dana ➔ Lunas.
   - Histori pemotongan cicilan gaji berkala.

4. **Planned Maintenance System (PMS Inti)**:
   - Registry mesin kapal (Main Engine, Aux Engine, Pompa Bilge, Steering Gear, OWS).
   - Update Running Hours harian dengan kalkulasi otomatis status servis (*Normal*, *Due Soon*, *Overdue*).
   - Instruksi Work Order (WO) dengan checklist interaktif dan progress tracking.

5. **Inventaris Sparepart & Biaya (Cost Management)**:
   - Minimum Stock Alert suku cadang kritis.
   - Komparasi anggaran vs realisasi (*Budget vs Actual*) per kapal.

6. **Legalitas Dokumen Kapal & Sertifikat Pelaut (STCW)**:
   - Monitoring masa berlaku surat kapal (*SMC, DOC, Load Line, Class BKI, IOPP*).
   - Monitoring sertifikat pelaut (*COC, COP: BST, AFF, SCRB, MEFA, MCU*).
   - Pratinjau arsip scan digital dokumen resmi.

7. **Simulator WhatsApp Business API & Audit Trail**:
   - Preview pesan reminder resmi ke WhatsApp smartphone crew/admin.
   - Uji coba pengiriman real-time dan log audit notifikasi terkirim.

---

## 🚀 Menjalankan Aplikasi Secara Lokal

### Prasyarat
- Node.js (v18 ke atas)
- NPM

### Instalasi & Menjalankan Dev Server
```bash
# Clone repository
git clone https://github.com/Prasetya1721/PMS.v2.git
cd PMS.v2

# Install dependencies
npm install

# Jalankan server development
npm run dev
```

Aplikasi dapat diakses melalui browser di `http://localhost:5173/`.

### Build Produksi
```bash
npm run build
```
