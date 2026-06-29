/* ============================================================
   script.js — Tugas Akhir Web Server
   Jam digital timezone Asia/Makassar (WITA, UTC+8)
   ============================================================ */

(function () {
  'use strict';

  // Nama hari dan bulan dalam Bahasa Indonesia
  var HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var BULAN = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Pad angka jadi 2 digit
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  // Ambil waktu sekarang dalam timezone Asia/Makassar
  function getNow() {
    var now = new Date();
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Makassar',
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      weekday: 'narrow',  // hanya untuk index
      year:   'numeric',
      month:  '2-digit',
      day:    '2-digit'
    }).formatToParts(now);

    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });

    return {
      hours:   parseInt(map.hour,  10),
      minutes: parseInt(map.minute, 10),
      seconds: parseInt(map.second, 10),
      // Untuk tanggal, ambil via offset manual: WITA = UTC+8
      date: new Date(now.getTime() + 8 * 60 * 60 * 1000)
    };
  }

  // Format waktu HH:MM:SS
  function formatTime(t) {
    return pad(t.hours) + ':' + pad(t.minutes) + ':' + pad(t.seconds);
  }

  // Format tanggal lengkap
  function formatDate(t) {
    var d = t.date;
    // getUTC karena sudah di-offset ke WITA
    var hari  = HARI[d.getUTCDay()];
    var tgl   = d.getUTCDate();
    var bulan = BULAN[d.getUTCMonth()];
    var tahun = d.getUTCFullYear();
    return hari + ', ' + tgl + ' ' + bulan + ' ' + tahun;
  }

  // Elemen
  var elClock        = document.getElementById('clock');
  var elTerminalTime = document.getElementById('terminal-time');
  var elTerminalDate = document.getElementById('terminal-date');

  function tick() {
    var t = getNow();
    var timeStr = formatTime(t);
    var dateStr = formatDate(t);

    if (elClock)        elClock.textContent        = timeStr;
    if (elTerminalTime) elTerminalTime.textContent  = timeStr;
    if (elTerminalDate) elTerminalDate.textContent  = dateStr;
  }

  // Jalankan langsung, lalu setiap 1 detik
  tick();
  setInterval(tick, 1000);

})();
