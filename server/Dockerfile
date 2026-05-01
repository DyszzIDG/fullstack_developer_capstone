# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Django backend
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Copy React build from stage 1
COPY --from=frontend-builder /frontend/build ./frontend/build
EXPOSE 8000
RUN echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin')" > create_admin.py
CMD sh -c "python manage.py makemigrations && python manage.py migrate && python manage.py shell < create_admin.py && python manage.py collectstatic --noinput && gunicorn djangoproj.wsgi:application --bind 0.0.0.0:${PORT:-8000}"
