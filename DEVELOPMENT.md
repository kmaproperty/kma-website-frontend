# Development Guide

## Repo structure

This is a monorepo with two Next.js apps:

```
kma-website-frontend/
├── buyer/   → buyer-facing site (kmaglobalproperty.com)
└── seller/  → seller-facing site (seller.kmaglobalproperty.com)
```

Each app has its own `package.json`, `.env.local`, and Next.js config. Treat them as independent.

## Branches and what they deploy to

There are **two long-lived branches**. Auto-deploy is wired on AWS Amplify — pushing to either branch triggers an automatic build + deploy.

| Branch | Buyer URL | Seller URL | Backend |
|---|---|---|---|
| `main` | https://kmaglobalproperty.com | https://seller.kmaglobalproperty.com | EC2 port 3000 |
| `develop` | https://dev.kmaglobalproperty.com | https://dev-seller.kmaglobalproperty.com | EC2 port 3001 |

Both backends currently share the same RDS database (`kma`). Schema changes hit prod data — coordinate before merging migrations.

## Workflow for developers

1. **Branch off `develop`** for any new work:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/<short-name>
   ```

2. **Push your feature branch** and open a PR into `develop`:
   ```bash
   git push -u origin feature/<short-name>
   gh pr create --base develop
   ```

3. **Merge to `develop`** → Amplify rebuilds → live on dev URLs in ~3-5 min.
   Test the change at `dev.kmaglobalproperty.com` / `dev-seller.kmaglobalproperty.com`.

4. **Promote to prod** by opening a PR from `develop` → `main`. After merge, Amplify rebuilds → live on prod URLs in ~3-5 min.

5. **Hotfixes** (urgent prod fixes) branch off `main`, then merge back into BOTH `main` and `develop`:
   ```bash
   git checkout main
   git checkout -b hotfix/<short-name>
   # ...fix...
   gh pr create --base main
   # after merge to main, also PR into develop to keep them in sync
   ```

**Do NOT push directly to `main` or `develop`.** Always go through PRs.

## Local development

Start backend first (different repo on a different machine — see backend README), then:

```bash
# In one terminal
cd buyer
npm install
npm run dev   # http://localhost:3001

# In another terminal
cd seller
npm install
npm run dev   # http://localhost:3002
```

Both apps need a `.env.local` (ask team lead — never commit it). Keys you'll see:
- `NEXT_PUBLIC_API_URL` — backend URL (proxied via `/api/backend/` in prod)
- `NEXT_PUBLIC_AWS_URL` — S3 bucket for uploaded images
- `SUREPASS_*` — KYC API (server-side only)
- `NEXT_PUBLIC_SUREPASS_ENV` — `production` makes failed bank verification block submit; anything else lets it pass with a warning

## Build + deploy details

- Build runs on Amplify with `amplify.yml` (already configured per app via `AMPLIFY_MONOREPO_APP_ROOT=buyer` or `seller`).
- Watch builds at: https://console.aws.amazon.com/amplify/home (region: ap-south-1).
- Build logs are visible in the Amplify console; if a build fails, check the env vars on that branch (Amplify console → branch settings).
- Manual `vercel --prod` is no longer used. Vercel projects exist as backup but receive no traffic.

## Common pitfalls

- **Adding a new env var?** Set it on EVERY branch in Amplify (buyer/main, buyer/develop, seller/main, seller/develop) AND in your local `.env.local`. Otherwise the build will silently use undefined.
- **Adding a new image domain?** Update `next.config.ts` in both `buyer/` and `seller/`.
- **TypeORM entity changes** must be matched by a migration on the backend repo — never let the backend run `synchronize: true` against the prod database.
- **Don't commit** `.env*`, `.pem`, or anything in `.next/`.

## Who to ping

Infra (Amplify, EC2, RDS, DNS) — Dhruv.
Code review on PRs — team lead.
