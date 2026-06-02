// Replace these two values with your real contact information before publishing.
const CONTACT_EMAIL = "fujianteflontape1@gmail.com";
const WHATSAPP_NUMBER = "+852 6895 4159";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll("[data-inquiry]").forEach((link) => {
  link.addEventListener("click", () => {
    const product = link.getAttribute("data-inquiry") || "PTFE tape";
    const body = [
      "Hello,",
      "",
      `I would like to request a quotation for: ${product}`,
      "Required size / density:",
      "Quantity:",
      "Packaging method:",
      "Logo or private label requirement:",
      "Destination country / port:",
      "",
      "Please send price, MOQ, carton details and lead time.",
    ].join("\n");
    link.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(product + " quotation")}&body=${encodeURIComponent(body)}`;
  });
});

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const message = "Hello, I would like to request a PTFE thread seal tape quotation. I will provide size, quantity, packaging method and destination country.";
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (cleanNumber.length >= 8) {
    link.href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    return;
  }

  link.href = "#inquiry";
  link.textContent = "Send Inquiry";
  link.title = "Add your WhatsApp number in assets/js/main.js to enable WhatsApp inquiry.";
});

const quoteForm = document.querySelector("#quoteForm");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const subject = `PTFE tape inquiry - ${data.get("product") || "custom order"}`;
    const body = [
      "Hello,",
      "",
      "Please quote the following PTFE thread seal tape order:",
      "",
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Product type: ${data.get("product") || ""}`,
      `Size / density: ${data.get("size") || ""}`,
      `Quantity: ${data.get("quantity") || ""}`,
      `Packaging: ${data.get("packaging") || ""}`,
      `Destination country / port: ${data.get("destination") || ""}`,
      "",
      "Additional requirement:",
      data.get("message") || "",
      "",
      "Please send price, MOQ, carton details and lead time.",
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
