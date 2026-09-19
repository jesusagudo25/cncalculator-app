# Análisis integral de `cncalculator-app`

Fecha: 13 de septiembre de 2026. Referencia del repositorio: `63d3661` (`Update README.md`).

## 1. Resumen ejecutivo

El aplicativo es una SPA pública para calcular cantidades de ingredientes de una mezcla de compostaje con una relación carbono:nitrógeno objetivo. Utiliza React 18, Vite 5, Material UI y un catálogo local de 21 ingredientes. El usuario introduce datos generales, guarda una selección de ingredientes, consulta cantidades y puede exportarlas a Excel. El cálculo ocurre en el navegador.

La organización por páginas, layout y secciones facilita entender el producto. Sin embargo, la lógica matemática, las validaciones y la exportación están integradas en componentes; no existe una capa de dominio independiente ni pruebas automatizadas registradas. Hay secciones de una plantilla de dashboard sin conexión con las rutas actuales.

Los principales hallazgos son:

- **Alta prioridad:** se puede guardar una selección vacía y avanzar a resultados; la validación de grupos solo se ejecuta cuando el array tiene elementos.
- **Alta prioridad:** el formulario visible y los datos guardados son estados distintos. Después de guardar, se pueden editar campos o casillas y avanzar utilizando la versión anterior sin volver a validar lo que aparece en pantalla.
- **Alta prioridad:** el ingrediente `21`, “Aserrin”, declara C:N `733.33`, pero `50.65 / 0.14 = 361.7857…`. La discrepancia está comprobada; cuál dato debe corregirse requiere confirmación del dominio.
- **Alta prioridad:** el panel lateral permanece visible en todos los tamaños, pero el espacio reservado al contenido solo se aplica desde 1200 px. Hay riesgo claro de solapamiento en tamaños inferiores.
- **Prioridad media:** el cálculo muta el array de estado y no protege contra grupos vacíos, divisores inválidos ni resultados no finitos. El redondeo individual puede alterar la suma total.
- **Prioridad media:** el README describe autenticación, historial y gestión premium que no se encuentran implementados en este checkout.
- **Validación pendiente:** no hay `node_modules`. No se ejecutaron build, ESLint ni pruebas de navegador y no se instalaron dependencias.

**Mantenibilidad global: Media**, con **Baja** mantenibilidad de la lógica de cálculo frente a nuevas reglas. No se justifica una reescritura completa a partir de esta revisión. La prioridad propuesta es asegurar datos, validaciones y resultados antes de ampliar funcionalidades.

## 2. Alcance, método y límites de evidencia

Esta fase es exclusivamente de diagnóstico. El único archivo creado es `ANALISIS_APLICATIVO.md`. No se modificaron código, configuración, dependencias, lockfiles ni recursos existentes.

Convenciones del documento:

- **Comprobado:** respaldado por archivos del checkout o por ejecución aislada de operaciones en memoria.
- **Inferencia:** consecuencia esperada o interpretación razonable que no se verificó en una sesión real de navegador.
- **Recomendación:** propuesta para una fase futura; no implementada.
- **Pendiente de confirmar:** falta evidencia suficiente.

Se revisaron los 74 archivos versionados como inventario, el código fuente, los datos, los imports y las configuraciones relevantes. Hay 48 archivos JSX; un recorrido de imports locales desde `src/main.jsx` identifica 22 JSX no alcanzables. No se detectaron imports locales sin archivo resoluble en ese recorrido. Es una comprobación estática, no un sustituto del compilador.

Se ejecutaron scripts de Node por entrada estándar, sin escribir scripts ni resultados auxiliares. Se comprobó el catálogo, se extrajo y ejecutó el cuerpo de `calculate()` con estado simulado, y se calcularon contrastes de colores. Estas verificaciones no prueban la integración React, la descarga Excel ni el comportamiento visual.

Se consultaron avisos oficiales de SheetJS y Vite para contextualizar riesgos de versiones. No se hizo una auditoría exhaustiva de vulnerabilidades transitivas, un pentest, una revisión del historial completo de secretos ni una validación agronómica externa. Los vídeos se inventariaron, pero no se transcribieron ni se validó su contenido.

## 3. Qué hace el aplicativo

### Propósito y usuarios

**Comprobado por interfaz y textos:** ayuda a preparar una mezcla de ingredientes para compostaje centrada en la relación C:N. Soporte presenta material introductorio y tutoriales. Premium ofrece información comercial y abre un contacto por WhatsApp.

**Inferencia de público objetivo:** productores, emprendedores, técnicos y personas que preparan compost. El README también identifica usuarios del agro. No hay perfiles técnicos de usuario ni permisos implementados.

### Flujo principal

1. Entrar en Inicio y acceder a Calculadora mediante el menú.
2. Completar nombre, unidad de peso, peso total y C:N objetivo; pulsar **Guardar**.
3. Pulsar **Siguiente**.
4. Seleccionar ingredientes de dos grupos y pulsar **Guardar**.
5. Pulsar **Siguiente** para obtener cantidades por ingrediente.
6. Opcionalmente exportar `results.xlsx`.
7. Pulsar **Finalizar**: aparece un agradecimiento con el nombre y una invitación a conservar resultados.
8. Pulsar **Reiniciar**: se recarga la página y se pierde el estado del cálculo.

### Alcance real frente al README

| Capacidad | Evidencia del checkout |
| --- | --- |
| Calculadora C:N | Implementada en cuatro secciones bajo `src/sections/calculator` |
| Catálogo estático | Implementado: 21 ingredientes JSON |
| Exportación Excel | Implementada por imports dinámicos; descarga no probada en navegador |
| Tutoriales | Dos reproductores de MP4 locales en Soporte |
| Premium | Presentación comercial y enlace WhatsApp; no activa un plan |
| Registro, login, recuperación de contraseña | Descritos en README; no hay rutas, formularios ni servicios que los implementen |
| Historial, guardar/reutilizar cálculos | Descritos en README; no hay persistencia ni pantalla de historial |
| Ingredientes personalizados | No implementados; no hay operaciones de alta, edición o borrado |
| Humedad, costes, combinación de coste mínimo | Anunciados en Premium; ausentes del cálculo |
| Context API y Tailwind | Mencionados en README; no se encuentran como solución implementada |
| PWA | Hay manifest, pero no service worker ni evidencia de funcionamiento offline |

No se puede determinar si el README es una especificación futura o documentación desactualizada. **Pendiente de confirmar.**

## 4. Stack tecnológico y dependencias

Las versiones resueltas siguientes proceden de `package-lock.json`, no de paquetes instalados. El proyecto se declara `@jesusagudo25/cncalculator-app`, versión `1.0.0`, licencia `MIT`. No hay archivo de licencia independiente en el inventario.

| Dependencia | Declarada → resuelta npm | Uso observado |
| --- | --- | --- |
| `react` | 18.2.0 → 18.2.0 | Componentes, hooks y render declarativo |
| `react-dom` | 18.2.0 → 18.2.0 | `createRoot` en `main.jsx` |
| `react-router-dom` | 6.20.1 → 6.20.1 | BrowserRouter, useRoutes, Outlet, enlaces y detección de ruta activa |
| `@mui/material` | 5.14.20 → 5.14.20 | UI, estilos, tema y `Unstable_Grid2` |
| `@emotion/react` | 11.11.1 → 11.11.1 | Motor de estilos requerido por la integración MUI |
| `@emotion/styled` | 11.11.0 → 11.11.0 | Soporte de componentes estilizados de MUI |
| `@mui/icons-material` | 5.14.19 → 5.14.19 | Icono Download en exportación |
| `@heroicons/react` | 2.0.18 → 2.0.18 | Navegación, Premium y personalizaciones del tema |
| `@mui/lab` | 5.0.0-alpha.155 → igual | No se encontraron imports en `src`; candidato a revisión |
| `formik` | 2.4.5 → 2.4.5 | Formularios GeneralData e Ingredients |
| `yup` | 1.3.2 → 1.3.2 | Esquema de datos generales; import sin uso en Ingredients |
| `prop-types` | 15.8.1 → 15.8.1 | Contratos de props, generalmente poco específicos |
| `react-helmet-async` | 2.0.3 → 2.0.3 | Títulos de páginas y HelmetProvider |
| `react-material-ui-carousel` | ^3.4.2 → 3.4.2 | Carrusel de Inicio |
| `react-player` | ^2.14.1 → 2.14.1 | Vídeos locales de Soporte |
| `xlsx` | ^0.18.5 → 0.18.5 | Generación de archivo Excel bajo demanda |
| `file-saver` | ^2.0.5 → 2.0.5 | Descarga del Blob generado |
| `sass` | ^1.70.0 → 1.70.0 | Compilación de SCSS; declarada entre dependencias de aplicación |
| `simplebar-react` | 3.2.4 → 3.2.4 | Wrapper Scrollbar en secciones desconectadas; su CSS sí se importa globalmente |
| `apexcharts` | 3.44.2 → 3.44.2 | Motor del gráfico de OverviewKpi, sección no alcanzable |
| `react-apexcharts` | 1.4.1 → 1.4.1 | Wrapper React de ese gráfico; no hay gráficos en las rutas actuales |
| `date-fns` | 2.30.0 → 2.30.0 | Fechas en secciones desconectadas; imports sin uso en Calculator y Premium |
| `numeral` | 2.0.6 → 2.0.6 | Formato de importes en secciones desconectadas |
| `vite` (dev) | ^5.0.7 → 5.0.7 | Servidor de desarrollo, build y preview |
| `@vitejs/plugin-react` (dev) | ^4.2.1 → 4.2.1 | Transformación e integración React en Vite |
| `eslint` (dev) | 8.55.0 → 8.55.0 | Lint declarado, sin script ni preset react-app instalado en el lock |

