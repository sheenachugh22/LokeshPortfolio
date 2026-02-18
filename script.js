const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const year = document.querySelector("#year");
const contactForm = document.querySelector("#contact-form");
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const galleryItems = Array.from(document.querySelectorAll(".shot-card"));
const galleryStatus = document.querySelector("#gallery-status");
const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const pageSections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    return href ? document.querySelector(href) : null;
  })
  .filter(Boolean);

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

if (filterButtons.length > 0 && galleryItems.length > 0) {
  const applyFilter = (filter) => {
    let visibleCount = 0;

    galleryItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      const showItem = filter === "all" || category === filter;
      item.hidden = !showItem;
      if (showItem) {
        visibleCount += 1;
      }
    });

    if (galleryStatus) {
      if (filter === "all") {
        galleryStatus.textContent = `Showing all ${visibleCount} projects`;
      } else {
        const label = filter.replace("-", " ");
        galleryStatus.textContent = `Showing ${visibleCount} ${label} projects`;
      }
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.getAttribute("data-filter") || "all";
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      applyFilter(selectedFilter);
    });
  });

  applyFilter("all");
}

if (pageSections.length > 0 && navLinks.length > 0 && "IntersectionObserver" in window) {
  const navBySection = new Map(
    navLinks.map((link) => {
      const href = link.getAttribute("href") || "";
      return [href.startsWith("#") ? href.slice(1) : "", link];
    })
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const activeId = entry.target.getAttribute("id");
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = navBySection.get(activeId);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-42% 0px -42% 0px",
      threshold: 0.01,
    }
  );

  pageSections.forEach((section) => observer.observe(section));
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
