const form = document.getElementById("medicineForm");
const namaObat = document.getElementById("namaObat");
const dosis = document.getElementById("dosis");
const jamMinum = document.getElementById("jamMinum");
const listJadwal = document.getElementById("listJadwal");
const errorMsg = document.getElementById("errorMsg");
const clearAll = document.getElementById("clearAll");
const alarmSound = document.getElementById("alarmSound");

let jadwal = JSON.parse(localStorage.getItem("jadwalObat")) || [];

// fungsi ambil jam sekarang format HH:MM
function getNowTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

// cek apakah waktu sudah lewat
function isLate(time) {
  return getNowTime() > time;
}

// simpan localstorage
function saveData() {
  localStorage.setItem("jadwalObat", JSON.stringify(jadwal));
}

// render list
function render() {
  listJadwal.innerHTML = "";

  if (jadwal.length === 0) {
    listJadwal.innerHTML = `<p style="color:#94a3b8;">Belum ada jadwal obat.</p>`;
    return;
  }

  jadwal.sort((a, b) => a.jam.localeCompare(b.jam));

  jadwal.forEach((item) => {
    const late = isLate(item.jam);
    const done = item.status === "done";

    let badgeClass = "wait";
    let badgeText = "Menunggu";

    if (done) {
      badgeClass = "done";
      badgeText = "Sudah diminum";
    } else if (late) {
      badgeClass = "late";
      badgeText = "Terlambat";
    }

    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="info">
        <strong>${item.nama}</strong>
        <span>Dosis: ${item.dosis} • Jam: ${item.jam}</span>
        <span class="badge ${badgeClass}">${badgeText}</span>
      </div>

      <div class="actions">
        <button class="small-btn check" ${done || late ? "disabled" : ""}>
          ✔ Sudah Minum
        </button>
        <button class="small-btn del">🗑 Hapus</button>
      </div>
    `;

    // tombol sudah minum
    div.querySelector(".check").addEventListener("click", () => {
      if (isLate(item.jam)) {
        alert("❌ Error: Waktu minum sudah lewat, tidak bisa checklist.");
        return;
      }
      item.status = "done";
      saveData();
      render();
    });

    // tombol hapus
    div.querySelector(".del").addEventListener("click", () => {
      jadwal = jadwal.filter((x) => x.id !== item.id);
      saveData();
      render();
    });

    listJadwal.appendChild(div);
  });
}

// tambah jadwal
form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const now = getNowTime();
  const jam = jamMinum.value;

  // VALIDASI: jika jam sudah lewat -> error dan tidak bisa simpan
  if (jam < now) {
    errorMsg.textContent = "❌ Error: Jam yang dipilih sudah lewat. Tidak bisa menambahkan jadwal.";
    return;
  }

  const newItem = {
    id: Date.now(),
    nama: namaObat.value.trim(),
    dosis: dosis.value.trim(),
    jam: jam,
    status: "wait"
  };

  jadwal.push(newItem);
  saveData();
  render();

  form.reset();
});

// hapus semua
clearAll.addEventListener("click", () => {
  if (confirm("Yakin hapus semua jadwal?")) {
    jadwal = [];
    saveData();
    render();
  }
});

// notifikasi alarm (cek tiap 10 detik)
setInterval(() => {
  const now = getNowTime();

  jadwal.forEach((item) => {
    if (item.status === "wait" && item.jam === now) {
      // bunyikan alarm
      alarmSound.play().catch(() => {});
      alert(`⏰ Waktunya minum obat: ${item.nama} (${item.dosis})`);
    }
  });

  render();
}, 10000);

// render awal
render();
