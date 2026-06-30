# Deployment

## Railway backend

Deploy the `backend` folder to Railway. The backend service includes its own `requirements.txt`, `Procfile`, and `start.sh`.

Set these Railway variables:

```text
DJANGO_DEBUG=False
SECRET_KEY=<a long random secret>
ALLOWED_HOSTS=<your-railway-domain>
CORS_ALLOWED_ORIGINS=https://<your-vercel-domain>
CSRF_TRUSTED_ORIGINS=https://<your-railway-domain>,https://<your-vercel-domain>
```

Add a Railway Postgres database to the project and connect it to the backend service. Railway will provide `DATABASE_URL` automatically. The deployed backend requires `DATABASE_URL`; this prevents admin users and CMS content from being lost on redeploy.

After attaching Postgres, run:

```bash
python manage.py migrate
python manage.py createsuperuser
```

Local development still falls back to SQLite when `DATABASE_URL` is not set.

## Vercel frontend

Set this Vercel variable so the deployed frontend calls Railway:

```text
VITE_API_BASE_URL=https://<your-railway-domain>
```

The value may include `/api`, but it does not need to. The frontend handles both forms.
