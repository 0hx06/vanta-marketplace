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

## Liaison Discord

La liaison Discord est disponible depuis `/dashboard/profile`. Elle utilise OAuth2 avec le scope `identify` uniquement :

- `DATABASE_URL` : connexion PostgreSQL utilisée par la migration `db/migrations/001_discord_account_links.sql`
- `VANTA_SESSION_SECRET` : secret aléatoire d'au moins 32 caractères, utilisé pour vérifier la session et l'état OAuth
- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET` (serveur uniquement, jamais préfixé `NEXT_PUBLIC_`)
- `DISCORD_REDIRECT_URI` : URL exacte de callback, par exemple `https://example.com/api/auth/discord/callback`

Exécutez la migration sur la base de production puis ajoutez exactement la même `DISCORD_REDIRECT_URI` dans l'application Discord, dans **OAuth2 → Redirects**. La connexion et l'inscription utilisent uniquement Discord ; le callback crée ou retrouve l'utilisateur via son identifiant Discord puis émet le cookie de session signé `vanta_session` au format `base64url(JSON({ userId, exp })).signature`. L'état OAuth est stocké dans un cookie HttpOnly court et vérifié côté serveur ; aucun token Discord n'est conservé. Les anciennes données de comptes ne sont pas supprimées, mais les formulaires email/mot de passe ne sont plus proposés.

## Admin

L'espace admin local est disponible sur `/admin`. Le compte de démonstration est affiché sur l'écran de connexion. Pour une vraie mise en production, remplace cette authentification locale par une base de données et un fournisseur d'identité.