No hay Redux, Zustand, React Query, cliente HTTP dedicado, backend, framework de tests ni TypeScript para el código de la aplicación. La extensión `.mts` de Vite no convierte el frontend JSX en un proyecto TypeScript.

### Dependencias candidatas a revisión

- **Sin uso directo encontrado:** `@mui/lab`. Al ser una versión alpha, además requiere cuidado si se decidiera utilizarla.
- **Solo útiles para código desconectado:** ApexCharts, su wrapper y Numeral. No significa que pesen en el bundle activo: depende del grafo de imports y del build.
- **Uso parcial o residual:** Date-fns, SimpleBar y su CSS global.
- **Solapamiento:** Heroicons, MUI Icons y 14 iconos locales. No es una incompatibilidad demostrada, pero dispersa la iconografía. Emotion React/styled y ApexCharts/wrapper son pares complementarios, no duplicados prescindibles por definición.
- **Versiones con avisos oficiales:** Vite 5.0.7 y XLSX 0.18.5; el alcance concreto se detalla en Seguridad.
- **Antigüedad:** el stack está fijado a versiones antiguas, pero no se afirma que todas estén formalmente obsoletas, abandonadas o sean incompatibles. Soporte actual y migración de cada paquete: **Pendiente de confirmar**.

## 5. Arquitectura y árbol del proyecto

```text
cncalculator-app/
├── index.html                         documento de entrada
├── package.json + dos lockfiles       scripts y dependencias
├── vite.config.mts                    tooling y aliases
├── vercel.json                        fallback SPA
├── .eslintrc / .editorconfig / jsconfig.json
├── public/
│   ├── manifest.json, robots.txt, iconos
│   └── assets/                        imágenes y dos vídeos
└── src/
    ├── main.jsx → app.jsx → routes.jsx
    ├── layouts/dashboard/             shell compartido, menú, cabecera, pie
    ├── pages/                         Inicio, Calculator, Support, Premium, 404
    │   └── theme.jsx                  demostración no enrutada
    ├── sections/
    │   ├── calculator/                pasos, formularios, fórmula y Excel
    │   ├── premium/                   tarjetas de ventajas
    │   ├── overview/                  tres secciones desconectadas
    │   └── orders/                    dos secciones desconectadas
    ├── components/                    Logo, QueryField, Scrollbar
    ├── data/ingredients.json          catálogo del cálculo
    ├── theme/                         paleta, tipografía, sombras y overrides
    ├── style/                         tokens SCSS y carrusel
    └── icons/                         14 SVG React no utilizados por rutas
```

| Carpeta | Responsabilidad real y archivos principales | Relación y consistencia |
| --- | --- | --- |
| `components` | Logo, entrada de búsqueda y scroll | Solo Logo participa en las rutas; no contiene la calculadora |
| `data` | Único catálogo JSON | Ingredients lo importa y pasa objetos completos al estado compartido |
| `icons` | Wrappers `createSvgIcon` | No se encontraron consumidores; `archive.jsx` duplica Home |
| `layouts` | Layout, TopNav, SideNav, Footer, config | Envuelve cuatro páginas; medidas laterales 73/75 px inconsistentes |
| `pages` | Composición de pantallas y metadatos | Inicio y Soporte incluyen bastante contenido local; Theme queda fuera del router |
| `sections` | Bloques de página y lógica de negocio | Calculadora concentra negocio, UI y exportación; Overview/Orders son restos desconectados |
| `style` | SCSS exclusivo del carrusel y variables | El archivo llamado global no es el reset general de la app |
| `theme` | Sistema visual MUI centralizado | Bien separado como infraestructura; algunos valores se duplican en SCSS y `sx` |

No hay directorios de servicios, repositorios de datos, hooks de dominio, validaciones compartidas o motor matemático. La separación visual es razonable; la separación entre negocio y presentación es limitada.

## 6. Flujo de arranque y ejecución

1. `index.html` declara idioma español, viewport, iconos, manifest, fuente Inter externa y `#root`. Un script declara `global = globalThis`; su necesidad real no está documentada.
2. Carga `/src/main.jsx` como módulo. ReactDOM crea la raíz con `createRoot`.
3. Se montan `HelmetProvider → BrowserRouter → Suspense → App`. No hay StrictMode explícito. Suspense no define un fallback visible.
4. `App` ejecuta `useRoutes(routes)` y construye un tema con `colorPreset: 'green'` y `contrast: 'high'`.
5. `ThemeProvider` aplica el tema. `CssBaseline` aplica reset y las reglas globales definidas en `create-components.jsx`.
6. La rama principal del router monta DashboardLayout con un Outlet. El Outlet resuelve Inicio, Calculadora, Soporte o Premium.
7. El layout renderiza TopNav y SideNav, el contenido y Footer. La 404 usa una rama exterior al layout, aunque conserva ThemeProvider y HelmetProvider.
8. Las páginas se importan estáticamente. Inicio importa `carousel.scss`, que importa `global.scss`. `App` importa siempre el CSS de SimpleBar.

```text
index.html
  → main.jsx: createRoot
    → HelmetProvider
      → BrowserRouter
        → Suspense sin fallback explícito
          → App: useRoutes + creación de tema
            → ThemeProvider + CssBaseline
              ├── DashboardLayout → Outlet → Page → Sections / Components
              └── NotFoundPage, fuera del DashboardLayout
```

Crear el tema dentro de App genera un objeto nuevo cuando App se vuelve a renderizar. Es una oportunidad de estabilidad, no un cuello de botella medido.

## 7. Sistema de rutas

Fuente: [src/routes.jsx](src/routes.jsx).

| Ruta | Página / archivo | Layout | Descripción |
| --- | --- | --- | --- |
| `/` | HomePage, `src/pages/index.jsx` | DashboardLayout | Ruta índice; bienvenida y carrusel |
| `/calculator` | CalculatorPage, `src/pages/calculator.jsx` | DashboardLayout | Asistente completo de cálculo |
| `/support` | SupportPage, `src/pages/support.jsx` | DashboardLayout | Información, vídeos y contacto |
| `/premium` | PremiumPage, `src/pages/premium.jsx` | DashboardLayout | Oferta y contacto comercial |
| `/404` | NotFoundPage, `src/pages/404.jsx` | Sin dashboard | Página de error explícita |
| `*` | NotFoundPage, mismo archivo | Sin dashboard | Cualquier URL no reconocida |

Todas son públicas. No hay guards, autenticación, parámetros `:id`, loaders, query strings de negocio ni redirects declarados. El catch-all muestra la página 404 sin cambiar la URL a `/404`. El contenedor padre es una ruta sin `path` que organiza el layout.

No hay rutas independientes para pasos, resultados, historial, login, documentación o Theme. `/theme` termina en el catch-all. Las páginas existentes que sí se importan en rutas tienen entradas válidas; no se identificó una página enlazada a un import local inexistente.

`config.jsx` agrega Blog como URL externa de Blogspot. No es una ruta interna ni un módulo del checkout. SideNav usa RouterLink también para ese elemento; no se concluye que esté roto solo por ser externo. La disponibilidad y titularidad del blog, redes y contactos no se verificaron.

## 8. Pantallas y módulos

| Pantalla | Objetivo, componentes y datos | Interacciones |
| --- | --- | --- |
| Inicio (`pages/index.jsx`) | Landing interna: Helmet, Container, Grid, Carousel y `Banner` local. Tres objetos de contenido con seis imágenes remotas | Carrusel automático, swipe y navegación de slides. “Ver más” no tiene href ni handler |
| Calculadora (`pages/calculator.jsx`) | Contenedor MUI de `StepsGeneral`. No realiza cálculos por sí misma | Navegación entre datos, ingredientes, resultados y finalización |
| Datos generales (`sections/calculator/general-data.jsx`) | Formik/Yup; TextField, MenuItem y Button | Edición y guardado en memoria de nombre, unidades, peso y C:N |
| Ingredientes (`sections/calculator/ingredients.jsx`) | Formik, Checkbox y FormControlLabel; catálogo JSON filtrado | Selección múltiple y guardado en memoria |
| Resultados (`sections/calculator/results.jsx`) | Fórmula, estado local y tabla MUI | Mostrar cantidades y exportar Excel |
| Finalización (`steps-general.jsx`) | Nombre guardado, imagen local y agradecimiento | Reiniciar con `location.reload()`; no ofrece Atrás desde esta vista |
| Soporte (`pages/support.jsx`) | Grid, ReactPlayer, textos y Avatars remotos; dos MP4 locales | Reproducción con controles, correo y redes. No hay envío de formulario ni tickets |
| Premium (`pages/premium.jsx`) | Imagen local y seis `OverviewFeatures` con datos hardcodeados | “Comenzar” abre WhatsApp; no hay checkout, suscripción ni control de acceso |
| 404 (`pages/404.jsx`) | Ilustración local, texto y botón RouterLink | Volver a Inicio |
| Theme (`pages/theme.jsx`) | Catálogo de variantes Typography de la plantilla Carpatin Free | Sin ruta ni consumidor actual |

