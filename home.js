
var $ = function (id) {
  return document.getElementById(id);
};

// =====================================
// SAPAAN SESUAI WAKTU
// =====================================
var jam = new Date().getHours();
var waktu = "malam";

if (jam >= 4 && jam < 11) waktu = "pagi";
else if (jam >= 11 && jam < 15) waktu = "siang";
else if (jam >= 15 && jam < 18) waktu = "sore";

var elemenSalam = $("salam");

if (elemenSalam) {
  elemenSalam.textContent = "Selamat " + waktu + "! 👋";
}

// =====================================
// NAMA BAB FISIKA
// =====================================
var namaBab = {
  "xi-vektor": "Vektor",
  "xi-kinematika": "Kinematika",
  "xi-dinamika": "Dinamika Gerak Partikel",
  "xi-fluida": "Fluida",
  "xi-gelombang": "Gelombang, Bunyi, dan Cahaya"
};

// =====================================
// NAMA BAB KIMIA
// =====================================
var namaBabKimia = {
  "kimia-struktur-atom": "Struktur Atom dan Sistem Periodik",
  "kimia-ikatan": "Ikatan Kimia",
  "kimia-stoikiometri": "Stoikiometri",
  "kimia-hidrokarbon": "Hidrokarbon",
  "kimia-termokimia": "Termokimia",
  "kimia-laju-reaksi": "Laju Reaksi",
  "kimia-kesetimbangan": "Kesetimbangan Kimia"
};

// =====================================
// NAMA BAB MATEMATIKA
// (Sesuaikan ID dengan halaman matematika)
// =====================================
var namaBabMatematika = {};

// =====================================
// NAMA BAB BIOLOGI
// (Sesuaikan ID dengan halaman biologi)
// =====================================
var namaBabBiologi = {};

// =====================================
// PENGATUR PROGRES SEMUA MAPEL
// =====================================
var daftarMapel = [
  {
    nama: "Fisika",
    progresKey: "materi-fisika-xi-v2",
    riwayatKey: "materi-fisika-xi-history-v1",
    bab: namaBab
  },
  {
    nama: "Kimia",
    progresKey: "materi-kimia-xi-v1",
    riwayatKey: "materi-kimia-xi-history-v1",
    bab: namaBabKimia
  },
  {
    nama: "Matematika",
    progresKey: "materi-matematika-xi-v1",
    riwayatKey: "materi-matematika-xi-history-v1",
    bab: namaBabMatematika
  },
  {
    nama: "Biologi",
    progresKey: "materi-biologi-xi-v1",
    riwayatKey: "materi-biologi-xi-history-v1",
    bab: namaBabBiologi
  }
];

// =====================================
// TAMPILKAN BAB TERAKHIR SEMUA MAPEL
// =====================================
function tampilkanBabTerakhir() {
  var babTerakhir = null;

  daftarMapel.forEach(function (mapel) {
    try {
      var progres = JSON.parse(
        localStorage.getItem(mapel.progresKey) || "{}"
      );

      var riwayat = JSON.parse(
        localStorage.getItem(mapel.riwayatKey) || "{}"
      );

      Object.keys(mapel.bab).forEach(function (id) {
        if (progres[id] === true) {
          var waktuSelesai = Number(riwayat[id]) || 0;

          if (
            !babTerakhir ||
            waktuSelesai > babTerakhir.waktu
          ) {
            babTerakhir = {
              mapel: mapel.nama,
              nama: mapel.bab[id],
              waktu: waktuSelesai
            };
          }
        }
      });

    } catch (e) {
      // Jika data mapel bermasalah, mapel lain tetap dibaca.
    }
  });

  var infoTerakhir = $("babTerakhir");

  if (!infoTerakhir) return;

  if (!babTerakhir) {
    infoTerakhir.textContent =
      "Bab terakhir selesai: belum ada";
    return;
  }

  var tanggal = babTerakhir.waktu
    ? new Date(babTerakhir.waktu).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    : "tanggal belum tercatat";

  infoTerakhir.textContent =
    "Bab terakhir selesai: " +
    babTerakhir.mapel +
    " — " +
    babTerakhir.nama +
    " · " +
    tanggal;
}

// =====================================
// HITUNG PROGRES FISIKA
// =====================================
function tampilkanProgresFisika() {
  var jumlah = 0;

  try {
    var progres = JSON.parse(
      localStorage.getItem("materi-fisika-xi-v2") || "{}"
    );

    Object.keys(namaBab).forEach(function (id) {
      if (progres[id] === true) jumlah++;
    });
  } catch (e) {}

  var elemenJumlah = $("jumlah");

  if (elemenJumlah) {
    elemenJumlah.textContent = jumlah;
  }
}

// =====================================
// HITUNG PROGRES KIMIA
// =====================================
function tampilkanProgresKimia() {
  var jumlah = 0;

  try {
    var progres = JSON.parse(
      localStorage.getItem("materi-kimia-xi-v1") || "{}"
    );

    Object.keys(namaBabKimia).forEach(function (id) {
      if (progres[id] === true) jumlah++;
    });
  } catch (e) {}

  var elemenKimia = $("jumlahKimia");

  if (elemenKimia) {
    elemenKimia.textContent = jumlah;
  }
}

// =====================================
// TAMPILKAN SEMUA PROGRES
// =====================================
function tampilkanSemuaProgres() {
  tampilkanProgresFisika();
  tampilkanProgresKimia();
  tampilkanBabTerakhir();
}

tampilkanSemuaProgres();

window.addEventListener("focus", tampilkanSemuaProgres);
window.addEventListener("storage", tampilkanSemuaProgres);

// =====================================
// TOMBOL SEMANGAT
// =====================================
var kutipan = [
  "✨ Sedikit demi sedikit, lama-lama menjadi bukit.",
  "📚 Belajar hari ini, lega di hari ujian.",
  "🌷 Kamu tidak harus sempurna, cukup mulai.",
  "🧠 Rumus bisa dihafal, tapi paham itu lebih awet.",
  "☀️ Istirahat sebentar boleh, menyerah jangan.",
  "🌱 Proses kecil hari ini adalah kemajuan besar esok hari.",
  "💡 Jangan takut salah, karena dari kesalahan kita belajar.",
  "🎯 Fokus pada tujuanmu, bukan pada seberapa cepat orang lain.",
  "🚀 Kamu lebih mampu daripada yang kamu kira.",
  "🌟 Satu halaman yang kamu pelajari hari ini tetap sebuah kemajuan.",
  "💪 Tidak perlu langsung bisa, yang penting jangan berhenti mencoba.",
  "🍀 Setiap usaha kecilmu hari ini akan berarti di kemudian hari.",
  "📖 Pelan-pelan saja, kamu sedang bertumbuh.",
  "🔥 Kesulitan hari ini bisa menjadi kekuatanmu di masa depan.",
  "🌻 Percayalah pada proses yang sedang kamu jalani."
];

var terakhir = -1;

var tombolSemangat = $("semangat");
var tempatPesan = $("pesan");

if (tombolSemangat && tempatPesan) {
  tombolSemangat.addEventListener("click", function () {
    var i;

    do {
      i = Math.floor(Math.random() * kutipan.length);
    } while (i === terakhir);

    terakhir = i;

    tempatPesan.textContent = kutipan[i];

    tempatPesan.classList.remove("muncul");
    void tempatPesan.offsetWidth;
    tempatPesan.classList.add("muncul");
  });
}
