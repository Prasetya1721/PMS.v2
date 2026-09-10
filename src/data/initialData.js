// ==========================================================================
// INITIAL SEED DATA UNTUK SISTEM PMS KAPAL & ARMADA
// ==========================================================================

export const INITIAL_SHIPS = [
  {
    id: 'ship-1',
    name: 'MV Samudera Perkasa',
    imoNumber: 'IMO 9482103',
    callSign: 'PKSP',
    flag: 'Indonesia (IDN)',
    type: 'General Cargo / Container',
    grossTonnage: '4,520 GT',
    deadweight: '6,200 DWT',
    yearBuilt: 2018,
    status: 'Operational',
    homePort: 'Tanjung Priok, Jakarta',
    currentLocation: 'Perairan Selat Sunda (En Route to Panjang)',
    chiefEngineer: 'Agus Setiawan, C/E',
    captain: 'Capt. Bambang Wijaya, M.Mar',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80',
    totalRunningHours: 14820,
    maintenanceCompliance: 96,
    docCompliance: 92
  },
  {
    id: 'ship-2',
    name: 'TB Nusantara VII',
    imoNumber: 'IMO 9815432',
    callSign: 'PKNV',
    flag: 'Indonesia (IDN)',
    type: 'Ocean Tug Boat',
    grossTonnage: '380 GT',
    deadweight: '450 DWT',
    yearBuilt: 2020,
    status: 'Operational',
    homePort: 'Tanjung Perak, Surabaya',
    currentLocation: 'Tanjung Perak Anchorage',
    chiefEngineer: 'Hendra Gunawan, C/E',
    captain: 'Capt. Rahmat Hidayat',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    totalRunningHours: 9450,
    maintenanceCompliance: 88,
    docCompliance: 85
  },
  {
    id: 'ship-3',
    name: 'SPOB Barito Star',
    imoNumber: 'IMO 9732190',
    callSign: 'PKBS',
    flag: 'Indonesia (IDN)',
    type: 'Oil Bunker Tanker',
    grossTonnage: '1,890 GT',
    deadweight: '2,500 DWT',
    yearBuilt: 2017,
    status: 'Under Maintenance',
    homePort: 'Banjarmasin, Kalsel',
    currentLocation: 'Galangan Dok Muara Baru',
    chiefEngineer: 'Dedi Kusuma, C/E',
    captain: 'Capt. Hendro Wibowo',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=80',
    totalRunningHours: 18230,
    maintenanceCompliance: 78,
    docCompliance: 75
  }
];

export const INITIAL_EQUIPMENT = [
  {
    id: 'eq-1',
    shipId: 'ship-1',
    code: 'ME-01',
    name: 'Main Engine (Mesin Induk)',
    category: 'Propulsion',
    maker: 'MAN B&W 6S35MC',
    serialNo: 'MAN-92381-2018',
    currentHours: 14820,
    lastServiceHours: 14500,
    intervalHours: 500, // Tiap 500 jam
    nextServiceHours: 15000,
    status: 'Due Soon', // 180 jam lagi
    location: 'Engine Room - Lower Platform',
    criticality: 'Critical'
  },
  {
    id: 'eq-2',
    shipId: 'ship-1',
    code: 'AE-01',
    name: 'Auxiliary Engine 1 (Genset No.1)',
    category: 'Electrical Power',
    maker: 'Yanmar 6NY16L',
    serialNo: 'YN-4421-2018',
    currentHours: 8940,
    lastServiceHours: 8500,
    intervalHours: 500,
    nextServiceHours: 9000,
    status: 'Due Soon',
    location: 'Engine Room - Aux Platform',
    criticality: 'High'
  },
  {
    id: 'eq-3',
    shipId: 'ship-1',
    code: 'AE-02',
    name: 'Auxiliary Engine 2 (Genset No.2)',
    category: 'Electrical Power',
    maker: 'Yanmar 6NY16L',
    serialNo: 'YN-4422-2018',
    currentHours: 8210,
    lastServiceHours: 8000,
    intervalHours: 500,
    nextServiceHours: 8500,
    status: 'Normal',
    location: 'Engine Room - Aux Platform',
    criticality: 'High'
  },
  {
    id: 'eq-4',
    shipId: 'ship-1',
    code: 'PMP-01',
    name: 'Main Bilge & Ballast Pump',
    category: 'Pumping System',
    maker: 'Taiko Kikai Centrifugal',
    serialNo: 'TK-1029',
    currentHours: 4120,
    lastServiceHours: 3500,
    intervalHours: 500,
    nextServiceHours: 4000,
    status: 'Overdue', // Melebihi 120 jam
    location: 'Engine Room - Bilge Well Area',
    criticality: 'Critical'
  },
  {
    id: 'eq-5',
    shipId: 'ship-1',
    code: 'STG-01',
    name: 'Electro-Hydraulic Steering Gear',
    category: 'Steering & Navigation',
    maker: 'Kawasaki Rotary Vane',
    serialNo: 'KW-SG-889',
    currentHours: 7200,
    lastServiceHours: 6500,
    intervalHours: 1000,
    nextServiceHours: 7500,
    status: 'Normal',
    location: 'Steering Gear Flat',
    criticality: 'Critical'
  },
  {
    id: 'eq-6',
    shipId: 'ship-1',
    code: 'OWS-01',
    name: 'Oily Water Separator 15ppm',
    category: 'Marpol Pollution Control',
    maker: 'RWO Marine Skit S-DEB',
    serialNo: 'RWO-291',
    currentHours: 2450,
    lastServiceHours: 2000,
    intervalHours: 500,
    nextServiceHours: 2500,
    status: 'Normal',
    location: 'Engine Room - Port Side',
    criticality: 'High'
  },
  // TB Nusantara VII Equipment
  {
    id: 'eq-7',
    shipId: 'ship-2',
    code: 'ME-01',
    name: 'Port Main Engine (Caterpillar 3516B)',
    category: 'Propulsion',
    maker: 'Caterpillar Marine',
    serialNo: 'CAT-3516-P',
    currentHours: 9450,
    lastServiceHours: 9000,
    intervalHours: 500,
    nextServiceHours: 9500,
    status: 'Due Soon',
    location: 'Engine Room',
    criticality: 'Critical'
  },
  {
    id: 'eq-8',
    shipId: 'ship-2',
    code: 'ME-02',
    name: 'Starboard Main Engine (Caterpillar 3516B)',
    category: 'Propulsion',
    maker: 'Caterpillar Marine',
    serialNo: 'CAT-3516-S',
    currentHours: 9380,
    lastServiceHours: 9000,
    intervalHours: 500,
    nextServiceHours: 9500,
    status: 'Normal',
    location: 'Engine Room',
    criticality: 'Critical'
  },
  // SPOB Barito Star Equipment
  {
    id: 'eq-9',
    shipId: 'ship-3',
    code: 'CGP-01',
    name: 'Cargo Discharge Screw Pump',
    category: 'Cargo Handling',
    maker: 'Bornemann Twin Screw',
    serialNo: 'BM-771',
    currentHours: 3620,
    lastServiceHours: 3000,
    intervalHours: 500,
    nextServiceHours: 3500,
    status: 'Overdue',
    location: 'Cargo Pump Room',
    criticality: 'Critical'
  }
];

