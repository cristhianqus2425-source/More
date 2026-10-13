/* =========================================================================
   CONFIGURACIÓN — edita SOLO este archivo para personalizar la página.
   No hace falta tocar nada más.
   ========================================================================= */

window.CONFIG = {
  // Nombre de la persona a quien va dedicada la página
  nombre: "Morelia",

  // Suena una pequeña campanita al pulsar "Entrar" (true / false)
  sonidoBienvenida: true,

  /* -----------------------------------------------------------------------
     FOTOS
     1. Copia tus fotos dentro de la carpeta  assets/fotos/
     2. Agrega una línea por foto aquí abajo, así:
          { src: "assets/fotos/foto1.jpg", texto: "Texto opcional" },
     - El nombre del archivo debe coincidir EXACTAMENTE (mayúsculas incluidas).
     - Formatos recomendados: .jpg, .jpeg, .png o .webp (idealmente verticales).
     - Si la lista está vacía se muestran tarjetas de ejemplo.
     ----------------------------------------------------------------------- */
  fotos: [
    // { src: "assets/fotos/foto1.jpg", texto: "Mi foto favorita" },
    // { src: "assets/fotos/foto2.jpg", texto: "" },
    // { src: "assets/fotos/foto3.jpg", texto: "" },
  ],

  /* -----------------------------------------------------------------------
     CANCIONES (videos de YouTube)
     El "videoId" es la parte que va DESPUÉS de "v=" en el link del video.
       Ejemplo: https://www.youtube.com/watch?v=AbCdEf12345
                                                 ^^^^^^^^^^^  ← esto es el ID
     Usa videos de los canales oficiales: HYBE LABELS o BANGTANTV.
     También puedes pegar el link completo: la página saca el ID sola.
     Las canciones que sigan con "PEGAR_ID_AQUI" (o vacías) NO se muestran.
     ----------------------------------------------------------------------- */
  canciones: [
    { titulo: "Euphoria", artista: "Jungkook · BTS", nota: "Su solo en Love Yourself: Answer (2018).", videoId: "PEGAR_ID_AQUI" },
    { titulo: "Still With You", artista: "Jungkook", nota: "Una balada suave que regaló a los fans en 2020.", videoId: "PEGAR_ID_AQUI" },
    { titulo: "Seven (Clean Ver.)", artista: "Jungkook feat. Latto", nota: "Su primer single en solitario (2023).", videoId: "PEGAR_ID_AQUI" },
    { titulo: "Standing Next To You", artista: "Jungkook", nota: "Canción principal del álbum GOLDEN.", videoId: "PEGAR_ID_AQUI" },
    { titulo: "Serendipity", artista: "BTS (Jimin)", nota: "De Love Yourself: Her (2017).", videoId: "PEGAR_ID_AQUI" },
    { titulo: "Boy With Luv", artista: "BTS feat. Halsey", nota: "De Map of the Soul: Persona (2019).", videoId: "PEGAR_ID_AQUI" },
    { titulo: "Make It Right", artista: "BTS", nota: "De Map of the Soul: Persona (2019).", videoId: "PEGAR_ID_AQUI" },
    { titulo: "Love Maze", artista: "BTS", nota: "De Love Yourself: Answer (2018).", videoId: "PEGAR_ID_AQUI" },
  ],

  /* -----------------------------------------------------------------------
     CARTA FINAL
     Escribe aquí tu mensaje. Cada elemento de "parrafos" es un párrafo.
     Puedes usar {nombre} y se reemplaza por el nombre de arriba.
     ----------------------------------------------------------------------- */
  carta: {
    saludo: "Querida {nombre}:",
    parrafos: [
      "Hice este pequeño universo morado pensando en ti: en lo bonito que brillan tus ojos cuando suena una canción de Jungkook y en lo feliz que me hace verte así.",
      "Ojalá cada vez que lo abras sientas que alguien te está mandando un abrazo enorme, de esos que duran más de lo normal.",
      "Gracias por existir, por tu risa y por llenar mis días de color. Te mereces todas las canciones bonitas del mundo.",
    ],
    despedida: "Con todo mi cariño,",
    firma: "Tu nombre aquí",
    // Velocidad de la máquina de escribir (milisegundos por letra)
    velocidad: 34,
  },
};
