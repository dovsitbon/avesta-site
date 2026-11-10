# Avesta : contenu du site (à valider)

Généré depuis `locales/fr.json`, `locales/en.json` et `data/*.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`.

## Titre du hero : 3 propositions

1. **Ouvert quand Amiens a faim.** (en ligne) · EN : Open when Amiens gets hungry.
2. De la Perse à la rue des Augustins.
3. Jusqu'à 5 h, tous les jours.

## À faire valider en priorité

- **Les spécialités perses** : aucune n'apparaît sur Deliveroo ni Uber Eats. Les 4 plats en ligne (kabab koobideh, joojeh kabab, riz au safran et tahdig, doogh) sont des **propositions** marquées « À confirmer », non commandables en ligne et absentes des données envoyées à Google. À remplacer par les vrais plats et leurs prix.
- **Les prix** : relevés sur Deliveroo le 2026-11-10 (souvent un peu plus chers que sur place). Prix des tacos L et XL inconnus.
- **Composition des assiettes** (« viande, frites et salade ») et **liste des sauces** : supposées, à confirmer.
- **Menu étudiant** et **desserts** : rien de connu, emplacements prêts.
- **Horaires** : 11 h – 5 h tous les jours (Google, Mappy). Note Google affichée : 4,7/5 sur 199 avis, relevée le 2026-11-10.
- **Moyens de paiement** acceptés, et viande halal ou non (Uber Eats classe Avesta en « Halal » : à confirmer avant de l'écrire).
- **Directeur de la publication** pour les mentions légales.

## Référencement (balises title / description)

**FR** · Restaurant perse et tacos ouvert jusqu'à 5 h à Amiens | Avesta

> Avesta, 49 rue des Augustins à Amiens : spécialités perses, tacos, assiettes, sandwichs et frites, tous les jours de 11 h à 5 h du matin. Sur place ou à emporter, commande en ligne.

**EN** · Persian food and tacos open until 5 am in Amiens | Avesta

> Avesta, 49 rue des Augustins, Amiens: Persian specialities, tacos, plates, sandwiches and fries, every day from 11 am to 5 am. Eat in or take away, order online.

## Horaires (data/horaires.json)

- Lundi : 11:00 – 05:00
- Mardi : 11:00 – 05:00
- Mercredi : 11:00 – 05:00
- Jeudi : 11:00 – 05:00
- Vendredi : 11:00 – 05:00
- Samedi : 11:00 – 05:00
- Dimanche : 11:00 – 05:00

## La carte et les prix (data/carte.json)

- Viandes au choix : Poulet, Kebab, Tenders, Nuggets, Steak, Cordon bleu, Merguez, Kefta
- Sauces : Blanche, Algérienne, Samouraï, Harissa, Biggy, Barbecue, Ketchup, Mayonnaise
- Base des box : Riz, Pâtes

### Spécialités perses / Persian specialities

| Plat (FR) | Dish (EN) | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|
| Kabab koobideh | Kabab koobideh | **à confirmer** | À confirmer | La brochette perse de viande hachée, grillée, avec riz au safran et tomate grillée. | The Persian minced-meat skewer, grilled, with saffron rice and grilled tomato. |
| Joojeh kabab | Joojeh kabab | **à confirmer** | À confirmer | Poulet mariné au safran et au citron, grillé en brochette. | Chicken marinated in saffron and lemon, grilled on a skewer. |
| Riz au safran et tahdig | Saffron rice and tahdig | **à confirmer** | À confirmer | Riz basmati parfumé au safran et sa croûte dorée, le tahdig. | Saffron basmati rice with its golden crust, the tahdig. |
| Doogh | Doogh | **à confirmer** | À confirmer | La boisson perse au yaourt et à la menthe, bien fraîche. | The Persian yoghurt and mint drink, served cold. |

### Tacos / Tacos

| Plat (FR) | Dish (EN) | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|
| Tacos | Tacos | Taille M 7,99 €, Taille L **à confirmer**, Taille XL **à confirmer** |  | Galette grillée, votre viande, vos sauces et des frites dedans. Trois tailles. | Grilled wrap, your choice of meat, your sauces and fries inside. Three sizes. |

### Assiettes / Plates

| Plat (FR) | Dish (EN) | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|
| Assiette adana | Adana plate | 19,00 € | Relevé | Brochette de viande hachée relevée, frites et salade. | Spiced minced-meat skewer, fries and salad. |
| Assiette kebab | Kebab plate | 16,00 € |  | Viande kebab, frites et salade, avec la sauce de votre choix. | Kebab meat, fries and salad, with your choice of sauce. |
| Assiette kefta | Kefta plate | 16,00 € |  | Kefta grillée, frites et salade. | Grilled kefta, fries and salad. |
| Assiette poulet | Chicken plate | 16,00 € |  | Poulet, frites et salade. | Chicken, fries and salad. |
| Assiette tenders | Tenders plate | 16,00 € |  | Tenders croustillants, frites et salade. | Crispy tenders, fries and salad. |
| Assiette steak | Beef patty plate | 16,00 € |  | Steak, frites et salade. | Beef patty, fries and salad. |
| Assiette cordon bleu | Cordon bleu plate | 16,00 € |  | Cordon bleu, frites et salade. | Cordon bleu, fries and salad. |
| Assiette merguez | Merguez plate | 16,00 € | Relevé | Merguez grillées, frites et salade. | Grilled merguez, fries and salad. |
| Assiette nuggets | Nuggets plate | 16,00 € |  | Nuggets, frites et salade. | Nuggets, fries and salad. |

### Sandwichs / Sandwiches

| Plat (FR) | Dish (EN) | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|
| Sandwich | Sandwich | à partir de 7,50 € |  | Votre viande au choix : poulet, kebab, nuggets… Crudités et sauce. | Your choice of meat: chicken, kebab, nuggets… Salad and sauce. |
| Burger | Burger | à partir de 7,50 € |  | Poulet, steak ou tenders, avec la sauce de votre choix. | Chicken, beef or tenders, with your choice of sauce. |
| Panini | Panini | à partir de 8,00 € |  | Kebab, poulet, steak… pressé et bien chaud. | Kebab, chicken, beef… pressed and piping hot. |

### Box & menus / Boxes & set menus

| Plat (FR) | Dish (EN) | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|
| Box | Box | 9,00 € |  | Base riz ou pâtes, votre viande et votre sauce. | Rice or pasta base, your meat and your sauce. |
| Menu étudiant | Student menu | **à confirmer** | À confirmer | Une formule pour les étudiants. Contenu et prix bientôt en ligne. | A deal for students. Details and price coming soon. |

### Desserts & boissons / Desserts & drinks

| Plat (FR) | Dish (EN) | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|
| Desserts | Desserts | **à confirmer** | À confirmer | Demandez au comptoir ce qu'il y a ce soir. | Ask at the counter what's on tonight. |
| Canette 33 cl | 33 cl can | 2,30 € |  | Coca-Cola, Fanta, Oasis, Ice Tea, Sprite, Orangina, Tropico, Hawaï. | Coca-Cola, Fanta, Oasis, Ice Tea, Sprite, Orangina, Tropico, Hawaï. |
| Monster ou Red Bull | Monster or Red Bull | 3,00 € |  | En canette. | Can. |
| Bouteille 50 cl | 50 cl bottle | 2,80 € |  | Coca-Cola, Ice Tea, Volvic aromatisée, Tropico, Cristaline pêche. | Coca-Cola, Ice Tea, flavoured Volvic, Tropico, peach Cristaline. |
| Jus de fruits 25 cl | 25 cl fruit juice | 2,50 € |  | Orange, pomme ou multifruit. | Orange, apple or multifruit. |
| Eau 50 cl | 50 cl water | 2,00 € |  | Cristaline. | Cristaline. |
| Grande bouteille | Large bottle | 3,50 € |  | Coca-Cola ou Fanta 1,5 L, Ice Tea 1,25 L. À partager. | Coca-Cola or Fanta 1.5 L, Ice Tea 1.25 L. For sharing. |

## Textes du site

### nav

- `nav.skip`
  - FR : Aller au contenu
  - EN : Skip to content
- `nav.menu`
  - FR : Menu
  - EN : Menu
- `nav.close`
  - FR : Fermer
  - EN : Close
- `nav.home`
  - FR : Avesta, accueil
  - EN : Avesta, home
- `nav.carte`
  - FR : La carte
  - EN : Menu
- `nav.perses`
  - FR : Spécialités perses
  - EN : Persian specialities
- `nav.order`
  - FR : Commander
  - EN : Order
- `nav.infos`
  - FR : Infos
  - EN : Info
- `nav.orderCta`
  - FR : Commander
  - EN : Order
- `nav.call`
  - FR : Appeler
  - EN : Call
- `nav.route`
  - FR : Itinéraire
  - EN : Directions
- `nav.lang`
  - FR : Langue
  - EN : Language

### intro

- `intro.skip`
  - FR : Passer
  - EN : Skip
- `intro.open`
  - FR : Ouvert jusqu'à 5 h
  - EN : Open until 5 am

### announce

- `announce.close`
  - FR : Fermer le bandeau
  - EN : Close the banner

### hero

- `hero.eyebrow`
  - FR : Spécialités perses · Tacos · Assiettes · Amiens
  - EN : Persian specialities · Tacos · Plates · Amiens
- `hero.title`
  - FR : Ouvert quand Amiens a faim.
  - EN : Open when Amiens gets hungry.
- `hero.sub`
  - FR : Tous les jours, de 11 h à 5 h du matin. Rue des Augustins.
  - EN : Every day, from 11 am to 5 am. Rue des Augustins.
- `hero.ctaOrder`
  - FR : Commander
  - EN : Order
- `hero.ctaMenu`
  - FR : Voir le menu
  - EN : See the menu
- `hero.rating`
  - FR : {value}/5 sur Google
  - EN : {value}/5 on Google
- `hero.ratingCount`
  - FR : {count} avis
  - EN : {count} reviews
- `hero.ratingNote`
  - FR : Note Google relevée le {date}
  - EN : Google rating checked on {date}

### status

- `status.open`
  - FR : Ouvert maintenant
  - EN : Open now
- `status.closed`
  - FR : Fermé en ce moment
  - EN : Closed right now
- `status.until`
  - FR : jusqu'à {time}
  - EN : until {time}
- `status.opens`
  - FR : ouvre {day} à {time}
  - EN : opens {day} at {time}
- `status.today`
  - FR : aujourd'hui
  - EN : today
- `status.tomorrow`
  - FR : demain
  - EN : tomorrow

### tiles

- `tiles.title`
  - FR : La carte en un coup d'œil
  - EN : The menu at a glance
- `tiles.items.perses`
  - FR : Spécialités perses
  - EN : Persian specialities
- `tiles.items.tacos`
  - FR : Tacos
  - EN : Tacos
- `tiles.items.assiettes`
  - FR : Assiettes
  - EN : Plates
- `tiles.items.sandwichs`
  - FR : Sandwichs
  - EN : Sandwiches
- `tiles.items.menus`
  - FR : Menus
  - EN : Set menus
- `tiles.items.desserts-boissons`
  - FR : Desserts & boissons
  - EN : Desserts & drinks

### services

- `services.title`
  - FR : Les services d'Avesta
  - EN : What Avesta offers
- `services.items[0].t`
  - FR : Jusqu'à 5 h
  - EN : Until 5 am
- `services.items[0].d`
  - FR : Tous les jours, même le dimanche.
  - EN : Every day, Sundays too.
- `services.items[1].t`
  - FR : À emporter
  - EN : Takeaway
- `services.items[1].d`
  - FR : Commandez, passez, c'est prêt.
  - EN : Order, drop by, it's ready.
- `services.items[2].t`
  - FR : Sur place
  - EN : Eat in
- `services.items[2].d`
  - FR : Une table, une assiette, on s'occupe du reste.
  - EN : Grab a table, we'll handle the rest.
- `services.items[3].t`
  - FR : Par téléphone
  - EN : By phone
- `services.items[3].d`
  - FR : 03 75 50 82 02, à toute heure d'ouverture.
  - EN : 03 75 50 82 02, any time we're open.

### blocks

- `blocks.perses.eyebrow`
  - FR : D'où vient Avesta
  - EN : Where Avesta comes from
- `blocks.perses.title`
  - FR : Un peu de Perse, rue des Augustins.
  - EN : A taste of Persia, rue des Augustins.
- `blocks.perses.text`
  - FR : Avesta est un restaurant de spécialités perses. Safran, grillades, riz parfumé : les recettes de la maison ont leur place à côté des tacos et des assiettes.
  - EN : Avesta is a Persian restaurant at heart. Saffron, grills, fragrant rice: our house recipes sit right next to the tacos and plates.
- `blocks.perses.cta`
  - FR : Voir le menu
  - EN : See the menu
- `blocks.perses.photo`
  - FR : Spécialité perse, en gros plan
  - EN : A Persian dish, close up
- `blocks.nuit.eyebrow`
  - FR : La nuit à Amiens
  - EN : Amiens at night
- `blocks.nuit.title`
  - FR : Il est 2 h. C'est ouvert.
  - EN : It's 2 am. We're open.
- `blocks.nuit.text`
  - FR : Après les cours, après le service, après la soirée : on vous attend jusqu'à 5 h, tous les jours. La lumière est allumée, la plancha aussi.
  - EN : After class, after your shift, after the party: we're here until 5 am, every day. The lights are on, and so is the grill.
- `blocks.nuit.cta`
  - FR : Itinéraire
  - EN : Directions
- `blocks.nuit.photo`
  - FR : La façade éclairée, la nuit
  - EN : The shopfront, lit up at night
- `blocks.etudiants.eyebrow`
  - FR : Menus étudiants
  - EN : Student deals
- `blocks.etudiants.title`
  - FR : Bien manger, sans vider le compte.
  - EN : Eat well without emptying your account.
- `blocks.etudiants.text`
  - FR : Beaucoup d'étudiants passent nous voir. Une formule pensée pour eux arrive bientôt. En attendant, le tacos commence à 7,99 €.
  - EN : Lots of students drop by. A deal made for them is on its way. Meanwhile, tacos start at €7.99.
- `blocks.etudiants.cta`
  - FR : Commander
  - EN : Order
- `blocks.etudiants.photo`
  - FR : Un tacos et ses frites
  - EN : Tacos and fries

### reviews

- `reviews.eyebrow`
  - FR : Avis
  - EN : Reviews
- `reviews.title`
  - FR : Ce qu'on en dit sur Google
  - EN : What people say on Google
- `reviews.text`
  - FR : Les tacos, les assiettes, les frites, l'accueil et les horaires de nuit : c'est ce qui revient le plus.
  - EN : The tacos, the plates, the fries, the welcome and the late hours: that's what comes up most.
- `reviews.cta`
  - FR : Lire les avis sur Google
  - EN : Read the Google reviews

### order

- `order.eyebrow`
  - FR : Commander
  - EN : Order
- `order.title`
  - FR : Commandez. Passez. C'est prêt.
  - EN : Order. Drop by. It's ready.
- `order.intro`
  - FR : Choisissez vos plats, sur place ou à emporter, et l'heure qui vous arrange. Vous réglez au comptoir.
  - EN : Pick your dishes, eat in or take away, and the time that suits you. You pay at the counter.
- `order.callTitle`
  - FR : Plus simple au téléphone ?
  - EN : Easier by phone?
- `order.callText`
  - FR : Appelez-nous à toute heure d'ouverture, on note tout.
  - EN : Call us any time we're open, we'll take it all down.
- `order.callCta`
  - FR : Appeler
  - EN : Call
- `order.itemsTitle`
  - FR : Vos plats
  - EN : Your dishes
- `order.modeTitle`
  - FR : Sur place ou à emporter
  - EN : Eat in or take away
- `order.pickupTitle`
  - FR : À quelle heure ?
  - EN : What time?
- `order.contactTitle`
  - FR : Vos coordonnées
  - EN : Your details
- `order.dish`
  - FR : Plat
  - EN : Dish
- `order.quantity`
  - FR : Quantité
  - EN : Quantity
- `order.addLine`
  - FR : Ajouter un plat
  - EN : Add a dish
- `order.removeLine`
  - FR : Retirer ce plat
  - EN : Remove this dish
- `order.day`
  - FR : Jour
  - EN : Day
- `order.time`
  - FR : Heure
  - EN : Time
- `order.tonight`
  - FR : Cette nuit
  - EN : Tonight
- `order.today`
  - FR : Aujourd'hui
  - EN : Today
- `order.tomorrow`
  - FR : Demain
  - EN : Tomorrow
- `order.noSlots`
  - FR : Plus de créneau ce jour-là : choisissez un autre jour.
  - EN : No more slots that day: pick another day.
- `order.modes.emporter`
  - FR : À emporter
  - EN : Takeaway
- `order.modes.surPlace`
  - FR : Sur place
  - EN : Eat in
- `order.name`
  - FR : Nom
  - EN : Name
- `order.phone`
  - FR : Téléphone
  - EN : Phone
- `order.email`
  - FR : E-mail (facultatif)
  - EN : Email (optional)
- `order.emailHint`
  - FR : Pour recevoir le récapitulatif de votre commande.
  - EN : To get a summary of your order.
- `order.message`
  - FR : Une remarque ?
  - EN : Anything to add?
- `order.messagePh`
  - FR : Sans oignons, allergie, couverts…
  - EN : No onions, allergy, cutlery…
- `order.total`
  - FR : Total estimé
  - EN : Estimated total
- `order.totalNote`
  - FR : Certains prix restent à confirmer au comptoir.
  - EN : Some prices are still to be confirmed at the counter.
- `order.submit`
  - FR : Envoyer ma commande
  - EN : Send my order
- `order.sending`
  - FR : Envoi…
  - EN : Sending…
- `order.payNote`
  - FR : Pas de paiement en ligne : vous réglez au comptoir.
  - EN : No online payment: you pay at the counter.
- `order.payOnline`
  - FR : Payer en ligne
  - EN : Pay online
- `order.phoneOnly`
  - FR : Les spécialités perses se commandent au téléphone pour l'instant.
  - EN : Persian specialities can be ordered by phone for now.
- `order.errors.lines`
  - FR : Choisissez au moins un plat.
  - EN : Choose at least one dish.
- `order.errors.day`
  - FR : Choisissez un jour.
  - EN : Choose a day.
- `order.errors.time`
  - FR : Choisissez une heure.
  - EN : Choose a time.
- `order.errors.name`
  - FR : Indiquez votre nom.
  - EN : Please enter your name.
- `order.errors.phone`
  - FR : Indiquez un numéro de téléphone valide.
  - EN : Please enter a valid phone number.
- `order.errors.email`
  - FR : Cette adresse e-mail ne semble pas valide.
  - EN : This email address doesn't look right.
- `order.errors.send`
  - FR : L'envoi n'a pas fonctionné. Appelez-nous, on prend votre commande au téléphone.
  - EN : Sending failed. Call us and we'll take your order by phone.
- `order.done.title`
  - FR : C'est noté.
  - EN : Got it.
- `order.done.text`
  - FR : Votre commande est partie en cuisine. Si on a une question, on vous appelle.
  - EN : Your order is on its way to the kitchen. If we have a question, we'll call you.
- `order.done.pendingTitle`
  - FR : Dernière étape : un appel
  - EN : One last step: a call
- `order.done.pendingText`
  - FR : Votre récapitulatif est prêt. Appelez-nous pour confirmer, on lance la commande tout de suite.
  - EN : Your summary is ready. Call us to confirm and we'll start right away.
- `order.done.mail`
  - FR : Un récapitulatif a été envoyé à {email}.
  - EN : A summary has been sent to {email}.
- `order.done.again`
  - FR : Nouvelle commande
  - EN : New order
- `order.whatsapp`
  - FR : Envoyer sur WhatsApp
  - EN : Send on WhatsApp
- `order.mail.subject`
  - FR : Nouvelle commande
  - EN : New order
- `order.mail.title`
  - FR : Nouvelle commande
  - EN : New order
- `order.mail.lines`
  - FR : Plats
  - EN : Dishes
- `order.mail.mode`
  - FR : Service
  - EN : Service
- `order.mail.pickup`
  - FR : Heure
  - EN : Time
- `order.mail.name`
  - FR : Nom
  - EN : Name
- `order.mail.phone`
  - FR : Téléphone
  - EN : Phone
- `order.mail.email`
  - FR : E-mail
  - EN : Email
- `order.mail.message`
  - FR : Remarque
  - EN : Note
- `order.mail.total`
  - FR : Total estimé
  - EN : Estimated total
- `order.mail.lang`
  - FR : Langue du client
  - EN : Customer language
- `order.mail.confirmSubject`
  - FR : Avesta : votre commande
  - EN : Avesta: your order
- `order.mail.confirmIntro`
  - FR : Bonjour {name}, merci pour votre commande. La voici :
  - EN : Hello {name}, thanks for your order. Here it is:
- `order.mail.confirmOutro`
  - FR : Vous réglez au comptoir. Une question ? Appelez-nous au 03 75 50 82 02. ↵  ↵ À tout à l'heure, ↵ Avesta, 49 rue des Augustins, Amiens
  - EN : You pay at the counter. Any question? Call us on +33 3 75 50 82 02. ↵  ↵ See you soon, ↵ Avesta, 49 rue des Augustins, Amiens

### infos

- `infos.eyebrow`
  - FR : Infos pratiques
  - EN : Practical info
- `infos.title`
  - FR : 49 rue des Augustins. Jusqu'à 5 h.
  - EN : 49 rue des Augustins. Until 5 am.
- `infos.address`
  - FR : Adresse
  - EN : Address
- `infos.access`
  - FR : Venir
  - EN : Getting here
- `infos.accessText`
  - FR : En plein centre d'Amiens, à quelques minutes à pied de la cathédrale. Pour se garer : places en voirie dans les rues voisines et parkings du centre-ville. À pied, c'est encore plus simple.
  - EN : Right in the centre of Amiens, a few minutes' walk from the cathedral. Parking: street spaces nearby and the city-centre car parks. On foot is even easier.
- `infos.phone`
  - FR : Téléphone
  - EN : Phone
- `infos.hours`
  - FR : Horaires
  - EN : Opening hours
- `infos.route`
  - FR : Itinéraire
  - EN : Directions
- `infos.mapTitle`
  - FR : Carte : Avesta, 49 rue des Augustins, Amiens
  - EN : Map: Avesta, 49 rue des Augustins, Amiens
- `infos.days[0]`
  - FR : Lundi
  - EN : Monday
- `infos.days[1]`
  - FR : Mardi
  - EN : Tuesday
- `infos.days[2]`
  - FR : Mercredi
  - EN : Wednesday
- `infos.days[3]`
  - FR : Jeudi
  - EN : Thursday
- `infos.days[4]`
  - FR : Vendredi
  - EN : Friday
- `infos.days[5]`
  - FR : Samedi
  - EN : Saturday
- `infos.days[6]`
  - FR : Dimanche
  - EN : Sunday
- `infos.everyDay`
  - FR : Tous les jours
  - EN : Every day
- `infos.closed`
  - FR : Fermé
  - EN : Closed
- `infos.services`
  - FR : Sur place · À emporter · Commande par téléphone
  - EN : Eat in · Takeaway · Phone orders
- `infos.delivery`
  - FR : Livraison : Avesta est aussi sur Deliveroo et Uber Eats.
  - EN : Delivery: Avesta is also on Deliveroo and Uber Eats.

### faq

- `faq.eyebrow`
  - FR : Questions fréquentes
  - EN : FAQ
- `faq.title`
  - FR : Bon à savoir
  - EN : Good to know
- `faq.items[0].q`
  - FR : Jusqu'à quelle heure êtes-vous ouverts ?
  - EN : How late are you open?
- `faq.items[0].a`
  - FR : Tous les jours, de 11 h à 5 h du matin, week-end compris. Le statut « Ouvert maintenant » en haut du site est à jour en direct. Les fermetures exceptionnelles sont annoncées dans le bandeau.
  - EN : Every day from 11 am to 5 am, weekends included. The “Open now” status at the top of the site updates live. Exceptional closures are announced in the banner.
- `faq.items[1].q`
  - FR : Comment commander à emporter ?
  - EN : How do I order takeaway?
- `faq.items[1].a`
  - FR : Avec le formulaire du site : choisissez vos plats, sur place ou à emporter, et votre heure. Vous pouvez aussi appeler le 03 75 50 82 02, ou passer directement au comptoir.
  - EN : Use the form on this site: pick your dishes, eat in or takeaway, and your time. You can also call +33 3 75 50 82 02 or just come to the counter.
- `faq.items[2].q`
  - FR : Combien de temps faut-il attendre ?
  - EN : How long is the wait?
- `faq.items[2].a`
  - FR : En commandant en ligne, vous choisissez votre heure : au plus tôt 20 minutes après votre commande. Votre plat est prêt quand vous arrivez.
  - EN : When you order online, you choose your time: at the earliest 20 minutes after ordering. Your food is ready when you arrive.
- `faq.items[3].q`
  - FR : Comment payer ?
  - EN : How do I pay?
- `faq.items[3].a`
  - FR : Vous réglez au comptoir, au moment du retrait ou à la fin du repas. Il n'y a pas de paiement en ligne pour l'instant.
  - EN : You pay at the counter, when you collect or at the end of your meal. There's no online payment for now.
- `faq.items[4].q`
  - FR : Proposez-vous des spécialités perses ?
  - EN : Do you serve Persian food?
- `faq.items[4].a`
  - FR : Oui, c'est l'identité d'Avesta. La liste complète arrive bientôt sur le site : en attendant, demandez au comptoir ce qui est servi ce jour-là.
  - EN : Yes, it's what Avesta is about. The full list is coming to the site soon: meanwhile, ask at the counter what's on today.
- `faq.items[5].q`
  - FR : Livrez-vous ?
  - EN : Do you deliver?
- `faq.items[5].a`
  - FR : Pas directement, mais Avesta est sur Deliveroo et Uber Eats. Pour le meilleur prix et des frites bien chaudes, le plus simple reste de commander ici et de passer.
  - EN : Not directly, but Avesta is on Deliveroo and Uber Eats. For the best price and hot fries, ordering here and dropping by is the easiest.

### footer

- `footer.tagline`
  - FR : Spécialités perses, tacos, assiettes et frites. Tous les jours, jusqu'à 5 h du matin.
  - EN : Persian specialities, tacos, plates and fries. Every day, until 5 am.
- `footer.menu`
  - FR : La carte
  - EN : Menu
- `footer.nuit`
  - FR : Restaurant ouvert tard à Amiens
  - EN : Late-night food in Amiens
- `footer.tacos`
  - FR : Tacos à Amiens
  - EN : Tacos in Amiens
- `footer.legal`
  - FR : Mentions légales
  - EN : Legal notice
- `footer.rights`
  - FR : © {year} Avesta, Amiens
  - EN : © {year} Avesta, Amiens

### slots

- `slots.soon`
  - FR : Photo à venir
  - EN : Photo coming soon
- `slots.hero`
  - FR : La façade éclairée, la nuit
  - EN : The shopfront, lit up at night
- `slots.facade`
  - FR : La façade
  - EN : The shopfront
- `slots.salle`
  - FR : La salle
  - EN : The dining room

### carte (textes autour de la carte)

- `carte.eyebrow`
  - FR : La carte
  - EN : The menu
- `carte.title`
  - FR : Choisissez. On s'occupe du reste.
  - EN : You choose. We do the rest.
- `carte.intro`
  - FR : Tacos, assiettes, sandwichs et spécialités perses. Les prix sont en clair, l'ajout à la commande en un geste.
  - EN : Tacos, plates, sandwiches and Persian specialities. Clear prices, one tap to add to your order.
- `carte.tabsLabel`
  - FR : Catégories de la carte
  - EN : Menu categories
- `carte.tabs.perses`
  - FR : Spécialités perses
  - EN : Persian specialities
- `carte.tabs.tacos`
  - FR : Tacos
  - EN : Tacos
- `carte.tabs.assiettes`
  - FR : Assiettes
  - EN : Plates
- `carte.tabs.sandwichs`
  - FR : Sandwichs
  - EN : Sandwiches
- `carte.tabs.menus`
  - FR : Box & menus
  - EN : Boxes & set menus
- `carte.tabs.desserts-boissons`
  - FR : Desserts & boissons
  - EN : Desserts & drinks
- `carte.priceOnSite`
  - FR : Prix sur place
  - EN : Price in store
- `carte.from`
  - FR : à partir de {price}
  - EN : from {price}
- `carte.add`
  - FR : Ajouter
  - EN : Add
- `carte.addLabel`
  - FR : Ajouter à la commande : {name}
  - EN : Add to order: {name}
- `carte.askOnSite`
  - FR : Demandez au comptoir
  - EN : Ask at the counter
- `carte.seeFull`
  - FR : Toute la carte
  - EN : Full menu
- `carte.persesNote`
  - FR : Les spécialités perses de la maison sont en cours de mise en ligne. Celles-ci sont à confirmer : demandez au comptoir ce qui est servi ce jour-là.
  - EN : Our Persian specialities are being added to the site. These are still to be confirmed: ask at the counter what's on today.
- `carte.choicesTitle`
  - FR : Au choix
  - EN : Your choice of
- `carte.allergens`
  - FR : Allergènes : demandez-nous, on vous dit tout plat par plat.
  - EN : Allergens: just ask, we'll go through every dish with you.
- `carte.checked`
  - FR : Prix relevés le {date}, à confirmer sur place.
  - EN : Prices checked on {date}, to be confirmed in store.

## Pages

### La carte / The menu

- `pages.carte.slug`
  - FR : carte
  - EN : menu
- `pages.carte.title`
  - FR : La carte
  - EN : The menu
- `pages.carte.metaTitle`
  - FR : Carte et prix : tacos, assiettes, spécialités perses | Avesta Amiens
  - EN : Menu and prices: tacos, plates, Persian food | Avesta Amiens
- `pages.carte.metaDescription`
  - FR : La carte d'Avesta à Amiens : tacos dès 7,99 €, assiettes kebab, kefta, adana, sandwichs, burgers, paninis, box et spécialités perses. Ouvert jusqu'à 5 h, à emporter.
  - EN : Avesta's menu in Amiens: tacos from €7.99, kebab, kefta and adana plates, sandwiches, burgers, paninis, boxes and Persian specialities. Open until 5 am, takeaway.
- `pages.carte.eyebrow`
  - FR : Avesta · Amiens
  - EN : Avesta · Amiens
- `pages.carte.lead`
  - FR : Tout est sur cette page, avec les prix. Ajoutez, commandez, passez.
  - EN : Everything is on this page, with prices. Add, order, drop by.

### Un restaurant ouvert tard à Amiens / Late-night food in Amiens

- `pages.nuit.slug`
  - FR : restaurant-ouvert-tard-amiens
  - EN : late-night-food-amiens
- `pages.nuit.title`
  - FR : Un restaurant ouvert tard à Amiens
  - EN : Late-night food in Amiens
- `pages.nuit.metaTitle`
  - FR : Restaurant ouvert tard à Amiens, jusqu'à 5 h du matin | Avesta
  - EN : Late-night restaurant in Amiens, open until 5 am | Avesta
- `pages.nuit.metaDescription`
  - FR : Manger la nuit à Amiens : Avesta est ouvert tous les jours jusqu'à 5 h du matin, 49 rue des Augustins. Tacos, kebab, assiettes, spécialités perses, sur place ou à emporter.
  - EN : Eating late in Amiens: Avesta is open every day until 5 am, 49 rue des Augustins. Tacos, kebab, plates, Persian specialities, eat in or takeaway.
- `pages.nuit.eyebrow`
  - FR : Manger la nuit à Amiens
  - EN : Eating late in Amiens
- `pages.nuit.lead`
  - FR : Avesta est ouvert tous les jours de 11 h à 5 h du matin, en plein centre d'Amiens. Pour un repas après le travail, une faim d'après soirée ou une nuit de révisions.
  - EN : Avesta is open every day from 11 am to 5 am, right in the centre of Amiens. For a meal after work, a post-party craving or a night of revision.
- `pages.nuit.sections[0].h`
  - FR : Ouvert tous les jours, jusqu'à 5 h
  - EN : Open every day, until 5 am
- `pages.nuit.sections[0].p`
  - FR : Du lundi au dimanche, la cuisine tourne de 11 h à 5 h du matin. Pas de jour de fermeture : vérifiez simplement le bandeau en haut du site pour les fermetures exceptionnelles.
  - EN : Monday to Sunday, the kitchen runs from 11 am to 5 am. No closing day: just check the banner at the top of the site for exceptional closures.
- `pages.nuit.sections[1].h`
  - FR : Ce qu'on mange à 3 h du matin
  - EN : What to eat at 3 am
- `pages.nuit.sections[1].p`
  - FR : Des tacos, un kebab, une assiette avec frites et salade, un burger ou une box riz ou pâtes. Et, selon les jours, les spécialités perses de la maison.
  - EN : Tacos, a kebab, a plate with fries and salad, a burger or a rice or pasta box. And, on some days, our Persian house specialities.
- `pages.nuit.sections[2].h`
  - FR : Sur place, à emporter ou au téléphone
  - EN : Eat in, takeaway or by phone
- `pages.nuit.sections[2].p`
  - FR : Installez-vous, passez prendre votre commande, ou appelez le 03 75 50 82 02. Sur le site, vous choisissez votre heure de retrait, même en pleine nuit.
  - EN : Sit down, pick up your order, or call +33 3 75 50 82 02. On the site, you choose your pick-up time, even in the middle of the night.
- `pages.nuit.sections[3].h`
  - FR : En plein centre d'Amiens
  - EN : In the heart of Amiens
- `pages.nuit.sections[3].p`
  - FR : Au 49 rue des Augustins, à quelques minutes à pied de la cathédrale. Pratique pour rentrer à pied après une soirée en ville.
  - EN : At 49 rue des Augustins, a few minutes' walk from the cathedral. Handy for walking home after a night out.
- `pages.nuit.cta`
  - FR : Commander maintenant
  - EN : Order now

### Tacos à Amiens / Tacos in Amiens

- `pages.tacos.slug`
  - FR : tacos-amiens
  - EN : tacos-amiens
- `pages.tacos.title`
  - FR : Tacos à Amiens
  - EN : Tacos in Amiens
- `pages.tacos.metaTitle`
  - FR : Tacos à Amiens dès 7,99 €, ouvert jusqu'à 5 h | Avesta
  - EN : Tacos in Amiens from €7.99, open until 5 am | Avesta
- `pages.tacos.metaDescription`
  - FR : Des tacos à Amiens, en trois tailles, dès 7,99 € : poulet, kebab, tenders, cordon bleu, merguez… Chez Avesta, 49 rue des Augustins, ouvert tous les jours jusqu'à 5 h.
  - EN : Tacos in Amiens, three sizes, from €7.99: chicken, kebab, tenders, cordon bleu, merguez… At Avesta, 49 rue des Augustins, open every day until 5 am.
- `pages.tacos.eyebrow`
  - FR : Le tacos, chez Avesta
  - EN : Tacos at Avesta
- `pages.tacos.lead`
  - FR : Galette grillée, viande au choix, sauces et frites dedans. Trois tailles, à partir de 7,99 €, tous les jours jusqu'à 5 h du matin.
  - EN : Grilled wrap, your choice of meat, sauces and fries inside. Three sizes, from €7.99, every day until 5 am.
- `pages.tacos.sections[0].h`
  - FR : Composez le vôtre
  - EN : Build yours
- `pages.tacos.sections[0].p`
  - FR : Poulet, kebab, tenders, nuggets, steak, cordon bleu, merguez ou kefta. Ajoutez votre sauce : blanche, algérienne, samouraï, harissa, biggy, barbecue…
  - EN : Chicken, kebab, tenders, nuggets, beef, cordon bleu, merguez or kefta. Add your sauce: white, Algerian, samurai, harissa, biggy, barbecue…
- `pages.tacos.sections[1].h`
  - FR : Trois tailles
  - EN : Three sizes
- `pages.tacos.sections[1].p`
  - FR : Pour une petite faim, une grosse faim ou pour ceux qui ne savent pas choisir. Le tacos commence à 7,99 € ; les prix des grandes tailles sont affichés au comptoir.
  - EN : For a small appetite, a big one, or if you just can't decide. Tacos start at €7.99; larger sizes are priced at the counter.
- `pages.tacos.sections[2].h`
  - FR : Avec des frites, bien sûr
  - EN : With fries, of course
- `pages.tacos.sections[2].p`
  - FR : Les frites de la maison reviennent souvent dans les avis de nos clients. Dans le tacos ou à côté, elles sont là.
  - EN : Our fries come up a lot in customer reviews. Inside the tacos or on the side, they're there.
- `pages.tacos.sections[3].h`
  - FR : Jusqu'à 5 h, tous les jours
  - EN : Until 5 am, every day
- `pages.tacos.sections[3].p`
  - FR : Commandez en ligne et choisissez votre heure, ou passez directement au 49 rue des Augustins.
  - EN : Order online and pick your time, or come straight to 49 rue des Augustins.
- `pages.tacos.cta`
  - FR : Commander un tacos
  - EN : Order tacos

### Mentions légales / Legal notice

- `pages.legal.slug`
  - FR : mentions-legales
  - EN : legal
- `pages.legal.title`
  - FR : Mentions légales
  - EN : Legal notice
- `pages.legal.metaTitle`
  - FR : Mentions légales | Avesta Amiens
  - EN : Legal notice | Avesta Amiens
- `pages.legal.editor`
  - FR : Éditeur du site
  - EN : Publisher
- `pages.legal.host`
  - FR : Hébergement
  - EN : Hosting
- `pages.legal.data`
  - FR : Données personnelles
  - EN : Personal data
- `pages.legal.dataText`
  - FR : Les informations envoyées avec le formulaire de commande (nom, téléphone, e-mail facultatif) servent uniquement à préparer et confirmer votre commande. Elles ne sont ni revendues ni utilisées pour de la publicité. Pour les faire supprimer, appelez-nous au {phone}.
  - EN : The details sent with the order form (name, phone, optional email) are only used to prepare and confirm your order. They are never sold or used for advertising. To have them deleted, call us on {phone}.
- `pages.legal.photos`
  - FR : Photos
  - EN : Photos
- `pages.legal.photosText`
  - FR : Photos : Avesta. Aucune image de banque.
  - EN : Photos: Avesta. No stock images.
- `pages.legal.siret`
  - FR : SIRET
  - EN : SIRET
- `pages.legal.director`
  - FR : Directeur de la publication
  - EN : Publication director
- `pages.legal.toConfirm`
  - FR : à compléter
  - EN : to be completed
