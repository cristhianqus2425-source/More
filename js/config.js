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
     - autor, licencia y fuente son opcionales (sirven para los créditos).
     ----------------------------------------------------------------------- */
  fotos: [
    // Fotos de Wikimedia Commons con licencia libre (autor y licencia se muestran en los créditos)
    { src: "assets/fotos/jk-01.jpg", texto: "Febrero 2026", autor: "K-POPIT 케이팝잇", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Jung_Kook_of_BTS,_February_12,_2026_(1).png" },
    { src: "assets/fotos/jk-07.jpg", texto: "Golden Disk Awards 2019", autor: "I Dare U JK", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_at_Golden_Disk_Awards,_5_January_2019_01.jpg" },
    { src: "assets/fotos/jk-11.jpg", texto: "Asia Artist Awards 2018", autor: "I Dare U JK", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jungkook_at_Asia_Artist_Awards_on_November_28,_2018_02.jpg" },
    { src: "assets/fotos/jk-13.jpg", texto: "Orden al Mérito Cultural, 2018", autor: "I DARE U JK", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_accepting_the_Order_of_Cultural_Merit,_24_October_2018_01.jpg" },
    { src: "assets/fotos/jk-14.jpg", texto: "Idol en MAMA 2018", autor: "I DARE U JK", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_performing_%22Idol%22_at_MAMA_in_Hong_Kong,_14_December_2018.jpg" },
    { src: "assets/fotos/jk-15.jpg", texto: "Euphoria en Berlín", autor: "BIT BY BIT", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:181016_Jungkook_performing_Euphoria_in_Berlin_(1).png" },
    { src: "assets/fotos/jk-17.jpg", texto: "MAMA 2014", autor: "Mischief Managed BTS", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_at_MAMA_in_Hong_Kong,_3_December_2014.jpg" },
    { src: "assets/fotos/jk-18.jpg", texto: "Billboard Music Awards 2019", autor: "I DARE U JK", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_at_BBMAs,_1_May_2019_01.jpg" },
    { src: "assets/fotos/jk-20.jpg", texto: "Fake Love en el Rose Bowl", autor: "I DARE U JK", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_performing_%22Fake_Love%22_at_Speak_Yourself_at_Rose_Bowl,_Pasadena,_4-5_May_2019_01.jpg" },
    { src: "assets/fotos/jk-21.jpg", texto: "Love Yourself Tour, Los Ángeles", autor: "I DARE U JK", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_during_Love_Yourself_tour_in_Los_Angeles,_8_September_2018_01.jpg" },
    { src: "assets/fotos/jk-22.jpg", texto: "Love Yourself: Tear", autor: "KOREA Dispatch", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:180524_Jungkook_at_a_press_conference_for_Love_Yourself_Tear_(1).png" },
    { src: "assets/fotos/jk-23.jpg", texto: "Gaon Chart Awards 2016", autor: "SHAQ Photo", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:160217_Gaon_Chart_K-POP_Awards_Red_Carpet_BTS_Jungkook.jpg" },
    { src: "assets/fotos/jk-24.jpg", texto: "Melon Music Awards 2016", autor: "Heavenly Moment97", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_at_8th_Melon_Music_Awards_01.jpg" },
    { src: "assets/fotos/jk-25.jpg", texto: "Firma de autógrafos, 2016", autor: "Heavenly Moment 97", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Jungkook_at_a_fansigning_event_in_Jongno,_29_October_2016_02.jpg" },
    { src: "assets/fotos/jk-26.jpg", texto: "SBS Gayo Daejeon 2016", autor: "Duckleavepics", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:161226_SBS_%EA%B0%80%EC%9A%94%EB%8C%80%EC%A0%84_%EB%B0%A9%ED%83%84%EC%86%8C%EB%85%84%EB%8B%A8_%EC%A0%95%EA%B5%AD_04.jpg" },
    { src: "assets/fotos/jk-27.jpg", texto: "Wings Tour, Manila", autor: "Perfect Symmetry by Aunt Potato", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_at_The_Wings_Tour_in_Manila_01.png" },
    { src: "assets/fotos/jk-28.jpg", texto: "Billboard Music Awards 2017", autor: "TenAsia", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:170529_Jungkook_at_a_press_conference_for_the_BBMAs_(1).png" },
    { src: "assets/fotos/jk-29.jpg", texto: "Los Ángeles, 2017", autor: "KOREA Dispatch", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:1117_Jungkook_(BTS)_Dispatch_Photo_Shoot_LA_(1).png" },
    { src: "assets/fotos/jk-30.jpg", texto: "Gaon Chart Awards 2017", autor: "Divine Treasure", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Jungkook_at_Gaon_Chart_Music_Awards,_22_February_2017_01.png" },
    { src: "assets/fotos/jk-31.jpg", texto: "Seoul Super Concert 2015", autor: "Heavenly Moment 97", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_performing_at_the_Seoul_Super_Concert,_12_December_2015_01.jpg" },
    { src: "assets/fotos/jk-32.jpg", texto: "Mic Drop, 2018", autor: "mang2goon", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:180622_Jungkook_performing_Mic_Drop_at_Lotte_Family_Festival.png" },
    { src: "assets/fotos/jk-33.jpg", texto: "Power of K, 2016", autor: "Heavenly Moment 97", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_at_Power_of_K_concert,_24_April_2016_01.jpg" },
    { src: "assets/fotos/jk-34.jpg", texto: "Map of the Soul: Persona", autor: "Dispatch", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_at_%22Map_of_the_Soul_-_Persona%22_global_press_conference,_17_April_2019.jpg" },
    { src: "assets/fotos/jk-35.jpg", texto: "Detrás de cámaras de Boy With Luv", autor: "Dispatch photograpther Min Kyung-bin", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jungkook_for_Dispatch_%22Boy_With_Luv%22_MV_behind_the_scene_shooting,_15_March_2019_06.jpg" },
    { src: "assets/fotos/jk-36.jpg", texto: "5.º aniversario de BTS", autor: "Dispatch", licencia: "CC BY 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Jungkook_for_BTS_5th_anniversary_party_in_LA_photoshoot_by_Dispatch,_May_2018_01.jpg" },
    { src: "assets/fotos/jk-37.jpg", texto: "The Red Bullet Tour, Taipéi", autor: "Heavenly Moment 97", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Jeon_Jung-kook_during_The_Red_Bullet_concert_in_Taipei,_8_March_2015_02.jpg" },
    // { src: "assets/fotos/mi-foto.jpg", texto: "Mi foto favorita" },
  ],

  // Qué fotos flotan en la portada (número de la lista de arriba, empezando en 0).
  // Las fotos de la portada y de "Sobre Jungkook" no se repiten en la galería.
  portada: [0, 2, 23, 22, 15, 13],

  // Foto junto a la sección "Sobre Jungkook"
  fotoSobreJungkook: 1,

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
    // Todos son videos oficiales (HYBE LABELS, BANGTANTV o el canal oficial "Jung Kook - Topic")
    { titulo: "Euphoria", artista: "Jungkook · BTS", nota: "Su solo en Love Yourself: Answer (2018).", videoId: "kX0vO4vlJuU" },
    { titulo: "Still With You", artista: "Jungkook", nota: "Una balada suave que regaló a los fans en 2020. Audio oficial.", videoId: "BksBNbTIoPE" },
    { titulo: "Seven (Clean Ver.)", artista: "Jungkook feat. Latto", nota: "Su primer single en solitario (2023), versión clean. Audio oficial.", videoId: "Vs64cZbeY88" },
    { titulo: "Standing Next To You", artista: "Jungkook", nota: "Canción principal del álbum GOLDEN (2023).", videoId: "UNo0TG9LwwI" },
    { titulo: "Serendipity", artista: "BTS (Jimin)", nota: "Tráiler de Love Yourself: Her (2017).", videoId: "BEMaH9Sm3lQ" },
    { titulo: "Boy With Luv", artista: "BTS feat. Halsey", nota: "De Map of the Soul: Persona (2019).", videoId: "XsX3ATc3FbA" },
    { titulo: "Make It Right", artista: "BTS feat. Lauv", nota: "De Map of the Soul: Persona (2019).", videoId: "eXBu09fwe3I" },
    { titulo: "Love Maze", artista: "BTS", nota: "De Love Yourself: Tear (2018). Audio oficial.", videoId: "n_R0-YosZ3g" },
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
