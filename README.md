# Nolin.ai — Guía Completa de Instalación y Uso

## Requisitos Previos

- **Node.js 18.x o superior** (recomendado Node 18 LTS)
- **npm 9.x o superior**

## Instalación Paso a Paso

1. **Descomprime el archivo ZIP** y abre una terminal en la carpeta del proyecto.

2. **Limpia instalaciones previas (si es necesario):**
   ```bash
   rm -rf node_modules package-lock.json pnpm-lock.yaml
   ```

3. **Instala las dependencias:**
   ```bash
   npm install
   ```
   Esto instalará todas las dependencias compatibles, incluyendo:
   - React 18.x
   - Next.js 15.x
   - TailwindCSS
   - Radix UI
   - Supabase
   - Otras librerías listadas en `package.json`

## Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-supabase-anon-key

# Redis (opcional, solo para producción de alto tráfico)
UPSTASH_REDIS_REST_URL=tu-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=tu-upstash-redis-token
```

- Si no configuras Redis, el sistema usará un rate limiter en memoria (suficiente para desarrollo y sitios de tráfico moderado).

## Ejecución en Localhost

1. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

2. **Compilación y ejecución para producción:**
   ```bash
   npm run build
   npm start
   ```

## Seguridad y Buenas Prácticas

- El sistema implementa:
  - Rate limiting (limitador de peticiones)
  - Validación y sanitización de inputs
  - Protección CSRF
  - Honeypot para bots
- Para producción, se recomienda usar Redis para el rate limiter.
- Mantén tus dependencias actualizadas y revisa los logs de seguridad periódicamente.

## Solución de Problemas

- **Errores de dependencias:**
  - Elimina `node_modules` y los archivos de lock, luego ejecuta `npm install` nuevamente.
- **Versiones incompatibles de Node:**
  - Usa Node 18.x para máxima compatibilidad.
- **Variables de entorno faltantes:**
  - Asegúrate de tener `.env.local` con las claves correctas.
- **Errores en producción:**
  - Verifica la configuración de Redis y Supabase.
