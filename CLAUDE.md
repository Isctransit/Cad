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
- `Flashcards Valeur en Douane.html` : flashcards de révision « Valeur en Douane — CAD 2026 ».
- `revision_examen_oral_V3_test_iPhone.html` : révision complète pour l'examen oral CAD
  (cours vidéo animé, version testée sur iPhone).

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
- Branche par défaut du dépôt : `claude/maritime-shipping-website-rp11iu` (pas de `main`).
- Pull request ouverte vers la branche par défaut, en attente de validation par l'utilisateur.

## Tâches en cours / à faire
- (aucune pour l'instant)
