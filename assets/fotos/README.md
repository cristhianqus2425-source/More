# Fotos

Pon aquí las fotos que quieres que aparezcan en la galería 3D.

1. Copia las imágenes en esta carpeta (`assets/fotos/`).
   - Formatos: `.jpg`, `.jpeg`, `.png` o `.webp`.
   - Mejor si son verticales y pesan menos de 500 KB cada una (así la página carga rápido en el celular).
   - Usa nombres sencillos, sin espacios ni acentos: `foto1.jpg`, `jk-concierto.webp`…
2. Abre `js/config.js` y agrega una línea por foto en la lista `fotos`:

```js
fotos: [
  { src: "assets/fotos/foto1.jpg", texto: "Mi foto favorita" },
  { src: "assets/fotos/foto2.jpg", texto: "" },
],
```

El nombre tiene que coincidir exactamente, incluidas mayúsculas y minúsculas
(GitHub Pages distingue `Foto1.JPG` de `foto1.jpg`).