La página principal es Inicio; la funcionalidad central está en Calculadora. Resultados y agradecimiento son estados de la misma página, no páginas persistentes. Soporte es la información disponible dentro de la aplicación; Blog vive fuera.

## 9. Funcionalidad de negocio y validaciones

### Entradas y reglas implementadas

Fuente: [general-data.jsx](src/sections/calculator/general-data.jsx).

| Campo | Inicial | Validación Yup | Observaciones |
| --- | --- | --- | --- |
| Nombre completo | Cadena vacía | String requerido, máximo 255 | Solo se usa en el agradecimiento; no identifica una cuenta |
| Unidades | Libras | String requerido, máximo 255 | Selector: Libras, Kilogramos, Quintales, Toneladas; el esquema no usa `oneOf` |
| Peso | `'30'` | Número requerido entre 1 y 1000 | Mismos límites para todas las unidades |
| C:N objetivo | `'30'` | Número requerido entre 25 y 35 | No hay `.integer()` en el esquema |

Los inputs de peso y C:N son `type="number"` sin `step` explícito. La restricción nativa del navegador puede limitar decimales; la regla de negocio en Yup no los prohíbe. No debe confundirse esa diferencia con una prueba de que todos los navegadores permiten enviar decimales.

No hay mensajes personalizados de `typeError`, normalización `trim()` del nombre ni validación de pertenencia de unidades fuera del selector. Algunos mensajes de validación podrían aparecer en inglés por defaults de Yup; **Pendiente de confirmar en interfaz**.

### Selección y avance

Ingredients agrupa según `carbon_nitrogen <= objetivo` y `carbon_nitrogen > objetivo`. No calcula esa relación desde carbono y nitrógeno al filtrar. Guarda objetos completos del catálogo en un array. No conecta un `validationSchema` al Formik de ingredientes, aunque importa Yup y renderiza `ErrorMessage` para un campo genérico que no valida.

StepsGeneral exige datos generales guardados y un array de ingredientes guardado. Si ese array tiene elementos, exige al menos uno en cada grupo. **Si el array es `[]`, omite toda la comprobación y permite avanzar.** En resultados vacíos se realizan operaciones no finitas internamente, pero no hay filas para mostrarlas: se presenta una tabla sin ingredientes y continúa disponible la exportación.

Los cambios de Formik no pasan al estado del asistente hasta pulsar Guardar. Siguiente solo consulta el estado guardado. Ejemplo: guardar peso 30, escribir 50 sin guardar y avanzar conserva 30. Análogamente, desmarcar casillas después de guardar no actualiza la selección usada al avanzar. No hay indicador visible de cambios pendientes ni confirmación de guardado.

### Reglas ausentes

No hay costes, optimización económica, máximos por ingrediente, disponibilidad, humedad aplicada, conversión de unidades, trazabilidad de fuentes ni verificación de la C:N final después del redondeo. No se deben deducir esas capacidades de los textos de Premium.

## 10. Fórmulas y comprobaciones numéricas

Fuente principal: [results.jsx](src/sections/calculator/results.jsx), función `calculate()`.

Definiciones:

- `R`: C:N objetivo (`parseFloat(generalData.cn)`).
- `W`: peso total (`parseFloat(generalData.weight)`).
- Grupo 1: ingredientes seleccionados cuya C:N almacenada es menor o igual a R.
- Grupo 2: ingredientes seleccionados cuya C:N almacenada es mayor que R.
- `n1`, `n2`: cantidad de ingredientes de cada grupo.
- `C1`, `C2`: promedios aritméticos de `carbon` de cada grupo.
- `N1`, `N2`: promedios aritméticos de `nitrogen` de cada grupo.

```text
C1 = Σ carbon(grupo 1) / n1
C2 = Σ carbon(grupo 2) / n2
N1 = Σ nitrogen(grupo 1) / n1
N2 = Σ nitrogen(grupo 2) / n2

D = (C2 − C1) + R·N1 − R·N2

PesoGrupo1 = W·(C2 − R·N2) / D
PesoGrupo2 = W·(R·N1 − C1) / D

Cantidad por ingrediente del grupo 1 = redondear2(PesoGrupo1 / n1)
Cantidad por ingrediente del grupo 2 = redondear2(PesoGrupo2 / n2)

redondear2(x) = Math.round((x + Number.EPSILON) · 100) / 100
```

**Comprobado:** todos los ingredientes de un mismo grupo reciben la misma cantidad. No hay búsqueda de combinaciones ni ponderaciones elegidas por usuario.

**Interpretación algebraica:** si ambos grupos existen, los datos son consistentes y D no es cero, se trata de resolver simultáneamente:

```text
PesoGrupo1 + PesoGrupo2 = W
(C1·PesoGrupo1 + C2·PesoGrupo2) /
(N1·PesoGrupo1 + N2·PesoGrupo2) = R
```

Esta interpretación describe la ecuación; no acredita que sea un modelo agronómico suficiente. `carbon` y `nitrogen` parecen concentraciones porcentuales, pero el JSON no especifica unidad, método de medición ni base seca/húmeda. **Pendiente de confirmar.** Si comparten una escala porcentual, el factor `/100` se cancela en el cociente.

La unidad de peso solo se añade al texto de resultados. No existe un factor libras/kg/quintales/toneladas: cambiar la selección significa interpretar W en la nueva unidad, no convertir la cantidad anterior. La definición concreta de quintal y tonelada no está documentada.

### Ejemplo reproducido

Con W = 30, R = 30, porcino (`C=25`, `N=1.5`) y caprino (`C=40`, `N=1`):

```text
D = (40 − 25) + 30·1.5 − 30·1 = 30
Peso porcino = 30·(40 − 30·1) / 30 = 10
Peso caprino = 30·(30·1.5 − 25) / 30 = 20
C:N algebraica = (25·10 + 40·20) / (1.5·10 + 1·20) = 30
```

### Verificaciones aisladas, sin archivos adicionales

Se ejecutó el cuerpo real de `calculate()` extraído del archivo, con callbacks React simulados y el JSON del proyecto. No se ejecutó el componente montado.

| Caso | Resultado comprobado | Alcance |
| --- | --- | --- |
| Porcino + caprino, W=30, R=30 | 10 y 20; suma 30 | Caso válido básico |
| Selección vacía | Array de resultados vacío | Alcanzable por la omisión de validación descrita |
| Solo porcino | Cantidad `NaN` | Prueba de robustez del motor; el avance habitual bloquea una selección no vacía de un solo grupo |
| Los 21 ingredientes, W=30, R=30 | 8 filas de 2.42 y 13 de 0.82; suma 30.02 | Desajuste de redondeo reproducido |
| Leguminosas + caprino, W=30, R=25.33 | 30.01 y −0.01 | Caso aislado: relación almacenada 25.33 frente a 38/1.5=25.333…; llegada mediante formulario depende de validación nativa |
| Ejecutar dos veces con el mismo array de estado, porcino + caprino | 4 filas y suma 60 | `result.push()` acumula; no demuestra duplicación en cada recorrido habitual |

Faltan protecciones explícitas contra grupos vacíos, divisor cero, valores no finitos y cantidades negativas. No se ha demostrado un divisor cero con el catálogo actual y los objetivos enteros permitidos. El caso decimal muestra por qué clasificar con una relación redondeada y calcular con C/N puede ser inconsistente.

## 11. Manejo de datos

### Orígenes

| Origen | Uso |
| --- | --- |
| `src/data/ingredients.json` | Único catálogo de negocio |
| Objetos JavaScript locales | Slides de Inicio, ventajas Premium, enlaces de navegación y Footer |
| Formik y `useState` | Entradas y selección temporales |
| Cálculo derivado | Filas `{ ingredient_id, name, amount }` |
| `public` | Imágenes, vídeos, favicon y manifest |
| URLs externas | Fuentes, imágenes, redes, blog y WhatsApp; no APIs de negocio |

No se encontraron fetch/axios, localStorage, sessionStorage, IndexedDB, cookies de aplicación, WebSockets ni lectura de query strings para cálculos. El estado se pierde al desmontar la calculadora o recargar. Esto no significa que el navegador nunca haga peticiones: sí descarga recursos y contenido externo.

### Catálogo completo

Todos los números y IDs están almacenados como strings. Los 21 registros tienen `humidity: '0'` y fechas `created_at`/`updated_at` `2023-02-14 00:22:03`, que no intervienen en el cálculo.

