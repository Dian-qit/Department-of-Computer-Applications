# Deployment

## Railway backend

Deploy the repository root to Railway. The `Procfile` starts the Django backend from the `backend` folder, applies migrations, collects static files, and runs Gunicorn on Railway's `$PORT`.

Set these Railway variables:

```text
DJANGO_DEBUG=False
SECRET_KEY=<a long random secret>
ALLOWED_HOSTS=<your-railway-domain>
CORS_ALLOWED_ORIGINS=https://<your-vercel-domain>
CSRF_TRUSTED_ORIGINS=https://<your-railway-domain>,https://<your-vercel-domain>
```

If you add Railway Postgres, Railway will provide `DATABASE_URL` automatically and Django will use it. Without `DATABASE_URL`, the backend falls back to SQLite for local development.

## Vercel frontend

Set this Vercel variable so the deployed frontend calls Railway:

```text
VITE_API_BASE_URL=https://<your-railway-domain>
```

The value may include `/api`, but it does not need to. The frontend handles both forms.
