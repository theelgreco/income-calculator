if (navigator.serviceWorker.controller) {
} else {
    navigator.serviceWorker.register("install-sw.js", { scope: "./" }).then((reg) => {});
}