| ID | Nombre del archivo | Carbono | Nitrógeno | C:N almacenada |
| --- | --- | ---: | ---: | ---: |
| 1 | Excremento de porcino | 25 | 1.5 | 16.67 |
| 2 | Residuos de hortalizas | 30 | 1.8 | 16.67 |
| 3 | Residuos de Tuberculos | 30 | 1.5 | 20 |
| 4 | Biochar | 2 | 0.1 | 20 |
| 5 | Excremento de bovino | 30 | 1.3 | 23.08 |
| 6 | Excremento de conejo | 35 | 1.5 | 23.33 |
| 7 | Gallinaza | 35 | 1.5 | 23.33 |
| 8 | Residuos de leguminosas | 38 | 1.5 | 25.33 |
| 9 | Excremento de ovino | 35 | 1 | 35 |
| 10 | Excremento de caprino | 40 | 1 | 40 |
| 11 | Hojas secas | 41 | 1 | 41 |
| 12 | Excremento de Patos | 38 | 0.8 | 47.5 |
| 13 | Excremento de equino | 40 | 0.8 | 50 |
| 14 | Excremento de pavos | 35 | 0.7 | 50 |
| 15 | Rastrojo de maiz | 40 | 0.75 | 53.33 |
| 16 | Paja de avena | 29 | 0.53 | 54.72 |
| 17 | Paja de arroz | 42 | 0.63 | 66.67 |
| 18 | Paja de trigro | 46 | 0.53 | 86.79 |
| 19 | Paja de cebada | 58 | 0.64 | 90.63 |
| 20 | Aserrin de pino | 50.65 | 0.14 | 361.79 |
| 21 | Aserrin | 50.65 | 0.14 | 733.33 |

La comprobación de `carbon/nitrogen` frente al valor almacenado, con tolerancia 0.011, detecta una discrepancia en el registro 21. Los demás coinciden aproximadamente con redondeo a dos decimales. Esto solo valida coherencia aritmética, no exactitud científica.

Los registros 20 y 21 comparten carbono y nitrógeno, pero no relación. No se puede decidir si son duplicados, si uno representa otro material o si está mal una concentración. No se propone un valor sustituto sin confirmación.

Los filtros de Ingredients y StepsGeneral no normalizan tipos. Como el objetivo inicial es un string y el catálogo también, hay comparaciones que pueden ser lexicográficas; Results sí convierte el objetivo a número. Con los rangos y entradas enteras actuales no se ha demostrado una selección diferente por esta razón, pero constituye un contrato frágil para ampliar el catálogo.

Contenido, enlaces y configuraciones comerciales se encuentran mezclados con JSX. Soporte repite la estructura de contacto para ambos vídeos. No hay versionado funcional del catálogo ni referencia bibliográfica por ingrediente.

## 12. Estado de la aplicación

| Componente | Estado / mecanismo | Observación |
| --- | --- | --- |
| StepsGeneral | `activeStep`, `skipped`, `formData` con useState | Dueño del cálculo completo; `skipped` arrastra lógica sin acción de omitir pasos |
| GeneralData | Estado Formik; recibe `formData` y `setFormData` | Inicializa con datos guardados; solo los sincroniza al submit |
| Ingredients | Estado Formik por `checkboxFields_ID` | Convierte booleanos a objetos del catálogo al guardar |
| Results | `result`, `isLoading`; efecto dependiente de `formData` | Guarda información derivable; muta `result` y vuelve a pasar la misma referencia |
| SideNav | `useLocation` | Deriva selección activa de pathname |
| QueryField | `value`, `autoFocus`, ref y efectos | Componente desconectado; copia prop a estado y gestiona foco |

No hay estado de negocio global por Context, Redux o Zustand. Los providers de MUI, routing y Helmet son infraestructura de librerías. El paso actual tampoco se codifica en URL; el botón Atrás del navegador no representa los pasos del asistente.

No existe prop drilling profundo: StepsGeneral entrega las mismas dos props a hijos directos. Sí existe acoplamiento amplio porque cada sección conoce el objeto completo y puede reemplazarlo. `setFormData` se recibe en Results, pero no se usa.

El efecto de Results llama una función local que captura `result`, sin vaciarlo al recalcular. `setIsLoading(false)` provoca el render inicial que permite ver los datos mutados; futuras ejecuciones con la misma referencia pueden producir comportamiento frágil. Volver a montar Results empieza con un array nuevo, por lo que no se afirma que volver Atrás y avanzar duplique siempre las filas.

Los filtros y la clasificación se repiten en Ingredients, StepsGeneral y Results. Con 21 elementos su coste es pequeño; el riesgo principal es que diverjan las reglas al cambiar una sola implementación.

## 13. Inventario de componentes

| Componente | Tipo y responsabilidad | Props principales | Dependencias y consumidores |
| --- | --- | --- | --- |
| App | Infraestructura: tema y rutas | Ninguna | MUI/Router; main |
| Layout | Layout compartido | `children` | MUI styled, TopNav, SideNav, Footer; routes |
| TopNav | Navegación/cabecera | Ninguna | RouterLink, Logo, MUI; Layout |
| SideNav | Navegación lateral | Ninguna | Router, MUI Drawer, config; Layout |
| Footer | Layout/información | Ninguna | MUI y lista local de enlaces; Layout |
| Logo | Visual | `color` | MUI useTheme; TopNav. Calcula color, pero renderiza siempre el mismo PNG |
| StepsGeneral | Negocio y navegación de formulario | Sin contrato significativo | React/MUI y tres secciones; Calculator |
| GeneralData | Formulario de negocio | `formData`, `setFormData` | Formik/Yup/MUI; StepsGeneral |
| Ingredients | Formulario de negocio | `formData`, `setFormData` | Formik/MUI/JSON; StepsGeneral |
| Results | Negocio, tabla y exportación | `formData`, `setFormData` sin uso | React/MUI/XLSX/FileSaver; StepsGeneral |
| Banner | Visual con contenido | `item`, `contentPosition`, `length` opcional | MUI/SCSS; solo Inicio |
| OverviewFeatures | Tarjeta reutilizable | `icon`, `label`, `value` | MUI/PropTypes; Premium |
| QueryField | Entrada reutilizable desconectada | `disabled`, `onChange`, `placeholder`, `value`, otras | React/MUI/Heroicons; OrdersSearch no enrutado |
| Scrollbar | Wrapper visual desconectado | Props heredadas de SimpleBar | styled/SimpleBar; OrdersTable y LatestCustomers |
| OverviewKpi | Gráfico desconectado | `chartSeries`, `stats` | React-ApexCharts/MUI; sin consumidor |
| OverviewLatestCustomers | Tabla desconectada | `customers` | Date-fns/Numeral/Scrollbar; sin consumidor |
| OverviewSummary | Tarjeta desconectada | `icon`, `label`, `value` | MUI; sin consumidor |
| OrdersSearch | Filtros desconectados | `mode`, `onModeChange`, `onQueryChange`, `query` | QueryField/MUI; sin consumidor |
| OrdersTable | Tabla desconectada | `count`, `items`, `page`, `rowsPerPage`, callbacks | Date-fns/Numeral/Scrollbar; sin consumidor |

Los 14 iconos locales tampoco participan en el grafo activo. La clasificación “desconectado” se refiere al código de entrada actual, no a que deba eliminarse automáticamente.

Results es el componente más sensible por responsabilidades, aunque sus 186 líneas no son un tamaño extraordinario. GeneralData tiene 170 líneas; Ingredients, formularios y pasos pueden mantenerse en esta escala, pero no ofrecen aislamiento para probar reglas. Soporte tiene 288 líneas, parte de ellas un bloque comentado. `create-components.jsx` tiene 392 líneas y su tamaño es en gran parte configuración declarativa razonable.

## 14. Diseño y sistema visual

Hay una **base de sistema visual centralizada en MUI**, con paleta, sombras, tipografía, radios y overrides de componentes. No son únicamente constantes dispersas. Su aplicación es incompleta porque convive con tokens SCSS y estilos locales sin un catálogo único.

| Token / configuración | Valor observado |
| --- | --- |
| Primario activo | Green: `#12B76A`; light `#6CE9A6`; dark `#027A48`; texto blanco |
| Fondo general | `#FCFCFD` con `contrast: 'high'` |
| Superficie | `#FFFFFF` |
| Texto principal / secundario | `#101828` / `#667085` |
| Divisor | `#F2F4F7` |
| Cabecera | `neutral.900`, `#101828` |
| Success / info / warning / error | `#10B981` / `#06AED4` / `#F79009` / `#F04438` |
| Otros presets definidos | Blue `#2970FF`, Indigo `#635dff`, Purple `#9E77ED` |
| Radio base | 6 px |
| Sombras | 25 entradas; bordes neutrales y capa oscura con alpha 0.08 |
| Fuente activa | `Inter, sans-serif`; Google Fonts carga pesos 300–600 |
| Tamaños h1…h6 | 48, 36, 32, 24, 18 y 16 px; peso 600 |
| Espaciado | `sx`, Stack/Grid spacing y valores locales; no hay override propio de spacing |
| Breakpoints MUI | xs=0, sm=600, md=900, lg=1200, xl=1440 |
| SCSS carrusel | Verde oscuro `#0D8A54`, activo `#0A6A40`; fuentes 12–40 px |
| CTA Premium | Naranja `#F09E54`, hover `#FE8235`, texto blanco |

