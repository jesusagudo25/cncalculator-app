# Sprint único — Rediseño tipo app móvil y funcionamiento offline

## Resultado

La aplicación abre directamente en la calculadora y presenta una experiencia unificada, responsive e instalable. La lógica matemática y el catálogo de ingredientes se conservaron. Soporte, Blog y Premium se muestran sobre la calculadora, por lo que el usuario no pierde la mezcla que está preparando.

## Cambios realizados

- Se reemplazó la entrada tipo landing/dashboard por un shell centrado en la calculadora.
- Se incorporó una barra superior compacta, navegación superior en escritorio y navegación inferior fija en móvil.
- Soporte, Blog y Premium ahora se abren como diálogo en escritorio y bottom sheet en móvil. Las rutas `/support`, `/blog` y `/premium` conservan acceso directo y `/calculator` sigue siendo compatible.
- Se rediseñó el flujo de datos generales, selección de ingredientes y resultados con un stepper, mejor jerarquía, búsqueda de ingredientes, resumen de peso/C:N y acciones más claras.
- Se mantuvieron las fórmulas, límites, unidades, catálogo de ingredientes y exportación a Excel existentes.
- Se eliminaron fuentes remotas de la experiencia esencial. Los iconos sociales remotos se sustituyeron por controles locales.
- Se añadió un manifiesto PWA, iconos de 192 y 512 px, registro del service worker, indicador de conectividad e instalación cuando el navegador la ofrece.
- El build genera un service worker versionado a partir del contenido compilado. Precarga el app shell, chunks, imágenes, datos empaquetados, exportación Excel y videos locales. Las rutas internas vuelven a `index.html` sin conexión y los videos admiten solicitudes parciales desde caché.
- Blog, WhatsApp y redes externas se deshabilitan con un mensaje contextual cuando no hay conexión.
- Se añadieron pruebas de navegador para el flujo principal, compatibilidad de rutas, PWA/offline, exportación y responsive.

## Archivos principales modificados

- `src/layouts/app-shell.jsx`: shell, navegación, overlays, estado offline e instalación.
- `src/pages/calculator.jsx`: entrada principal centrada en la calculadora.
- `src/sections/calculator/steps-general.jsx`: flujo del wizard y validaciones de avance.
- `src/sections/calculator/general-data.jsx`: formulario general responsive.
- `src/sections/calculator/ingredients.jsx`: selector responsive con búsqueda.
- `src/sections/calculator/results.jsx`: tabla de resultados adaptada a móvil.
- `src/style/app.css`: sistema visual, responsive, foco y tamaños táctiles.
- `src/routes.jsx`: rutas simplificadas y compatibles.
- `src/pwa.js`: registro del service worker y estado de conexión.
- `scripts/build-sw.mjs` y `scripts/sw-template.js`: generación y estrategia de caché offline.
- `public/manifest.json`, `public/icon-192.png` y `public/icon-512.png`: instalación PWA.
- `index.html`: metadatos PWA y eliminación de la fuente externa.
- `tests/app.spec.mjs` y `playwright.config.mjs`: validación automatizada en Edge.
- `package.json` y archivos de lock: scripts de build/pruebas y dependencia de Playwright.

## Validaciones completadas

- `npm.cmd test`: 3 pruebas aprobadas.
- Flujo móvil completo a 360 px, incluida validación de ingredientes y comprobación de resultados contra la fórmula existente.
- Apertura y cierre de Soporte sin perder los datos ya escritos en la calculadora.
- Recarga del build de producción sin conexión después de instalar el service worker.
- Navegación offline y fallback de `/support`.
- Recursos externos deshabilitados correctamente sin conexión.
- Videos locales servidos desde caché offline, incluida una solicitud HTTP Range de 100 bytes con respuesta `206`.
- Descarga offline de `results.xlsx`, sin haber cargado previamente el chunk de exportación.
- Compatibilidad directa con `/calculator` y `/premium`, y comportamiento correcto del historial del navegador.
- Revisión visual y ausencia de desbordamiento horizontal en 360, 390, 768, 1024 y 1440 px.
- Build de producción generado correctamente; el service worker incluyó 19 recursos locales, incluidos los chunks de Excel y ambos videos.

## Pendientes

No quedan pendientes funcionales dentro del alcance del sprint. La primera preparación offline descarga también los dos videos locales, por lo que su tamaño inicial ronda los 22 MB más el código de la aplicación; se mantuvo así para cumplir el requisito de soporte completo sin conexión.

El gestor de paquetes informa vulnerabilidades en dependencias heredadas. No se aplicó una actualización forzada porque podría cambiar librerías y comportamiento fuera del alcance de este rediseño.
