import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SHIPS,
  INITIAL_EQUIPMENT,
  INITIAL_WORK_ORDERS,
  INITIAL_SPAREPARTS,
  INITIAL_CREW,
  INITIAL_ATTENDANCE,
  INITIAL_KASBON,
  INITIAL_CREW_CERTIFICATES,
  INITIAL_SHIP_DOCUMENTS,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_DRILLS,
  INITIAL_NOTIFICATION_LOGS,
  INITIAL_COST_DATA
} from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Local storage helper
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`pms_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [selectedShip, setSelectedShip] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [ships, setShips] = useState(() => loadState('ships', INITIAL_SHIPS));
  const [equipment, setEquipment] = useState(() => loadState('equipment', INITIAL_EQUIPMENT));
  const [workOrders, setWorkOrders] = useState(() => loadState('workOrders', INITIAL_WORK_ORDERS));
  const [spareparts, setSpareparts] = useState(() => loadState('spareparts', INITIAL_SPAREPARTS));
  const [crew, setCrew] = useState(() => loadState('crew', INITIAL_CREW));
  const [attendance, setAttendance] = useState(() => loadState('attendance', INITIAL_ATTENDANCE));
  const [kasbon, setKasbon] = useState(() => loadState('kasbon', INITIAL_KASBON));
  const [certificates, setCertificates] = useState(() => loadState('certificates', INITIAL_CREW_CERTIFICATES));
  const [shipDocuments, setShipDocuments] = useState(() => loadState('shipDocuments', INITIAL_SHIP_DOCUMENTS));
  const [leaveRequests, setLeaveRequests] = useState(() => loadState('leaveRequests', INITIAL_LEAVE_REQUESTS));
  const [drills, setDrills] = useState(() => loadState('drills', INITIAL_DRILLS));
  const [notifications, setNotifications] = useState(() => loadState('notifications', INITIAL_NOTIFICATION_LOGS));
  const [costData, setCostData] = useState(() => loadState('costData', INITIAL_COST_DATA));

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pms_ships', JSON.stringify(ships));
    localStorage.setItem('pms_equipment', JSON.stringify(equipment));
    localStorage.setItem('pms_workOrders', JSON.stringify(workOrders));
    localStorage.setItem('pms_spareparts', JSON.stringify(spareparts));
    localStorage.setItem('pms_crew', JSON.stringify(crew));
    localStorage.setItem('pms_attendance', JSON.stringify(attendance));
    localStorage.setItem('pms_kasbon', JSON.stringify(kasbon));
    localStorage.setItem('pms_certificates', JSON.stringify(certificates));
    localStorage.setItem('pms_shipDocuments', JSON.stringify(shipDocuments));
    localStorage.setItem('pms_leaveRequests', JSON.stringify(leaveRequests));
    localStorage.setItem('pms_drills', JSON.stringify(drills));
    localStorage.setItem('pms_notifications', JSON.stringify(notifications));
  }, [ships, equipment, workOrders, spareparts, crew, attendance, kasbon, certificates, shipDocuments, leaveRequests, drills, notifications]);

  // Helper: Update Running Hours
  const updateRunningHours = (eqId, newHours, notes = '') => {
    setEquipment(prev => prev.map(eq => {
      if (eq.id === eqId) {
        const hoursNum = parseInt(newHours, 10);
        const hoursDiff = eq.nextServiceHours - hoursNum;
        let newStatus = 'Normal';
        if (hoursDiff <= 0) {
          newStatus = 'Overdue';
        } else if (hoursDiff <= 100) {
          newStatus = 'Due Soon';
        }

        return {
          ...eq,
          currentHours: hoursNum,
          status: newStatus
        };
      }
      return eq;
    }));

    showToast(`Running hours equipment berhasil diperbarui ke ${newHours} Jam.`, 'success');
  };

  // Helper: Add Work Order
  const addWorkOrder = (newWo) => {
    setWorkOrders(prev => [newWo, ...prev]);
    showToast(`Work Order ${newWo.woNumber} berhasil dibuat dan ditugaskan.`, 'success');
  };

  // Helper: Toggle Checklist
  const toggleChecklistItem = (woId, checklistId) => {
    setWorkOrders(prev => prev.map(wo => {
      if (wo.id === woId) {
        const updatedChecklist = wo.checklist.map(item => 
          item.id === checklistId ? { ...item, done: !item.done } : item
        );
        return { ...wo, checklist: updatedChecklist };
      }
      return wo;
    }));
  };

  // Helper: Complete Work Order
  const completeWorkOrder = (woId) => {
    setWorkOrders(prev => prev.map(wo => {
      if (wo.id === woId) {
        return {
          ...wo,
          status: 'Completed',
          completedDate: new Date().toISOString().split('T')[0]
        };
      }
      return wo;
    }));
    showToast(`Work Order berhasil diselesaikan dan dicatat ke logbook maintenance!`, 'success');
  };

  // Helper: Modul Absensi - Catat Presensi Baru
  const addAttendanceRecord = (record) => {
    const newRecord = {
      id: `att-${Date.now()}`,
      date: record.date || new Date().toISOString().split('T')[0],
      ...record
    };
    setAttendance(prev => [newRecord, ...prev]);
    showToast(`Presensi ${record.crewName} (${record.status}) berhasil dicatat.`, 'success');
  };

  // Helper: Modul Kasbon - Ajukan Kasbon Baru
  const addKasbonRequest = (data) => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const amountNum = parseFloat(data.amount) || 0;
    const tenorNum = parseInt(data.tenorMonths, 10) || 1;
    const monthlyDed = Math.round(amountNum / tenorNum);

    const newKasbon = {
      id: `ksb-${Date.now()}`,
      requestNo: `KSB-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${randomSuffix}`,
      shipId: data.shipId,
      crewId: data.crewId,
      crewName: data.crewName,
      rank: data.rank,
      amount: amountNum,
      purpose: data.purpose,
      requestDate: new Date().toISOString().split('T')[0],
      tenorMonths: tenorNum,
      monthlyDeduction: monthlyDed,
      status: 'Menunggu Persetujuan Nakhoda',
      approvals: {
        captainApproved: false,
        captainDate: null,
        financeApproved: false,
        financeDate: null,
        disbursedDate: null
      },
      paidAmount: 0,
      remainingAmount: amountNum,
      paymentHistory: []
    };

    setKasbon(prev => [newKasbon, ...prev]);
    showToast(`Pengajuan Kasbon Rp ${amountNum.toLocaleString('id-ID')} untuk ${data.crewName} berhasil diajukan.`, 'success');
  };

  // Kasbon Approval by Captain
  const approveKasbonCaptain = (kasbonId) => {
    setKasbon(prev => prev.map(k => {
      if (k.id === kasbonId) {
        return {
          ...k,
          status: 'Disetujui Nakhoda (Menunggu Finance)',
          approvals: {
            ...k.approvals,
            captainApproved: true,
            captainDate: new Date().toISOString().split('T')[0]
          }
        };
      }
      return k;
    }));
    showToast('Kasbon telah disetujui oleh Nakhoda dan diteruskan ke Departemen Finance.', 'success');
  };

  // Kasbon Approval by Finance
  const approveKasbonFinance = (kasbonId) => {
    setKasbon(prev => prev.map(k => {
      if (k.id === kasbonId) {
        return {
          ...k,
          status: 'Disetujui Finance / Siap Cair',
          approvals: {
            ...k.approvals,
            financeApproved: true,
            financeDate: new Date().toISOString().split('T')[0]
          }
        };
      }
      return k;
    }));
    showToast('Persetujuan Finance berhasil. Kasbon siap untuk dicairkan / transfer.', 'success');
  };

  // Disburse Kasbon
  const disburseKasbon = (kasbonId) => {
    let target = null;
    setKasbon(prev => prev.map(k => {
      if (k.id === kasbonId) {
        target = k;
        return {
          ...k,
          status: 'Dicairkan',
          approvals: {
            ...k.approvals,
            disbursedDate: new Date().toISOString().split('T')[0]
          }
        };
      }
      return k;
    }));

    if (target) {
      // Auto trigger notification log
      const logEntry = {
        id: `notif-${Date.now()}`,
        timestamp: `${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID')} WIB`,
        channel: 'WhatsApp Business API',
        recipientName: target.crewName,
        recipientPhone: '+628123456789',
        targetItem: `Pencairan Kasbon ${target.requestNo}`,
        status: 'TERKIRIM (Delivered)',
        messageType: 'Cash Advance Disbursed',
        content: `💵 [KASBON DICAIRKAN] Kasbon ${target.requestNo} senilai Rp ${target.amount.toLocaleString('id-ID')} telah ditransfer ke rekening ${target.crewName}. Potongan gaji Rp ${target.monthlyDeduction.toLocaleString('id-ID')}/bulan.`
      };
      setNotifications(prev => [logEntry, ...prev]);
    }

    showToast('Dana Kasbon berhasil dicairkan! Notifikasi WhatsApp otomatis terkirim ke Crew.', 'success');
  };

  // Record Kasbon Payment
  const recordKasbonPayment = (kasbonId, payAmount, method = 'Potong Gaji Bulanan') => {
    const payNum = parseFloat(payAmount) || 0;
    setKasbon(prev => prev.map(k => {
      if (k.id === kasbonId) {
        const newPaid = k.paidAmount + payNum;
        const newRemaining = Math.max(0, k.amount - newPaid);
        const isLunas = newRemaining <= 0;
        const newHistory = [
          ...k.paymentHistory,
          {
            date: new Date().toISOString().split('T')[0],
            amount: payNum,
            method: method
          }
        ];
        return {
          ...k,
          paidAmount: newPaid,
          remainingAmount: newRemaining,
          status: isLunas ? 'Lunas' : 'Dicairkan (Dalam Cicilan)',
          paymentHistory: newHistory
        };
      }
      return k;
    }));
    showToast(`Pembayaran potongan kasbon Rp ${payNum.toLocaleString('id-ID')} berhasil dicatat.`, 'success');
  };

  // Restock / Requisition
  const requestSparepartStock = (partId, addQty) => {
    const qtyNum = parseInt(addQty, 10) || 0;
    setSpareparts(prev => prev.map(sp => {
      if (sp.id === partId) {
        const newTotal = sp.stockQty + qtyNum;
        return {
          ...sp,
          stockQty: newTotal,
          status: newTotal >= sp.minQty ? 'Safe' : 'Low'
        };
      }
      return sp;
    }));
    showToast(`Stok sparepart berhasil ditambah (+${qtyNum} Pcs).`, 'success');
  };

  // WhatsApp Simulation Trigger
  const sendSimulatedWhatsApp = (recipientName, recipientPhone, messageType, content) => {
    const newLog = {
      id: `notif-${Date.now()}`,
      timestamp: `${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID')} WIB`,
      channel: 'WhatsApp Business API',
      recipientName,
      recipientPhone,
      targetItem: messageType,
      status: 'TERKIRIM (Delivered)',
      messageType,
      content
    };

    setNotifications(prev => [newLog, ...prev]);
    showToast(`Simulasi pesan WhatsApp berhasil dikirimkan ke ${recipientName}!`, 'success');
  };

  // CSV Export Utility
  const exportToCsv = (rows, filename = 'pms_report.csv') => {
    if (!rows || !rows.length) {
      showToast('Tidak ada data untuk diekspor.', 'warning');
      return;
    }
    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(h => `"${String(row[h] || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`File ${filename} berhasil diunduh.`, 'success');
  };

  return (
    <AppContext.Provider value={{
      selectedShip,
      setSelectedShip,
      activeTab,
      setActiveTab,
      ships,
      equipment,
      workOrders,
      spareparts,
      crew,
      attendance,
      kasbon,
      certificates,
      shipDocuments,
      leaveRequests,
      drills,
      notifications,
      costData,
      toast,
      showToast,
      updateRunningHours,
      addWorkOrder,
      toggleChecklistItem,
      completeWorkOrder,
      addAttendanceRecord,
      addKasbonRequest,
      approveKasbonCaptain,
      approveKasbonFinance,
      disburseKasbon,
      recordKasbonPayment,
      requestSparepartStock,
      sendSimulatedWhatsApp,
      exportToCsv
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
