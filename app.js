if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((reg) => {
      console.log("Service Worker berhasil didaftarkan.", reg);
    })
    .catch((err) => {
      console.log("Gagal mendaftarkan Service Worker.", err);
    });
}
