(function () {
  "use strict";

  /* Mobile menu */
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const scrim = document.querySelector(".scrim");
  const closeBtn = document.querySelector(".mobile-menu-close");

  function openMenu() {
    mobileMenu.classList.add("open");
    scrim.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobileMenu.classList.remove("open");
    scrim.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (burger) burger.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (scrim) scrim.addEventListener("click", closeMenu);
  document.querySelectorAll(".mobile-menu a").forEach((a) => a.addEventListener("click", closeMenu));

  /* Active nav link on scroll */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("nav.main-nav a[href^='#']");
  function setActiveLink() {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", setActiveLink, { passive: true });

  /* Back to top */
  const backToTop = document.querySelector(".back-to-top");
  function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 500);
  }
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* Animated counters */
  const counters = document.querySelectorAll("[data-count]");
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counterIO.unobserve(entry.target);
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-count"));
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          el.textContent = (target % 1 === 0 ? Math.round(value) : value.toFixed(1)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => counterIO.observe(el));

  /* Formulaire de devis : ouvre la messagerie avec la demande rédigée (info@stt.tn) */
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("ok", "err");
      if (!form.checkValidity()) {
        status.textContent = "Complétez les champs obligatoires : nom, email valide et message.";
        status.classList.add("show", "err");
        form.reportValidity();
        return;
      }
      const d = new FormData(form);
      const v = (k) => (d.get(k) || "").toString().trim() || "—";
      const subject = "Demande de devis" + (d.get("service") ? " — " + d.get("service") : "");
      const body = ["Nom : " + v("name"), "Société : " + v("company"), "Email : " + v("email"), "Téléphone : " + v("phone"),
        "Service : " + v("service"), "Trajet : " + v("route"), "", v("message")].join("\n");
      window.location.href = "mailto:info@stt.tn?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.textContent = "Votre messagerie s’ouvre avec la demande rédigée : il ne reste qu’à l’envoyer.";
      status.classList.add("show", "ok");
    });
  }

  /* Suivi : renvoie vers le suivi officiel de la compagnie maritime */
  const trackForm = document.querySelector("#tracking-form");
  const trackResult = document.querySelector("#tracking-result");
  if (trackForm) {
    trackForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const val = trackForm.querySelector("input").value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (!val) return;
      const links = [
        ["MSC", "https://www.msc.com/fr/track-a-shipment"],
        ["CMA CGM", "https://www.cma-cgm.com/ebusiness/tracking"],
        ["Maersk", "https://www.maersk.com/tracking/" + encodeURIComponent(val)],
        ["CTN", "https://www.ctn.com.tn"]
      ];
      trackResult.innerHTML = "<strong>" + val + "</strong> : choisissez la compagnie maritime de votre conteneur.<span class=\"track-links\">" +
        links.map((l) => '<a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + "</a>").join("") + "</span>";
      trackResult.classList.remove("err");
      trackResult.classList.add("show", "ok");
    });
  }

  /* Galerie : masque les photos absentes, et la section si aucune photo */
  const galSection = document.querySelector("#galerie");
  if (galSection) {
    const items = galSection.querySelectorAll(".gallery-item");
    function checkGallery() {
      const visible = galSection.querySelectorAll(".gallery-item:not([hidden])").length;
      if (!visible) galSection.hidden = true;
    }
    let pending = items.length;
    items.forEach((item) => {
      const img = item.querySelector("img");
      const fail = () => { item.hidden = true; if (--pending <= 0) checkGallery(); };
      const ok = () => { if (--pending <= 0) checkGallery(); };
      if (img.complete) { img.naturalWidth ? ok() : fail(); }
      else { img.addEventListener("load", ok); img.addEventListener("error", fail); }
    });
  }

  /* Footer year */
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
