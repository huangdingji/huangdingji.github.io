// Replace these two values with your real contact information before publishing.
const CONTACT_EMAIL = "fujianteflontape@gmail.com";
const WHATSAPP_NUMBER = "+852 6895 4159";
// Keep empty until a real Meta Pixel ID is supplied. The previous placeholder
// loaded the full Facebook SDK on every production page without recording data
// for an owned account.
const META_PIXEL_ID = "";
const PRODUCTION_HOSTS = ["qzjy.store", "www.qzjy.store"];

function isProductionHost() {
  return typeof window !== "undefined" && PRODUCTION_HOSTS.includes(window.location.hostname);
}

function initMetaPixel() {
  if (!isProductionHost()) {
    console.info("[Meta Pixel] Disabled on non-production host:", window.location.hostname || window.location.protocol);
    return;
  }

  if (!META_PIXEL_ID || META_PIXEL_ID === "REPLACE_WITH_META_PIXEL_ID") return;
  if (typeof window.fbq === "function") return;

  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

initMetaPixel();

// The public site currently ships in English only. Clear any language choice
// saved by the retired switcher so returning visitors always see the source
// English content while additional translations are being prepared.
try {
  localStorage.removeItem("siteLanguage");
} catch (error) {
  // Storage can be unavailable in privacy-restricted browsing contexts.
}
document.documentElement.lang = "en";
document.documentElement.dir = "ltr";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll(".nav-more").forEach((button) => {
  const dropdown = button.closest(".nav-dropdown");
  if (!dropdown) return;

  dropdown.addEventListener("mouseenter", () => {
    if (dropdown.classList.contains("closing")) return;
    dropdown.classList.add("hover-open");
    button.setAttribute("aria-expanded", "true");
  });

  dropdown.addEventListener("mouseleave", () => {
    dropdown.classList.remove("hover-open", "closing");
    if (!dropdown.classList.contains("open")) {
      button.setAttribute("aria-expanded", "false");
    }
  });

  button.addEventListener("click", () => {
    const isOpen = dropdown.classList.contains("open");
    document.querySelectorAll(".nav-dropdown.open, .nav-dropdown.hover-open").forEach((item) => {
      if (item !== dropdown) {
        item.classList.remove("open", "hover-open", "closing");
        item.querySelector(".nav-more")?.setAttribute("aria-expanded", "false");
      }
    });

    if (isOpen) {
      dropdown.classList.remove("open", "hover-open");
      dropdown.classList.add("closing");
      button.setAttribute("aria-expanded", "false");
      return;
    }

    dropdown.classList.remove("closing");
    dropdown.classList.add("open");
    button.setAttribute("aria-expanded", "true");
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".nav-dropdown")) return;
  document.querySelectorAll(".nav-dropdown.open, .nav-dropdown.hover-open, .nav-dropdown.closing").forEach((dropdown) => {
    dropdown.classList.remove("open", "hover-open", "closing");
    dropdown.querySelector(".nav-more")?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("mousemove", (event) => {
  if (window.matchMedia("(max-width: 980px)").matches) return;

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-more");
    const menu = dropdown.querySelector(".nav-dropdown-menu");
    if (!button || !menu) return;

    const buttonRect = button.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const inButton =
      event.clientX >= buttonRect.left - 2 &&
      event.clientX <= buttonRect.right + 2 &&
      event.clientY >= buttonRect.top - 2 &&
      event.clientY <= buttonRect.bottom + 8;
    const inMenu =
      menuRect.width > 0 &&
      event.clientX >= menuRect.left - 2 &&
      event.clientX <= menuRect.right + 2 &&
      event.clientY >= menuRect.top - 8 &&
      event.clientY <= menuRect.bottom + 2;

    if (inButton || inMenu) {
      if (!dropdown.classList.contains("closing")) {
        dropdown.classList.add("hover-open");
        button.setAttribute("aria-expanded", "true");
      }
      return;
    }

    dropdown.classList.remove("hover-open", "closing");
    if (!dropdown.classList.contains("open")) {
      button.setAttribute("aria-expanded", "false");
    }
  });
});

function trackEvent(eventName, params = {}) {
  const eventParams = {
    page_path: window.location.pathname,
    ...params,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      transport_type: "beacon",
      ...eventParams,
    });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, eventParams);

    if ([
      "whatsapp_inquiry_click",
      "email_inquiry_click",
      "request_quote_click",
      "inquiry_cta_click",
      "inquiry_form_submit",
    ].includes(eventName)) {
      window.fbq("track", "Lead", {
        content_name: eventName,
        ...eventParams,
      });
    }
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a, button");
  if (!link) return;

  const label = (link.textContent || "").trim();
  const href = link.getAttribute("href") || "";

  if (link.matches("[data-whatsapp]") || href.includes("wa.me") || href.includes("whatsapp.com/send")) {
    trackEvent("whatsapp_inquiry_click", { link_text: label });
    return;
  }

  if (href.startsWith("mailto:")) {
    trackEvent("email_inquiry_click", { link_text: label });
    return;
  }

  if (link.matches("[data-inquiry]")) {
    trackEvent("request_quote_click", {
      link_text: label,
      product: link.getAttribute("data-inquiry") || "",
    });
    return;
  }

    const isInquiryLink = href.includes("contact.html") || href.includes("/contact/") || href.endsWith("contact/") || href.endsWith("contact/index.html") || href === "#inquiry";

  if (/get a quote|get quote|send inquiry|request quote|contact us|whatsapp/i.test(label) || (link.classList.contains("btn") && isInquiryLink)) {
    trackEvent("inquiry_cta_click", { link_text: label, link_url: href });
  }
});

