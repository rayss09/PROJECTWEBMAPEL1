// Warna dan nama tiap mapel. Kunci harus sama dengan di file data/*.js
var MAPEL = {
  biologi: { nama: "Biologi", warna: "#a3263f" },
  fisika:  { nama: "Fisika",  warna: "#8e2a52" },
  kimia:   { nama: "Kimia",   warna: "#b4443c" }
};
var mapel = "biologi", sem = "1";
var selesai = {};
try { selesai = JSON.parse(localStorage.getItem("ipa-selesai") || "{}"); } catch (e) {}
var $ = function (id) { return document.getElementById(id); };

function tombol(teks, data, aktif, warna, kecil) {
  return '<button class="tab' + (kecil ? ' kecil' : '') + (aktif ? ' on' : '') +
    '" style="--ac:' + warna + '" ' + data + '>' + teks + '</button>';
}

function menu() {
  var w = MAPEL[mapel].warna;
  $("mapel").innerHTML = Object.keys(MAPEL).map(function (k) {
    return tombol(MAPEL[k].nama, 'data-mapel="' + k + '"', k === mapel, MAPEL[k].warna);
  }).join("");
  $("semester").innerHTML = ["1", "2"].map(function (s) {
    return tombol("Semester " + s, 'data-sem="' + s + '"', s === sem, w, true);
  }).join("");
}

function tampil() {
  var m = MAPEL[mapel], q = $("cari").value.toLowerCase();
  var data = (window.MATERI && MATERI[mapel] && MATERI[mapel][sem]) || [];
  var html = "", sudah = 0;

  data.forEach(function (bab, i) {
    var id = mapel + "-" + sem + "-" + i;
    if (selesai[id]) sudah++;
    var teks = (bab.judul + (bab.ringkasan || "") + JSON.stringify(bab.rumus || [])).toLowerCase();
    if (q && teks.indexOf(q) < 0) return;

    html += '<article class="card' + (selesai[id] ? ' done' : '') + '" style="--ac:' + m.warna + '">' +
      '<div class="tag">' + m.nama + ' · Semester ' + sem + ' · Bab ' + (i + 1) + '</div>' +
      '<h2>' + bab.judul + '</h2>' +
      (bab.ringkasan ? '<p>' + bab.ringkasan + '</p>' : '') +
      (bab.poin ? '<ul>' + bab.poin.map(function (p) { return '<li>' + p + '</li>'; }).join("") + '</ul>' : '') +
      (bab.rumus || []).map(function (r) {
        return '<div class="f"><small>' + r[0] + '</small><code>' + r[1] + '</code></div>';
      }).join("") +
      (bab.contoh ? '<details><summary>Contoh soal</summary><p>' + bab.contoh.soal +
        '</p><p><b>Jawab:</b> ' + bab.contoh.jawaban + '</p></details>' : '') +
      '<label><input type="checkbox" data-id="' + id + '"' + (selesai[id] ? ' checked' : '') +
      '> Tandai sudah dipelajari</label></article>';
  });

  $("grid").innerHTML = html || '<div class="kosong">Belum ada bab. Tambahkan di data/' + mapel + '.js</div>';
  $("prog").textContent = data.length ? "Progres: " + sudah + " dari " + data.length + " bab selesai" : "";
}

document.addEventListener("click", function (e) {
  var d = e.target.dataset;
  if (d.mapel) mapel = d.mapel;
  else if (d.sem) sem = d.sem;
  else return;
  menu(); tampil();
});

document.addEventListener("change", function (e) {
  var id = e.target.dataset.id;
  if (!id) return;
  if (e.target.checked) selesai[id] = 1; else delete selesai[id];
  try { localStorage.setItem("ipa-selesai", JSON.stringify(selesai)); } catch (x) {}
  tampil();
});

$("cari").addEventListener("input", tampil);
menu(); tampil();
