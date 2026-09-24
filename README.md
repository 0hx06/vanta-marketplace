# VANTA Marketplace

Marketplace Valorant en français, construit avec Next.js, TypeScript et Tailwind CSS.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Vérifier la production

```bash
npm run build
npm run start
```

## Déployer sur Vercel

1. Pousse ce dossier sur un dépôt GitHub.
2. Va sur [vercel.com/new](https://vercel.com/new) et importe le dépôt.
3. Garde les réglages détectés automatiquement : framework **Next.js**, commande `npm run build`.
4. Ajoute les variables d'environnement de `.env.example` dans **Project Settings → Environment Variables**.
5. Clique sur **Deploy**.

Le projet contient un `vercel.json` minimal et Vercel détecte automatiquement les routes Next.js et API.

## Paiements Maroc

Le checkout accepte CMI et PayPal comme passerelles. Les clés restent uniquement côté serveur :

- `CMI_MERCHANT_ID`
- `CMI_SECRET`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`

Sans ces variables, le checkout affiche volontairement que la passerelle n'est pas configurée et aucun paiement réel n'est lancé.

## Admin

L'espace admin local est disponible sur `/admin`. Le compte de démonstration est affiché sur l'écran de connexion. Pour une vraie mise en production, remplace cette authentification locale par une base de données et un fournisseur d'identité.
