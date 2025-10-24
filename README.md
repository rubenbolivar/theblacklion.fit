# 🦁 Black Lion Empire

**Transformación física y mental 100% online**

Sitio web oficial de Black Lion Empire, programa de entrenamiento y nutrición personalizado creado por Luis Rondón.

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Deployment](#deployment)
- [Mantenimiento](#mantenimiento)

---

## 🎯 Descripción

Black Lion Empire es una plataforma web SPA (Single Page Application) diseñada para ofrecer programas de entrenamiento y nutrición personalizados 100% online. El sitio incluye:

- Landing page con información del programa
- Sistema de contacto integrado
- Panel administrativo completo
- Gestión de planes y precios
- Galería de transformaciones
- Sistema de autenticación seguro

---

## ✨ Características

### Frontend
- ✅ Diseño responsive y moderno
- ✅ Animaciones fluidas con Framer Motion
- ✅ Tema personalizado Black Lion Empire
- ✅ Navegación smooth scroll
- ✅ Formulario de contacto con validación
- ✅ Optimización SEO completa

### Backend
- ✅ API REST con Next.js 14
- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ Autenticación con NextAuth.js
- ✅ Gestión de imágenes con Cloudinary
- ✅ Panel administrativo protegido

---

## 🛠 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: JavaScript (ES6+)
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: NextAuth.js
- **Formularios**: React Hook Form
- **Validación**: Zod
- **Imágenes**: Cloudinary
- **Iconos**: Lucide React
- **Process Manager**: PM2

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.x o superior
- **npm** o **yarn**
- **PostgreSQL** 14.x o superior
- **Git**

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd THEBLACKLION.FIT
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/black_lion_empire"

# NextAuth
NEXTAUTH_SECRET="tu-secret-key-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Admin Credentials
ADMIN_EMAIL="admin@blacklionempire.com"
ADMIN_PASSWORD="tu-password-seguro"

# Cloudinary
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"

# WhatsApp
WHATSAPP_NUMBER="+1234567890"

# Site
SITE_NAME="Black Lion Empire"
SITE_URL="http://localhost:3000"
```

### 4. Configurar la base de datos

```bash
# Generar el cliente de Prisma
npm run prisma:generate

# Crear las tablas en la base de datos
npx prisma db push

# Poblar la base de datos con datos iniciales
npm run prisma:seed
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

---

## ⚙️ Configuración

### Base de Datos

El proyecto usa PostgreSQL. Asegúrate de tener una base de datos creada:

```sql
CREATE DATABASE black_lion_empire;
```

### Cloudinary

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/)
2. Obtén tus credenciales del dashboard
3. Agrégalas al archivo `.env`

### Usuario Admin

El usuario administrador se crea automáticamente al ejecutar el seed. Las credenciales son las que configuraste en `.env`:

- **Email**: El valor de `ADMIN_EMAIL`
- **Password**: El valor de `ADMIN_PASSWORD`

Para acceder al panel admin: `http://localhost:3000/admin`

---

## 📝 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Inicia el servidor de desarrollo

# Producción
npm run build            # Construye la aplicación para producción
npm start                # Inicia el servidor de producción
npm run start:prod       # Inicia con PM2

# Prisma
npm run prisma:generate  # Genera el cliente de Prisma
npm run prisma:migrate   # Ejecuta las migraciones
npm run prisma:studio    # Abre Prisma Studio (GUI)
npm run prisma:seed      # Puebla la base de datos

# Linting
npm run lint             # Ejecuta ESLint
```

---

## 📁 Estructura del Proyecto

```
black-lion-empire/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/              # Autenticación
│   │   ├── planes/            # Gestión de planes
│   │   ├── transformaciones/  # Gestión de transformaciones
│   │   └── contacto/          # Gestión de contactos
│   ├── admin/                 # Panel administrativo
│   ├── globals.css            # Estilos globales
│   ├── layout.js              # Layout principal
│   └── page.js                # Página principal
├── components/                # Componentes React
│   ├── Navbar.js
│   ├── Hero.js
│   ├── QuienesSomos.js
│   ├── Servicios.js
│   ├── Planes.js
│   ├── Transformaciones.js
│   ├── Galeria.js
│   ├── Contacto.js
│   └── Footer.js
├── lib/                       # Utilidades
│   ├── prisma.js             # Cliente de Prisma
│   └── cloudinary.js         # Configuración de Cloudinary
├── prisma/
│   ├── schema.prisma         # Esquema de base de datos
│   └── seed.js               # Datos iniciales
├── public/                    # Archivos estáticos
├── .env.example              # Ejemplo de variables de entorno
├── ecosystem.config.js       # Configuración de PM2
├── middleware.js             # Middleware de Next.js
├── next.config.js            # Configuración de Next.js
├── tailwind.config.js        # Configuración de Tailwind
└── package.json              # Dependencias del proyecto
```

---

## 🚢 Deployment

### Preparación

1. **Construir la aplicación**:
```bash
npm run build
```

2. **Configurar variables de entorno en producción**:
   - Actualiza `NEXTAUTH_URL` con tu dominio
   - Actualiza `SITE_URL` con tu dominio
   - Asegúrate de tener un `NEXTAUTH_SECRET` seguro

### Deployment con PM2

1. **Instalar PM2 globalmente**:
```bash
npm install -g pm2
```

2. **Iniciar la aplicación**:
```bash
npm run start:prod
```

3. **Comandos útiles de PM2**:
```bash
pm2 list                 # Ver aplicaciones corriendo
pm2 logs black-lion-empire  # Ver logs
pm2 restart black-lion-empire  # Reiniciar
pm2 stop black-lion-empire     # Detener
pm2 delete black-lion-empire   # Eliminar
```

### Configuración de Nginx (Opcional)

Ejemplo de configuración para Nginx:

```nginx
server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL con Let's Encrypt

```bash
sudo certbot --nginx -d tudominio.com
```

---

## 🔧 Mantenimiento

### Backup de Base de Datos

```bash
# Crear backup
pg_dump -U usuario black_lion_empire > backup.sql

# Restaurar backup
psql -U usuario black_lion_empire < backup.sql
```

### Actualizar Dependencias

```bash
npm update
npm audit fix
```

### Logs

Los logs de PM2 se guardan en:
- Error logs: `./logs/err.log`
- Output logs: `./logs/out.log`
- Combined logs: `./logs/combined.log`

---

## 🎨 Personalización

### Colores del Tema

Los colores se definen en `tailwind.config.js`:

```javascript
colors: {
  'lion-black': '#0A0A0A',
  'lion-gold': '#D4AF37',
  'lion-red': '#C41E3A',
  'lion-white': '#FFFFFF',
  'lion-gray': '#1A1A1A',
}
```

### Fuentes

Las fuentes se cargan en `app/layout.js`:
- **Heading**: Montserrat
- **Body**: Inter

---

## 📞 Soporte

Para soporte técnico o consultas:
- **Email**: info@blacklionempire.com
- **WhatsApp**: Configurado en variables de entorno

---

## 📄 Licencia

© 2025 Black Lion Empire. Todos los derechos reservados.

Creado por **Luis Rondón** - Entrenador Personal & Nutricionista

---

## 🦁 Lema

**"Entrena como un león, Vive como un rey"**