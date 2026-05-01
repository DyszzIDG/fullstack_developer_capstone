FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
RUN echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin')" > create_admin.py
CMD sh -c "python manage.py makemigrations && python manage.py migrate && python manage.py shell < create_admin.py && python manage.py runserver 0.0.0.0:8000"
