# Deployment

## Railway backend

Deploy the `backend` folder to Railway. The backend includes its own `requirements.txt`, `Procfile`, and `start.sh` so Railway can detect it as a Python app, apply migrations, collect static files, and run Gunicorn on Railway's `$PORT`.

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
