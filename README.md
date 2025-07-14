# 🌾 Aplicación Web – Calculadora Agronómica

Aplicación web centrada en el cálculo balanceado de ingredientes agrícolas con base en la proporción **Carbono/Nitrógeno (C:N)**. Diseñada con enfoque en la accesibilidad, usabilidad (UX/UI) y retención de usuarios, tanto para una versión gratuita como para una versión premium con control personalizado de insumos.

---

## 🧩 Funcionalidades Principales

### 🔐 Autenticación

- Inicio de sesión por **correo y contraseña**
- Registro libre de usuarios
- Recuperación de contraseña por correo electrónico

---

## 🏠 Menú Principal

- **Calculadora de C:N**
- **Historial de cálculos**
- **Plan Premium**
  - Acceso a ventajas exclusivas
  - Comunidad privada
- **Soporte técnico**
  - Información agronómica
  - Ayuda sobre el uso de la aplicación

---

## 🧮 Módulo de Calculadora

### 🧾 Campos generales

- **Peso total:**  
  - Unidad: `LB` o `KG` (por defecto: **30 LB**)  
  - Validación numérica y lógica
- **Relación C:N objetivo:**  
  - Rango permitido: **25 a 35** (por defecto: **30**)  
  - Sólo números enteros

---

### 🧂 Selección de Ingredientes

Sistema de selección optimizado para facilitar la experiencia del usuario:

- Visualización de dos grupos:
  - Ingredientes con C:N **menor al ingresado**
  - Ingredientes con C:N **mayor al ingresado**
- Requisitos de selección:
  - Al menos **un ingrediente de cada grupo** debe ser seleccionado
  - Validación con mensajes de error si no se cumple
  - Ayudas visuales en todo el proceso

🔒 **Versión gratuita:**  
Lista de ingredientes **estáticos**

⭐ **Versión premium:**  
El usuario puede **gestionar libremente** sus ingredientes personalizados (crear, editar, eliminar)

> 🚫 **No se toma en cuenta la humedad** en los cálculos por ahora

---

### 📊 Resultados

- Visualización detallada de ingredientes seleccionados y su cantidad (en LB o KG)
- Botones de acción:
  - **Guardar cálculo** (para el historial)
  - **Volver al inicio**

🎯 **Objetivo UX:** Mantener al usuario dentro de la app una vez completado el cálculo, evitando su abandono o desinstalación.

---

## 🗂 Historial

- Visualización de cálculos guardados
- Posibilidad de eliminar o reutilizar
- Organizados por fecha

---

## 💎 Plan Premium

- Acceso a ingredientes dinámicos y personalizados
- Comunidad exclusiva
- Mejoras en el soporte y nuevas funcionalidades

---

## 🧑‍💻 Tecnologías

- **Frontend:** React, Context API
- **Estilos:** Tailwind CSS / Material UI
- **PWA Ready:** Compatible con instalación como app móvil

---

## 👨‍🌾 Autor

Proyecto desarrollado por jagudo2514@gmail.com, orientado a productores, técnicos y profesionales del agro. Con enfoque en tecnología accesible, útil y de alto impacto.
