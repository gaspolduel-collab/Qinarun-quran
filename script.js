// ==========================================
// SCRIPT QINARUN QUR'AN - FULL DATABASE VERSION
// Developer: Faiz (Developer Kelas 5 SD)
// STATUS: 100% REAL WORK (ANTI-ERROR & ANTI-404)
// ==========================================

// --- 1. DATABASE DOA MILIK FAIZ (Lokal & Super Cepat) ---
const doa_list = [
    {
        "nama": "Doa Sebelum Tidur",
        "lafal": "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا",
        "transliterasi": "Bismika-llaahumma amuutu wa ahyaa.",
        "arti": "Dengan Nama-Mu ya Allah, aku mati dan aku hidup.",
        "riwayat": "HR. Bukhari 6324."
    },
    {
        "nama": "Doa Bangun Tidur",
        "lafal": "اَلْحَمْدُ لِلَّهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرِ",
        "transliterasi": "Alhamdulillaahil-ladzii ahyaanaa ba'da maa amaatanaa wa ilaihin-nusyuur.",
        "arti": "Segala puji bagi Allah, yang membangunkan kami setelah ditidurkanNya dan kepadaNya kami dibangitkan.",
        "riwayat": "HR. Al-Bukhari dalam Fathul Baari 11/113, Muslim 4/2083."
    },
    {
        "nama": "Doa Ketika Mengenakan Pakaian",
        "lafal": "اَلْحَمْدُ لِلَّهِ الَّذِيْ كَسَانِيْ هَـٰذَا (الثَّوْبَ) وَرَزَقَنِيْهِ مِنْ غَيْرِ حَوْلٍ مِنِّيْ وَلاَ قُوَّةٍ",
        "transliterasi": "Alhamdulillaahil-ladzii kasaanii haadzats-tsauba...",
        "arti": "Segala puji bagi Allah yang memberi pakaian ini kepadaku...",
        "riwayat": "HR. Seluruh penyusun kitab Sunan."
    },
    {
        "nama": "Doa Masuk WC atau Kamar Mandi",
        "lafal": "اَللَّهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        "transliterasi": "Allaahumma innii a'uudzu bika minal khubutsi wal khobaa-its.",
        "arti": "Ya Allah, sesungguhnya aku berlindung kepadaMu dari godaan setan laki-laki dan perempuan.",
        "riwayat": "HR. Al-Bukhari 1/45."
    },
    {
        "nama": "Doa Keluar dari WC atau Kamar Mandi",
        "lafal": "غُفْرَانَكَ",
        "transliterasi": "Ghufroonak.",
        "arti": "Aku minta ampun kepadaMu.",
        "riwayat": "HR. Abu Dawud, Tirmidzi."
    },
    {
        "nama": "Doa Sebelum Wudhu",
        "lafal": "بِسْمِ اللَّهِ",
        "transliterasi": "Bismillaah.",
        "arti": "Dengan nama Allah (aku berwudhu).",
        "riwayat": "HR. Abu Dawud."
    },
    {
        "nama": "Doa Setelah Wudhu",
        "lafal": "أَشْهَدُ أَنْ لاَ إِلَـٰهَ إِلاَّ اللَّهُ، وَحْدَهُ لاَ شَرِيْكَ لَهُ...",
        "transliterasi": "Asyhadu al-laa ilaaha illallaah...",
        "arti": "Aku bersaksi, bahwa tidak ada sesembahan yang berhak disembah kecuali Allah...",
        "riwayat": "HR. Muslim 1/209."
    },
    {
        "nama": "Doa Sebelum Makan",
        "lafal": "بِسْمِ اللَّهِ",
        "transliterasi": "Bismillaah.",
        "arti": "Dengan nama Allah.",
        "riwayat": "HR. Bukhari & Muslim."
    },
    {
        "nama": "Doa Sapu Jagad",
        "lafal": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً، وَفِي الْآخِرَةِ حَسَنَةً، وَقِنَا عَذَابَ النَّارِ",
        "transliterasi": "Robbanaa aatinaa fid-dunyaa hasanah...",
        "arti": "Ya Tuhan kami, berilah kami kebaikan di dunia dan akhirat...",
        "riwayat": "QS. Al-Baqarah: 201"
    }
];

const sectionAlquran = document.getElementById('section-alquran');
const sectionDoa = document.getElementById('section-doa');

// --- 2. NAVIGASI MENU (WORK) ---
function pindahMenu(menu) {
    if (menu === 'alquran') {
        sectionAlquran.classList.remove('tersembunyi');
        sectionDoa.classList.add('tersembunyi');
        document.getElementById('btn-alquran').classList.add('active');
        document.getElementById('btn-doa').classList.remove('active');
    } else {
        sectionAlquran.classList.add('tersembunyi');
        sectionDoa.classList.remove('tersembunyi');
        document.getElementById('btn-alquran').classList.remove('active');
        document.getElementById('btn-doa').classList.add('active');
        ambilDoa(); 
    }
}

