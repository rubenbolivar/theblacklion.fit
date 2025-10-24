# 🚀 Guía de Deployment - Black Lion Empire

Guía completa para desplegar el sitio en tu VPS con el dominio **theblacklion.fit**

---

## 📋 Información del Servidor

- **Dominio**: theblacklion.fit
- **IP**: 203.161.62.94
- **Puerto SSH**: 22
- **Usuario**: root
- **Sistema**: Linux (VPS)

---

## 🌐 Paso 1: Configurar DNS

Debes configurar los registros DNS en tu proveedor de dominio (donde compraste theblacklion.fit):

### Registros DNS Necesarios:

```
Tipo: A
Nombre: @
Valor: 203.161.62.94
TTL: 3600 (o automático)

Tipo: A
Nombre: www
Valor: 203.161.62.94
TTL: 3600 (o automático)
```

### Cómo Configurar:

1. **Accede al panel de tu proveedor de dominio** (GoDaddy, Namecheap, etc.)
2. **Busca la sección "DNS Management" o "Gestión de DNS"**
3. **Agrega los registros A**:
   - Registro 1: `@` apuntando a `203.161.62.94`
   - Registro 2: `www` apuntando a `203.161.62.94`
4. **Guarda los cambios**
5. **Espera 5-30 minutos** para que se propaguen

### Verificar DNS:

```bash
# Desde tu computadora local
nslookup theblacklion.fit
# Debe mostrar: 203.161.62.94

ping theblacklion.fit
# Debe responder desde 203.161.62.94
```

---

## 🔧 Paso 2: Preparar el Servidor

### 2.1 Conectar al VPS

```bash
ssh root@203.161.62.94
# Password: IYN3oc6vww0SX37B0d
```

### 2.2 Verificar Software Instalado

**IMPORTANTE**: Como el VPS tiene otros sitios, primero verifica qué está instalado:

```bash
# Verificar Node.js
node --version
npm --version

# Verificar PM2
pm2 --version

# Verificar Nginx
nginx -v

# Ver sitios existentes en Nginx
ls -la /etc/nginx/sites-enabled/

# Ver aplicaciones PM2 corriendo
pm2 list
```

### 2.3 Instalar Solo lo Necesario

**Solo instala si NO están instalados**:

```bash
# Si Node.js no está instalado o es versión antigua
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Si PM2 no está instalado
npm install -g pm2

# Nginx probablemente ya está instalado
# NO ejecutes: apt install nginx (ya debe estar)
```

---

## 📦 Paso 3: Subir el Proyecto

### Opción A: Usando Git (Recomendado)

```bash
# En el servidor
cd /var/www
git clone <tu-repositorio-git> theblacklion.fit
cd theblacklion.fit
```

### Opción B: Usando SCP (Desde tu Mac)

```bash
# Desde tu computadora local
cd /Users/rubenbolivar/Desktop/THEBLACKLION.FIT

# Comprimir el proyecto (excluir node_modules)
tar -czf theblacklion.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='prisma/dev.db' \
  --exclude='.git' \
  .

# Subir al servidor
scp theblacklion.tar.gz root@203.161.62.94:/tmp/

# En el servidor
ssh root@203.161.62.94
cd /var/www
mkdir -p theblacklion.fit
tar -xzf /tmp/theblacklion.tar.gz -C theblacklion.fit
cd theblacklion.fit
rm /tmp/theblacklion.tar.gz
```

**IMPORTANTE**: Este VPS tiene otros sitios. NO ejecutes comandos que afecten todo el sistema sin verificar primero.

---

## ⚙️ Paso 4: Configurar el Proyecto en el Servidor

```bash
# Dentro de /var/www/theblacklion.fit

# 1. Instalar dependencias
npm install

# 2. Crear archivo .env
nano .env
```

### Contenido del .env (en el servidor):

```env
# Database
DATABASE_URL="file:./prod.db"

# NextAuth
NEXTAUTH_SECRET="tu-secret-key-super-seguro-aqui-cambiar"
NEXTAUTH_URL="https://theblacklion.fit"

# Admin Credentials
ADMIN_EMAIL="admin@blacklionempire.com"
ADMIN_PASSWORD="cambiar-password-seguro"

# Cloudinary (opcional)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# WhatsApp
WHATSAPP_NUMBER="+13213144332"

# Site Configuration
SITE_NAME="Black Lion Empire"
SITE_URL="https://theblacklion.fit"
```

**IMPORTANTE**: Cambia `NEXTAUTH_SECRET` y `ADMIN_PASSWORD` por valores seguros.

### Generar NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

```bash
# 3. Configurar base de datos
npx prisma generate
npx prisma db push
npm run prisma:seed

# 4. Agregar transformaciones
node scripts/add-transformaciones.js

# 5. Construir el proyecto
npm run build

# 6. Probar que funciona
npm start
# Ctrl+C para detener
```

---

