function tambahPengingat() {
    let namaObat = document.getElementById("namaObat").value;
    let waktuObat = document.getElementById("waktuObat").value;

    if (namaObat === "" || waktuObat === "") {
        alert("Harap isi nama obat dan waktu minum!");
        return;
    }

    let daftar = document.getElementById("daftarObat");
    let item = document.createElement("li");

    item.innerHTML = `
        <strong>${namaObat}</strong><br>
        Waktu: ${waktuObat}
        <br><br>
        <button onclick="obatDiminum(this)">Sudah Diminum</button>
    `;

    daftar.appendChild(item);

    document.getElementById("namaObat").value = "";
    document.getElementById("waktuObat").value = "";

    setPengingat(namaObat, waktuObat);
}

function setPengingat(nama, waktu) {
    let sekarang = new Date();
    let target = new Date();

    let jam = waktu.split(":")[0];
    let menit = waktu.split(":")[1];

    target.setHours(jam, menit, 0);

    let selisih = target - sekarang;

    if (selisih > 0) {
        setTimeout(() => {
            alert("⏰ Waktu minum obat: " + nama);
            document.getElementById("status").innerText =
                "⚠️ Obat " + nama + " belum diminum!";
        }, selisih);
    }
}

function obatDiminum(button) {
    button.parentElement.style.backgroundColor = "#d4edda";
    document.getElementById("status").innerText =
        "✅ Obat sudah diminum dan terpantau oleh keluarga";
}
