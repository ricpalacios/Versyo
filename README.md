# Versyo — Deploy en Vercel

## Estructura
```
versyo_deploy/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── public/
│   └── manifest.json       ← PWA manifest
└── src/
    ├── main.jsx             ← Entry point
    └── VersyoApp.jsx        ← App completa
```

## Deploy en Vercel (3 pasos)

### Opción A — Vercel CLI (recomendado)
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Desde la carpeta versyo_deploy/
cd versyo_deploy
npm install
vercel

# 3. Seguir el wizard: framework = Vite, build = npm run build, output = dist
```

### Opción B — GitHub + Vercel Dashboard
1. Sube esta carpeta a un repo de GitHub
2. Ve a https://vercel.com/new
3. Importa el repo → Vercel detecta Vite automáticamente
4. Click en Deploy → URL lista en ~60s

## Instalar como PWA en móvil
Una vez desplegado en Versyo.vercel.app:
- **iOS Safari**: Compartir → Añadir a pantalla de inicio
- **Android Chrome**: Menú → Instalar aplicación

## Añadir iconos PWA (opcional)
Coloca tus iconos en `public/`:
- `icon-192.png` (192×192px)
- `icon-512.png` (512×512px)
