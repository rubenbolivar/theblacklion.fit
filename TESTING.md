# Guía de Verificación - Multiidioma (i18n)

## Cómo Verificar el Progreso

### 1. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Espera a que veas:
```
✓ Ready in X ms
```

### 2. Abrir en el Navegador

Abre estas URLs para probar cada idioma:

#### Español (predeterminado)
- http://localhost:3000
- http://localhost:3000/es

#### Inglés
- http://localhost:3000/en

#### Portugués
- http://localhost:3000/pt

### 3. Qué Verificar

#### ✅ Ya Funcionando:
- **Navbar**: Los enlaces de navegación deben estar traducidos
- **Selector de Idioma**: Aparece en la esquina superior derecha (desktop) o junto al menú (móvil)
  - Click para ver dropdown con 3 idiomas (banderas + nombres)
  - Cambiar de idioma recarga la página en el nuevo idioma
- **URLs**: Cambian según el idioma (/en, /pt, o sin prefijo para español)
- **Meta Tags**: Verifica en el código fuente que los tags están en el idioma correcto

#### ⚠️ Aún Sin Traducir (Pendiente):
- Contenido del Hero (título, descripción, botones)
- Sección "Quiénes Somos"
- Servicios
- Planes
- Transformaciones
- Contacto
- Footer

Estos componentes aún mostrarán texto en español porque todavía no hemos actualizado sus archivos para usar las traducciones.

### 4. Probar el Selector de Idioma

1. Abre http://localhost:3000
2. Busca el ícono del globo (🌐) en la barra de navegación
3. Haz click para abrir el dropdown
4. Deberías ver:
   - 🇪🇸 Español (ES)
   - 🇺🇸 English (EN)
   - 🇧🇷 Português (PT)
5. Selecciona un idioma diferente
6. La página debe recargar con la URL actualizada

### 5. Verificar con DevTools

Abre las herramientas de desarrollador (F12) y ve a la pestaña Console. No deberías ver errores relacionados con:
- `useTranslations`
- `next-intl`
- Missing translation keys

### 6. Panel de Admin

El panel admin NO tiene traducciones (siempre español):
- http://localhost:3000/admin/login

Esto es intencional - el admin no necesita multiidioma.

## Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Parar servidor
Ctrl+C

# Ver status de Git
git status

# Ver rama actual
git branch

# Build de producción (prueba)
npm run build

# Ver logs de producción con PM2 (en el VPS)
pm2 logs black-lion-empire
```

## Estructura de Archivos de Traducción

Las traducciones están en `messages/`:
- `messages/es.json` - Español
- `messages/en.json` - Inglés
- `messages/pt.json` - Portugués

Cada archivo tiene la misma estructura:
```json
{
  "nav": { ... },
  "hero": { ... },
  "about": { ... },
  "services": { ... },
  "plans": { ... },
  "transformations": { ... },
  "contact": { ... },
  "footer": { ... },
  "common": { ... }
}
```

## Siguiente Fase

Para completar la funcionalidad, necesitamos actualizar los componentes en `components/` para usar las traducciones:

1. Hero.js - usar `useTranslations('hero')`
2. QuienesSomos.js - usar `useTranslations('about')`
3. Servicios.js - usar `useTranslations('services')`
4. Planes.js - usar `useTranslations('plans')`
5. Transformaciones.js - usar `useTranslations('transformations')`
6. Contacto.js - usar `useTranslations('contact')`
7. Footer.js - usar `useTranslations('footer')`

## Troubleshooting

### Error: "useTranslations() is not available"
- Verifica que el componente tenga `'use client'` al inicio
- Asegúrate de que está dentro del provider de next-intl

### Error: "Missing message"
- Verifica que la key existe en todos los archivos JSON de messages
- Revisa que no hay typos en el nombre de la key

### Error 404 al cambiar idioma
- Verifica que el middleware está configurado correctamente
- Revisa que los locales están definidos en `i18n.js`

### El idioma no cambia
- Limpia la caché del navegador
- Verifica la consola para errores de JavaScript
- Reinicia el servidor de desarrollo
