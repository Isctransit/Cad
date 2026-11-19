# Paperclip (paperclipai/paperclip) — résumé

*Rédigé le 19/11/2026 à partir de la page GitHub du projet (README lu en partie).*
Dépôt : https://github.com/paperclipai/paperclip — site : paperclip.ing — licence MIT.

## En une phrase
Application open source pour **diriger une équipe d'agents IA comme une entreprise**.
Slogan : *« Si OpenClaw est un employé, Paperclip est l'entreprise. »*

Paperclip ne crée pas d'agents : c'est un **tableau de bord de contrôle** qui organise et surveille
des agents existants (Claude Code, Codex, Cursor, Gemini CLI, OpenCode, OpenClaw, Hermes, Grok Build,
Kimi Code, Pi…), ainsi que des processus personnalisés ou des points d'accès HTTP.

## Concepts clés
| Concept | Rôle |
|---|---|
| **Entreprises** | Une seule installation peut gérer plusieurs entreprises séparées |
| **Organigramme** | Chaque agent a un rôle, un titre, un responsable et des permissions |
| **Objectifs** | Chaque tâche est reliée à un objectif de l'entreprise : l'agent sait pourquoi il la fait |
| **Tickets** | Tâches avec commentaires et blocages ; une tâche prise est verrouillée pour éviter les doublons |
| **Heartbeats** | Les agents se réveillent quand on leur confie du travail, pour un suivi ou à heure fixe |
| **Budgets** | Plafonds par entreprise, agent ou projet, avec alertes et arrêt automatique |
| **Gouvernance** | Validations humaines (ex. « embauche » d'un agent), pause, réassignation, arrêt |

## Installation
Serveur Node.js + interface web, auto-hébergé. Avec Node.js 24.11 ou plus récent :

```
npx paperclipai@latest onboard --yes
```

Depuis le code source (pnpm 9.15+) :

```
git clone https://github.com/paperclipai/paperclip.git
cd paperclip
pnpm install
pnpm dev
```

Interface sur `http://localhost:3100`. Une base PostgreSQL intégrée est créée automatiquement.

## Limites
- L'arrêt sur budget se base sur les dépenses déjà enregistrées : un léger dépassement est possible.
- Chat avec les agents et connexions chat/e-mail : expérimentaux.
- Pas encore de version hébergée (liste d'attente pour le cloud).
- Utiliser son abonnement Claude ou Codex en local demande Python 3 et l'outil en ligne de commande du fournisseur.
- La compilation depuis les sources demande Rust (sauf si `PAPERCLIP_RUNNER_BINARY` est défini).
- L'export d'une entreprise masque les secrets, mais peut contenir des variables d'environnement et chemins locaux.

## Pertinence pour ce dépôt
Aucun lien direct avec `isctransit/cad`. Utile seulement pour faire travailler plusieurs agents IA
en parallèle avec budgets et validations.
