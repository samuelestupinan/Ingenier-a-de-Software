// === script.js ===

document.addEventListener("DOMContentLoaded", function () {
  // ===== FORMULARIO DE CONTACTO =====
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(leadForm).entries());
      if (!data.nombre || !data.correo) {
        alert("Por favor complete nombre y correo");
        return;
      }
      console.log("Lead:", data);
      alert("Gracias, hemos recibido tu información.");
      leadForm.reset();
    });
  }

  // ===== FUNCIÓN GENERAL DE SLIDER =====
  function simpleSlider(trackSelector, stepSelector = null, nextSelector = null, auto = true) {
    const track = document.querySelector(trackSelector);
    if (!track) return;

    let scrollAmount = 0;
    const card = track.querySelector("div");
    if (!card) return;

    const step = card.offsetWidth + 20;

    // Auto desplazamiento
    if (auto) {
      setInterval(() => {
        scrollAmount += step;
        if (scrollAmount > track.scrollWidth - track.clientWidth) {
          scrollAmount = 0;
        }
        track.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }, 4000);
    }

    // Si tiene botones, los configura
    if (stepSelector && nextSelector) {
      const prev = document.querySelector(stepSelector);
      const next = document.querySelector(nextSelector);
      if (prev && next) {
        prev.addEventListener("click", () => {
          scrollAmount -= step;
          if (scrollAmount < 0) scrollAmount = 0;
          track.scrollTo({ left: scrollAmount, behavior: "smooth" });
        });
        next.addEventListener("click", () => {
          scrollAmount += step;
          if (scrollAmount > track.scrollWidth - track.clientWidth) {
            scrollAmount = track.scrollWidth - track.clientWidth;
          }
          track.scrollTo({ left: scrollAmount, behavior: "smooth" });
        });
      }
    }
  }

  // Slider 1: ¿Por qué elegirnos? (con botones)
  simpleSlider(".porque-track", ".prev", ".next", true);

  // Slider 2: Pasos (sin botones)
  simpleSlider(".pasos-track", null, null, true);
});