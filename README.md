# 🦁 Black Lion Empire

> Transformación Física y Mental - Entrena como un león, Vive como un rey

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io/)
[![Deployed](https://img.shields.io/badge/deployed-theblacklion.fit-gold)](https://theblacklion.fit)

Plataforma web profesional para coaching de fitness y nutrición 100% online. Sistema completo de gestión de clientes, planes personalizados y seguimiento de transformaciones.

## 🌐 Demo

**Sitio Web:** [https://theblacklion.fit](https://theblacklion.fit)  
**Panel Admin:** [https://theblacklion.fit/admin](https://theblacklion.fit/admin)

## ✨ Características

### Frontend
- ✅ **Diseño Responsive** - Optimizado para móvil, tablet y desktop
- ✅ **Hero Dinámico** - Con partículas animadas y efectos visuales
- ✅ **Comparador Antes/Después** - Slider interactivo para transformaciones
- ✅ **Formulario de Contacto** - Integración directa con WhatsApp
- ✅ **SEO Optimizado** - Meta tags Open Graph para redes sociales
- ✅ **Animaciones Suaves** - Powered by Framer Motion
- ✅ **Navbar Inteligente** - Logo oculto en móvil para mejor UX

### Backend
- ✅ **API REST** - Endpoints para planes, transformaciones y contactos
- ✅ **Autenticación Segura** - NextAuth con credenciales
- ✅ **Base de Datos** - SQLite con Prisma ORM
- ✅ **Admin Dashboard** - Panel completo de gestión
- ✅ **CRUD Completo** - Planes, transformaciones y mensajes

### Deployment
- ✅ **VPS Deployment** - Configurado con PM2 y Nginx
- ✅ **SSL/HTTPS** - Certificado válido con Let's Encrypt
- ✅ **Zero Downtime** - Hot reload con PM2
- ✅ **Logs Management** - Sistema de logging centralizado

## 🚀 Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Styling:** Tailwind CSS 3.4
- **Database:** SQLite + Prisma 5.22
- **Authentication:** NextAuth.js
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Process Manager:** PM2
- **Web Server:** Nginx
- **Deployment:** VPS (Ubuntu)

## 📦 Instalación Local

\`\`\`bash
# Clonar el repositorio
git clone https://github.com/rubenbolivar/theblacklion.fit.git
cd theblacklion.fit

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Generar Prisma Client
npx prisma generate

# Crear y poblar la base de datos
npx prisma db push
npm run prisma:seed

# Agregar transformaciones (opcional)
node scripts/add-transformaciones.js

# Iniciar en desarrollo
npm run dev
\`\`\`

Visita [http://localhost:3000](http://localhost:3000)

## 🗂️ Estructura del Proyecto

\`\`\`
theblacklion.fit/
├── app/                      # Next.js App Router
│   ├── admin/               # Panel de administración
│   ├── api/                 # API Routes
│   ├── globals.css          # Estilos globales
│   └── layout.js            # Layout principal
├── components/              # Componentes React
│   ├── admin/              # Componentes del admin
│   ├── Navbar.js           # Barra de navegación
│   ├── Hero.js             # Sección hero
│   ├── Planes.js           # Tarjetas de planes
│   └── Transformaciones.js # Galería de transformaciones
├── lib/                    # Utilidades
│   ├── prisma.js          # Cliente de Prisma
│   └── cloudinary.js      # Integración Cloudinary
├── prisma/                # Base de datos
│   ├── schema.prisma      # Esquema de la BD
│   └── seed.js            # Datos iniciales
├── public/                # Archivos estáticos
│   ├── logo.png          # Logo principal
│   ├── og-image.png      # Imagen Open Graph
│   └── transformaciones/ # Imágenes de transformaciones
├── scripts/              # Scripts de utilidad
│   ├── add-transformaciones.js
│   └── generate-og-image.js
└── ecosystem.config.js   # Configuración PM2
\`\`\`

## 🔑 Credenciales de Admin

**URL:** https://theblacklion.fit/admin

\`\`\`
Email: admin@blacklionempire.com
Password: BlackLion2025!Secure
\`\`\`

> ⚠️ Cambia estas credenciales en producción

## 🚀 Deployment

### Producción (VPS)

\`\`\`bash
# En el servidor
cd /var/www/theblacklion.fit

# Instalar dependencias
npm install

# Configurar .env de producción
nano .env

# Construir
npm run build

# Iniciar con PM2
npm run start:prod

# Guardar configuración PM2
pm2 save
\`\`\`

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones completas.

## 📱 Integración WhatsApp

El formulario de contacto envía los datos directamente a WhatsApp:

- **Número:** +1 (321) 314-4332
- **Formato:** Mensaje pre-formateado con toda la información del cliente
- **Backup:** Los datos también se guardan en la base de datos

## 🎨 Diseño

**Paleta de Colores:**
- Negro: \`#0D0D0D\` (lion-black)
- Dorado: \`#D4AF37\` (lion-gold)
- Gris: \`#1A1A1A\` (lion-gray)
- Rojo: \`#DC2626\` (lion-red)

**Tipografía:**
- Headings: Montserrat (700-900)
- Body: Inter (300-600)

## 📄 Scripts Disponibles

\`\`\`bash
npm run dev          # Desarrollo
npm run build        # Construir para producción
npm start            # Iniciar producción
npm run start:prod   # Iniciar con PM2
npm run prisma:seed  # Poblar base de datos
\`\`\`

## 🤝 Contribuir

Este es un proyecto privado. Para colaborar, contacta al propietario del repositorio.

## 📝 License

© 2025 Black Lion Empire. Todos los derechos reservados.

## 👨‍💻 Desarrollado Por

**[The Three Way](https://thetreeway.com)**  
Soluciones digitales profesionales

---

�� **Entrena como un león, Vive como un rey**
