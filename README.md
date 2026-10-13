# Para Morelia 💜

Página de fan dedicada a Jungkook (BTS), hecha como regalo. Es una web estática
(HTML, CSS y JavaScript) que funciona directamente en **GitHub Pages**, sin
instalar nada ni compilar.

- Intro con botón "Entrar"
- Fondo claro con galaxia 3D (Three.js) de partículas moradas y corazones que reaccionan al mouse o al dedo
- Fotos con forma orgánica y bordes difuminados que flotan y giran
- Galería 3D en dos anillos que giran en sentidos opuestos (las fotos de atrás se desenfocan)
- Sección "Sobre Jungkook"
- Playlist con videos oficiales de YouTube (ya configurados)
- Carta dentro de un sobre con sello de cera: se abre, aparece con máquina de escribir y termina con lluvia de corazones

## Estructura

```
index.html
css/style.css
js/config.js        ← lo único que necesitas editar
js/main.js
js/three-scene.js
assets/fotos/       ← aquí van las fotos
```

---

## 1. Personalizar (todo en `js/config.js`)

### Nombre y carta
Cambia `nombre`, y dentro de `carta` escribe el `saludo`, los `parrafos`,
la `despedida` y la `firma` (cambia "Tu nombre aquí" por tu nombre).

### Fotos
Ya vienen fotos de Jungkook con licencia libre tomadas de Wikimedia Commons (`jk-01`, `jk-02`…). La página muestra sus créditos al final, como pide la licencia; si borras una foto, borra también su línea en `fotos`.

Para agregar las tuyas:

1. Copia las fotos en `assets/fotos/` (por ejemplo `foto1.jpg`, `foto2.jpg`…).
2. En `js/config.js`, dentro de `fotos`, agrega una línea por foto:
   ```js
   fotos: [
     { src: "assets/fotos/foto1.jpg", texto: "Mi foto favorita" },
     { src: "assets/fotos/foto2.jpg", texto: "" },
   ],
   ```
3. El nombre debe coincidir exactamente (mayúsculas incluidas).
4. `portada` elige qué fotos flotan en la portada y `fotoSobreJungkook` cuál va junto al texto (por número, empezando en 0).

### Canciones (IDs de YouTube)
Las 8 canciones ya tienen su video oficial. Para cambiar o agregar una:

1. Busca el video oficial en YouTube, en los canales **HYBE LABELS** o **BANGTANTV**.
2. Copia el link, por ejemplo: `https://www.youtube.com/watch?v=AbCdEf12345`
3. El ID es lo que va después de `v=` → `AbCdEf12345` (11 caracteres).
4. En `js/config.js`, reemplaza `"PEGAR_ID_AQUI"` por ese ID:
   ```js
   { titulo: "Euphoria", artista: "Jungkook · BTS", nota: "...", videoId: "AbCdEf12345" },
   ```
   (También puedes pegar el link completo; la página extrae el ID sola.)
5. Las canciones que sigan con `PEGAR_ID_AQUI` no aparecen en la página.

> Algunos videos oficiales no permiten reproducirse dentro de otras páginas. Si
> uno muestra "Video no disponible", busca otra versión oficial (por ejemplo, el
> lyric video o la versión de BANGTANTV) y usa ese ID.

---

## 2. Verla en tu computadora

Por usar módulos de JavaScript, la página **no funciona abriendo el archivo con
doble clic**; necesita un servidor local. Cualquiera de estas opciones sirve,
ejecutada dentro de la carpeta del proyecto:

```bash
npx serve .
# o
python -m http.server 8000
```

Luego abre la dirección que aparece (por ejemplo `http://localhost:3000` o
`http://localhost:8000`). También sirve la extensión **Live Server** de VS Code.

---

## 3. Publicar en GitHub Pages

### a) Crear el repositorio en GitHub
1. Entra a <https://github.com/new>.
2. Escribe un nombre (por ejemplo `para-morelia`), déjalo en **Public** y
   **no** marques "Add a README".
3. Pulsa **Create repository**.

### b) Subir el código
En una terminal, dentro de la carpeta del proyecto:

```bash
git add .
git commit -m "Mi página para Morelia"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/para-morelia.git
git push -u origin main
```

> Si el repositorio ya tiene un `origin` configurado (como este), omite la línea
> `git remote add` y solo haz `git push -u origin main`.

### c) Activar GitHub Pages
1. En el repositorio, ve a **Settings → Pages**.
2. En **Build and deployment → Source** elige **Deploy from a branch**.
3. En **Branch** elige **main** y la carpeta **/ (root)**. Pulsa **Save**.
4. Espera 1–2 minutos y recarga: arriba aparecerá el link, con esta forma:
   `https://TU_USUARIO.github.io/para-morelia/`

### d) Actualizar después
Cada vez que cambies fotos, canciones o la carta:

```bash
git add .
git commit -m "Actualizo fotos y canciones"
git push
```

GitHub Pages se actualiza solo en uno o dos minutos.

---

## Notas
- Respeta la opción del sistema "reducir movimiento": en ese caso las animaciones se desactivan.
- En celulares el fondo 3D usa menos partículas para ir fluido.
- Página de fan sin fines comerciales; los videos se reproducen desde YouTube
  (dominio `youtube-nocookie.com`).