El modo está fijado a `light`; no existe selector dark/light ni persistencia de preferencia. `contrast: 'high'` cambia el fondo; no garantiza por sí mismo contraste accesible.

`create-components.jsx` personaliza Avatar, Button, Card, Chip, CssBaseline, inputs, etiquetas, Radio, Switch y tablas. TextField adopta `variant: 'filled'`. Los estilos globales efectivos viven en CssBaseline, mientras `style/global.scss` contiene variables y mixins importados por el carrusel. Allí se declara Montserrat, pero no se observa aplicación efectiva de esa variable de fuente.

Los mixins SCSS definen móvil hasta 767 px, tablet 768–1279 y desktop desde 1280; no coinciden con MUI y no se invocan en el SCSS del carrusel actual. La iconografía activa mezcla Heroicons y un icono MUI, además de PNG remotos; la carpeta de SVG locales queda al margen.

## 15. Responsive

No se realizó prueba visual. La tabla diferencia reglas comprobadas de efectos esperados.

| Área | Regla comprobada | Riesgo / comportamiento esperado |
| --- | --- | --- |
| Shell | Drawer permanente de 75 px; padding izquierdo de 73 px solo desde lg=1200 | Solapamiento bajo 1200 px; diferencia de 2 px incluso en desktop |
| Cabecera | Dos grupos horizontales con marca, enlace Premium y avatar; sin variante móvil | Falta de espacio en teléfonos, posible desbordamiento |
| Ingredientes | Dos columnas de 40%, Stack horizontal, spacing 5, tarjetas con p=5 | Etiquetas largas y controles comprimidos; no apila columnas en móvil |
| Resultados | Contenedor al 60%; tabla con minWidth 650 | Lectura mediante desplazamiento horizontal o recorte según contenedor; ancho desaprovechado |
| Inicio | Banner de 400 px y tres columnas xs=4; paddings de 30 px y fuentes grandes | Contenido estrecho en móvil y potencial recorte vertical |
| Soporte | Grid xs=12/md=4 y xs=12/md=8; Stack cambia orientación | Adaptación parcial; ReactPlayer no recibe dimensiones fluidas explícitas |
| Premium | Tarjetas xs=12/md=4, bloque principal al 60% | Ventajas se apilan; texto principal queda innecesariamente estrecho en móvil |
| Footer | Columna xs, fila sm | Adaptación explícita favorable |
| 404 | Ilustración con maxWidth 100% | Adaptación básica favorable |

Desktop tiene la mayor cobertura estructural. Tablet y móvil requieren validación prioritaria. **Recomendación:** revisar al menos 360, 768, 1024 y 1440 px, zoom y orientación, una vez autorizada una fase de ejecución con dependencias.

## 16. UX actual

### Problemas confirmados por código

1. Guardar y Siguiente son acciones separadas sin señal visible de sincronización. Es posible avanzar con datos distintos de los visibles.
2. Se acepta la selección guardada vacía y se muestra una recomendación sin ingredientes.
3. “Ver más” de Inicio no tiene acción; los enlaces del pie apuntan a `#`.
4. Las validaciones entre pasos usan `alert()`, mientras el formulario general usa errores en línea: feedback inconsistente.
5. Results no muestra peso solicitado, C:N objetivo, suma final ni C:N conseguida; solo filas y unidad.
6. La exportación incluye `ingredient_id`, `name`, `amount`, pero omite unidad, objetivo, peso solicitado, fecha y nombre. Fuera de la pantalla el archivo pierde contexto.
7. Las promesas de exportación no tienen `catch`, indicador de progreso ni confirmación de error.
8. Finalizar oculta resultados y ya no muestra Atrás. El mensaje pide conservarlos, pero desde esa vista no se ofrece exportación.
9. Reiniciar recarga todo y no hay historial. El botón Guardar no persiste a disco ni a una cuenta.
10. Premium abre una conversación externa; no implementa las capacidades anunciadas dentro de la aplicación.

### Posibles oportunidades UX

- Unificar validación, guardado y avance con un contrato explícito.
- Mostrar resumen de entrada y explicar el reparto igualitario dentro de cada grupo.
- Dar ayuda sobre C:N, unidad, peso total y límites, después de confirmar definiciones del dominio.
- Permitir regresar a resultados desde finalización.
- Revisar si el nombre completo es necesario para un cálculo anónimo.
- Añadir contadores de seleccionados por grupo y ayuda contextual.
- Hacer que Inicio conduzca claramente a calcular; validar con usuarios si el carrusel aporta valor.
- Usar mensajes de estado accesibles y consistentes.

Estas propuestas son hipótesis de mejora, no resultados de entrevistas, analítica ni pruebas de usabilidad.

## 17. Accesibilidad

Hay bases favorables: `lang="es"`, formularios y botones reales, labels de TextField, FormControlLabel en checkboxes, tabla estructurada, títulos mediante Helmet y controles de vídeo. No se puede certificar accesibilidad sin DOM, teclado y tecnologías asistivas.

| Hallazgo | Nivel | Evidencia y alcance |
| --- | --- | --- |
| Contraste primario con blanco ≈2.62:1 | Alto | Cálculo de colores definidos: `#12B76A` y blanco; afecta potencialmente texto de botones y navegación activa sobre fondos claros |
| CTA Premium blanco/naranja ≈2.16:1; hover ≈2.48:1 | Alto | Colores explícitos del botón; contraste bajo incluso para texto grande |
| Contenido potencialmente cubierto por Drawer | Alto | Regla responsive comprobada; impacto en zoom/reflow pendiente de prueba |
| Imagen 404 sin atributo alt | Medio | `pages/404.jsx`; falta decidir si es decorativa o informativa |
| No hay landmark main ni nav explícitos en shell | Medio | Layout usa div y SideNav Drawer/List; dificulta localizar regiones respecto a landmarks dedicados |
| Cambio de paso sin gestión explícita de foco o anuncio | Medio | Solo cambia `activeStep`; experiencia con lector de pantalla pendiente |
| Carrusel con autoPlay sin control de pausa implementado por la app | Medio | Confirmar comportamiento de la librería, foco y preferencias de movimiento |
| No se configuran pistas de subtítulos o transcripción para vídeos | Medio | No hay tracks ni archivos de subtítulos; contenido del MP4 pendiente de revisar |
| Encabezados de páginas comienzan usualmente en h4/h3 | Medio | Variantes Typography sin componente semántico alternativo en esas cabeceras |
| Navegación activa indicada por color sin `aria-current` explícito | Medio | SideNav usa RouterLink y estilos; no NavLink |
| Alt “Logo” en imagen de agradecimiento | Bajo | Texto alternativo genérico y poco descriptivo |
| Controles solo con iconos sin nombre en OrdersTable/OrdersSearch | Medio, latente | Componentes desconectados; no afecta las rutas actuales |

