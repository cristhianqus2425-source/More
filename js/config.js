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
     ----------------------------------------------------------------------- */
  // Foto principal: la más grande de la portada
  fotoPrincipal: "assets/fotos/principal.jpg",

  fotos: [
    { src: "assets/fotos/jk-ondas.jpg", texto: "" },
    { src: "assets/fotos/jk-chicha.jpg", texto: "Con sabor peruano" },
    { src: "assets/fotos/jk-01.jpg", texto: "Febrero 2026" },
    { src: "assets/fotos/jk-07.jpg", texto: "Golden Disk Awards 2019" },
    { src: "assets/fotos/jk-11.jpg", texto: "Asia Artist Awards 2018" },
    { src: "assets/fotos/jk-13.jpg", texto: "Orden al Mérito Cultural, 2018" },
    { src: "assets/fotos/jk-14.jpg", texto: "Idol en MAMA 2018" },
    { src: "assets/fotos/jk-15.jpg", texto: "Euphoria en Berlín" },
    { src: "assets/fotos/jk-17.jpg", texto: "MAMA 2014" },
    { src: "assets/fotos/jk-18.jpg", texto: "Billboard Music Awards 2019" },
    { src: "assets/fotos/jk-20.jpg", texto: "Fake Love en el Rose Bowl" },
    { src: "assets/fotos/jk-21.jpg", texto: "Love Yourself Tour, Los Ángeles" },
    { src: "assets/fotos/jk-22.jpg", texto: "Love Yourself: Tear" },
    { src: "assets/fotos/jk-23.jpg", texto: "Gaon Chart Awards 2016" },
    { src: "assets/fotos/jk-24.jpg", texto: "Melon Music Awards 2016" },
    { src: "assets/fotos/jk-25.jpg", texto: "Firma de autógrafos, 2016" },
    { src: "assets/fotos/jk-26.jpg", texto: "SBS Gayo Daejeon 2016" },
    { src: "assets/fotos/jk-27.jpg", texto: "Wings Tour, Manila" },
    { src: "assets/fotos/jk-28.jpg", texto: "Billboard Music Awards 2017" },
    { src: "assets/fotos/jk-29.jpg", texto: "Los Ángeles, 2017" },
    { src: "assets/fotos/jk-30.jpg", texto: "Gaon Chart Awards 2017" },
    { src: "assets/fotos/jk-31.jpg", texto: "Seoul Super Concert 2015" },
    { src: "assets/fotos/jk-32.jpg", texto: "Mic Drop, 2018" },
    { src: "assets/fotos/jk-33.jpg", texto: "Power of K, 2016" },
    { src: "assets/fotos/jk-34.jpg", texto: "Map of the Soul: Persona" },
    { src: "assets/fotos/jk-35.jpg", texto: "Detrás de cámaras de Boy With Luv" },
    { src: "assets/fotos/jk-36.jpg", texto: "5.º aniversario de BTS" },
    { src: "assets/fotos/jk-37.jpg", texto: "The Red Bullet Tour, Taipéi" },
    // { src: "assets/fotos/mi-foto.jpg", texto: "Mi foto favorita" },
  ],

  // Fotos que flotan alrededor en la portada (número de la lista de arriba, empezando en 0).
  // Las fotos de la portada y de "Sobre Jungkook" no se repiten en la galería.
  portada: [2, 25, 4, 24],

  // Foto junto a la sección "Sobre Jungkook"
  fotoSobreJungkook: 0,

  /* -----------------------------------------------------------------------
     CANCIONES (videos de YouTube)
     El "videoId" es la parte que va DESPUÉS de "v=" en el link del video.
       Ejemplo: https://www.youtube.com/watch?v=AbCdEf12345
                                                 ^^^^^^^^^^^  ← esto es el ID
     Usa videos de los canales oficiales: HYBE LABELS o BANGTANTV.
     También puedes pegar el link completo: la página saca el ID sola.
     Las canciones que sigan con "PEGAR_ID_AQUI" (o vacías) NO se muestran.
     ----------------------------------------------------------------------- */
  // Al terminar una canción empieza sola la siguiente (true / false)
  reproduccionAutomatica: true,

  canciones: [
    // Jungkook
    { titulo: "Euphoria", artista: "Jungkook · BTS", nota: "Su solo en Love Yourself: Answer (2018), traducida al español.", videoId: "2-FB8wHrMXY" }, // el video 4fJ8kDVZT-k no permite insertarse (error 150)
    { titulo: "Still With You", artista: "Jungkook", nota: "Una balada suave que regaló a los fans en 2020.", videoId: "BksBNbTIoPE" },
    { titulo: "Seven (Clean Ver.)", artista: "Jungkook feat. Latto", nota: "Su primer single en solitario (2023), versión clean.", videoId: "Vs64cZbeY88" },
    { titulo: "Standing Next To You", artista: "Jungkook", nota: "Canción principal del álbum GOLDEN (2023).", videoId: "UNo0TG9LwwI" },
    // Las mejores de BTS (videos oficiales de HYBE LABELS)
    { titulo: "Dynamite", artista: "BTS", nota: "Su primer número 1 en el Billboard Hot 100 (2020).", videoId: "gdZLi9oWNZg" },
    { titulo: "Butter", artista: "BTS", nota: "Single de 2021.", videoId: "WMweEpGlu_U" },
    { titulo: "Spring Day", artista: "BTS", nota: "De You Never Walk Alone (2017).", videoId: "xEeFrLSkMm8" },
    { titulo: "DNA", artista: "BTS", nota: "De Love Yourself: Her (2017).", videoId: "MBdVXkSdhwU" },
    { titulo: "Fake Love", artista: "BTS", nota: "De Love Yourself: Tear (2018).", videoId: "7C2z4GqqS5E" },
    { titulo: "IDOL", artista: "BTS", nota: "De Love Yourself: Answer (2018).", videoId: "pBuZEGYXA6E" },
    { titulo: "Blood Sweat & Tears", artista: "BTS", nota: "Del álbum WINGS (2016).", videoId: "hmE9f-TEutc" },
    { titulo: "ON", artista: "BTS", nota: "De Map of the Soul: 7 (2020).", videoId: "mPVDGOVjRQ0" },
    { titulo: "Black Swan", artista: "BTS", nota: "De Map of the Soul: 7 (2020).", videoId: "0lapF4DQPKQ" },
    { titulo: "Life Goes On", artista: "BTS", nota: "Del álbum BE (2020).", videoId: "-5q5mZbe3V8" },
    { titulo: "Permission to Dance", artista: "BTS", nota: "Single de 2021.", videoId: "CuklIb9d3fI" },
    { titulo: "Boy With Luv", artista: "BTS feat. Halsey", nota: "De Map of the Soul: Persona (2019).", videoId: "XsX3ATc3FbA" },
    { titulo: "Make It Right", artista: "BTS feat. Lauv", nota: "De Map of the Soul: Persona (2019).", videoId: "eXBu09fwe3I" },
    { titulo: "MIC Drop (Steve Aoki Remix)", artista: "BTS", nota: "Remix de 2017.", videoId: "kTlv5_Bs8aw" },
    { titulo: "Yet To Come", artista: "BTS", nota: "Del álbum Proof (2022).", videoId: "kXpOEzNZ8hQ" },
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
    firma: "Cristhian",
    // Velocidad de la máquina de escribir (milisegundos por letra)
    velocidad: 34,
  },
};