// --- 3. LOGIKA TAJWID (WORK) ---
function warnaiTajwid(teks) {
    if (!teks) return "";
    let t = teks;
    t = t.replace(/([قطبجد]ْ)/g, '<span style="color: #800080; font-weight: bold;">$1</span>'); 
    t = t.replace(/([نم]ّ)/g, '<span style="color: #E91E63; font-weight: bold;">$1</span>'); 
    t = t.replace(/(نْ\s*[ينمو])/g, '<span style="color: #E91E63; font-weight: bold;">$1</span>'); 
    t = t.replace(/(نْ\s*ب)/g, '<span style="color: #2196F3; font-weight: bold;">$1</span>'); 
    t = t.replace(/(نْ\s*[لر])/g, '<span style="color: #F44336; font-weight: bold;">$1</span>'); 
    t = t.replace(/(مْ\s*م)/g, '<span style="color: #F44336; font-weight: bold;">$1</span>'); 
    t = t.replace(/(مْ\s*ب)/g, '<span style="color: #4CAF50; font-weight: bold;">$1</span>'); 
    t = t.replace(/(نْ\s*[تثجدذزسشصضطظفقك])/g, '<span style="color: #4CAF50; font-weight: bold;">$1</span>'); 
    return t;
}

// --- 4. FITUR AL-QURAN (WORK) ---
async function ambilSurah() {
    const wadah = document.getElementById('daftar-surah');
    try {
        const res = await fetch("https://equran.id/api/v2/surat");
        const json = await res.json();
        wadah.innerHTML = '';
        json.data.forEach(s => {
            const d = document.createElement('div');
            d.className = 'kartu-surah';
            d.onclick = () => bukaSurah(s.nomor, s.namaLatin);
            d.innerHTML = `<h3>${s.nomor}. ${s.namaLatin}</h3><h2 style="color:#D4AF37; font-family:Amiri">${s.nama}</h2>`;
            wadah.appendChild(d);
        });
    } catch (e) { console.error(e); }
}

async function bukaSurah(no, nama) {
    document.getElementById('halaman-daftar').classList.add('tersembunyi');
    document.getElementById('halaman-baca').classList.remove('tersembunyi');
    const res = await fetch(`https://equran.id/api/v2/surat/${no}`);
    const json = await res.json();
    document.getElementById('judul-baca').innerText = `Surah ${nama}`;
    const wadahAyat = document.getElementById('daftar-ayat');
    wadahAyat.innerHTML = '';
    json.data.ayat.forEach(a => {
        const d = document.createElement('div');
        d.className = 'kartu-ayat'; d.style.marginBottom = '15px';
        d.innerHTML = `<div class="teks-arab" style="direction:rtl">${warnaiTajwid(a.teksArab)}</div><p>${a.teksIndonesia}</p>`;
        wadahAyat.appendChild(d);
    });
    window.scrollTo(0,0);
}

// --- 5. FITUR DOA (SOLUSI FINAL: PAKAI DATA FAIZ) ---
function ambilDoa() {
    const wadahDoa = document.getElementById('daftar-doa');
    wadahDoa.innerHTML = '';
    
    doa_list.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'kartu-doa';
        div.onclick = () => tampilkanDetailDoa(index);
        div.innerHTML = `<h4>${item.nama}</h4>`; 
        wadahDoa.appendChild(div);
    });
}

function tampilkanDetailDoa(idx) {
    const item = doa_list[idx];
    document.getElementById('halaman-daftar-doa').classList.add('tersembunyi');
    document.getElementById('halaman-baca-doa').classList.remove('tersembunyi');
    
    document.getElementById('judul-doa').innerText = item.nama;
    document.getElementById('isi-doa').innerHTML = `
        <div class="teks-arab" style="direction:rtl">${item.lafal}</div>
        <p style="color:#D4AF37; margin-top:20px;"><i>${item.transliterasi}</i></p>
        <p style="margin-top:15px; border-top: 1px dashed #444; padding-top:15px; color:#fff;">${item.arti}</p>
        <p style="color:#888; font-size:12px; margin-top:10px;">${item.riwayat}</p>
    `;
    window.scrollTo(0,0);
}

// --- 6. FUNGSI KEMBALI ---
function kembaliKeDaftar() {
    document.getElementById('halaman-baca').classList.add('tersembunyi');
    document.getElementById('halaman-daftar').classList.remove('tersembunyi');
}
function kembaliKeDaftarDoa() {
    document.getElementById('halaman-baca-doa').classList.add('tersembunyi');
    document.getElementById('halaman-daftar-doa').classList.remove('tersembunyi');
}

window.onload = ambilSurah;