(function () {
  "use strict";

  // Inicialización de WOW.js para las animaciones
  // Esto permite que los elementos con la clase "wow" se animen al aparecer en pantalla
  if (typeof WOW !== 'undefined') {
    new WOW().init();
  }

  // Barra superior: fondo semitransparente al hacer scroll (comportamiento tipo plantilla Play)
  var cabecera = document.querySelector(".ud-header");
  function actualizarCabeceraScroll() {
    if (!cabecera) return;
    if (window.scrollY > 8) {
      cabecera.classList.add("sticky");
      document.querySelector(".logo-cabecera").src = "img/logos/logo_transparente.png"
    } else {
      cabecera.classList.remove("sticky");
      document.querySelector(".logo-cabecera").src = "img/logos/logo_blanco_transparente.png"
    }
  }
  window.addEventListener("scroll", actualizarCabeceraScroll, { passive: true });
  window.addEventListener("load", actualizarCabeceraScroll);
  actualizarCabeceraScroll();

  function initCarruselTestimonios() {
    if (typeof Swiper === "undefined") return;
    var root = document.querySelector(".carrusel-testimonios-ls45");
    if (!root) return;
    var nextBtn = root.querySelector(".swiper-button-next");
    var prevBtn = root.querySelector(".swiper-button-prev");
    new Swiper(root, {
      slidesPerView: 1,
      spaceBetween: 20,
      rewind: true,
      speed: 500,
      watchOverflow: true,
      centerInsufficientSlides: true,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 28,
        },
      },
    });
  }
  window.addEventListener("load", initCarruselTestimonios);
})();

// Abre y cierra el menú
function toggleMenu() {
    const menu = document.getElementById('menuNav');
    const btn = document.getElementById('btnMenu');
    if (!menu || !btn) return;
    menu.classList.toggle('abierto');
    btn.classList.toggle('activo');
    var abierto = menu.classList.contains('abierto');
    btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    btn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
}

// Cierra el menú al hacer clic en un enlace
function cerrarMenu() {
    const menu = document.getElementById('menuNav');
    const btn = document.getElementById('btnMenu');
    if (!menu || !btn) return;
    menu.classList.remove('abierto');
    btn.classList.remove('activo');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Abrir menú');
}

// fondo Negro, imágen ampliada y opciones de cerrar con una X o presionando fuera de la foto
function initZoomImagenes() {
  const imagenes = document.querySelectorAll(".zoomable");

  imagenes.forEach(img => {
    img.addEventListener("click", function () {

      // Crear contenedor
      const overlay = document.createElement("div");
      overlay.classList.add("lightbox");

      // Crear imagen
      const imagenGrande = document.createElement("img");
      imagenGrande.src = this.src;

      // Crear botón cerrar
      const cerrar = document.createElement("span");
      cerrar.classList.add("cerrar");
      cerrar.innerHTML = "&times;";

      // Cerrar al hacer clic
      cerrar.addEventListener("click", () => {
        document.body.removeChild(overlay);
      });

      // Cerrar si hace clic fuera de la imagen
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
        }
      });
      overlay.appendChild(imagenGrande);
      overlay.appendChild(cerrar);
      document.body.appendChild(overlay);
    });
  });
}
window.addEventListener("load", initZoomImagenes);