export const INITIAL_WORK_ORDERS = [
  {
    id: 'wo-101',
    woNumber: 'WO-2026-09-001',
    shipId: 'ship-1',
    equipmentId: 'eq-4',
    title: 'Overhaul Impeller & Mechanical Seal Pompa Bilge',
    type: 'Running Hours Service (500h)',
    priority: 'Urgent',
    status: 'Overdue',
    assignedTo: '2nd Engineer Rudi',
    dueDate: '2026-09-05',
    runningHoursTarget: 4000,
    checklist: [
      { id: 'c1', task: 'Isolasi sumber listrik dan valve suction/discharge', done: true },
      { id: 'c2', task: 'Bongkar casing dan inspeksi keausan impeller', done: true },
      { id: 'c3', task: 'Ganti mechanical seal dan O-ring baru', done: false },
      { id: 'c4', task: 'Test running 30 menit & cek kebocoran / getaran', done: false }
    ],
    requiredParts: [
      { partId: 'sp-4', name: 'Mechanical Seal Pompa Bilge 45mm', qty: 1 }
    ],
    notes: 'Sudah melewati jadwal 120 jam operasional. Harap segera diganti saat sandar.'
  },
  {
    id: 'wo-102',
    woNumber: 'WO-2026-09-002',
    shipId: 'ship-1',
    equipmentId: 'eq-1',
    title: 'Pembersihan Fuel Injector & Lube Oil Filter Main Engine',
    type: 'Running Hours Routine (500h)',
    priority: 'High',
    status: 'Due Soon',
    assignedTo: 'Chief Engineer Agus',
    dueDate: '2026-09-14',
    runningHoursTarget: 15000,
    checklist: [
      { id: 'c1', task: 'Uji tekanan buka injector nozzle pada 320 bar', done: false },
      { id: 'c2', task: 'Ganti filter cartridge lube oil ME', done: false },
      { id: 'c3', task: 'Periksa clearance exhaust valve & rocker arm', done: false }
    ],
    requiredParts: [
      { partId: 'sp-1', name: 'Fuel Injector Nozzle MAN B&W', qty: 6 },
      { partId: 'sp-2', name: 'Lube Oil Filter Cartridge', qty: 2 }
    ],
    notes: 'Jadwal servis rutin 500 jam mendekati batas toleransi 15.000 jam.'
  },
  {
    id: 'wo-103',
    woNumber: 'WO-2026-08-045',
    shipId: 'ship-1',
    equipmentId: 'eq-6',
    title: 'Penggantian Elemen Koaleser OWS 15ppm',
    type: 'Periodic Inspection',
    priority: 'Medium',
    status: 'Completed',
    assignedTo: '3rd Engineer Faisal',
    dueDate: '2026-08-28',
    completedDate: '2026-08-27',
    runningHoursTarget: 2400,
    checklist: [
      { id: 'c1', task: 'Bilas tangki separator dengan air tawar panas', done: true },
      { id: 'c2', task: 'Pasang filter elemen baru dan kalibrasi sensor 15ppm', done: true },
      { id: 'c3', task: 'Catat dalam Oil Record Book (Part I)', done: true }
    ],
    requiredParts: [
      { partId: 'sp-6', name: 'Coalescer Filter Element OWS', qty: 1 }
    ],
    notes: 'Selesai tepat waktu. Sensor membaca 2.1 ppm air buangan (lolos uji).'
  },
  {
    id: 'wo-104',
    woNumber: 'WO-2026-09-009',
    shipId: 'ship-2',
    equipmentId: 'eq-7',
    title: 'Ganti Oli Mesin & Filter Solar Port ME CAT 3516B',
    type: 'Running Hours Service (500h)',
    priority: 'High',
    status: 'Due Soon',
    assignedTo: 'C/E Hendra Gunawan',
    dueDate: '2026-09-12',
    runningHoursTarget: 9500,
    checklist: [
      { id: 'c1', task: 'Drain oli kotor SAE 40 sebanyak 450 Liter', done: false },
      { id: 'c2', task: 'Ganti primary & secondary fuel filter', done: false },
      { id: 'c3', task: 'Pengisian oli baru Pertamina Meditran SMX', done: false }
    ],
    requiredParts: [
      { partId: 'sp-7', name: 'CAT 3516 Fuel Filter Element', qty: 4 }
    ],
    notes: 'Menunggu kapal tiba di pangkalan dermaga jam 16:00 WIB.'
  },
  {
    id: 'wo-105',
    woNumber: 'WO-2026-09-012',
    shipId: 'ship-3',
    equipmentId: 'eq-9',
    title: 'Overhaul Shaft & Bearing Pompa Kargo Minyak',
    type: 'Breakdown / Overhaul',
    priority: 'Urgent',
    status: 'Overdue',
    assignedTo: 'C/E Dedi Kusuma + Kontraktor Galangan',
    dueDate: '2026-09-02',
    runningHoursTarget: 3500,
    checklist: [
      { id: 'c1', task: 'Degas tangki dan pastikan gas-free sertifikat aktif', done: true },
      { id: 'c2', task: 'Bongkar screw pump dan inspeksi clearance timing gear', done: true },
      { id: 'c3', task: 'Ganti roller bearing & mechanical seal khusus fluida HSD', done: false }
    ],
    requiredParts: [],
    notes: 'Kapal off-hire sementara di Muara Baru menunggu suku cadang tiba.'
  }
];

