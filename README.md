# Portafolio Personal — Cristian Mateo Romero Ortiz

Portafolio personal estático multi-página con diseño dark moderno y minimalista. Construido con HTML, CSS y JavaScript vanilla, sin frameworks ni dependencias.

## 🚀 Características

- **Bilingüe (ES/EN)**: Toggle de idioma con persistencia en localStorage
- **Responsive**: Diseño mobile-first completamente adaptable
- **Dark Theme**: Tema oscuro moderno con color de acento cian
- **Animaciones**: Transiciones suaves con Intersection Observer
- **SEO-Friendly**: Estructura semántica y metadata optimizada
- **GitHub Pages Ready**: Sin build steps, listo para desplegar

## 📁 Estructura del proyecto

```
portfolio/
├── index.html              # Landing page principal
├── style.css              # Estilos globales
├── script.js              # Lógica JavaScript
├── pages/                 # Páginas secundarias
│   ├── about.html
│   ├── skills.html
│   ├── experience.html
│   ├── education.html
│   └── contact.html
└── projects/              # Proyectos
    ├── index.html         # Listado de proyectos
    ├── comfi-bot.html
    ├── webar.html
    └── proyectou.html
```

## 🌐 Desplegar en GitHub Pages

### Opción 1: Desde un repositorio existente

1. Sube todos los archivos a tu repositorio de GitHub
2. Ve a Settings > Pages
3. En "Source", selecciona la rama `main` (o `master`) y carpeta `/ (root)`
4. Haz clic en "Save"
5. Tu sitio estará disponible en: `https://tu-usuario.github.io/nombre-repo/`

### Opción 2: Crear un repositorio especial

1. Crea un repositorio con el nombre: `tu-usuario.github.io`
2. Sube todos los archivos a la raíz del repositorio
3. GitHub Pages se activará automáticamente
4. Tu sitio estará disponible en: `https://tu-usuario.github.io/`

## 🎨 Personalización

### Cambiar el color de acento

En `style.css`, modifica la variable:
```css
:root {
    --accent: #00d9ff;  /* Cambia este valor */
}
```

### Agregar contenido a los proyectos

Edita los archivos en `projects/` y reemplaza las secciones con clase `.placeholder-box`

### Actualizar información personal

Busca y reemplaza el contenido en `index.html` y las páginas en `pages/`

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (variables, grid, flexbox, backdrop-filter)
- JavaScript ES6+ (Intersection Observer, localStorage)
- Google Fonts (Inter)

## 📝 Características técnicas

- **Sin dependencias externas**: No requiere npm, webpack, ni build process
- **Optimizado**: Una sola hoja de estilos y un solo archivo JS
- **Rutas relativas**: Funciona correctamente en cualquier entorno
- **Accesibilidad**: Navegación por teclado, semántica HTML
- **Cross-browser**: Compatible con navegadores modernos

## 📧 Contacto

Cristian Mateo Romero Ortiz
📍 Pereira, Colombia
✉️ cromeroo@comfamiliar.com

---

**© 2024 Cristian Mateo Romero Ortiz. Todos los derechos reservados.**
