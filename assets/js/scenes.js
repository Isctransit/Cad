/* ISC — Illustrations animées des opérations de transit.
   Chaque scène dessine un SVG 1280x720 à un instant t (secondes).
   Utilisé par le site (cartes animées) et pour produire la vidéo "Le métier en 1 minute". */
(function (root) {
  "use strict";

  var C = {
    bg: "#0a0e1a", bg2: "#0f1424", bg3: "#141b30", line: "#1c2540",
    gold: "#c9a961", gold2: "#e8cf8e", cyan: "#34d3e0", cyan2: "#7fe9f1",
    text: "#f5f7fb", text2: "#8791a8", red: "#e0675a", green: "#3ecf8e",
    boxes: ["#c9a961", "#34d3e0", "#e0675a", "#5b7bd5", "#3ecf8e", "#e8cf8e"]
  };
  var F = "Inter, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
  var FS = "'Playfair Display', Georgia, serif";

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, k) { return a + (b - a) * k; }
  function ease(k) { k = clamp(k, 0, 1); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }
  function seg(t, a, b) { return ease((t - a) / (b - a)); }
  function fade(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }

  /* ---------- Éléments de décor ---------- */
  function sky(h) {
    return '<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141b30"/><stop offset="1" stop-color="#0a0e1a"/></linearGradient>' +
      '<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#123042"/><stop offset="1" stop-color="#0a0e1a"/></linearGradient>' +
      '<radialGradient id="sun"><stop offset="0" stop-color="#e8cf8e" stop-opacity=".55"/><stop offset="1" stop-color="#e8cf8e" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="1280" height="' + h + '" fill="url(#sk)"/>' +
      '<circle cx="1080" cy="120" r="90" fill="url(#sun)"/><circle cx="1080" cy="120" r="30" fill="#e8cf8e" opacity=".85"/>';
  }
  function waves(y, t) {
    var s = "";
    for (var i = 0; i < 3; i++) {
      var off = (t * (18 + i * 8)) % 160, yy = y + 14 + i * 18;
      s += '<path d="M' + (-160 + off) + ' ' + yy + ' q40 -8 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0" fill="none" stroke="' + (i === 2 ? C.gold : C.cyan) + '" stroke-width="2" opacity="' + (.35 - i * .08) + '"/>';
    }
    return s;
  }
  function box(x, y, w, h, col, doorsOpen) {
    var s = '<g><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" fill="' + col + '"/>';
    for (var i = 1; i < Math.floor(w / 14); i++) s += '<line x1="' + (x + i * 14) + '" y1="' + (y + 4) + '" x2="' + (x + i * 14) + '" y2="' + (y + h - 4) + '" stroke="#000" stroke-opacity=".18" stroke-width="3"/>';
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="2"/>';
    return s + '</g>';
  }
  function truck(x, y, col, scale) {
    scale = scale || 1;
    var s = '<g transform="translate(' + x + ' ' + y + ') scale(' + scale + ')">';
    // châssis + remorque (le conteneur repose dessus)
    s += '<rect x="0" y="62" width="300" height="12" fill="#2a3352"/>';
    if (col) s += box(10, -10, 280, 72, col);
    // cabine
    s += '<path d="M300 74 L300 6 L356 6 Q378 6 384 30 L392 50 L392 74 Z" fill="#e8ecf5"/>';
    s += '<path d="M318 16 L352 16 Q368 16 372 34 L376 46 L318 46 Z" fill="#1c2540"/>';
    s += '<rect x="300" y="56" width="92" height="6" fill="' + C.gold + '"/>';
    [40, 92, 250, 350].forEach(function (cx) {
      s += '<circle cx="' + cx + '" cy="80" r="17" fill="#0a0e1a"/><circle cx="' + cx + '" cy="80" r="7" fill="#8791a8"/>';
    });
    return s + '</g>';
  }
  var NOCAP = false;
  function caption(n, title, sub, t, L) {
    if (NOCAP) return "";
    var a = fade(t, .2, .8) * (1 - fade(t, L - .5, L));
    var s = '<g opacity="' + a.toFixed(3) + '">';
    s += '<rect x="0" y="600" width="1280" height="120" fill="#05070d" opacity=".82"/>';
    if (n) {
      s += '<circle cx="86" cy="660" r="30" fill="none" stroke="' + C.gold + '" stroke-width="3"/>';
      s += '<text x="86" y="671" text-anchor="middle" font-family="' + F + '" font-size="30" font-weight="700" fill="' + C.gold2 + '">' + n + '</text>';
    }
    s += '<text x="' + (n ? 140 : 60) + '" y="652" font-family="' + FS + '" font-size="36" font-weight="700" fill="' + C.text + '">' + title + '</text>';
    s += '<text x="' + (n ? 140 : 60) + '" y="690" font-family="' + F + '" font-size="22" fill="' + C.text2 + '">' + sub + '</text>';
    return s + '</g>';
  }
  function check(cx, cy, r, k) {
    if (k <= 0) return "";
    return '<g opacity="' + clamp(k * 2, 0, 1) + '"><circle cx="' + cx + '" cy="' + cy + '" r="' + r * ease(k) + '" fill="' + C.green + '"/>' +
      '<path d="M' + (cx - r * .45) + ' ' + cy + ' l' + r * .3 + ' ' + r * .32 + ' l' + r * .6 + ' ' + (-r * .62) + '" fill="none" stroke="#05070d" stroke-width="' + r * .2 + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + r * 2 + '" stroke-dashoffset="' + r * 2 * (1 - fade(k, .4, 1)) + '"/></g>';
  }

  /* ---------- Scènes ---------- */
  var scenes = [];

  // 0 — Titre
  scenes.push({ id: "intro", L: 3, draw: function (t, L) {
    var a = fade(t, 0, .8) * (1 - fade(t, L - .4, L));
    var s = sky(720) + '<rect y="470" width="1280" height="250" fill="url(#sea)"/>' + waves(470, t);
    s += '<g opacity="' + a + '" font-family="' + F + '" text-anchor="middle">';
    s += '<text x="640" y="250" font-size="24" letter-spacing="6" fill="' + C.gold + '">INTERNATIONAL SHIPPING COMPANY</text>';
    s += '<text x="640" y="335" font-family="' + FS + '" font-size="64" font-weight="700" fill="' + C.text + '">Le métier de commissionnaire</text>';
    s += '<text x="640" y="410" font-family="' + FS + '" font-size="64" font-weight="700" fill="' + C.text + '">en douane, en une minute</text>';
    s += '</g>';
    return s;
  }});

  // 1 — Prise en charge du dossier
  scenes.push({ id: "dossier", L: 8.5, label: "Prise en charge", draw: function (t, L) {
    var s = '<rect width="1280" height="720" fill="' + C.bg2 + '"/>';
    s += '<rect x="0" y="470" width="1280" height="250" fill="' + C.bg3 + '"/><rect x="0" y="466" width="1280" height="6" fill="' + C.gold + '" opacity=".5"/>';
    // dossier
    s += '<g transform="translate(150 150)"><path d="M0 40 L0 300 L380 300 L380 40 L170 40 L145 10 L0 10 Z" fill="#c9a961"/><rect x="0" y="60" width="380" height="240" fill="#e8cf8e"/>';
    s += '<text x="190" y="190" text-anchor="middle" font-family="' + FS + '" font-size="34" font-weight="700" fill="#2a2010">Dossier client</text>';
    s += '<text x="190" y="230" text-anchor="middle" font-family="' + F + '" font-size="20" fill="#5a4620">Import · Port de Radès</text></g>';
    var docs = ["Facture commerciale", "Connaissement (B/L)", "Liste de colisage", "Certificat d’origine"];
    docs.forEach(function (d, i) {
      var st = .6 + i * 1.5, k = seg(t, st, st + .8);
      var y = 120 + i * 92, x = lerp(1300, 640, k);
      s += '<g transform="translate(' + x + ' ' + y + ')"><rect width="470" height="72" rx="10" fill="#f5f7fb"/>' +
        '<rect x="18" y="16" width="30" height="40" rx="3" fill="none" stroke="#8791a8" stroke-width="3"/><line x1="24" y1="28" x2="42" y2="28" stroke="#8791a8" stroke-width="3"/><line x1="24" y1="38" x2="42" y2="38" stroke="#8791a8" stroke-width="3"/>' +
        '<text x="70" y="46" font-family="' + F + '" font-size="26" font-weight="600" fill="#0a0e1a">' + d + '</text>' +
        check(430, 36, 20, fade(t, st + 1, st + 1.6)) + '</g>';
    });
    return s + caption(1, "Prise en charge du dossier", "Vérification des documents avant l’arrivée du navire", t, L);
  }});

  // 2 — Débarquement du conteneur
  scenes.push({ id: "debarquement", L: 10, label: "Débarquement", draw: function (t, L) {
    var s = sky(720) + '<rect y="430" width="1280" height="290" fill="url(#sea)"/>' + waves(430, t);
    // quai
    s += '<rect x="760" y="420" width="520" height="300" fill="#1a2238"/><rect x="760" y="416" width="520" height="8" fill="' + C.gold + '" opacity=".6"/>';
    // navire
    s += '<path d="M40 420 L90 520 L700 520 L740 420 Z" fill="#141b30" stroke="' + C.gold + '" stroke-width="3"/>';
    s += '<rect x="60" y="408" width="660" height="14" fill="' + C.gold + '" opacity=".45"/>';
    s += '<rect x="80" y="300" width="80" height="108" fill="#0f1424" stroke="' + C.cyan + '" stroke-width="2"/>';
    for (var w = 0; w < 3; w++) s += '<rect x="' + (92 + w * 22) + '" y="320" width="14" height="14" fill="' + C.cyan + '" opacity=".6"/>';
    var stack = [[180, 374, 0], [304, 374, 1], [428, 374, 2], [552, 374, 3], [180, 340, 4], [304, 340, 5], [428, 340, 2], [552, 340, 1]];
    stack.forEach(function (p, i) {
      if (i === 7 && t > 2.4) return; // le conteneur qui part
      s += box(p[0], p[1], 120, 32, C.boxes[p[2]]);
    });
    // portique
    var px = 600;
    s += '<g stroke="#8791a8" stroke-width="10" fill="none"><line x1="' + (px + 220) + '" y1="420" x2="' + (px + 220) + '" y2="110"/><line x1="' + (px + 440) + '" y1="420" x2="' + (px + 440) + '" y2="110"/></g>';
    s += '<rect x="' + (px - 220) + '" y="96" width="760" height="22" fill="' + C.gold + '"/>';
    s += '<rect x="' + (px + 230) + '" y="60" width="200" height="40" fill="#1c2540" stroke="' + C.gold + '" stroke-width="2"/>';
    // cycle du chariot : prise sur le navire, dépose sur le camion
    var sx = 612, dx = 864, y0 = 280, yShip = 338, yTruck = 372;
    var tx = lerp(px + 300, sx, seg(t, .4, 1.6));
    var cy = y0;
    if (t > 1.6) cy = lerp(y0, yShip, seg(t, 1.6, 2.4));
    if (t > 2.4) cy = lerp(yShip, 200, seg(t, 2.4, 3.4));
    if (t > 3.4) tx = lerp(sx, dx, seg(t, 3.4, 5.4));
    if (t > 5.4) cy = lerp(200, yTruck, seg(t, 5.4, 6.6));
    if (t > 6.6) cy = lerp(yTruck, 150, seg(t, 6.8, 7.8));
    var carrying = t > 2.4 && t < 6.6;
    s += '<rect x="' + (tx - 30) + '" y="110" width="60" height="22" fill="#e8ecf5"/>';
    s += '<line x1="' + (tx - 18) + '" y1="132" x2="' + (tx - 18) + '" y2="' + (cy - 6) + '" stroke="#c3cadb" stroke-width="3"/><line x1="' + (tx + 18) + '" y1="132" x2="' + (tx + 18) + '" y2="' + (cy - 6) + '" stroke="#c3cadb" stroke-width="3"/>';
    s += '<rect x="' + (tx - 64) + '" y="' + (cy - 8) + '" width="128" height="10" fill="' + C.gold2 + '"/>';
    var trx = 800, tPosed = t >= 6.6;
    if (t > 7.6) trx = lerp(800, 1400, seg(t, 7.6, 9.6));
    s += truck(trx, 378, tPosed ? C.boxes[1] : null, .43);
    if (carrying) s += box(tx - 60, cy + 2, 120, 32, C.boxes[1]);
    return s + caption(2, "Débarquement du conteneur", "Le portique décharge le conteneur du navire sur le camion", t, L);
  }});

  // 3 — Déclaration en douane
  scenes.push({ id: "declaration", L: 9, label: "Déclaration", draw: function (t, L) {
    var s = '<rect width="1280" height="720" fill="' + C.bg2 + '"/>';
    s += '<rect x="0" y="520" width="1280" height="200" fill="' + C.bg3 + '"/>';
    // écran
    s += '<rect x="240" y="60" width="800" height="470" rx="18" fill="#1c2540"/><rect x="262" y="82" width="756" height="400" rx="6" fill="#f5f7fb"/>';
    s += '<rect x="600" y="530" width="80" height="40" fill="#1c2540"/><rect x="520" y="566" width="240" height="14" rx="7" fill="#1c2540"/>';
    s += '<rect x="262" y="82" width="756" height="56" fill="#15407a"/><text x="292" y="120" font-family="' + F + '" font-size="26" font-weight="700" fill="#fff">Déclaration en détail</text>';
    var rows = [["Bureau", "Radès Port"], ["Régime", "Mise à la consommation"], ["Position tarifaire", "8471.30"], ["Valeur en douane", "Calculée et justifiée"], ["Droits et taxes", "Liquidés et payés"]];
    rows.forEach(function (r, i) {
      var st = .6 + i * .9, y = 182 + i * 56;
      s += '<text x="300" y="' + y + '" font-family="' + F + '" font-size="22" fill="#5a6478">' + r[0] + '</text>';
      s += '<rect x="560" y="' + (y - 28) + '" width="420" height="40" rx="6" fill="#e9f1f9" stroke="#c9d6e8"/>';
      var n = Math.floor(r[1].length * fade(t, st, st + .7));
      s += '<text x="576" y="' + y + '" font-family="' + F + '" font-size="22" font-weight="600" fill="#0a0e1a">' + r[1].slice(0, n) + '</text>';
    });
    // tampon BAE
    var k = seg(t, 5.6, 6.2);
    if (t > 5.6) {
      var sc = lerp(1.8, 1, k);
      s += '<g transform="translate(830 410) rotate(-10) scale(' + sc + ')" opacity="' + k + '"><rect x="-150" y="-44" width="300" height="88" rx="8" fill="none" stroke="' + C.green + '" stroke-width="6"/>' +
        '<text x="0" y="14" text-anchor="middle" font-family="' + F + '" font-size="40" font-weight="800" letter-spacing="3" fill="' + C.green + '">BON À ENLEVER</text></g>';
    }
    return s + caption(3, "Déclaration en douane", "Classement, valeur, origine : la déclaration est déposée et liquidée", t, L);
  }});

  // 4 — Dépotage en magasin
  scenes.push({ id: "depotage", L: 9, label: "Dépotage", draw: function (t, L) {
    var s = '<rect width="1280" height="720" fill="' + C.bg2 + '"/>';
    // magasin
    s += '<path d="M0 120 L640 40 L1280 120 L1280 520 L0 520 Z" fill="#141b30"/>';
    for (var i = 0; i < 8; i++) s += '<line x1="' + (80 + i * 160) + '" y1="' + (110 - Math.abs(640 - (80 + i * 160)) * -0.12 - 70) + '" x2="' + (80 + i * 160) + '" y2="520" stroke="#1c2540" stroke-width="4"/>';
    s += '<rect x="0" y="520" width="1280" height="200" fill="#1a2238"/><line x1="0" y1="520" x2="1280" y2="520" stroke="' + C.gold + '" stroke-opacity=".5" stroke-width="4"/>';
    // conteneur ouvert à droite
    s += box(820, 300, 440, 220, C.boxes[3]);
    s += '<rect x="826" y="306" width="300" height="208" fill="#0a0e1a"/>';
    var dOpen = seg(t, .3, 1.2);
    s += '<rect x="' + lerp(826, 760, dOpen) + '" y="300" width="' + lerp(150, 40, dOpen) + '" height="220" fill="#4a69c0"/>';
    // palettes restantes dans le conteneur
    var done = [2.6, 5.0, 7.4];
    for (var p = 0; p < 3; p++) if (t < done[p] - 1.6) s += pallet(1040 - p * 76, 430);
    // palettes déjà rangées
    for (p = 0; p < 3; p++) if (t > done[p]) s += pallet(120 + p * 130, 430);
    // chariot élévateur : aller-retour
    var fx = 700, carry = false;
    for (p = 0; p < 3; p++) {
      var a = done[p] - 2.2, b = done[p] - 1.6, c = done[p];
      if (t > a && t <= b) { fx = lerp(700, 960 - p * 76, seg(t, a, b)); }
      else if (t > b && t <= c) { fx = lerp(960 - p * 76, 120 + p * 130 + 110, seg(t, b, c)); carry = true; }
      else if (t > c && t <= c + .2) { fx = 120 + p * 130 + 110; }
    }
    if (t > done[2] + .2) fx = lerp(370, 700, seg(t, done[2] + .2, done[2] + 1.2));
    s += forklift(fx, 520, carry);
    return s + caption(4, "Dépotage en magasin", "Les marchandises sont sorties du conteneur, comptées et rangées", t, L);
  }});
  function pallet(x, y) {
    return '<g><rect x="' + x + '" y="' + (y + 74) + '" width="96" height="12" fill="#8a6a3a"/><rect x="' + (x + 4) + '" y="' + y + '" width="88" height="74" rx="4" fill="#c9a961"/><line x1="' + (x + 4) + '" y1="' + (y + 37) + '" x2="' + (x + 92) + '" y2="' + (y + 37) + '" stroke="#8a6a3a" stroke-width="3"/><line x1="' + (x + 48) + '" y1="' + y + '" x2="' + (x + 48) + '" y2="' + (y + 74) + '" stroke="#8a6a3a" stroke-width="3"/></g>';
  }
  function forklift(x, y, carry) {
    var s = '<g transform="translate(' + x + ' ' + y + ')">';
    if (carry) s += pallet(-110, -86);
    s += '<rect x="-14" y="-140" width="8" height="140" fill="#c3cadb"/><rect x="-24" y="-8" width="16" height="6" fill="#c3cadb"/><rect x="-110" y="-4" width="100" height="5" fill="#c3cadb"/>';
    s += '<path d="M0 -10 L0 -80 L60 -80 L80 -40 L110 -40 L110 -10 Z" fill="' + C.gold + '"/><path d="M8 -74 L52 -74 L68 -44 L8 -44 Z" fill="#0a0e1a" opacity=".6"/>';
    s += '<circle cx="22" cy="-10" r="14" fill="#0a0e1a"/><circle cx="90" cy="-10" r="14" fill="#0a0e1a"/>';
    return s + '</g>';
  }

  // 5 — Enlèvement : sortie du port
  scenes.push({ id: "enlevement", L: 8, label: "Enlèvement", draw: function (t, L) {
    var s = sky(720) + '<rect y="460" width="1280" height="260" fill="#1a2238"/>';
    for (var i = 0; i < 12; i++) s += '<rect x="' + (i * 120 + ((t * 40) % 120) * 0) + '" y="584" width="60" height="6" fill="' + C.gold + '" opacity=".4"/>';
    // portiques au loin
    s += '<g stroke="#2a3352" stroke-width="6" fill="none"><path d="M60 460 L60 250 L260 250 L260 460 M30 250 L300 250"/><path d="M380 460 L380 280 L540 280 L540 460 M350 280 L580 280"/></g>';
    // poste de sortie
    s += '<rect x="760" y="360" width="120" height="120" fill="#141b30" stroke="' + C.gold + '" stroke-width="3"/><rect x="780" y="380" width="80" height="40" fill="' + C.cyan + '" opacity=".5"/>';
    s += '<text x="820" y="350" text-anchor="middle" font-family="' + F + '" font-size="22" font-weight="700" fill="' + C.gold2 + '">SORTIE PORT</text>';
    var bar = t < 3.2 ? 0 : seg(t, 3.2, 4);
    s += '<g transform="translate(890 470) rotate(' + (-80 * bar) + ')"><rect x="0" y="-8" width="300" height="14" fill="' + C.red + '"/>' +
      '<rect x="60" y="-8" width="40" height="14" fill="#fff"/><rect x="160" y="-8" width="40" height="14" fill="#fff"/></g><rect x="880" y="460" width="20" height="60" fill="#8791a8"/>';
    var tx = lerp(-460, 360, seg(t, 0, 2.6));
    if (t > 4) tx = lerp(360, 1400, seg(t, 4, 7.4));
    s += truck(tx, 450, C.boxes[1], .9);
    s += check(1160, 160, 34, t > 5 ? fade(t, 5, 6) : 0);
    return s + caption(5, "Enlèvement de la marchandise", "Bon à enlever présenté : le camion quitte le port", t, L);
  }});

  // 6 — Livraison chez le client
  scenes.push({ id: "livraison", L: 8, label: "Livraison", draw: function (t, L) {
    var s = sky(720) + '<rect y="480" width="1280" height="240" fill="#1a2238"/>';
    s += '<rect x="760" y="200" width="460" height="280" fill="#141b30" stroke="' + C.gold + '" stroke-width="3"/><path d="M740 210 L990 120 L1240 210" fill="none" stroke="' + C.gold + '" stroke-width="6"/>';
    s += '<rect x="820" y="300" width="200" height="180" fill="#0a0e1a"/>';
    for (var i = 0; i < 8; i++) s += '<line x1="822" y1="' + (310 + i * 22) + '" x2="1018" y2="' + (310 + i * 22) + '" stroke="#1c2540" stroke-width="4"/>';
    s += '<text x="990" y="260" text-anchor="middle" font-family="' + FS + '" font-size="32" font-weight="700" fill="' + C.text + '">Entrepôt client</text>';
    var tx = lerp(-460, 300, seg(t, 0, 3));
    s += truck(tx, 470, C.boxes[1], .9);
    var k = fade(t, 3.4, 4.2);
    if (k > 0) {
      s += '<g opacity="' + k + '"><rect x="340" y="120" width="380" height="110" rx="16" fill="#f5f7fb"/>' + check(400, 175, 32, fade(t, 3.6, 4.6)) +
        '<text x="452" y="168" font-family="' + F + '" font-size="28" font-weight="700" fill="#0a0e1a">Marchandise livrée</text>' +
        '<text x="452" y="202" font-family="' + F + '" font-size="20" fill="#5a6478">Bon de livraison signé</text></g>';
    }
    return s + caption(6, "Livraison chez le client", "La marchandise arrive à destination, le conteneur vide est restitué", t, L);
  }});

  // 7 — Fin
  scenes.push({ id: "outro", L: 4.5, draw: function (t, L) {
    var a = fade(t, 0, .8);
    var s = sky(720) + '<rect y="470" width="1280" height="250" fill="url(#sea)"/>' + waves(470, t);
    s += '<g opacity="' + a + '" font-family="' + F + '" text-anchor="middle">';
    s += '<text x="640" y="250" font-family="' + FS + '" font-size="60" font-weight="700" fill="' + C.text + '">International Shipping Company</text>';
    s += '<text x="640" y="310" font-size="26" fill="' + C.gold2 + '">Transit et dédouanement · Radès · La Goulette · Bizerte</text>';
    s += '<text x="640" y="390" font-size="30" font-weight="600" fill="' + C.text + '">+216 29 877 878  ·  info@stt.tn  ·  www.stt.tn</text>';
    s += '</g>';
    return s;
  }});

  function svgWrap(inner) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">' + inner + '</svg>';
  }

  var total = scenes.reduce(function (a, s) { return a + s.L; }, 0);

  root.ISCScenes = {
    list: scenes,
    total: total,
    byId: function (id) { return scenes.filter(function (s) { return s.id === id; })[0]; },
    drawScene: function (id, t, noCap) { var s = this.byId(id); NOCAP = !!noCap; var out = svgWrap(s.draw(clamp(t, 0, s.L), s.L)); NOCAP = false; return out; },
    drawAt: function (T) { // vidéo complète
      var acc = 0;
      for (var i = 0; i < scenes.length; i++) {
        if (T < acc + scenes[i].L || i === scenes.length - 1) return svgWrap(scenes[i].draw(clamp(T - acc, 0, scenes[i].L), scenes[i].L));
        acc += scenes[i].L;
      }
    }
  };

  /* Animation automatique des éléments [data-scene] du site, uniquement quand ils sont visibles */
  if (typeof document !== "undefined" && document.querySelectorAll) {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-scene]"));
    var reduce = root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var visible = new Set(), start = {};
    els.forEach(function (el, i) {
      var sc = root.ISCScenes.byId(el.getAttribute("data-scene"));
      if (!sc) return;
      el.innerHTML = root.ISCScenes.drawScene(sc.id, reduce ? sc.L * .7 : 0, true);
    });
    if (!reduce && "IntersectionObserver" in root) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
      }, { threshold: .2 });
      els.forEach(function (el) { io.observe(el); });
      var last = 0;
      (function loop(now) {
        if (now - last > 40) {
          last = now;
          visible.forEach(function (el) {
            var id = el.getAttribute("data-scene"), sc = root.ISCScenes.byId(id);
            if (!start[id]) start[id] = now;
            var t = ((now - start[id]) / 1000) % (sc.L + 1.2);
            el.innerHTML = root.ISCScenes.drawScene(id, t, true);
          });
        }
        root.requestAnimationFrame(loop);
      })(0);
    }
  }
})(typeof window !== "undefined" ? window : this);
