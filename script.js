/* ============================================
   TRANQUIL LOKESH - INTERACTIONS
   ============================================ */

(function () {
  "use strict";

  // ---- Footer year ----
  const yearEl = document.querySelector("#year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ---- Copy email ----
  const copyEmailButton = document.querySelector("[data-copy-email]");
  const contactEmail = "hello@lokeshphotos.com";

  if (copyEmailButton) {
    const labelEl = copyEmailButton.querySelector(".copy-label");
    const defaultLabel = labelEl ? labelEl.textContent : copyEmailButton.textContent;

    copyEmailButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(contactEmail);
        if (labelEl) {
          labelEl.textContent = "Copied!";
        } else {
          copyEmailButton.textContent = "Copied!";
        }

        copyEmailButton.style.borderColor = "var(--accent-gold)";
        copyEmailButton.style.color = "var(--accent-gold)";

        setTimeout(() => {
          if (labelEl) {
            labelEl.textContent = defaultLabel;
          } else {
            copyEmailButton.textContent = defaultLabel;
          }
          copyEmailButton.style.borderColor = "";
          copyEmailButton.style.color = "";
        }, 1800);
      } catch (error) {
        window.location.href = "mailto:" + contactEmail;
      }
    });
  }

  // ---- Entrance animations with Intersection Observer ----
  function revealElements() {
    const fadeEls = document.querySelectorAll(".anim-fade-up");

    if (!("IntersectionObserver" in window)) {
      fadeEls.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    fadeEls.forEach(function (el) { observer.observe(el); });
  }

  // ---- Staggered reveal for chips, feature cards, and buttons ----
  function staggerReveal() {
    var groups = [
      { selector: ".chip", baseDelay: 400 },
      { selector: ".tag", baseDelay: 500 },
      { selector: ".action-row .btn", baseDelay: 600 }
    ];

    groups.forEach(function (group) {
      var items = document.querySelectorAll(group.selector);
      items.forEach(function (item, i) {
        setTimeout(function () {
          item.classList.add("is-visible");
        }, group.baseDelay + i * 100);
      });
    });
  }

  // ---- Subtle parallax on orbs (mouse-driven, desktop only) ----
  function initParallax() {
    if (window.matchMedia("(pointer: fine)").matches === false) return;

    var orbs = document.querySelectorAll(".orb");
    if (orbs.length === 0) return;

    var ticking = false;

    document.addEventListener("mousemove", function (e) {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(function () {
        var x = (e.clientX / window.innerWidth - 0.5) * 2;
        var y = (e.clientY / window.innerHeight - 0.5) * 2;

        orbs.forEach(function (orb, i) {
          var factor = (i + 1) * 8;
          orb.style.transform =
            "translate(" + (x * factor) + "px, " + (y * factor) + "px)";
        });

        ticking = false;
      });
    });
  }

  // ---- Magnetic button hover effect ----
  function initMagneticButtons() {
    if (window.matchMedia("(pointer: fine)").matches === false) return;

    var buttons = document.querySelectorAll(".btn");

    buttons.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform =
          "translateY(-2px) translate(" + (x * 0.15) + "px, " + (y * 0.15) + "px)";
      });

      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  // ---- Card tilt effect on hover (subtle) ----
  function initCardTilt() {
    if (window.matchMedia("(pointer: fine)").matches === false) return;

    var card = document.querySelector(".visiting-card");
    if (!card) return;

    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      var tiltX = (y - 0.5) * 2;
      var tiltY = (x - 0.5) * -2;

      card.style.transform =
        "perspective(1000px) rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
      card.style.transition = "transform 0.5s ease";
      setTimeout(function () {
        card.style.transition = "";
      }, 500);
    });
  }

  // ---- Initialize everything ----
  function init() {
    revealElements();
    staggerReveal();
    initParallax();
    initMagneticButtons();
    initCardTilt();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
