self.addEventListener("install", event => {
  console.log("Service Worker Install");
});
self.addEventListener("activate", event => {
  console.log("Service Worker Activate");
});
