(function () {
  "use strict";

  /* Menu mobile */
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (btn && nav) {
    btn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* Lien actif selon la section visible */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a[href^='#']:not(.nav-cta)"));
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* Formulaire de devis : ouvre la messagerie avec la demande rédigée */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var missing = [];
      form.querySelectorAll("[required]").forEach(function (f) {
        var bad = !f.value.trim() || (f.type === "email" && !f.checkValidity());
        f.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) missing.push(f);
      });
      if (missing.length) {
        status.textContent = "Complétez les champs en rouge : nom, email valide et description de la marchandise.";
        status.classList.add("is-error");
        missing[0].focus();
        return;
      }
      status.classList.remove("is-error");
      var d = new FormData(form);
      var subject = "Demande de devis — " + d.get("service") + (d.get("company") ? " — " + d.get("company") : "");
      var body = [
        "Nom : " + d.get("name"),
        "Société : " + (d.get("company") || "—"),
        "Email : " + d.get("email"),
        "Téléphone : " + (d.get("phone") || "—"),
        "Service : " + d.get("service"),
        "Trajet : " + (d.get("route") || "—"),
        "",
        d.get("message")
      ].join("\n");
      window.location.href = "mailto:info@stt.tn?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.textContent = "Votre messagerie s’ouvre avec la demande. Il ne reste qu’à l’envoyer.";
    });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
