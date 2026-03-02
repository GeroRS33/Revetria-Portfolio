/* =======================
     Loader (screen)
  ======================= */

  window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    if (!loading) return;
  
    // tiempo mínimo que querés que dure (en milisegundos)
    const tiempoMinimo = 600; // 1.2 segundos
  
    setTimeout(() => {
      loading.classList.add("oculto");
  
      setTimeout(() => {
        loading.remove();
      }, 400);
  
    }, tiempoMinimo);
  });




function slugify(texto) {
    return texto
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  
  /* =======================
     PROYECTOS (Cards)
  ======================= */
  
  const grid = document.getElementById("proyectosGrid");
  
  if (grid && typeof proyectos !== "undefined") {
  
    proyectos.forEach((proyecto) => {
  
      
  
      const card = document.createElement("a");
      card.classList.add("proyectoCard");
      card.href = `detalle.html?slug=${proyecto.slug}`;
  
      card.innerHTML = `
        <div class="proyectoThumb">
          <img class="proyectoImgMain" src="${proyecto.imagenes[0]}" alt="${proyecto.titulo}" >
          <img class="proyectoFlecha" src="Imgs/Iconos/flecha.svg" alt="flecha">
        </div>

        <div class="proyectoInfo">
          <p class="proyectoCategoria">${proyecto.categoria}</p>
          <h2 class="proyectoTitulo">${proyecto.titulo}</h2>
          <p class="proyectoDescripcion">${proyecto.descripcionCorta}</p>
        </div>
      `;
  
      grid.appendChild(card);
    });
  
  }
  
  /* =======================
    ===     DETALLE    ===
  ======================= */


  
  const detalleTitulo = document.getElementById("detalleTitulo");
  const detalleSubtitulo = document.getElementById("detalleSubtitulo");
  const detalleHero = document.getElementById("detalleHero");
  const detalleGrid = document.getElementById("detalleGrid");
  
  if (detalleTitulo && typeof proyectos !== "undefined") {
  
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
  
    const proyecto = proyectos.find(
        (p) => p.slug === slug
    );
  
    if (!proyecto) {
      detalleTitulo.textContent = "Proyecto no encontrado";
    } else {
  
      // Título
      detalleTitulo.textContent = proyecto.titulo;
  
      // Subtítulo (DESCRIPCIÓN LARGA)
      detalleSubtitulo.textContent = proyecto.descripcionLarga;
  
      // Imagen principal
      detalleHero.innerHTML = `
        <img src="${proyecto.imagenes[0]}" alt="${proyecto.titulo}">
      `;
  
      // Grid simétrico: Imagen → Contexto → Imagen → Solución
      const img2 = proyecto.imagenes[1];
      const img3 = proyecto.imagenes[2];

      detalleGrid.innerHTML = `
        ${img2 ? `
          <div class="gridItem gridItemTexto delay2 textoIzq">
            <h3 class="gridItemTitulo">Contexto</h3>
            <p class="gridItemTexto ">${proyecto.contexto || ""}</p>
          </div>

          <div class="gridItem delay3">
            <img src="${img2}" alt="${proyecto.titulo}">
          </div>
        ` : ""}

          
      
        ${img3 ? `
          <div class="gridItem delay5">
            <img src="${img3}" alt="${proyecto.titulo}" >
          </div>
        ` : ""}

        <div class="gridItem gridItemTexto delay4 textoDer">
            <h3 class="gridItemTitulo">Solución / Resultado</h3>
            <p class="gridItemTexto">${proyecto.solucion || ""}</p>
          </div>
        `;

        // 👉 Video al final (si existe)
        if (proyecto.video && proyecto.video !== "") {
          detalleGrid.innerHTML += `
            <div class="gridItem gridItemVideo">
              <video autoplay muted loop playsinline>
                <source src="${proyecto.video}" type="video/mp4">
              </video>
            </div>
          `;
        }
      }
  }

  /* =======================
   LIGHTBOX (Detalle)
======================= */

(function setupLightboxDetalle(){
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const btnClose = document.querySelector(".lightboxClose");

  if (!lightbox || !lightboxImg || !btnClose) return;

  function openLightbox(src, altText){
    lightboxImg.src = src;
    lightboxImg.alt = altText || "";
    lightboxCaption.textContent = altText || "";

    lightbox.classList.add("isOpen");
    lightbox.setAttribute("aria-hidden", "false");

    // Evita scroll del body mientras está abierto
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    lightbox.classList.remove("isOpen");
    lightbox.setAttribute("aria-hidden", "true");

    // Limpieza (opcional)
    lightboxImg.src = "";
    lightboxImg.alt = "";
    lightboxCaption.textContent = "";

    document.body.style.overflow = "";
  }

  // Click en imágenes (delegación, sirve aunque se inserten con innerHTML)
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".detalleHero img, .detalleGrid img");
    if (!img) return;

    // Si justo clickean el video o algo, no abre
    if (!img.src) return;

    openLightbox(img.src, img.alt);
  });

  // Cerrar al tocar el fondo (pero no si tocás la imagen)
  lightbox.addEventListener("click", (e) => {
    const clickeoFondo = e.target === lightbox;
    if (clickeoFondo) closeLightbox();
  });

  // Botón cerrar
  btnClose.addEventListener("click", closeLightbox);

  // Escape para cerrar
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("isOpen")) return;
    if (e.key === "Escape") closeLightbox();
  });
})();




// --- BTN Behance --- //

const btnBehance = document.getElementById("btnBehance");

if (detalleTitulo && typeof proyectos !== "undefined") {

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const proyecto = proyectos.find(
    (p) => p.slug === slug
  );

  if (btnBehance && proyecto) {
    btnBehance.href = proyecto.behance || "#";
  }
}


/* =======================
       BADGE Programas (logos)
    ======================= */

const badgeProgramas = document.getElementById("badgeProgramas");
const badgeProgramasInner = document.getElementById("badgeProgramasInner");

const programaIconos = {
  "Figma": "Imgs/Iconos/figma.svg",
  "Illustrator": "Imgs/Iconos/illustrator.svg",
  "Photoshop": "Imgs/Iconos/photoshop.svg",
  "Lightroom": "Imgs/Iconos/lightroom.svg",
  "After Effects": "Imgs/Iconos/aftereffects.svg",
  "HTML": "Imgs/Iconos/html.svg",
  "CSS": "Imgs/Iconos/css.svg",
  "JavaScript": "Imgs/Iconos/javascript.svg"
};

// Render (sin romper en otras páginas)
if (badgeProgramas && badgeProgramasInner && typeof proyectos !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const proyectoBadge = proyectos.find((p) => p.slug === slug);

  // siempre visible, pero vacío si no hay nada / no existe proyecto
  badgeProgramasInner.innerHTML = "";

  const lista = Array.isArray(proyectoBadge?.programas) ? proyectoBadge.programas : [];

  lista.forEach((nombre) => {
    const src = programaIconos[nombre];
    if (!src) return;

    const img = document.createElement("img");
    img.className = "programaLogo";
    img.src = src;
    img.alt = nombre;
    img.title = nombre;

    badgeProgramasInner.appendChild(img);
  });
}