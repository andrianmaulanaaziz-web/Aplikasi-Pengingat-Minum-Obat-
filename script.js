function setPengingat() {
  const namaObat = document.getElementById("namaObat").value;
  const waktuObat = document.getElementById("waktuObat").value;
  const status = document.getElementById("status");

  if (namaObat === "" || waktuObat === "") {
    alert("Harap isi nama obat dan waktu minum!");
    return;
  }

  status.innerHTML = "⏳ Pengingat aktif untuk obat: " + namaObat;

  const interval = setInterval(() => {
    const sekarang = new Date();
    const jam = sekarang.getHours();
    const menit = sekarang.getMinutes();

    const [jamObat, menitObat] = waktuObat.split(":").map(Number);

    // Jika tepat waktu minum
    if (jam === jamObat && menit === menitObat) {
      alert("⏰ Waktunya minum obat: " + namaObat);
      status.innerHTML = "✅ Sudah waktunya minum obat!";
      clearInterval(interval);
    }

    // Jika sudah melewati waktu minum
    if (
      jam > jamObat || 
      (jam === jamObat && menit > menitObat)
    ) {
      alert("⚠️ Kamu TERLAMBAT minum obat: " + namaObat);
      status.innerHTML = "⚠️ Melewati batas waktu minum obat!";
      clearInterval(interval);
    }

  }, 1000);
}
