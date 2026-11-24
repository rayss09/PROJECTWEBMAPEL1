```javascript
var $ = function (id) {
  return document.getElementById(id);
};

// ================================
// SAPAAN SESUAI WAKTU
// ================================
var jam = new Date().getHours();
var waktu = "malam";

if (jam >= 4 && jam < 11) waktu = "pagi";
else if (jam >= 11 && jam < 15) waktu = "siang";
else if (jam >= 15 && jam < 18) waktu = "sore";

var elemenSalam = $("salam");

if (elemenSalam) {
  elemenSalam.textContent = "Selamat " + waktu + "! 👋";
}

// ================================
// NAMA BAB FISIKA KELAS XI
// ================================
var namaBab = {
  "xi-vektor": "Vektor",
  "xi-kinematika": "Kinematika",
  "xi-dinamika": "Dinamika Gerak Partikel",
  "xi-fluida": "Fluida",
  "xi-gelombang": "Gelombang, Bunyi, dan Cahaya"
};

// ================================
// NAMA BAB KIMIA KELAS XI
// ================================
var namaBabKimia = {
  "kimia-struktur-atom": "Struktur Atom dan Sistem Periodik",
  "kimia-ikatan": "Ikatan Kimia",
  "kimia-stoikiometri": "Stoikiometri",
  "kimia-hidrokarbon": "Hidrokarbon",
  "kimia-termokimia": "Termokimia",
  "kimia-laju-reaksi": "Laju Reaksi",
  "kimia-kesetimbangan": "Kesetimbangan Kimia"
};

// ================================
// PROGRES FISIKA
// ================================
function tampilkanProgresFisika() {
  var jumlah = 0;
  var babTerakhir = null;

  try {
    var progres = JSON.parse(
      localStorage.getItem("materi-fisika-xi-v2") || "{}"
    );

    var riwayat = JSON.parse(
      localStorage.getItem("materi-fisika-xi-history-v1") || "{}"
    );

    Object.keys(namaBab).forEach(function (id) {
      if (progres[id] === true) {
        jumlah++;

        var waktuSelesai = Number(riwayat[id]) || 0;

        if (!babTerakhir || waktuSelesai > babTerakhir.waktu) {
          babTerakhir = {
            id: id,
            nama: namaBab[id],
            waktu: waktuSelesai
          };
        }
      }
    });

  } catch (e) {
    // Beranda tetap berjalan jika penyimpanan tidak tersedia.
  }

  // Tampilkan jumlah bab jika elemennya tersedia
  var elemenJumlah = $("jumlah");

  if (elemenJumlah) {
    elemenJumlah.textContent = jumlah;
  }

  // Tampilkan bab terakhir
  var infoTerakhir = $("babTerakhir");

  if (infoTerakhir) {
    if (!babTerakhir) {
      infoTerakhir.textContent = "Bab terakhir selesai: belum ada";
    } else {
      var tanggal = babTerakhir.waktu
        ? new Date(babTerakhir.waktu).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        : "tanggal belum tercatat";

      infoTerakhir.textContent =
        "Bab terakhir selesai: " +
        babTerakhir.nama +
        " · " +
        tanggal;
    }
  }
}

// ================================
// PROGRES KIMIA
// ================================
function tampilkanProgresKimia() {
  var jumlah = 0;

  try {
    var progres = JSON.parse(
      localStorage.getItem("materi-kimia-xi-v1") || "{}"
    );

    Object.keys(namaBabKimia).forEach(function (id) {
      if (progres[id] === true) {
        jumlah++;
      }
    });

  } catch (e) {
    // Progres tetap aman jika penyimpanan tidak tersedia.
  }

  var elemenKimia = $("jumlahKimia");

  if (elemenKimia) {
    elemenKimia.textContent = jumlah;
  }
}

// ================================
// TAMPILKAN SEMUA PROGRES
// ================================
function tampilkanSemuaProgres() {
  tampilkanProgresFisika();
  tampilkanProgresKimia();
}

tampilkanSemuaProgres();

// Perbarui ketika kembali ke halaman
window.addEventListener("focus", tampilkanSemuaProgres);
window.addEventListener("storage", tampilkanSemuaProgres);

// ================================
// TOMBOL SEMANGAT
// ================================
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

    // Hindari kutipan yang sama secara berurutan
    do {
      i = Math.floor(Math.random() * kutipan.length);
    } while (i === terakhir);

    terakhir = i;

    // Tampilkan pesan
    tempatPesan.textContent = kutipan[i];

    // Ulangi animasi setiap tombol ditekan
    tempatPesan.classList.remove("muncul");
    void tempatPesan.offsetWidth;
    tempatPesan.classList.add("muncul");
  });
}
```