export const INITIAL_SPAREPARTS = [
  {
    id: 'sp-1',
    shipId: 'ship-1',
    partNo: 'MAN-INJ-3501',
    name: 'Fuel Injector Nozzle MAN B&W',
    category: 'Fuel System',
    applicableEquipment: 'Main Engine MAN B&W',
    stockQty: 8,
    minQty: 6,
    unit: 'Pcs',
    unitPrice: 4250000,
    rackLocation: 'Engine Store - Rak A2',
    status: 'Safe'
  },
  {
    id: 'sp-2',
    shipId: 'ship-1',
    partNo: 'FLT-LUB-881',
    name: 'Lube Oil Filter Cartridge 20 Micron',
    category: 'Filtration',
    applicableEquipment: 'Main Engine & Aux Engine',
    stockQty: 3,
    minQty: 5,
    unit: 'Pcs',
    unitPrice: 1350000,
    rackLocation: 'Engine Store - Rak B1',
    status: 'Low' // Alert stok menipis
  },
  {
    id: 'sp-3',
    shipId: 'ship-1',
    partNo: 'GSK-CYL-35',
    name: 'Cylinder Head Gasket Kit',
    category: 'Gasket & Seal',
    applicableEquipment: 'Main Engine',
    stockQty: 4,
    minQty: 2,
    unit: 'Set',
    unitPrice: 7800000,
    rackLocation: 'Engine Store - Rak C3',
    status: 'Safe'
  },
  {
    id: 'sp-4',
    shipId: 'ship-1',
    partNo: 'PMP-SEAL-45',
    name: 'Mechanical Seal Pompa Bilge 45mm',
    category: 'Pumping',
    applicableEquipment: 'Bilge & Ballast Pump',
    stockQty: 1,
    minQty: 2,
    unit: 'Pcs',
    unitPrice: 2200000,
    rackLocation: 'Pump Store - Box 04',
    status: 'Low'
  },
  {
    id: 'sp-5',
    shipId: 'ship-1',
    partNo: 'ZNC-ANODE-12',
    name: 'Zinc Anode Sea Chest Protection 5kg',
    category: 'Cathodic Protection',
    applicableEquipment: 'Sea Chest & Cooler',
    stockQty: 12,
    minQty: 8,
    unit: 'Pcs',
    unitPrice: 450000,
    rackLocation: 'Deck Store - Rak D',
    status: 'Safe'
  },
  {
    id: 'sp-6',
    shipId: 'ship-1',
    partNo: 'RWO-CLS-15',
    name: 'Coalescer Filter Element OWS',
    category: 'Marpol',
    applicableEquipment: 'Oily Water Separator',
    stockQty: 2,
    minQty: 2,
    unit: 'Pcs',
    unitPrice: 3100000,
    rackLocation: 'Engine Store - Rak E1',
    status: 'Safe'
  },
  {
    id: 'sp-7',
    shipId: 'ship-2',
    partNo: 'CAT-1R-0716',
    name: 'CAT 3516 Fuel Filter Element',
    category: 'Fuel System',
    applicableEquipment: 'Caterpillar 3516B',
    stockQty: 2,
    minQty: 6,
    unit: 'Pcs',
    unitPrice: 650000,
    rackLocation: 'Store TB - Bin 3',
    status: 'Low'
  }
];

