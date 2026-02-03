const form = document.getElementById("medicineForm");
const namaObat = document.getElementById("namaObat");
const dosis = document.getElementById("dosis");
const jamMinum = document.getElementById("jamMinum");
const listJadwal = document.getElementById("listJadwal");
const errorMsg = document.getElementById("errorMsg");
const clearAll = document.getElementById("clearAll");
const alarmSound = document.getElementById("alarmSound");
const clockNow = document.getElementById("clockNow");

const toastContainer = document.getElementById("toastContainer");

let jadwal = JSON.parse(localStorage.getItem("jadwalObat")) || [];

// =====================
// CLOCK
// =====================
function pad(n){ return String(n).padStart(2,"0"); }
function nowHHMM(){
  const n = new Date();
  return `${pad(n.getHours())}:${pad(n.getMinutes())}`;
}
function nowHHMMSS(){
  const n = new Date();
  return `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
}
function updateClock(){
  clockNow.textContent = nowHHMMSS();
}
setInterval(updateClock, 1000);
updateClock();

// =====================
// TOAST
// =====================
function toast(type, title, msg, duration = 3200){
  const el = document.createElement("div");
  el.className = `toast ${type}`;

  let icon = "ℹ️";
  if(type === "success") icon = "✅";
  if(type === "error") icon = "❌";
  if(type === "info") icon = "⏰";

  el.innerHTML = `
    <div class="ticon">${icon}</div>
    <div class="tcontent">
      <div class="ttitle">${title}</div>
      <div class="tmsg">${msg}</div>
    </div>
    <button class="tclose" aria-label="close">×</button>
  `;

  toastContainer.appendChild(el);

  const closeBtn = el.querySelector(".tclose");
  const close = () => {
    el.classList.add("hide");
    setTimeout(()=> el.remove(), 250);
  };

  closeBtn.addEventListener("click", close);

  setTimeout(close, duration);
}

// =====================
// DATA
// =====================
function isLate(time){
  return nowHHMM() > time;
}
function save(){
  localStorage.setItem("jadwalObat", JSON.stringify(jadwal));
}

// =====================
// RENDER
// =====================
function render(){
  listJadwal.innerHTML = "";

  if(jadwal.length === 0){
    listJadwal.innerHTML = `<div class="empty">Belum ada jadwal obat.</div>`;
    return;
  }

  jadwal.sort((a,b)=> a.jam.localeCompare(b.jam));

  jadwal.forEach(item=>{
    const late = isLate(item.jam);
    const done = item.status === "done";

    let badgeClass = "wait";
    let badgeText  = "Menunggu";

    if(done){
      badgeClass = "done";
      badgeText = "Sudah diminum";
    }else if(late){
      badgeClass = "late";
      badgeText = "Terlambat";
    }

    const el = document.createElement("div");
    el.className = "item";

    el.innerHTML = `
      <div class="info">
        <strong>${item.nama}</strong>
        <div class="meta">Dosis: ${item.dosis} • Jam: ${item.jam}</div>
        <span class="badge ${badgeClass}">${badgeText}</span>
      </div>

      <div class="actions">
        <button class="small check" ${done || late ? "disabled" : ""}>✔ Sudah Minum</button>
        <button class="small del">🗑 Hapus</button>
      </div>
    `;

    // checklist
    el.querySelector(".check").addEventListener("click", ()=>{
      if(isLate(item.jam)){
        toast("error", "Tidak bisa diisi", "Waktu minum sudah lewat. Checklist dinonaktifkan.");
        return;
      }
      item.status = "done";
      save();
      render();
      toast("success", "Berhasil", `Obat "${item.nama}" sudah ditandai diminum.`);
    });

    // delete
    el.querySelector(".del").addEventListener("click", ()=>{
      jadwal = jadwal.filter(x=> x.id !== item.id);
      save();
      render();
      toast("success", "Dihapus", `Jadwal "${item.nama}" berhasil dihapus.`);
    });

    listJadwal.appendChild(el);
  });
}

// =====================
// SUBMIT
// =====================
form.addEventListener("submit", (e)=>{
  e.preventDefault();
  errorMsg.textContent = "";

  const jam = jamMinum.value;
  const now = nowHHMM();

  if(jam < now){
    errorMsg.textContent = "❌ Error: Jam yang dipilih sudah lewat. Tidak bisa menambahkan jadwal.";
    toast("error", "Error", "Jam yang dipilih sudah lewat. Jadwal tidak disimpan.");
    return;
  }

  const newItem = {
    id: Date.now(),
    nama: namaObat.value.trim(),
    dosis: dosis.value.trim(),
    jam,
    status: "wait",
    alarmed: false
  };

  jadwal.push(newItem);
  save();
  render();
  form.reset();

  toast("success", "Tersimpan", `Jadwal obat "${newItem.nama}" berhasil ditambahkan.`);
});

// =====================
// CLEAR ALL
// =====================
clearAll.addEventListener("click", ()=>{
  if(jadwal.length === 0){
    toast("info", "Info", "Belum ada jadwal untuk dihapus.");
    return;
  }

  if(confirm("Yakin hapus semua jadwal?")){
    jadwal = [];
    save();
    render();
    toast("success", "Berhasil", "Semua jadwal berhasil dihapus.");
  }
});

// =====================
// ALARM LOOP
// =====================
setInterval(()=>{
  const now = nowHHMM();

  jadwal.forEach(item=>{
    if(item.status === "wait" && item.jam === now && !item.alarmed){
      item.alarmed = true;
      save();

      alarmSound.play().catch(()=>{});
      toast("info", "Waktunya Minum Obat", `${item.nama} (${item.dosis}) sekarang ya!`, 5000);
    }
  });

  render();
}, 10000);

render();
