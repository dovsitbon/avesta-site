# Avesta : infos à demander au restaurant

À remplir avec le gérant, puis à reporter dans les fichiers indiqués.

1. **Son prénom et son histoire** : d'où il vient, pourquoi « Avesta », depuis quand le restaurant est ouvert → bloc « D'où vient Avesta » (`locales/*.json → blocks.perses`).
2. **Les vraies spécialités perses** servies : noms, description, prix, jours → `data/carte.json` (onglet `perses`, retirer le tag `toConfirm`).
3. **La carte complète et les prix sur place** (les prix actuels viennent de Deliveroo) : prix des tacos L et XL, composition des assiettes, liste des sauces, desserts → `data/carte.json`.
4. **Les horaires exacts** (11 h – 5 h tous les jours ?) et les fermetures prévues → `data/horaires.json`, `data/annonces.json`.
5. **Une offre étudiante** : contenu et prix → `data/carte.json` (`menu-etudiant`) et bloc « Menus étudiants ».
6. **Un portable pour WhatsApp** (le 03 75 50 82 02 est un fixe) → `data/site.json → whatsapp`.
7. **L'e-mail** qui recevra les commandes → variables Vercel `ORDER_NOTIFY_EMAIL` et `RESEND_API_KEY`.
8. **Des photos des plats et de la salle** → liste et noms dans `assets/A-PHOTOGRAPHIER.md`.
9. **Le logo**, s'il en existe un (enseigne, fichier) → sinon on garde le logo typographique.
10. **SIRET** : le registre indique 927 844 589 00014 (SAS AVESTA), à confirmer, avec le nom du directeur de la publication → `data/site.json → legal`.
11. **Moyens de paiement** acceptés, et **viande halal** ou non (à écrire seulement s'il le confirme).
12. **Son accord** pour reprendre quelques vrais avis Google sur le site.
