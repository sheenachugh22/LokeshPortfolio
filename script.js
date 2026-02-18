/* ============================================
   TRANQUIL LOKESH - INSTAGRAMABLE INTERACTIONS
   ============================================ */

(function () {
  "use strict";

  var yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---- Copy email ----
  var copyBtn = document.querySelector("[data-copy-email]");
  var email = "hello@lokeshphotos.com";

  if (copyBtn) {
    var labelEl = copyBtn.querySelector(".copy-label");
    var defaultLabel = labelEl ? labelEl.textContent : copyBtn.textContent;

    copyBtn.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(email);
        if (labelEl) labelEl.textContent = "Copied!";
        else copyBtn.textContent = "Copied!";

        copyBtn.style.borderColor = "rgba(74, 158, 142, 0.5)";
        copyBtn.style.color = "#4a9e8e";
        copyBtn.style.background = "rgba(74, 158, 142, 0.08)";

        setTimeout(function () {
          if (labelEl) labelEl.textContent = defaultLabel;
          else copyBtn.textContent = defaultLabel;
          copyBtn.style.borderColor = "";
          copyBtn.style.color = "";
          copyBtn.style.background = "";
        }, 2000);
      } catch (err) {
        window.location.href = "mailto:" + email;
      }
    });
  }

  // ---- Entrance animations ----
  function revealElements() {
    var els = document.querySelectorAll(".anim-fade-up");

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });

    els.forEach(function (el) { observer.observe(el); });
  }

  // ---- Staggered child animations ----
  function staggerChildren() {
    var groups = [
      { selector: ".highlight", base: 300, step: 80 },
      { selector: ".pill", base: 450, step: 70 },
      { selector: ".cta-row .btn-ig, .cta-row .btn-glow, .cta-row .btn-glass", base: 550, step: 80 }
    ];

    groups.forEach(function (g) {
      var items = document.querySelectorAll(g.selector);
      items.forEach(function (item, i) {
        setTimeout(function () {
          item.classList.add("is-visible");
        }, g.base + i * g.step);
      });
    });
  }

  // ---- Cursor glow (desktop) ----
  function initCursorGlow() {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    var glow = document.getElementById("cursorGlow");
    if (!glow) return;

    var raf = false;

    document.addEventListener("mousemove", function (e) {
      if (raf) return;
      raf = true;
      requestAnimationFrame(function () {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
        if (!glow.classList.contains("active")) glow.classList.add("active");
        raf = false;
      });
    });

    document.addEventListener("mouseleave", function () {
      glow.classList.remove("active");
    });
  }

  // ---- Blob parallax (desktop) ----
  function initBlobParallax() {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    var blobs = document.querySelectorAll(".blob");
    if (!blobs.length) return;

    var ticking = false;

    document.addEventListener("mousemove", function (e) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var nx = (e.clientX / window.innerWidth - 0.5) * 2;
        var ny = (e.clientY / window.innerHeight - 0.5) * 2;
        blobs.forEach(function (b, i) {
          var f = (i + 1) * 6;
          b.style.transform = "translate(" + (nx * f) + "px, " + (ny * f) + "px)";
        });
        ticking = false;
      });
    });
  }

  // ---- Card hover glow shift ----
  function initCardGlow() {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    var card = document.querySelector(".card");
    var borderGlow = document.querySelector(".card-border-glow");
    if (!card || !borderGlow) return;

    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;

      borderGlow.style.background =
        "radial-gradient(circle at " + x + "% " + y + "%, " +
        "rgba(201, 169, 110, 0.3), " +
        "rgba(74, 158, 142, 0.15) 40%, " +
        "transparent 70%)";
    });

    card.addEventListener("mouseleave", function () {
      borderGlow.style.background = "";
    });
  }

  // ---- Highlight ring pop on hover ----
  function initHighlightPop() {
    var rings = document.querySelectorAll(".highlight-ring");
    rings.forEach(function (ring) {
      ring.addEventListener("mouseenter", function () {
        ring.style.transform = "scale(1.1)";
        ring.style.boxShadow = "0 0 24px rgba(201, 169, 110, 0.25)";
      });
      ring.addEventListener("mouseleave", function () {
        ring.style.transform = "";
        ring.style.boxShadow = "";
      });
    });
  }

  // ---- Init ----
  function init() {
    revealElements();
    staggerChildren();
    initCursorGlow();
    initBlobParallax();
    initCardGlow();
    initHighlightPop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
