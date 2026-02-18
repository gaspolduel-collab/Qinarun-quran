// Variabel untuk menyimpan bagian layar
const halamanDaftar = document.getElementById('halaman-daftar');
const halamanBaca = document.getElementById('halaman-baca');
const daftarSurah = document.getElementById('daftar-surah');
const daftarAyat = document.getElementById('daftar-ayat');
const judulBaca = document.getElementById('judul-baca');

// 1. Fungsi Langsung Ambil dan Tampilkan Daftar Surah
async function ambilSurah() {
    const letakSurah = document.getElementById('daftar-surah');
    
    try {
        // Langsung tembak minta data ke API
        const respons = await fetch("https://equran.id/api/v2/surat");
        const hasil = await respons.json();
        
        // Kosongkan tulisan "Tunggu sebentar..." seketika
        letakSurah.innerHTML = ''; 

        // Langsung buat kotak-kotak surahnya
        hasil.data.forEach(surah => {
            const kartu = document.createElement('div');
            kartu.className = 'kartu-surah';
            kartu.onclick = () => bukaSurah(surah.nomor, surah.namaLatin);
            
            kartu.innerHTML = `
                <h3 style="color: #0F4C36;">${surah.nomor}. ${surah.namaLatin}</h3>
                <p>${surah.arti} (${surah.jumlahAyat} Ayat)</p>
                <h2 style="margin-top: 10px;">${surah.nama}</h2>
            `;
            letakSurah.appendChild(kartu);
        });
    } catch (error) {
        letakSurah.innerHTML = '<p style="color:red; text-align:center; width:100%;">Gagal mengambil data. Pastikan internet menyala dan buka pakai Live Server ya!</p>';
    }
}

// 2. Fungsi Trik Sulap Warna Tajwid Sesuai Buku Panduan Faiz
function warnaiTajwid(teks) {
    if (!teks) return "";
    
    let teksTajwid = teks;

    // WARNA UNGU: Qalqalah (Huruf ق ط ب ج د yang bersukun/mati)
    teksTajwid = teksTajwid.replace(/([قطبجد]ْ)/g, '<span style="color: #800080; font-weight: bold;">$1</span>');

    // WARNA PINK/MAGENTA: Ghunnah & Idgham Bighunnah
    teksTajwid = teksTajwid.replace(/([نم]ّ)/g, '<span style="color: #E91E63; font-weight: bold;">$1</span>');
    teksTajwid = teksTajwid.replace(/(نْ\s*[ينمو])/g, '<span style="color: #E91E63; font-weight: bold;">$1</span>');

    // WARNA BIRU: Iqlab (Nun mati ketemu huruf Ba ب)
    teksTajwid = teksTajwid.replace(/(نْ\s*ب)/g, '<span style="color: #2196F3; font-weight: bold;">$1</span>');

    // WARNA MERAH: Idgham Bilaghunnah & Idgham Syafawi
    teksTajwid = teksTajwid.replace(/(نْ\s*[لر])/g, '<span style="color: #F44336; font-weight: bold;">$1</span>');
    teksTajwid = teksTajwid.replace(/(مْ\s*م)/g, '<span style="color: #F44336; font-weight: bold;">$1</span>');

    // WARNA HIJAU: Ikhfa Syafawi & Ikhfa
    teksTajwid = teksTajwid.replace(/(مْ\s*ب)/g, '<span style="color: #4CAF50; font-weight: bold;">$1</span>');
    teksTajwid = teksTajwid.replace(/(نْ\s*[تثجدذزسشصضطظفقك])/g, '<span style="color: #4CAF50; font-weight: bold;">$1</span>');

    return teksTajwid;
}

// 3. Fungsi Buka dan Baca Isi Surah
async function bukaSurah(nomor, namaLatin) {
    // Sembunyikan daftar, tampilkan halaman baca
    halamanDaftar.classList.add('tersembunyi');
    halamanBaca.classList.remove('tersembunyi');
    
    judulBaca.innerText = `Sedang Membuka Surah ${namaLatin}...`;
    daftarAyat.innerHTML = ''; 
    window.scrollTo(0, 0); // Gulir ke atas otomatis

    try {
        const respons = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
        const hasil = await respons.json();
        
        judulBaca.innerText = `Surah ${namaLatin}`;
        
        hasil.data.ayat.forEach(ayat => {
            // Proses warnai tajwid dulu
            const teksBerwarna = warnaiTajwid(ayat.teksArab);
            
            const kartuAyat = document.createElement('div');
            kartuAyat.className = 'kartu-ayat';
            kartuAyat.innerHTML = `
                <div class="teks-arab" style="direction: rtl;">${teksBerwarna} <span style="color: #0F4C36; font-size: 20px;">(${ayat.nomorAyat})</span></div>
                <div class="teks-indo" style="margin-top: 10px;">${ayat.teksIndonesia}</div>
            `;
            daftarAyat.appendChild(kartuAyat);
        });
    } catch (error) {
        judulBaca.innerText = "Gagal Memuat Ayat";
    }
}

// 4. Fungsi Tombol Kembali Bebas Bug (Realtime)
function kembaliKeDaftar() {
    document.getElementById('halaman-baca').classList.add('tersembunyi');
    document.getElementById('halaman-daftar').classList.remove('tersembunyi');
    // Paksa layar melompat ke atas seketika
    window.scrollTo(0, 0); 
}

// 5. Jalankan aplikasi seketika saat layar sudah siap
window.onload = ambilSurah;