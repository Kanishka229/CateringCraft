function showToast(title, message) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-title").innerText = title;
  document.getElementById("toast-message").innerText = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}