document.querySelectorAll("[data-inquiry]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const product = link.getAttribute("data-inquiry") || "PTFE tape";
    const baseHref = (link.getAttribute("href") || "/contact/").split("#")[0];
    const separator = baseHref.includes("?") ? "&" : "?";
    window.location.href = `${baseHref}${separator}product=${encodeURIComponent(product)}`;
  });
});

// Pre-fill Interested Product from URL parameter (?product=...) on contact page
if (typeof window !== "undefined" && window.location.search) {
  const urlParams = new URLSearchParams(window.location.search);
  const productParam = urlParams.get("product");
  if (productParam) {
    const productSelect = document.querySelector('#quoteForm select[name="product"]');
    const messageField = document.querySelector('#quoteForm textarea[name="message"]');
    const productMapping = {
                };
    const targetText = productMapping[productParam] || "Other custom requirement";
    if (productSelect) {
      for (const opt of productSelect.options) {
        if (opt.text === targetText || opt.text.toLowerCase() === targetText.toLowerCase()) {
          opt.selected = true;
          break;
        }
      }
    }
    if (messageField && !messageField.value) {
      const intro = productMapping[productParam] ? "Product: " : "Product (SKU): ";
      messageField.value = intro + productParam + "\n\n";
    }
    const formEl = document.querySelector("#quoteForm");
    if (formEl) {
      setTimeout(() => formEl.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const message = "Hello, I would like to request a PTFE thread seal tape quotation. I will provide size, quantity, packaging method and destination country.";
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (cleanNumber.length >= 8) {
    const currentHref = link.getAttribute("href") || "";
    if (!currentHref.startsWith(`https://wa.me/${cleanNumber}`)) {
      link.href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    }
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return;
  }

  link.href = "#inquiry";
  link.textContent = "Send Inquiry";
  link.title = "Add your WhatsApp number in assets/js/main.js to enable WhatsApp inquiry.";
});

const quoteForm = document.querySelector("#quoteForm");

if (quoteForm) {
  const validationMessages = {
    name: "Please enter your name or company name.",
    email: "Please enter a valid email address.",
    contact: "Please enter an email address or WhatsApp number.",
  };

  quoteForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => field.setCustomValidity(""));

    field.addEventListener("invalid", () => {
      if (!field.validity.valueMissing && !field.validity.typeMismatch) return;

      const message = validationMessages[field.name] || "Please complete this field.";
      field.setCustomValidity(message);
    });
  });

  const successBox = document.querySelector(".form-success");
  const errorBox = document.querySelector(".form-error");
  const submitBtn = quoteForm.querySelector('button[type="submit"]');
  const defaultBtnText = submitBtn ? submitBtn.textContent : "Send Inquiry";
  const hideStatus = (box) => {
    if (!box) return;
    box.hidden = true;
    box.classList.remove("is-visible");
  };
  const showStatus = (box) => {
    if (!box) return;
    box.hidden = false;
    box.classList.add("is-visible");
  };

  hideStatus(successBox);
  hideStatus(errorBox);

  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }
    hideStatus(successBox);
    hideStatus(errorBox);

    const data = new FormData(quoteForm);

    trackEvent("inquiry_form_submit", {
      product: data.get("product") || "",
      country: data.get("country") || "",
    });

    try {
      const response = await fetch(quoteForm.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        quoteForm.hidden = true;
        showStatus(successBox);
        hideStatus(errorBox);
        if (typeof successBox !== "undefined" && successBox && successBox.scrollIntoView) {
          successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        throw new Error("Formspree response not ok");
      }
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultBtnText;
      }
      hideStatus(successBox);
      showStatus(errorBox);
    }
  });
}
