# Projet : logiciel de gestion pour transitaire (Tunisie)

Récapitulatif des échanges avec Claude, pour reprendre le projet plus tard.
Dernière mise à jour : 9 novembre 2026.

---

## 1. Contexte

- **Logiciel actuel** : développé à l'origine pour une agence maritime, il a plus de 20 ans.
  Il a été adapté au métier de **transitaire** avec la société d'un ami, qui en est l'éditeur.
  Il est aujourd'hui développé en **WinDev** (base HFSQL).
- **Autorisation** : l'éditeur ne juge pas rentable de faire lui-même les évolutions pour un
  seul utilisateur. Il a fourni le **code source** et autorisé verbalement sa modification,
  directement ou avec l'aide de Claude.
  - Recommandé : faire signer une **autorisation écrite** (droit de modifier, propriété des
    modifications, revente possible ou non). Vérifier aussi que la société de l'éditeur
    détient bien les droits, et non l'agence maritime d'origine.
- **Besoin déclencheur** : la facturation électronique obligatoire en Tunisie
  (plateforme **TTN** / El Fatoora).
- **Constat du marché** : il n'existe pas de logiciel professionnel pour les transitaires en
  Tunisie. Ceux qui existent sont des outils amateurs ou à base d'Excel.

## 2. Décisions prises

1. **Réécrire le logiciel de zéro en Python**, plutôt que de continuer en WinDev.
   Le nouveau code sera entièrement la propriété de l'utilisateur et pourra
   éventuellement être proposé à d'autres transitaires.
2. **Ne pas gérer la signature dans le logiciel** :
   - le logiciel produit les factures en **PDF** et en **XML au format TEIF**
     (format exigé par TTN), sans signature ;
   - un **prestataire agréé**, payé par abonnement mensuel, installe une interface qui
     récupère les factures, les signe avec la clé de l'utilisateur et les transmet à TTN.
     Il n'existe qu'environ 4 prestataires agréés.
3. **Règles fiscales paramétrables** et non écrites en dur, pour suivre les lois de finances
   annuelles : taux de TVA, droit de timbre, retenues à la source, mentions obligatoires,
   numérotation. Chaque paramètre a une date de début et une date de fin, et les anciennes
   factures gardent les anciennes valeurs.

## 3. Choix techniques proposés

| Élément | Choix |
|---|---|
| Langage | Python |
| Framework | Django (application web, avec espace d'administration intégré) |
| Base de données | PostgreSQL |
| PDF | weasyprint ou reportlab |
| XML TEIF | généré, puis validé avec le fichier XSD officiel de TTN |
| Qualité | tests automatiques sur tous les calculs (TVA, timbre, totaux, surestaries) |
| Migration | export des données HFSQL (CSV ou ODBC) vers PostgreSQL |
| Transition | l'ancien logiciel WinDev reste en service jusqu'à ce que la version Python soit complète et testée |

## 4. Modules prévus

### Repris du logiciel actuel
À compléter avec le résumé que l'utilisateur doit fournir : clients, dossiers de transit
(import et export), prestations et débours, facturation, etc.

### Nouveaux modules demandés
- **Traites et impayés** : échéancier, suivi des effets (en portefeuille, remis à
  l'encaissement, payés, impayés), relances, historique par client.
- **Cautions conteneurs** : caution par client, dossier, conteneur et compagnie maritime,
  avec la date de restitution prévue.
- **Surestaries** : calcul selon les jours de franchise et les tarifs (par tranches) de chaque
  compagnie, puis facturation.
- **Remboursements** : restitution totale de la caution, ou du reliquat après déduction de la
  facture de surestaries, avec rapprochement automatique caution, surestaries et solde.
- **Paramètres fiscaux** : voir la décision n° 3.
- *(« et plus encore » : à préciser)*

## 5. Ce qu'il reste à fournir

- [ ] Résumé du logiciel actuel, module par module (écrans, documents imprimés)
- [ ] Liste complète des améliorations souhaitées
- [ ] Parcours d'un dossier type, de l'ouverture à la facture et au remboursement de la caution
- [ ] Règles de calcul : surestaries (franchise, tranches), TVA par type de prestation, timbre
- [ ] Liste des prestations habituelles, en précisant lesquelles sont soumises à la TVA
- [ ] **Spécification TEIF de TTN** : guide et **fichier XSD**, plus un exemple de XML accepté
- [ ] Auprès du prestataire de signature : mode de récupération des factures (dossier, API,
      e-mail ?), XML seul ou XML et PDF
- [ ] Une ou deux factures actuelles (anonymisées si besoin)
- [ ] Autorisation écrite de l'éditeur (recommandé)

## 6. Prochaine étape

Dès que le résumé est fourni :
1. rédiger un cahier des charges ;
2. créer la structure du projet Django (clients, dossiers, factures, paramètres fiscaux) ;
3. ajouter la génération du XML TEIF une fois le fichier XSD disponible.

> Pour reprendre dans une nouvelle session Claude, demander :
> « Lis `NOTES-PROJET-GESTION-TRANSIT.md` et reprenons le projet. »
