# CLAUDE.md — Mémoire du projet

Ce fichier sert de **mémoire persistante** entre les sessions Claude Code.
Claude le lit automatiquement au début de chaque session. Il doit être mis à jour
à la fin de chaque session de travail (voir « Journal des sessions »).

## Consignes de l'utilisateur
- Répondre en **français**.
- Respecter en toutes circonstances les règles de sécurité et d'utilisation d'Anthropic.
- **Utiliser au maximum la mémoire** : consigner ici les travaux, décisions et discussions
  pour permettre une reprise ultérieure. Commiter et pousser ce fichier à chaque mise à jour
  (les sessions cloud sont temporaires : ce qui n'est pas poussé est perdu).

## Contenu du dépôt (`isctransit/cad`)
- `index.html` + `assets/` (css, js, img/logo-isc.jpg) : site vitrine
  **International Shipping Company** — transit & transport maritime international, Tunis.
- `formation.html` : page Formation CAD (liens vers les outils de révision ci-dessous).
- `flashcards_valeur.html` : flashcards de révision « Valeur en Douane — CAD 2026 ».
- `revision_examen_oral_V2_corrige.html` : révision de l'examen oral CAD (cours animé, voix + musique).
- `table33.html` : Table 33 — codes des régimes douaniers (filtrable, icône intégrée).
- `ngp.html` : Recherche NGP — Tarif Douanier Tunisien (9,5 Mo) ; essai gratuit 7 jours (localStorage `ngp_essai_debut`) puis écran « 5 DT/mois, carte bancaire uniquement » (bouton provisoire = mailto info@stt.tn, pas encore de paiement en ligne).
- `QCM_VALEUR.html`, dossier `caisse/`, `CNAME` (domaine personnalisé GitHub Pages).

## Décisions et informations à retenir
- **claude-mem** : plugin communautaire (non officiel) de mémoire pour Claude Code, stockage
  local dans `~/.claude-mem`. Inutile dans les sessions cloud (conteneur effacé) ; on utilise
  plutôt ce fichier `CLAUDE.md` versionné dans git.

## Journal des sessions
### 2026-11-19
- Question : « C'est quoi claude-mem ? » → explication donnée (voir ci-dessus).
- Création de ce fichier `CLAUDE.md` comme mémoire de projet.
- Branche de travail : `claude/inspiring-euler-v5a413`.
- Renommage de `Flashcards Valeur en Douane.html.html` → `Flashcards Valeur en Douane.html`
  (aucun lien interne ne pointait vers l'ancien nom).
- Branche par défaut du dépôt : `claude/maritime-shipping-website-rp11iu`. Une branche `main`
  existe aussi (contient CNAME, formation.html, QCM_VALEUR.html…, probablement le site publié).
- Pull request #4 (https://github.com/Isctransit/Cad/pull/4) redirigée vers `main` puis
  **fusionnée dans `main`** par Claude à la demande de l'utilisateur (commit 70f4e24).
  `main` = branche principale de travail (site publié, domaine personnalisé via CNAME).
- Doublons résolus (option recommandée, choisie par l'utilisateur) : on garde les noms et liens
  d'origine de `main` (`flashcards_valeur.html`, `revision_examen_oral_V2_corrige.html`) ; on y a
  reporté le nouveau titre des flashcards et, dans la V2, la correction « drawback (art. 298) »
  + le correctif de vitesse (`est / rate`), en **gardant la voix et la musique**. Les fichiers
  ajoutés par la PR #4 (`Flashcards Valeur en Douane.html`, `revision_examen_oral_V3_test_iPhone.html`)
  sont supprimés.
- Attention : la mention « École Nationale des Douanes » a été volontairement retirée du site
  (historique de `main`) ; ne pas la réintroduire.
- Ajout de `table33.html` (Table 33 — régimes douaniers) + carte « Table 33 » (style .t4 bleu marine)
  dans la section outils de `formation.html`. Publié sur `main`.
- Ajout de `ngp.html` + carte « Recherche NGP — Tarif » (.t5) sur `formation.html`. Choix utilisateur :
  7 jours gratuits puis 5 DT/mois, paiement par carte bancaire uniquement.

## Tâches en cours / à faire
- Paiement par carte pour NGP — plan décidé (2026-11-19) :
  - L'utilisateur a un **compte marchand ClicToPay** (API register.do / getOrderStatusExtended.do ;
    identifiants API à saisir par lui côté serveur, jamais dans le chat ni dans le dépôt).
  - Hébergement à souscrire chez **Hexabyte** : mutualisé Linux cPanel, PHP 8.1+ (cURL, OpenSSL,
    PDO MySQL, mbstring), 1 base MySQL, 2–5 Go, trafic ≥ 50 Go/mois, SSL gratuit, cron, appels HTTPS
    sortants autorisés (ClicToPay), sous-domaine **app.stt.tn** (le site reste sur GitHub Pages).
  - Backend à écrire en **PHP + MySQL** : comptes (e-mail), essai 7 jours côté serveur, paiement
    5 DT → accès 30 jours, ngp.html servi uniquement aux abonnés.
  - En attente : l'utilisateur souscrit l'hébergement et demande les accès TEST ClicToPay ;
    ensuite Claude prépare les fichiers PHP + guide de mise en ligne.