Los contrastes se calcularon con luminancia relativa sRGB para pares sólidos; no sustituyen un análisis de estilos computados de todos los estados. Como referencia técnica, los mínimos WCAG para texto son 4.5:1 y 3:1 para texto grande: [W3C, Understanding Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

No se identificó una implementación propia de navegación por teclado que deba auditarse como widget complejo; se depende principalmente de componentes MUI y del navegador. Orden real de tabulación, foco visible, asociación efectiva de mensajes y reproducción accesible: **Pendiente de confirmar**.

## 18. Rendimiento

### Comprobado

- Las páginas se importan estáticamente en routes; no hay `React.lazy` para separar pantallas.
- XLSX y FileSaver sí usan `import()` al exportar: el código está preparado para división bajo demanda.
- El cálculo recorre como máximo 21 elementos del catálogo actual. No hay evidencia de un problema computacional relevante.
- ReactPlayer y Carousel entran mediante páginas importadas estáticamente. El coste final requiere build; no se atribuye automáticamente todo el paquete a la carga inicial.
- Se importa CSS de SimpleBar aunque el wrapper solo vive en ramas desconectadas.
- Hay logs en render de Ingredients y en cálculo. Con este catálogo son pequeños, pero innecesarios para producción.
- App recrea el tema en render y Results mantiene estado derivado mutable.

### Recursos medidos en disco

| Recurso | Bytes | Tamaño decimal aproximado |
| --- | ---: | ---: |
| `composting.mp4` | 12,261,941 | 12.26 MB |
| `how-to-use.mp4` | 10,096,845 | 10.10 MB |
| `logo.png` | 316,716 | 317 kB |
| `illustration-not-found.svg` | 36,232 | 36 kB |
| `calculator.png` | 26,835 | 27 kB |
| `fertilizer.png` | 23,858 | 24 kB |

Los vídeos suman 22.36 MB almacenados. **No es el tamaño del bundle JavaScript ni demuestra que se descarguen completos al entrar en Inicio.** El peso de imágenes remotas, caché, streaming, compresión HTTP y tiempos reales no se midieron.

**Recomendaciones:** medir primero el build y las rutas; revisar logo, entrega de vídeo y carga por pantalla antes de introducir memoización generalizada. No optimizar los bucles de 21 ingredientes sin evidencia de necesidad.

## 19. Calidad del código, ESLint y estándares

### Hallazgos reales

- Mutación de estado en Results y validaciones distribuidas en tres lugares.
- Imports sin uso: hooks y Date-fns en Calculator; Date-fns y otros en Premium; Yup/Field y controles en Ingredients; Grid en GeneralData, entre otros.
- `Logo.color` calcula un valor que no influye en la imagen.
- Premium coloca `key` en OverviewFeatures, pero el elemento retornado por `features.map` es Grid sin key: advertencia React esperable.
- Se usan índices como keys en selecciones y resultados; con la lista actual no prueba un fallo, pero dificulta cambios dinámicos.
- `skipped`, `isStepSkipped` y borrado de omisiones no tienen una acción de omitir que los alimente.
- Cinco llamadas `console.log` en la calculadora y un `console.error` de fallback del tema. Un log dice “No hay ingredientes seleccionados” dentro de la condición de lista no vacía.
- Soporte conserva un bloque grande de JSX comentado con contenido y ruta de vídeo antiguos. No es contenido activo.
- `archive.jsx` y `home.jsx` representan Home; nombre de archivo y export no corresponden en Archive.
- Se mezclan comillas, punto y coma, estilo de nombres y textos inglés/español. No se encontraron marcadores TODO/FIXME en la búsqueda de `src`.
- Hay `PropTypes.object` y arrays genéricos; StepsGeneral tiene un propTypes vacío y Banner no declara contrato.
- No hay archivos de tests ni scripts test/lint en package.json. No se encontraron workflows CI en el inventario versionado.

### ESLint

`.eslintrc` extiende `react-app`; desactiva `jsx-a11y/alt-text`, `react/display-name`, `react/no-children-prop` y fija advertencia de máximo una prop JSX por línea.

**Problema de configuración comprobado:** `eslint-config-react-app` no está declarado en package.json ni presente como paquete en package-lock.json. Un entorno aislado construido únicamente con esas dependencias no tiene garantizada la resolución del preset y previsiblemente falla antes de analizar código. No se ejecutó ESLint y no se inventa un recuento de errores.

No se usó `--fix`, `npx`, ni instalación automática. No hay ejecutable ESLint local porque falta node_modules. La regla de alt-text desactivada reduce la capacidad de detectar la imagen 404 sin alt.

### EditorConfig y resolución

`.editorconfig` tiene 42,168 bytes y abundantes reglas de JetBrains para lenguajes que no aparecen en el frontend. Establece UTF-8, LF, espacios, indentación 2, máximo 100 columnas y `insert_final_newline=false`. Las reglas específicas JavaScript para comillas simples y punto y coma se agrupan bajo cjs/js/mjs, sin incluir explícitamente JSX; el bloque global sí aplica. El tamaño de esta configuración no afecta al bundle.

`jsconfig.json` solo define `baseUrl: '.'`, lo que ayuda al editor con imports desde `src`. Vite define los aliases reales de compilación para `src…` y `~…`. No hay comprobación estática de tipos mediante TypeScript ni configuración Prettier encontrada.

## 20. Build y herramientas de ejecución

Fuente: [vite.config.mts](vite.config.mts), [package.json](package.json), [index.html](index.html).

| Aspecto | Configuración comprobada |
| --- | --- |
| Desarrollo | `npm run dev` → `vite` |
| Build | `npm run build` → `vite build` |
| Preview | `npm run start` → `vite preview` |
| Plugin | `@vitejs/plugin-react` |
| Alias `~` | Regex `^~(.+)` hacia `node_modules/$1`, basado en process.cwd() |
| Alias `src` | Regex `^src(.+)` hacia `src/$1`, basado en process.cwd() |
| Puertos | server y preview: 3000; no se fija strictPort |
| Base path | No se declara; código y assets asumen raíz mediante `/…` |
| Build personalizado | No hay outDir, manualChunks, sourcemap, target ni minify explícitos |
| Variables | No se encontraron variables de entorno de aplicación requeridas |
| Browserslist | Producción >0.2%, not dead, not op_mini all; desarrollo último Chrome/Firefox/Safari |

No se debe asumir que Browserslist modifica por sí solo el target de Vite: no hay integración explícita que lo conecte. Los aliases dependen del directorio de trabajo, por lo que conviene ejecutar desde la raíz.

### Resultado de verificaciones

| Verificación | Resultado |
| --- | --- |
| Node disponible | v22.23.1 |
| npm disponible | 12.0.2 mediante `npm.cmd` |
| Invocación `npm` en PowerShell | El wrapper npm.ps1 está bloqueado por la política de scripts; no se cambió esa política |
| Dependencias locales | `node_modules` no existe |
| Build | **No ejecutado**: faltan dependencias y el build normal generaría archivos adicionales |
| ESLint | **No ejecutado**: falta ejecutable local; además hay inconsistencia del preset |
| Imports locales estáticos | Sin referencias locales irresolubles detectadas por el recorrido |
| Pruebas numéricas aisladas | Ejecutadas, resultados en sección 10 |
| UI y Excel real | **Pendiente de confirmar** |
| Errores/warnings de compilación | No medidos; no se declara que compila ni que falla |
| Tamaño JS/CSS, gzip y chunks | No medido; no existe dist local |

No se ejecutó `npm run build` para obtener un fallo previsible ni se instaló tooling global. Una futura fase de validación deberá instalar con el gestor acordado y permitir artefactos de build. El puerto de preview no constituye evidencia de un servidor de producción.

## 21. Despliegue

`vercel.json` configura un rewrite de `/(.*)` a `/`. **Intención comprobada:** devolver la entrada de la SPA para rutas de cliente. No declara redirects, funciones serverless, headers, variables o reglas específicas de caché.

**Inferencia:** el objetivo es desplegar estáticos con Vercel, probablemente usando detección de Vite, build del package.json y salida convencional `dist`. La configuración del proyecto en el panel de Vercel, dominio activo, comando de instalación y último despliegue no están en el checkout: **Pendiente de confirmar**.

Debe comprobarse en producción la carga directa y recarga de `/calculator`, el catch-all y la entrega de assets. El catch-all de React no garantiza un HTTP 404; con fallback SPA puede recibirse el documento con HTTP 200.

El manifest declara nombre, start_url `.`, display standalone y solo favicon.ico como icono. No se encontró service worker ni registro de caché offline. No se puede certificar instalabilidad o uso offline solo con este archivo. Hay diferencias de theme-color entre HTML blanco y manifest negro. El link apple-touch-icon usa `rel="apple-touch-icon.png"`, cuyo reconocimiento no se comprobó.

`.gitignore` ignora `/build`, pero no `/dist`, salida convencional de Vite. Un build posterior podría dejar artefactos visibles para Git. No se generaron para esta revisión.

## 22. Gestión de paquetes

Existen `package-lock.json` con `lockfileVersion: 2` y `yarn.lock` formato v1. Ambos registran el stack principal actual, incluidas React 18.2.0, Vite 5.0.7, MUI 5.14.20, Sass 1.70.0, ReactPlayer 2.14.1 y XLSX 0.18.5. No se identificó divergencia de esas versiones directas. Esto no acredita equivalencia completa de resolución transitiva o peers.

No se declara `packageManager` ni `engines`; no hay documentación de instalación que designe un gestor, ni configuración CI que resuelva la duda. La existencia de ambos archivos demuestra que ambos formatos se han generado, pero no cuál utiliza hoy el equipo o Vercel.

**Riesgos:** resolver dependencias diferentes según comando, actualizar un lock y dejar el otro obsoleto, diferencias de peers/plataforma y selección de gestor por heurística del hosting. **Recomendación:** confirmar y documentar un gestor, versiones y política de lockfiles en una fase posterior. No se eliminó ninguno.

## 23. Seguridad

### Código y datos del checkout

No se encontraron credenciales privadas evidentes en los archivos de aplicación/configuración revisados ni coincidencias de patrones comunes de claves privadas, tokens o asignaciones de secretos. Los correos y el número de WhatsApp son contactos públicos hardcodeados; no se clasifican como credenciales. Hay una URL de imagen con parámetros de firma/expiración; no es prueba de un secreto de aplicación y su vigencia está pendiente.

No se encontraron `dangerouslySetInnerHTML`, evaluación dinámica en el código de la app, APIs de negocio ni almacenamiento persistente de información personal. React presenta el nombre como texto interpolado; no hay un sumidero HTML evidente para ese dato. Esto no constituye una garantía de ausencia absoluta de XSS o vulnerabilidades transitivas.

Se cargan recursos desde Google Fonts, Imgur, Flaticon, Wikimedia, Iconfinder y Freepik. Generan dependencia de disponibilidad de terceros y peticiones fuera del sitio. La app no incluye una política CSP explícita en HTML/vercel.json; los headers efectivos del hosting no se verificaron.

Premium usa `window.open(..., '_blank')` sin opción explícita noopener. Otros enlaces con target blank no declaran rel. Es una oportunidad de endurecimiento de bajo esfuerzo; no se demuestra explotación y el comportamiento depende del navegador y del tipo de apertura.

### Avisos de dependencias verificados

| Dependencia y aviso | Relación con la versión del lock | Alcance real observado |
| --- | --- | --- |
| XLSX, CVE-2023-30533 | 0.18.5 está dentro del rango afectado hasta 0.19.2 | El fabricante excluye expresamente flujos que solo exportan y no leen archivos arbitrarios; este código solo exporta |
| XLSX, CVE-2024-22363 | 0.18.5 está dentro del rango afectado hasta 0.20.1 | Aviso ReDoS; no se demostró una ruta explotable mediante las entradas estáticas exportadas |
| Vite, GHSA-8jhw-289h-jh2g / CVE-2024-31207 | 5.0.7 está dentro de 5.0.0–5.0.12 | Requiere patrones personalizados de server.fs.deny con directorios y dev server expuesto; esas opciones no aparecen aquí |

Fuentes primarias, consultadas el 13-09-2026: [SheetJS CVE-2023-30533](https://cdn.sheetjs.com/advisories/CVE-2023-30533), [SheetJS CVE-2024-22363](https://cdn.sheetjs.com/advisories/CVE-2024-22363), [aviso oficial de Vite](https://github.com/vitejs/vite/security/advisories/GHSA-8jhw-289h-jh2g).

Estos hallazgos justifican planificar revisión de dependencias. **No prueban una brecha activa ni que el frontend estático publicado exponga el servidor Vite.** No se ejecutó npm audit, no se enumeró todo el árbol de vulnerabilidades y no se eligió una versión futura de actualización. Si se incorporara importación de hojas de cálculo, el alcance de seguridad de XLSX cambiaría sustancialmente.

## 24. Mantenibilidad

| Área | Valoración | Justificación |
| --- | --- | --- |
| Añadir páginas públicas | Alta | Router central y layout reutilizable; requiere registrar página y menú |
| Cambiar estilos compartidos | Media | Tema central sólido; SCSS y colores locales también deben revisarse |
| Modificar fórmulas | Baja | Fórmula en componente, estado mutable y ausencia de pruebas de dominio |
| Ampliar catálogo | Media | JSON sencillo, pero sin esquema, normalización ni fuentes verificables |
| Añadir reglas de selección | Baja | Clasificación y validación duplicadas en diferentes secciones |
| Reutilizar UI | Media | MUI aporta base; algunos componentes genéricos ya existen, pero están desconectados |
| Operación/build reproducible | Media | Scripts simples y locks presentes; gestor, entorno y lint sin consolidar |
| Global | Media | Proyecto pequeño y comprensible, con núcleo sensible poco aislado |

No hay evidencia de una necesidad actual de microservicios, Redux u otra arquitectura de mayor complejidad. La mejora estructural propuesta debe responder al cálculo y a capacidades confirmadas del producto.

## 25. Deuda técnica

### Crítica

No se identificó deuda crítica con evidencia suficiente de compromiso activo, pérdida persistente masiva o imposibilidad total de uso. La falta de build ejecutado impide afirmar disponibilidad general, pero tampoco demuestra un fallo crítico.

### Alta

- Validación que deja pasar selección vacía.
- Desacoplamiento entre datos visibles y guardados sin control de avance.
- Inconsistencia del registro 21 y falta de trazabilidad del catálogo que alimenta recomendaciones.
- Ausencia de pruebas de regresión para cálculo, casos límite y conservación de masa.
- Shell sin reserva lateral bajo 1200 px y contraste bajo en controles principales.

### Media

- Mutación/acumulación del estado de resultados y ausencia de validación numérica final.
- Redondeo sin reconciliar el total; falta de criterios de tolerancia acordados.
- Exportación sin contexto ni manejo de errores.
- Preset ESLint no provisionado y ausencia de automatización de calidad.
- Dos lockfiles sin política de gestor; herramientas antiguas con avisos verificados.
- README que no distingue implementado y planificado.
- Tabla, carrusel y reproductores sin adaptación suficientemente explícita a móvil.
- Recursos externos y vídeos grandes sin medición de entrega.
- Código no alcanzable que aumenta la superficie de mantenimiento.

### Baja

- Imports y props sin uso, logs y bloques comentados.
- Keys mal ubicadas o basadas en índices.
- Diferencia de anchura lateral 73/75 px.
- Enlaces placeholder y CTA sin acción.
- EditorConfig sobredimensionado, nombres de iconos inconsistentes y textos heredados.
- `.gitignore` sin dist; metadatos de icono/manifest por revisar.

La prioridad representa impacto en este producto, no una traducción automática de la severidad de un CVE ni de preferencias estilísticas.

## 26. Riesgos de modificar el aplicativo

| Sensibilidad | Áreas | Precaución propuesta para la siguiente fase |
| --- | --- | --- |
| Alta | Fórmulas, clasificación de grupos, C/N del catálogo, redondeo | Documentar casos de referencia, invariantes y fuentes; revisar con responsable del dominio |
| Alta | Unidades, humedad y futuras cantidades húmedas/secas | Definir semántica antes de introducir conversiones o factores |
| Media | Guardar/Siguiente, montaje de resultados, reinicio | Verificar edición, retroceso, selección vacía y repetición de cálculos |
| Media | Tema y layout compartidos | Revisar todas las rutas, tamaños, contraste y foco |
| Media | Dependencias, lockfiles, Vite y rewrite | Build reproducible, descarga Excel, navegación directa y assets |
| Media | Nuevas persistencia, cuentas o ingredientes personalizados | Definir contrato, privacidad y evolución de datos |
| Baja | Textos, alt, keys, logs y componentes visuales aislados | Revisión acotada; evitar modificar significado agronómico |

El catálogo no se identifica como regulatorio: no hay fuente normativa en los archivos. Su sensibilidad proviene de que determina cantidades recomendadas al usuario.

## 27. Quick Wins propuestos

Todos quedan pendientes; ninguno se implementó. Riesgo estimado bajo y esfuerzo bajo o medio, salvo que una decisión de producto amplíe el alcance.

1. Bloquear explícitamente selección vacía con mensaje junto a los grupos.
2. Indicar cambios sin guardar y bloquear avance mientras el formulario visible difiera del guardado.
3. Mostrar peso, unidad y C:N objetivo al consultar resultados, sin cambiar la fórmula.
4. Incluir unidad y objetivo en el Excel y añadir feedback si falla la exportación.
5. Añadir el alt adecuado en 404 y nombres/landmarks semánticos donde correspondan.
6. Definir destino real para “Ver más” y enlaces del pie, o retirar la acción aparente hasta disponer de contenido.
7. Mover la key de Premium al Grid retornado y limpiar logs/imports sin uso de las rutas activas.
8. Ajustar el ancho de la tabla a su contenedor y facilitar desplazamiento horizontal en tamaños pequeños.
9. Distinguir funciones actuales y futuras en README.
10. Añadir dist a la política de ignorados y documentar comandos/gestor acordados.

Corregir valores de ingredientes o rediseñar la fórmula no se considera un quick win sin validación de dominio.

## 28. Mejoras técnicas y funcionales propuestas

### Corto plazo

Asegurar el flujo con selección no vacía, sincronización de formularios, errores consistentes y resumen de resultados. Confirmar los datos del registro 21 y las unidades de las concentraciones. Crear en una fase autorizada una base de pruebas de regresión con casos válidos, grupos inválidos, repetición y redondeo. Resolver navegación móvil y contrastes. Habilitar lint/build reproducibles y aclarar documentación.

### Mediano plazo

Extraer una función pura de cálculo con entradas y salidas explícitas, sin alterar su semántica hasta disponer de criterios acordados. Compartir normalización, clasificación y validaciones. Mantener selección por IDs si se confirma que simplifica el contrato, y validar el catálogo con un esquema. Separar exportación de UI y añadir metadatos del cálculo.

Consolidar tokens, adaptar vídeos/carrusel y medir bundles antes de decidir lazy loading. Revisar paquetes sin uso y actualizaciones por compatibilidad y exposición. Sustituir contactos e imágenes provisionales solo después de confirmar contenido y titularidad.

### Largo plazo

Evaluar historial persistente, cuentas, ingredientes personalizados y funciones premium como iniciativas de producto independientes. Humedad, coste mínimo o disponibilidad de insumos requieren reglas adicionales y posiblemente otro modelo matemático. La persistencia remota necesitaría servicios, autenticación y autorización reales; no basta con añadir una ruta.

### Funcionalidades basadas en el dominio observado

| Propuesta | Beneficio | Condición previa |
| --- | --- | --- |
| Explicación de resultados | Comprender reparto igualitario y limitaciones | Confirmar base C/N y vocabulario agronómico |
| Resumen con total y C:N reconstruida | Detectar diferencias de redondeo | Acordar tolerancia y forma de presentar aproximaciones |
| Historial local opcional | Recuperar y comparar recetas | Definir almacenamiento, borrado y versión del catálogo |
| Exportación contextualizada/impresión | Conservar una receta utilizable fuera de la app | Incluir unidades, objetivo, fecha y versión de datos |
| Comparar dos selecciones | Explorar mezclas para un mismo objetivo | Mantener entradas comparables y semántica estable |
| Compartir cálculo | Reproducir una receta | Formato versionado y decisión sobre inclusión del nombre |
| Ayuda contextual y fuentes | Entender ingredientes y rangos | Fuentes confiables y verificadas por responsable del dominio |
| Visualización de cantidades | Ver composición relativa de la mezcla | Resultado validado; no añadir un gráfico pesado sin medir |
| Ingredientes propios | Adaptarse a materiales disponibles | Validación de concentraciones, consistencia C/N y procedencia |
| Humedad/costes | Ampliar decisiones que anuncia Premium | Especificación matemática y pruebas nuevas; no presumir reglas |

## 29. Matriz impacto/esfuerzo

Escala cualitativa. P1 = siguiente fase recomendada; P2 = después de estabilizar el núcleo; P3 = evolución opcional. Riesgo describe el riesgo del cambio, no la gravedad del problema. Son estimaciones de revisión, no compromisos de plazo.

| Mejora | Tipo | Impacto | Esfuerzo | Riesgo | Prioridad |
| --- | --- | ---: | ---: | ---: | ---: |
| Bloquear selección vacía | Código | Alto | Bajo | Bajo | P1 |
| Sincronizar formulario y avance | UX | Alto | Medio | Medio | P1 |
| Validar origen/coherencia del catálogo | Funcionalidad | Alto | Medio | Alto | P1 |
| Pruebas de cálculo y casos límite | Código | Alto | Medio | Bajo | P1 |
| Evitar mutación y validar resultados | Código | Alto | Medio | Medio | P1 |
| Corregir shell móvil | UI | Alto | Medio | Medio | P1 |
| Mejorar contraste y semántica | Accesibilidad | Alto | Medio | Bajo | P1 |
| Consolidar lint/build/gestor | DevOps | Alto | Medio | Medio | P1 |
| Revisar versiones con avisos de seguridad | Seguridad | Alto | Medio | Medio | P1 |
| Añadir contexto y errores a Excel | Funcionalidad | Medio | Bajo | Bajo | P1 |
| Alinear README con implementación | Código | Medio | Bajo | Bajo | P1 |
| Acordar redondeo y total final | Funcionalidad | Alto | Medio | Alto | P2 |
| Extraer motor y reglas compartidas | Arquitectura | Alto | Medio | Medio | P2 |
| Consolidar tokens y componentes responsive | UI | Medio | Medio | Medio | P2 |
| Medir y mejorar entrega de assets/chunks | Performance | Medio | Medio | Bajo | P2 |
| Revisar código y dependencias desconectados | Código | Medio | Medio | Bajo | P2 |
| Historial local y comparación | Funcionalidad | Alto | Medio | Medio | P2 |
| Compartir/impresión de recetas | Funcionalidad | Medio | Medio | Medio | P2 |
| Cuentas e historial remoto | Arquitectura | Alto | Alto | Alto | P3 |
| Humedad, costes e ingredientes propios | Funcionalidad | Alto | Alto | Alto | P3 |

## 30. Archivos más importantes antes de desarrollar

| Archivo | Importancia | Motivo |
| --- | --- | --- |
| [src/sections/calculator/results.jsx](src/sections/calculator/results.jsx) | Alta | Ecuaciones, redondeo, estado derivado y Excel |
| [src/data/ingredients.json](src/data/ingredients.json) | Alta | Datos que determinan cantidades; inconsistencia detectada |
| [src/sections/calculator/steps-general.jsx](src/sections/calculator/steps-general.jsx) | Alta | Estado central y permisos de avance |
| [src/sections/calculator/general-data.jsx](src/sections/calculator/general-data.jsx) | Alta | Límites, defaults y contrato de entrada |
| [src/sections/calculator/ingredients.jsx](src/sections/calculator/ingredients.jsx) | Alta | Clasificación y guardado de selección |
| [src/routes.jsx](src/routes.jsx) | Alta | Mapa real de pantallas y límites de layout |
| [src/main.jsx](src/main.jsx) y [src/app.jsx](src/app.jsx) | Alta | Providers, montaje y tema |
| [src/layouts/dashboard/layout.jsx](src/layouts/dashboard/layout.jsx) | Alta | Geometría y composición compartidas |
| [src/layouts/dashboard/side-nav.jsx](src/layouts/dashboard/side-nav.jsx) | Alta | Navegación permanente y riesgo móvil |
| [src/layouts/dashboard/config.jsx](src/layouts/dashboard/config.jsx) | Media | Menú y enlaces |
| [src/theme/index.jsx](src/theme/index.jsx) | Alta | Ensamblaje del sistema visual y breakpoints |
| [src/theme/create-components.jsx](src/theme/create-components.jsx) | Media | Estilos globales y overrides de controles |
| [src/theme/colors.jsx](src/theme/colors.jsx) | Alta | Colores que deben revisarse por contraste |
| [src/pages/index.jsx](src/pages/index.jsx) y [src/style/carousel.scss](src/style/carousel.scss) | Media | Landing, recursos remotos y responsive |
| [src/pages/support.jsx](src/pages/support.jsx) | Media | Vídeos, ayuda y contactos |
| [src/pages/premium.jsx](src/pages/premium.jsx) | Media | Promesas funcionales y contacto comercial |
| [package.json](package.json) y [package-lock.json](package-lock.json) | Alta | Scripts y versiones reproducibles |
| [yarn.lock](yarn.lock) | Media | Segundo árbol de resolución por aclarar |
| [.eslintrc](.eslintrc) | Media | Preset de lint actualmente no provisionado |
| [vite.config.mts](vite.config.mts) | Alta | Transformación y resolución de imports |
| [vercel.json](vercel.json) e [index.html](index.html) | Alta | Entrada, rutas de producción y recursos globales |
| [README.md](README.md) | Media | Contrastar alcance pretendido y real |

## 31. Diagrama conceptual

```text
                         Usuario anónimo
                                │
                                ▼
                  BrowserRouter / useRoutes
                  ThemeProvider + CssBaseline
                                │
              ┌─────────────────┴──────────────────┐
              ▼                                    ▼
      DashboardLayout                         404 sin shell
  TopNav + SideNav + Footer
              │
       ┌──────┼────────────┬────────────────┐
       ▼      ▼            ▼                ▼
     Inicio Calculadora  Soporte         Premium
   Carrusel     │         Vídeos         Ventajas
   remoto       ▼         locales        + WhatsApp
           StepsGeneral
    activeStep + formData en memoria
                │
       ┌────────┼──────────────────────────┐
       ▼        ▼                          ▼
 GeneralData  Ingredients               Results
 Formik/Yup   Formik                    cálculo local
       │        ▲                          │
       │    ingredients.json               ├── Tabla
       │    21 ingredientes                └── XLSX + FileSaver
       └────────┴── guardar en formData           │
                                                 ▼
                                            results.xlsx

 Finalizar → agradecimiento → Reiniciar → recarga y pérdida del estado

 Sin backend, autenticación ni historial persistente en este checkout.
 Fuera del grafo activo: Theme, Overview, Orders, QueryField,
 Scrollbar como componente y 14 iconos locales.
```

## 32. Conclusiones y pendientes de confirmar

El núcleo actual permite construir una mezcla mediante dos grupos y reparto igual dentro de cada grupo. Es una herramienta de alcance acotado: no implementa la plataforma de cuentas, historial y personalización descrita por el README.

La base visual y el tamaño del proyecto permiten una evolución incremental. Antes de ampliar Premium o añadir persistencia conviene asegurar la relación entre entradas visibles, datos guardados, catálogo y resultados, con pruebas del comportamiento actual. La coherencia científica de los datos debe resolverse con una fuente de dominio; no puede obtenerse solo leyendo JSX.

Pendientes concretos para revisar con el responsable del producto:

1. Fuente, unidades y base seca/húmeda de carbono y nitrógeno; dato correcto del ingrediente 21.
2. Justificación del rango 25–35, aceptación de decimales y límites de peso comunes a cuatro unidades.
3. Definición de quintal/tonelada y política de redondeo y tolerancia del total.
4. Si reparto igualitario dentro de cada grupo es la regla deseada.
5. Qué capacidades del README/Premium son compromisos actuales o ideas futuras.
6. Necesidad del nombre completo, retención de cálculos y alcance de un historial.
7. Gestor utilizado, entorno Node previsto y configuración real de Vercel.
8. Build, ESLint corregiblemente provisionado, descarga Excel y recorrido en navegador.
9. Responsive, contraste computado, teclado, foco, subtítulos y disponibilidad de enlaces externos.

Este documento proporciona un diagnóstico revisable y prioridades propuestas. No se corrigió ningún hallazgo ni se alteró el comportamiento de la aplicación.
