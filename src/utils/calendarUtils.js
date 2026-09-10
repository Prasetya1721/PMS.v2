// ==========================================================================
// UTILITY: GOOGLE CALENDAR LINK & ICS EXPORT GENERATOR
// ==========================================================================

/**
 * Format tanggal YYYY-MM-DD ke format Google Calendar all-day: YYYYMMDD/YYYYMMDD
 */
export function formatGoogleCalendarDates(startDateStr, endDateStr) {
  if (!startDateStr) {
    const now = new Date();
    startDateStr = now.toISOString().split('T')[0];
  }
  const cleanStart = startDateStr.replace(/-/g, '');
  
  // Jika all-day event, Google Calendar membutuhkan tanggal akhir +1 hari
  let cleanEnd = cleanStart;
  if (endDateStr) {
    cleanEnd = endDateStr.replace(/-/g, '');
  } else {
    try {
      const d = new Date(startDateStr);
      d.setDate(d.getDate() + 1);
      cleanEnd = d.toISOString().split('T')[0].replace(/-/g, '');
    } catch {
      cleanEnd = cleanStart;
    }
  }

  return `${cleanStart}/${cleanEnd}`;
}

/**
 * Generate URL resmi Google Calendar Template untuk menambah event langsung
 */
export function createGoogleCalendarUrl({ title, details = '', location = '', startDate, endDate }) {
  const dates = formatGoogleCalendarDates(startDate, endDate);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: dates,
    details: details,
    location: location
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Buka Google Calendar di tab baru dengan detail jadwal PMS
 */
export function openGoogleCalendarEvent(eventData) {
  const url = createGoogleCalendarUrl(eventData);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Ekspor kumpulan jadwal PMS ke format file .ICS (iCalendar standar RFC 5545)
 * Kompatibel dengan Google Calendar Import, Apple Calendar, dan Microsoft Outlook.
 */
export function exportIcsCalendar(events, filename = 'pms_fleet_schedule.ics') {
  if (!events || !events.length) return;

  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const vEvents = events.map((ev) => {
    const start = ev.date.replace(/-/g, '');
    const d = new Date(ev.date);
    d.setDate(d.getDate() + 1);
    const end = d.toISOString().split('T')[0].replace(/-/g, '');
    const uid = `pms-${ev.id || Math.random().toString(36).substring(2, 9)}@pms-maritim.id`;

    return `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}
DTSTART;VALUE=DATE:${start}
DTEND;VALUE=DATE:${end}
SUMMARY:${escapeIcsText(ev.title)}
DESCRIPTION:${escapeIcsText(ev.details || '')}
LOCATION:${escapeIcsText(ev.location || 'Armada Kapal')}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Pengingat PMS: ${escapeIcsText(ev.title)}
END:VALARM
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:Peringatan H-7 PMS: ${escapeIcsText(ev.title)}
END:VALARM
END:VEVENT`;
  }).join('\n');

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sistem PMS Kapal//Google Calendar Integration//ID
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Jadwal PMS & Kelaiklautan Kapal
X-WR-TIMEZONE:Asia/Jakarta
${vEvents}
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeIcsText(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}