// DATA CREW LENGKAP DENGAN BUKU PELAUT & JABATAN
export const INITIAL_CREW = [
  {
    id: 'crew-1',
    shipId: 'ship-1',
    name: 'Capt. Bambang Wijaya',
    rank: 'Master / Nakhoda',
    seamanBookNo: 'C.084920-ID',
    phone: '+6281298765432',
    email: 'bambang.wijaya@maritime-fleet.id',
    signOnDate: '2026-03-01',
    contractEnd: '2026-12-31',
    status: 'Onboard',
    leaveQuota: 12,
    remainingLeave: 8,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'crew-2',
    shipId: 'ship-1',
    name: 'Agus Setiawan, C/E',
    rank: 'Chief Engineer (Kamar Mesin)',
    seamanBookNo: 'E.023419-ID',
    phone: '+6281312345678',
    email: 'agus.setiawan@maritime-fleet.id',
    signOnDate: '2026-01-15',
    contractEnd: '2026-10-15',
    status: 'Onboard',
    leaveQuota: 14,
    remainingLeave: 6,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'crew-3',
    shipId: 'ship-1',
    name: 'Rudi Hartono',
    rank: '2nd Engineer',
    seamanBookNo: 'E.059281-ID',
    phone: '+6285288991122',
    email: 'rudi.hartono@maritime-fleet.id',
    signOnDate: '2026-02-10',
    contractEnd: '2026-11-10',
    status: 'Onboard',
    leaveQuota: 12,
    remainingLeave: 9,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'crew-4',
    shipId: 'ship-1',
    name: 'Faisal Basri',
    rank: '3rd Engineer',
    seamanBookNo: 'E.071192-ID',
    phone: '+6287890123456',
    email: 'faisal.basri@maritime-fleet.id',
    signOnDate: '2026-04-01',
    contractEnd: '2026-12-01',
    status: 'Onboard',
    leaveQuota: 12,
    remainingLeave: 12,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'crew-5',
    shipId: 'ship-1',
    name: 'Danang Prasetyo',
    rank: 'Chief Officer (Mualim I)',
    seamanBookNo: 'C.091823-ID',
    phone: '+6281987651234',
    email: 'danang.p@maritime-fleet.id',
    signOnDate: '2026-03-15',
    contractEnd: '2026-11-30',
    status: 'Onboard',
    leaveQuota: 12,
    remainingLeave: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'crew-6',
    shipId: 'ship-1',
    name: 'Joko Susilo',
    rank: 'Bosun (Kepala Kelasi)',
    seamanBookNo: 'D.048172-ID',
    phone: '+6281356781290',
    email: 'joko.susilo@maritime-fleet.id',
    signOnDate: '2025-11-01',
    contractEnd: '2026-09-30',
    status: 'Onboard',
    leaveQuota: 12,
    remainingLeave: 3,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'crew-7',
    shipId: 'ship-1',
    name: 'Supriyanto',
    rank: 'Able Seaman (Kelasi)',
    seamanBookNo: 'D.082910-ID',
    phone: '+6282145678901',
    email: 'supri.abk@maritime-fleet.id',
    signOnDate: '2026-02-01',
    contractEnd: '2026-10-31',
    status: 'Onboard',
    leaveQuota: 12,
    remainingLeave: 7,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'crew-8',
    shipId: 'ship-1',
    name: 'Ahmad Dahlan',
    rank: 'Oiler (Juru Minyak)',
    seamanBookNo: 'E.093821-ID',
    phone: '+6285311223344',
    email: 'ahmad.oiler@maritime-fleet.id',
    signOnDate: '2026-03-01',
    contractEnd: '2026-11-15',
    status: 'Onboard',
    leaveQuota: 12,
    remainingLeave: 10,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  // Crew TB Nusantara VII
  {
    id: 'crew-9',
    shipId: 'ship-2',
    name: 'Capt. Rahmat Hidayat',
    rank: 'Master / Nakhoda',
    seamanBookNo: 'C.076521-ID',
    phone: '+628113456789',
    email: 'rahmat.h@maritime-fleet.id',
    signOnDate: '2026-01-01',
    contractEnd: '2026-12-31',
    status: 'Onboard',
    leaveQuota: 12,
    remainingLeave: 8,
    avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'crew-10',
    shipId: 'ship-2',
    name: 'Hendra Gunawan, C/E',
    rank: 'Chief Engineer',
    seamanBookNo: 'E.044129-ID',
    phone: '+628122334455',
    email: 'hendra.g@maritime-fleet.id',
    signOnDate: '2026-02-15',
    contractEnd: '2026-10-31',
    status: 'Onboard',
    leaveQuota: 12,
    remainingLeave: 6,
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80'
  },
  // Crew SPOB Barito Star
  {
    id: 'crew-11',
    shipId: 'ship-3',
    name: 'Capt. Hendro Wibowo',
    rank: 'Master / Nakhoda',
    seamanBookNo: 'C.059124-ID',
    phone: '+6281399887766',
    email: 'hendro.w@maritime-fleet.id',
    signOnDate: '2025-10-10',
    contractEnd: '2026-09-15',
    status: 'Onboard',
    leaveQuota: 14,
    remainingLeave: 2,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'
  }
];

// MODUL KHUSUS: SISTEM ABSENSI (PRESENSI CREW KAPAL)
export const INITIAL_ATTENDANCE = [
  {
    id: 'att-01',
    date: '2026-09-10',
    shipId: 'ship-1',
    crewId: 'crew-1',
    crewName: 'Capt. Bambang Wijaya',
    rank: 'Master / Nakhoda',
    shift: 'Jaga Laut Standby (08:00 - 16:00)',
    location: 'Perairan Selat Sunda',
    status: 'Onboard (Hadir)',
    checkInTime: '07:45 WIB',
    checkOutTime: '16:15 WIB',
    remarks: 'Kondisi cuaca ombak 1.5 meter, pelayaran lancar'
  },
  {
    id: 'att-02',
    date: '2026-09-10',
    shipId: 'ship-1',
    crewId: 'crew-2',
    crewName: 'Agus Setiawan, C/E',
    rank: 'Chief Engineer',
    shift: 'Daywork Mesin (08:00 - 17:00)',
    location: 'Perairan Selat Sunda',
    status: 'Onboard (Hadir)',
    checkInTime: '07:50 WIB',
    checkOutTime: '17:05 WIB',
    remarks: 'Monitoring suhu lube oil ME normal 72°C'
  },
  {
    id: 'att-03',
    date: '2026-09-10',
    shipId: 'ship-1',
    crewId: 'crew-3',
    crewName: 'Rudi Hartono',
    rank: '2nd Engineer',
    shift: 'Jaga Mesin II (04:00 - 08:00 & 16:00 - 20:00)',
    location: 'Perairan Selat Sunda',
    status: 'Onboard (Hadir)',
    checkInTime: '03:55 WIB',
    checkOutTime: '20:05 WIB',
    remarks: 'Eksekusi WO perbaikan seal pompa bilge'
  },
  {
    id: 'att-04',
    date: '2026-09-10',
    shipId: 'ship-1',
    crewId: 'crew-4',
    crewName: 'Faisal Basri',
    rank: '3rd Engineer',
    shift: 'Jaga Mesin I (00:00 - 04:00 & 12:00 - 16:00)',
    location: 'Perairan Selat Sunda',
    status: 'Onboard (Hadir)',
    checkInTime: '23:50 WIB',
    checkOutTime: '16:00 WIB',
    remarks: 'Transfer bunker HSD ke daily tank'
  },
  {
    id: 'att-05',
    date: '2026-09-10',
    shipId: 'ship-1',
    crewId: 'crew-5',
    crewName: 'Danang Prasetyo',
    rank: 'Chief Officer (Mualim I)',
    shift: 'Jaga Navigasi I (04:00 - 08:00 & 16:00 - 20:00)',
    location: 'Perairan Selat Sunda',
    status: 'Onboard (Hadir)',
    checkInTime: '03:50 WIB',
    checkOutTime: '20:10 WIB',
    remarks: 'Olah gerak alur pelayaran Selat Sunda'
  },
  {
    id: 'att-06',
    date: '2026-09-10',
    shipId: 'ship-1',
    crewId: 'crew-6',
    crewName: 'Joko Susilo',
    rank: 'Bosun',
    shift: 'Daywork Geladak (08:00 - 16:00)',
    location: 'Perairan Selat Sunda',
    status: 'Onboard (Hadir)',
    checkInTime: '07:55 WIB',
    checkOutTime: '16:00 WIB',
    remarks: 'Pengecekan lashing kontainer muatan haluan'
  },
  {
    id: 'att-07',
    date: '2026-09-10',
    shipId: 'ship-1',
    crewId: 'crew-7',
    crewName: 'Supriyanto',
    rank: 'Able Seaman',
    shift: 'Jaga Kemudi (00:00 - 04:00 & 12:00 - 16:00)',
    location: 'Perairan Selat Sunda',
    status: 'Onboard (Hadir)',
    checkInTime: '23:55 WIB',
    checkOutTime: '16:05 WIB',
    remarks: 'Standby juru mudi jaga navigasi'
  },
  {
    id: 'att-08',
    date: '2026-09-10',
    shipId: 'ship-1',
    crewId: 'crew-8',
    crewName: 'Ahmad Dahlan',
    rank: 'Oiler',
    shift: 'Izin Medis (Kamar Sakit)',
    location: 'Perairan Selat Sunda',
    status: 'Sakit (Off-duty)',
    checkInTime: '-',
    checkOutTime: '-',
    remarks: 'Mengalami demam ringan 38.2°C, istirahat di kabin'
  },
  {
    id: 'att-09',
    date: '2026-09-10',
    shipId: 'ship-2',
    crewId: 'crew-9',
    crewName: 'Capt. Rahmat Hidayat',
    rank: 'Master / Nakhoda',
    shift: 'Standby Dermaga (08:00 - 17:00)',
    location: 'Tanjung Perak, Surabaya',
    status: 'Onboard (Hadir)',
    checkInTime: '08:00 WIB',
    checkOutTime: '17:00 WIB',
    remarks: 'Standby asistensi pemanduan tongkang batu bara'
  }
];

// MODUL KHUSUS: SISTEM KASBON (CASH ADVANCE CREW)
export const INITIAL_KASBON = [
  {
    id: 'ksb-001',
    requestNo: 'KSB-2026-09-001',
    shipId: 'ship-1',
    crewId: 'crew-6',
    crewName: 'Joko Susilo',
    rank: 'Bosun',
    amount: 3500000,
    purpose: 'Biaya pendaftaran sekolah putra (SMA) di kampung halaman',
    requestDate: '2026-09-02',
    tenorMonths: 3,
    monthlyDeduction: 1166667,
    status: 'Dicairkan', // Menunggu Persetujuan Nakhoda -> Disetujui Nakhoda -> Disetujui Finance -> Dicairkan -> Lunas
    approvals: {
      captainApproved: true,
      captainDate: '2026-09-02',
      financeApproved: true,
      financeDate: '2026-09-03',
      disbursedDate: '2026-09-04'
    },
    paidAmount: 1166667,
    remainingAmount: 2333333,
    paymentHistory: [
      { date: '2026-09-08', amount: 1166667, method: 'Potong Gaji Periode September' }
    ]
  },
  {
    id: 'ksb-002',
    requestNo: 'KSB-2026-09-002',
    shipId: 'ship-1',
    crewId: 'crew-3',
    crewName: 'Rudi Hartono',
    rank: '2nd Engineer',
    amount: 5000000,
    purpose: 'Renovasi mendesak genteng bocor rumah keluarga',
    requestDate: '2026-09-07',
    tenorMonths: 2,
    monthlyDeduction: 2500000,
    status: 'Disetujui Finance / Siap Cair',
    approvals: {
      captainApproved: true,
      captainDate: '2026-09-07',
      financeApproved: true,
      financeDate: '2026-09-09',
      disbursedDate: null
    },
    paidAmount: 0,
    remainingAmount: 5000000,
    paymentHistory: []
  },
  {
    id: 'ksb-003',
    requestNo: 'KSB-2026-09-003',
    shipId: 'ship-1',
    crewId: 'crew-7',
    crewName: 'Supriyanto',
    rank: 'Able Seaman',
    amount: 2000000,
    purpose: 'Bantuan darurat orang tua sakit di Blitar',
    requestDate: '2026-09-09',
    tenorMonths: 1,
    monthlyDeduction: 2000000,
    status: 'Menunggu Persetujuan Nakhoda',
    approvals: {
      captainApproved: false,
      captainDate: null,
      financeApproved: false,
      financeDate: null,
      disbursedDate: null
    },
    paidAmount: 0,
    remainingAmount: 2000000,
    paymentHistory: []
  },
  {
    id: 'ksb-004',
    requestNo: 'KSB-2026-08-012',
    shipId: 'ship-2',
    crewId: 'crew-10',
    crewName: 'Hendra Gunawan, C/E',
    rank: 'Chief Engineer',
    amount: 4000000,
    purpose: 'Kebutuhan keluarga darurat',
    requestDate: '2026-08-10',
    tenorMonths: 2,
    monthlyDeduction: 2000000,
    status: 'Lunas',
    approvals: {
      captainApproved: true,
      captainDate: '2026-08-11',
      financeApproved: true,
      financeDate: '2026-08-12',
      disbursedDate: '2026-08-12'
    },
    paidAmount: 4000000,
    remainingAmount: 0,
    paymentHistory: [
      { date: '2026-08-25', amount: 2000000, method: 'Potong Gaji Agustus' },
      { date: '2026-09-05', amount: 2000000, method: 'Transfer Mandiri Pelunasan Cepat' }
    ]
  }
];

// SERTIFIKAT CREW DENGAN STATUS EXPIRED / JATUH TEMPO
export const INITIAL_CREW_CERTIFICATES = [
  {
    id: 'cert-1',
    crewId: 'crew-1',
    crewName: 'Capt. Bambang Wijaya',
    certType: 'COC (Certificate of Competency)',
    certName: 'Master Mariner Class I (ANT-I)',
    certNo: 'ANT1-098234-JKT',
    issuingAuthority: 'Ditjen Hubla Kemenhub RI',
    issueDate: '2022-04-10',
    expiryDate: '2027-04-10',
    status: 'Aktif',
    daysToExpiry: 212,
    fileUrl: 'cert_ant1_bambang.pdf'
  },
  {
    id: 'cert-2',
    crewId: 'crew-2',
    crewName: 'Agus Setiawan, C/E',
    certType: 'COP (Proficiency)',
    certName: 'Advanced Fire Fighting (AFF)',
    certNo: 'AFF-882910-SUB',
    issuingAuthority: 'BP3IP Jakarta',
    issueDate: '2021-10-15',
    expiryDate: '2026-10-15',
    status: 'Due Soon (H-35)', // Mendekati jatuh tempo
    daysToExpiry: 35,
    fileUrl: 'cert_aff_agus.pdf'
  },
  {
    id: 'cert-3',
    crewId: 'crew-3',
    crewName: 'Rudi Hartono',
    certType: 'Medical',
    certName: 'Maritime Health Fitness Certificate (MCU)',
    certNo: 'MCU-BALUR-2025-912',
    issuingAuthority: 'Balai Kesehatan Kerja Pelayaran (BKKP)',
    issueDate: '2024-09-01',
    expiryDate: '2026-09-01',
    status: 'Expired', // Lewat 9 hari!
    daysToExpiry: -9,
    fileUrl: 'mcu_rudi_hartono.pdf'
  },
  {
    id: 'cert-4',
    crewId: 'crew-4',
    crewName: 'Faisal Basri',
    certType: 'COP (Proficiency)',
    certName: 'Survival Craft & Rescue Boats (SCRB)',
    certNo: 'SCRB-39102-ID',
    issuingAuthority: 'STIP Jakarta',
    issueDate: '2023-01-20',
    expiryDate: '2028-01-20',
    status: 'Aktif',
    daysToExpiry: 497,
    fileUrl: 'cert_scrb_faisal.pdf'
  },
  {
    id: 'cert-5',
    crewId: 'crew-5',
    crewName: 'Danang Prasetyo',
    certType: 'COP (Proficiency)',
    certName: 'Medical First Aid (MEFA)',
    certNo: 'MEFA-77210-SMG',
    issuingAuthority: 'Politeknik Ilmu Pelayaran Semarang',
    issueDate: '2021-11-05',
    expiryDate: '2026-11-05',
    status: 'Due Soon (H-56)',
    daysToExpiry: 56,
    fileUrl: 'cert_mefa_danang.pdf'
  }
];

// SURAT & DOKUMEN KAPAL LEGALITAS
export const INITIAL_SHIP_DOCUMENTS = [
  {
    id: 'doc-1',
    shipId: 'ship-1',
    shipName: 'MV Samudera Perkasa',
    docType: 'Statutory Certificate',
    docName: 'Safety Management Certificate (SMC / ISM Code)',
    certNo: 'SMC-IDN-2022-849',
    issuingAuthority: 'Biro Klasifikasi Indonesia (BKI)',
    issueDate: '2022-10-01',
    expiryDate: '2027-10-01',
    status: 'Aktif',
    daysToExpiry: 386,
    fileUrl: 'smc_samudera_perkasa.pdf'
  },
  {
    id: 'doc-2',
    shipId: 'ship-1',
    shipName: 'MV Samudera Perkasa',
    docType: 'Classification',
    docName: 'Class Hull & Machinery Certificate',
    certNo: 'BKI-HM-884210',
    issuingAuthority: 'Biro Klasifikasi Indonesia (BKI)',
    issueDate: '2021-10-10',
    expiryDate: '2026-10-10',
    status: 'Due Soon (H-30)', // Mendekati expired
    daysToExpiry: 30,
    fileUrl: 'class_hull_samudera.pdf'
  },
  {
    id: 'doc-3',
    shipId: 'ship-1',
    shipName: 'MV Samudera Perkasa',
    docType: 'Statutory Certificate',
    docName: 'International Load Line Certificate',
    certNo: 'LLC-2023-4412',
    issuingAuthority: 'Ditjen Hubla Kemenhub',
    issueDate: '2023-05-15',
    expiryDate: '2028-05-15',
    status: 'Aktif',
    daysToExpiry: 612,
    fileUrl: 'loadline_samudera.pdf'
  },
  {
    id: 'doc-4',
    shipId: 'ship-1',
    shipName: 'MV Samudera Perkasa',
    docType: 'Marpol Convention',
    docName: 'International Oil Pollution Prevention (IOPP)',
    certNo: 'IOPP-99231-JKT',
    issuingAuthority: 'Syahbandar Utama Tg. Priok',
    issueDate: '2021-08-20',
    expiryDate: '2026-08-20',
    status: 'Expired', // Lewat 21 hari!
    daysToExpiry: -21,
    fileUrl: 'iopp_cert_samudera.pdf'
  },
  {
    id: 'doc-5',
    shipId: 'ship-2',
    shipName: 'TB Nusantara VII',
    docType: 'Insurance',
    docName: 'P&I Club Protection & Indemnity Coverage',
    certNo: 'PI-NORTH-2026-041',
    issuingAuthority: 'NorthStandard P&I Club',
    issueDate: '2026-02-20',
    expiryDate: '2027-02-20',
    status: 'Aktif',
    daysToExpiry: 163,
    fileUrl: 'pi_club_tb_nusantara.pdf'
  },
  {
    id: 'doc-6',
    shipId: 'ship-3',
    shipName: 'SPOB Barito Star',
    docType: 'Statutory Certificate',
    docName: 'Cargo Ship Safety Construction Certificate',
    certNo: 'CSSC-BKI-2021-098',
    issuingAuthority: 'BKI Banjar',
    issueDate: '2021-09-05',
    expiryDate: '2026-09-05',
    status: 'Expired',
    daysToExpiry: -5,
    fileUrl: 'safety_construction_barito.pdf'
  }
];

// CUTI & DRILLS CREW
export const INITIAL_LEAVE_REQUESTS = [
  {
    id: 'lv-01',
    shipId: 'ship-1',
    crewId: 'crew-2',
    crewName: 'Agus Setiawan, C/E',
    startDate: '2026-10-01',
    endDate: '2026-10-15',
    totalDays: 14,
    reason: 'Cuti tahunan dan pembaruan sertifikat AFF di darat',
    status: 'Disetujui Fleet Manager',
    signOffPort: 'Tanjung Priok'
  },
  {
    id: 'lv-02',
    shipId: 'ship-1',
    crewId: 'crew-5',
    crewName: 'Danang Prasetyo',
    startDate: '2026-09-20',
    endDate: '2026-09-28',
    totalDays: 8,
    reason: 'Acara pernikahan adik kandung di Klaten',
    status: 'Menunggu Approval Fleet Manager',
    signOffPort: 'Panjang, Lampung'
  }
];

export const INITIAL_DRILLS = [
  {
    id: 'drl-01',
    shipId: 'ship-1',
    drillType: 'Abandon Ship Drill & Lifeboat Lowering',
    date: '2026-08-25',
    location: 'Anchorage Teluk Jakarta',
    participantsCount: 16,
    conductedBy: 'Capt. Bambang Wijaya',
    outcome: 'Satisfactory (Waktu muster 4 menit 10 detik, sekoci siap diluncurkan)',
    photoLog: 'drill_abandon_aug26.jpg'
  },
  {
    id: 'drl-02',
    shipId: 'ship-1',
    drillType: 'Engine Room Fire Drill & Emergency Foam System',
    date: '2026-09-03',
    location: 'Laut Jawa',
    participantsCount: 14,
    conductedBy: 'Chief Engineer Agus Setiawan',
    outcome: 'Satisfactory (Tim BA set siap dalam 2 menit, isolasi quick closing valve berhasil)',
    photoLog: 'drill_fire_sep26.jpg'
  }
];

// LOG NOTIFIKASI WHATSAPP & PUSH REMINDER
export const INITIAL_NOTIFICATION_LOGS = [
  {
    id: 'notif-1',
    timestamp: '2026-09-10 06:00:15 WIB',
    channel: 'WhatsApp Business API',
    recipientName: 'Capt. Bambang Wijaya (Nakhoda)',
    recipientPhone: '+6281298765432',
    targetItem: 'Sertifikat IOPP MV Samudera Perkasa',
    status: 'TERKIRIM (Delivered)',
    messageType: 'Critical Document Expired Alert',
    content: '⚠️ [URGENT PMS ALERT] Dokumen IOPP MV Samudera Perkasa telah EXPIRED sejak 20 Agustus 2026. Segera koordinasi perpanjangan dengan Syahbandar.'
  },
  {
    id: 'notif-2',
    timestamp: '2026-09-10 06:00:18 WIB',
    channel: 'WhatsApp Business API',
    recipientName: 'Agus Setiawan, C/E',
    recipientPhone: '+6281312345678',
    targetItem: 'Sertifikat COP AFF (H-35 Expiry)',
    status: 'DIBACA (Read)',
    messageType: 'Crew Certificate Renewal Reminder',
    content: '🔔 [REMINDER DOKUMEN CREW] Yth. Agus Setiawan, C/E. Sertifikat AFF Anda akan jatuh tempo dalam 35 hari (15 Oktober 2026). Mohon siapkan jadwal renewal kursus.'
  },
  {
    id: 'notif-3',
    timestamp: '2026-09-09 06:00:10 WIB',
    channel: 'WhatsApp Business API',
    recipientName: 'Rudi Hartono (2nd Engineer)',
    recipientPhone: '+6285288991122',
    targetItem: 'Work Order Overdue: Pompa Bilge (WO-2026-09-001)',
    status: 'TERKIRIM (Delivered)',
    messageType: 'Maintenance Overdue Alert',
    content: '⚙️ [PMS MAINTENANCE OVERDUE] Work Order WO-2026-09-001 (Pompa Bilge ME) melebihi 120 jam operasional. Harap eksekusi pergantian seal segera.'
  },
  {
    id: 'notif-4',
    timestamp: '2026-09-04 14:30:00 WIB',
    channel: 'WhatsApp Business API',
    recipientName: 'Joko Susilo (Bosun)',
    recipientPhone: '+6281356781290',
    targetItem: 'Pencairan Kasbon Rp 3.500.000',
    status: 'DIBACA (Read)',
    messageType: 'Finance Cash Advance Notification',
    content: '💵 [KASBON DISETUJUI] Pengajuan Kasbon No. KSB-2026-09-001 sebesar Rp 3.500.000 telah dicairkan oleh Finance. Pemotongan gaji Rp 1.166.667 x 3 bulan.'
  }
];

// DATA BIAYA & BUDGET (COST MANAGEMENT)
export const INITIAL_COST_DATA = {
  monthlyBudget: 250000000, // Rp 250 Juta per bulan fleet
  actualSpareparts: 84500000, // Rp 84.5 Juta
  actualMaintenanceServices: 95000000, // Rp 95 Juta
  actualDockingDrydock: 45000000, // Rp 45 Juta
  totalActual: 224500000,
  variance: 25500000, // Hemat Rp 25.5 Juta
  breakdownByShip: [
    { shipName: 'MV Samudera Perkasa', budget: 120000000, actual: 98000000, status: 'Under Budget' },
    { shipName: 'TB Nusantara VII', budget: 50000000, actual: 38500000, status: 'Under Budget' },
    { shipName: 'SPOB Barito Star', budget: 80000000, actual: 88000000, status: 'Over Budget' }
  ]
};
