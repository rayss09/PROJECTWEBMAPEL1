var $ = function (id) { return document.getElementById(id); };

// Sapaan sesuai jam di perangkat
var jam = new Date().getHours();
var waktu = "malam";
if (jam >= 4 && jam < 11) waktu = "pagi";
else if (jam >= 11 && jam < 15) waktu = "siang";
else if (jam >= 15 && jam < 18) waktu = "sore";
$("salam").textContent = "Selamat " + waktu + "! 👋";

// Jumlah bab yang sudah ditandai selesai (disimpan oleh halaman materi)
try {
  var selesai = JSON.parse(localStorage.getItem("ipa-selesai") || "{}");
  $("jumlah").textContent = Object.keys(selesai).length;
} catch (e) {}

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
