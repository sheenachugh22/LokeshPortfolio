const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const year = document.querySelector("#year");
const contactForm = document.querySelector("#contact-form");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const projectType = String(formData.get("projectType") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Photography Inquiry: ${projectType}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nDetails:\n${message}`
    );

    window.location.href = `mailto:hello@lokeshphotos.com?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
}
