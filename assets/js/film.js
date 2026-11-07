/* ISC — « Le métier en 1 minute » : film photo (zoom lent, légendes, 6 étapes x 10 s).
   Les photos sont déclarées dans le HTML (data-src). Si une photo ne charge pas, l'étape est sautée. */
(function () {
  "use strict";
  var film = document.querySelector(".film");
  if (!film) return;
  var slides = Array.prototype.slice.call(film.querySelectorAll(".film-slide"));
  var bars = film.querySelector(".film-bars");
  var btn = film.querySelector(".film-play");
  var DUR = 10000;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  slides.forEach(function (s, i) {
    var img = s.querySelector("img");
    img.addEventListener("error", function () { s.dataset.broken = "1"; });
    var b = document.createElement("span");
    b.innerHTML = "<i></i>";
    b.addEventListener("click", function () { go(i, true); });
    bars.appendChild(b);
  });
  var barEls = bars.querySelectorAll("span");

  var cur = -1, playing = false, t0 = 0, elapsed = 0, raf = 0;

  function go(i, keepPlaying) {
    var n = slides.length, tries = 0;
    while (slides[(i + n) % n].dataset.broken && tries++ < n) i++;
    i = (i + n) % n;
    slides.forEach(function (s, k) { s.classList.toggle("on", k === i); });
    barEls.forEach(function (b, k) { b.classList.toggle("done", k < i); b.classList.remove("cur"); b.firstChild.style.width = k < i ? "100%" : "0"; });
    barEls[i].classList.add("cur");
    // relance le zoom lent de la photo
    var img = slides[i].querySelector("img");
    img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
    if (!playing || reduce) img.style.animationPlayState = "paused";
    cur = i; elapsed = 0; t0 = performance.now();
    if (keepPlaying && !playing) play();
  }
  function tick(now) {
    if (!playing) return;
    var e = elapsed + (now - t0);
    barEls[cur].firstChild.style.width = Math.min(100, e / DUR * 100) + "%";
    if (e >= DUR) { go(cur + 1 >= slides.length ? 0 : cur + 1); }
    raf = requestAnimationFrame(tick);
  }
  function play() {
    playing = true; t0 = performance.now();
    film.classList.add("is-playing"); btn.setAttribute("aria-label", "Mettre en pause");
    slides[cur].querySelector("img").style.animationPlayState = reduce ? "paused" : "running";
    cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
  }
  function pause() {
    if (playing) elapsed += performance.now() - t0;
    playing = false;
    film.classList.remove("is-playing"); btn.setAttribute("aria-label", "Lancer le film");
    slides[cur].querySelector("img").style.animationPlayState = "paused";
  }
  btn.addEventListener("click", function () { playing ? pause() : play(); });
  film.querySelector(".film-prev").addEventListener("click", function () { go(cur - 1, true); });
  film.querySelector(".film-next").addEventListener("click", function () { go(cur + 1, true); });

  go(0);
  // démarre seul quand le film devient visible, se met en pause quand on s'éloigne
  if ("IntersectionObserver" in window && !reduce) {
    new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) play(); else pause(); });
    }, { threshold: .5 }).observe(film);
  }
})();
