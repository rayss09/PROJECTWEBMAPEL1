var $ = function (id) { return document.getElementById(id); };

// Sapaan sesuai jam di perangkat
var jam = new Date().getHours();
var waktu = "malam";
if (jam >= 4 && jam < 11) waktu = "pagi";
else if (jam >= 11 && jam < 15) waktu = "siang";
else if (jam >= 15 && jam < 18) waktu = "sore";
$("salam").textContent = "Selamat " + waktu + "! 👋";

// Nama bab utama Fisika kelas XI
var namaBab = {
  "xi-vektor": "Vektor",
  "xi-kinematika": "Kinematika",
  "xi-dinamika": "Dinamika Gerak Partikel",
  "xi-fluida": "Fluida",
  "xi-gelombang": "Gelombang, Bunyi, dan Cahaya"
};

function tampilkanProgresFisika() {
  var jumlah = 0;
  var babTerakhir = null;

  try {
    var progres = JSON.parse(localStorage.getItem("materi-fisika-xi-v2") || "{}");
    var riwayat = JSON.parse(localStorage.getItem("materi-fisika-xi-history-v1") || "{}");

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
    // Beranda tetap dapat dibuka jika penyimpanan browser tidak tersedia.
  }

  $("jumlah").textContent = jumlah;

  var infoTerakhir = $("babTerakhir");
  if (infoTerakhir) {
    if (!babTerakhir) {
      infoTerakhir.textContent = "Bab terakhir selesai: belum ada";
    } else {
      var tanggal = babTerakhir.waktu
        ? new Date(babTerakhir.waktu).toLocaleDateString("id-ID", {
            day: "numeric", month: "long", year: "numeric"
          })
        : "tanggal belum tercatat";
      infoTerakhir.textContent = "Bab terakhir selesai: " + babTerakhir.nama + " · " + tanggal;
    }
  }
}

tampilkanProgresFisika();

// Perbarui angka ketika pengguna kembali ke tab beranda.
window.addEventListener("focus", tampilkanProgresFisika);
window.addEventListener("storage", tampilkanProgresFisika);

// Tombol emas: kutipan semangat acak
var kutipan = [
  "Sedikit demi sedikit, lama-lama menjadi bukit.",
  "Belajar hari ini, lega di hari ujian.",
  "Kamu tidak harus sempurna, cukup mulai.",
  "Rumus bisa dihafal, tapi paham itu lebih awet.",
  "Istirahat sebentar boleh, menyerah jangan."
];
var terakhir = -1;
$("semangat").addEventListener("click", function () {
  var i;
  do { i = Math.floor(Math.random() * kutipan.length); } while (i === terakhir);
  terakhir = i;
  var p = $("pesan");
  p.textContent = kutipan[i];
  p.classList.remove("muncul");
  void p.offsetWidth;
  p.classList.add("muncul");
});