## 🌐 Paso 5: Configurar Nginx

```bash
# Crear configuración de Nginx
nano /etc/nginx/sites-available/theblacklion.fit
```

### Contenido del archivo:

```nginx
server {
    listen 80;
    server_name theblacklion.fit www.theblacklion.fit;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar el sitio
ln -s /etc/nginx/sites-available/theblacklion.fit /etc/nginx/sites-enabled/

# Verificar configuración
nginx -t

# Reiniciar Nginx
systemctl restart nginx
```

---

## 🔒 Paso 6: Configurar SSL (HTTPS)

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
certbot --nginx -d theblacklion.fit -d www.theblacklion.fit

# Seguir las instrucciones:
# - Ingresa tu email
# - Acepta términos
# - Elige redirección automática a HTTPS (opción 2)
```

---

## 🚀 Paso 7: Iniciar con PM2

```bash
cd /var/www/theblacklion.fit

# Iniciar la aplicación
npm run start:prod

# Verificar que está corriendo
pm2 list

# Ver logs
pm2 logs black-lion-empire

# Configurar PM2 para iniciar al reiniciar el servidor
pm2 startup
pm2 save
```

---

## ✅ Paso 8: Verificar el Sitio

1. **Abre tu navegador**: https://theblacklion.fit
2. **Verifica**:
   - ✅ Sitio carga correctamente
   - ✅ HTTPS funciona (candado verde)
   - ✅ Todas las secciones visibles
   - ✅ Formulario de contacto funciona
   - ✅ Admin accesible en https://theblacklion.fit/admin

---

## 🔧 Comandos Útiles PM2

```bash
# Ver aplicaciones corriendo
pm2 list

# Ver logs en tiempo real
pm2 logs black-lion-empire

# Reiniciar aplicación
pm2 restart black-lion-empire

# Detener aplicación
pm2 stop black-lion-empire

# Eliminar aplicación
pm2 delete black-lion-empire

# Ver información detallada
pm2 show black-lion-empire
```

---

## 🔄 Actualizar el Sitio

Cuando hagas cambios:

```bash
# Conectar al servidor
ssh root@203.161.62.94

# Ir al directorio
cd /var/www/theblacklion.fit

# Opción A: Si usas Git
git pull origin main

# Opción B: Si subes archivos manualmente
# (sube los archivos con SCP primero)

# Instalar nuevas dependencias (si las hay)
npm install

# Reconstruir
npm run build

# Reiniciar PM2
pm2 restart black-lion-empire
```

---

## 🛡️ Seguridad Adicional

### Firewall

```bash
# Instalar UFW
apt install -y ufw

# Permitir SSH, HTTP y HTTPS
ufw allow 22
ufw allow 80
ufw allow 443

# Activar firewall
ufw enable

# Ver estado
ufw status
```

### Fail2Ban (Protección contra ataques)

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban
```

---

## 📊 Monitoreo

### Ver uso de recursos

```bash
# CPU y memoria
htop

# Espacio en disco
df -h

# Logs de Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 🔙 Backup

### Backup de Base de Datos

```bash
# Crear backup
cd /var/www/theblacklion.fit/prisma
cp prod.db prod.db.backup-$(date +%Y%m%d)

# Automatizar backups diarios
crontab -e

# Agregar esta línea:
0 2 * * * cp /var/www/theblacklion.fit/prisma/prod.db /var/www/theblacklion.fit/prisma/prod.db.backup-$(date +\%Y\%m\%d)
```

---

## 🆘 Solución de Problemas

### El sitio no carga

```bash
# Verificar que PM2 está corriendo
pm2 list

# Ver logs de errores
pm2 logs black-lion-empire --err

# Verificar Nginx
systemctl status nginx
nginx -t
```

### Error de base de datos

```bash
cd /var/www/theblacklion.fit
npx prisma generate
npx prisma db push
```

### Puerto 3000 ocupado

```bash
# Ver qué está usando el puerto
lsof -i :3000

# Matar el proceso
pm2 delete black-lion-empire
npm run start:prod
```

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs: `pm2 logs black-lion-empire`
2. Verifica Nginx: `nginx -t`
3. Revisa el firewall: `ufw status`

---

## ✅ Checklist de Deployment

- [ ] DNS configurado (A records)
- [ ] Servidor actualizado
- [ ] Node.js 18+ instalado
- [ ] PM2 instalado
- [ ] Nginx instalado
- [ ] Proyecto subido al servidor
- [ ] .env configurado en producción
- [ ] Base de datos creada y poblada
- [ ] Proyecto construido (npm run build)
- [ ] PM2 iniciado
- [ ] Nginx configurado
- [ ] SSL instalado (Certbot)
- [ ] Sitio accesible en https://theblacklion.fit
- [ ] Admin funcional
- [ ] Firewall configurado
- [ ] Backups configurados

---

¡Éxito con el deployment de Black Lion Empire! 🦁👑