const headerContenedor = document.getElementById("headerContenedor");

headerContenedor.innerHTML = `
  <header class="header">
    <div class="headerBarra">

      <a href="index.html" class="headerLogo">
        <img src="Imgs/LogoMainTxt.svg" alt="Gero">
      </a>

      <button class="btnMenu" aria-label="Abrir menú">
        <img src="Imgs/Estrella.svg" alt="">
      </button>

    </div>

    <div class="headerFondo"></div>

    <nav class="menu">
      <a class="menuLink" href="Docs/CV-Actualizado2026.pdf" target="_blank" rel="noopener noreferrer">Curriculum</a>
      <a class="menuLink" href="habilidades.html">Habilidades</a>
      <a class="menuLink" href="proyectos.html">Portfolio</a>
    </nav>
  </header>
`;

const btnMenu = document.querySelector(".btnMenu");
const header = document.querySelector(".header");

function toggleMenu(){
    const estaAbierto = header.classList.contains("headerAbierto");
  
    if (estaAbierto) {
      header.classList.remove("headerAbierto");
      btnMenu.setAttribute("aria-expanded", "false");
    } else {
      header.classList.add("headerAbierto");
      btnMenu.setAttribute("aria-expanded", "true");
    }
  }
  
  btnMenu.setAttribute("aria-expanded", "false");
  
  btnMenu.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });