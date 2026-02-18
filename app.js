// --- 1. Navigasi Halaman (SPA Feel) ---
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Hapus kelas active dari semua
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));

        // Tambah kelas active ke yang diklik
        const targetId = item.getAttribute('data-target');
        item.classList.add('active');
        document.getElementById(targetId).classList.add('active');

        // Ubah Judul Header sesuai halaman
        const titles = { home: 'Dashboard', search: 'Eksplorasi', profile: 'Profil Saya' };
        document.querySelector('header h1').innerText = titles[targetId];
    });
});

// --- 2. Dark Mode Toggle (Simpan di LocalStorage) ---
const themeBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}

themeBtn.addEventListener('click', () => {
    let theme = document.body.getAttribute('data-theme');
    if (theme === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// --- 3. Install Button Logic (PWA) ---
let deferredPrompt;
const installContainer = document.getElementById('install-container');
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installContainer.style.display = 'block'; // Munculkan tombol install
});

installBtn.addEventListener('click', () => {
    installContainer.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted install');
        }
        deferredPrompt = null;
    });
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
}
