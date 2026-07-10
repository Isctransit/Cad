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

  /* Contact form (demo — no backend wired yet) */
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const requiredOk = form.checkValidity();
      status.classList.remove("ok", "err");
      if (!requiredOk) {
        status.textContent = "Merci de remplir tous les champs obligatoires.";
        status.classList.add("show", "err");
        form.reportValidity();
        return;
      }
      const btn = form.querySelector("button[type='submit']");
      const originalText = btn.textContent;
      btn.textContent = "Envoi en cours...";
      btn.disabled = true;
      setTimeout(() => {
        status.textContent = "Votre demande a bien été enregistrée. Notre équipe vous recontactera sous 24h ouvrées.";
        status.classList.add("show", "ok");
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 900);
    });
  }

  /* Tracking widget (demo) */
  const trackForm = document.querySelector("#tracking-form");
  const trackResult = document.querySelector("#tracking-result");
  if (trackForm) {
    trackForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = trackForm.querySelector("input");
      const val = input.value.trim();
      if (!val) return;
      trackResult.classList.add("show");
      trackResult.innerHTML =
        "<strong>Référence " +
        val.toUpperCase() +
        " :</strong> ce module de suivi est une démonstration. Connectez-le à votre système de tracking (EDI / API armateur) pour un suivi en temps réel.";
      trackResult.classList.remove("err");
      trackResult.classList.add("ok");
    });
  }

  /* Footer year */
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
