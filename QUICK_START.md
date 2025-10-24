# ⚡ Quick Start - Black Lion Empire

Guía rápida para poner en marcha el proyecto en 5 minutos.

---

## 🚀 Inicio Rápido

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
# Mínimo necesario para desarrollo:
DATABASE_URL="postgresql://user:password@localhost:5432/black_lion_empire"
NEXTAUTH_SECRET="cualquier-string-aleatorio-largo"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@test.com"
ADMIN_PASSWORD="admin123"
```

### 3. Configurar Base de Datos
```bash
# Crear la base de datos (si no existe)
createdb black_lion_empire

# Generar cliente de Prisma
npm run prisma:generate

# Crear tablas
npx prisma db push

# Poblar con datos iniciales
npm run prisma:seed
```

### 4. Iniciar Desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔑 Acceso Admin

- **URL**: http://localhost:3000/admin
- **Email**: El que configuraste en `ADMIN_EMAIL`
- **Password**: El que configuraste en `ADMIN_PASSWORD`

---

## 📝 Comandos Esenciales

```bash
# Desarrollo
npm run dev                 # Iniciar servidor de desarrollo

# Base de datos
npm run prisma:studio       # Ver/editar datos (GUI)
npm run prisma:seed         # Repoblar datos iniciales

# Producción
npm run build               # Construir para producción
npm start                   # Iniciar servidor de producción
```

---

## 🎨 Personalización Rápida

### Cambiar Colores
Edita `tailwind.config.js`:
```javascript
colors: {
  'lion-black': '#0A0A0A',  // Negro principal
  'lion-gold': '#D4AF37',   // Dorado
  'lion-red': '#C41E3A',    // Rojo acento
}
```

### Cambiar Contenido
Los componentes están en `components/`:
- `Hero.js` - Sección principal
- `QuienesSomos.js` - Información del programa
- `Servicios.js` - Lista de servicios
- `Planes.js` - Planes y precios
- `Contacto.js` - Formulario de contacto

---

## 🐛 Solución de Problemas

### Error de conexión a base de datos
```bash
# Verifica que PostgreSQL esté corriendo
pg_isready

# Verifica la URL en .env
echo $DATABASE_URL
```

### Error de Prisma
```bash
# Regenera el cliente
npm run prisma:generate

# Reinicia el servidor
# Ctrl+C y luego npm run dev
```

### Puerto 3000 ocupado
```bash
# Usa otro puerto
PORT=3001 npm run dev
```

---

## 📚 Más Información

- **Documentación completa**: Ver `README.md`
- **Próximos pasos**: Ver `NEXT_STEPS.md`
- **Estructura del proyecto**: Ver `README.md` sección "Estructura"

---

## ✅ Checklist de Verificación

- [ ] Dependencias instaladas
- [ ] Archivo .env configurado
- [ ] Base de datos creada y poblada
- [ ] Servidor corriendo en http://localhost:3000
- [ ] Puedes acceder al admin en http://localhost:3000/admin
- [ ] Formulario de contacto funciona

---

¡Listo para desarrollar! 🦁