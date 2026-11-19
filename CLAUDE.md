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
- `QCM_VALEUR.html`, dossier `caisse/`, `CNAME` (domaine personnalisé GitHub Pages).

## Décisions et informations à retenir
- **claude-mem** : plugin communautaire (non officiel) de mémoire pour Claude Code, stockage
  local dans `~/.claude-mem`. Inutile dans les sessions cloud (conteneur effacé) ; on utilise
  plutôt ce fichier `CLAUDE.md` versionné dans git.
- **ECC (Everything Claude Code, affaan-m/ECC)** : examiné le 2026-11-19 (72 agents, 327 skills,
  28 hooks automatiques). **Non installé**, décision de l'utilisateur : orienté développement
  logiciel, inutile pour ce projet, alourdit les sessions et exécute du code tiers à chaque action.

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

## Tâches en cours / à faire
- La note sur ECC (commit sur `claude/inspiring-euler-v5a413`) n'est pas encore dans `main` :
  l'inclure dans la prochaine pull request (l'utilisateur ne veut pas de PR dédiée).
