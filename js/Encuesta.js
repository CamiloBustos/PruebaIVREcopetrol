document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll('input[name="satisfaccion"]');
  const punto = document.querySelector('.punto-seleccion');
  const btnAtras = document.getElementById('boton-atras');
  const btnInicio = document.getElementById('boton-home');
  const btnEnviar = document.querySelector('.boton-enviar');

  const MARGEN = 10;
  let respuestaSeleccionada = null;
  let encuestaEnviada = false;

  // Mover el punto visual al seleccionar una opción
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const valor = parseInt(radio.value);
      respuestaSeleccionada = valor;

      const porcentaje = MARGEN + ((valor - 1) / 4) * (100 - 2 * MARGEN);
      punto.style.display = 'block';
      punto.style.left = `${porcentaje}%`;
    });
  });

  // Prevenir navegación si no se ha enviado la encuesta
  function evitarNavegacion(e) {
    if (!encuestaEnviada) {
      e.preventDefault();
      mostrarAlerta("Debes completar y enviar la encuesta de satisfacción para continuar.");
    }
  }

  btnAtras.addEventListener('click', evitarNavegacion);
  btnInicio.addEventListener('click', evitarNavegacion);

  // Enviar encuesta
  btnEnviar.addEventListener('click', () => {
    if (respuestaSeleccionada === null) {
      mostrarAlerta("Por favor, selecciona una opción antes de enviar la encuesta.");
      return;
    }

    // Guardar la respuesta
    localStorage.setItem('respuestaEncuesta', respuestaSeleccionada);
    encuestaEnviada = true;


    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviado";

    setTimeout(() => {
      window.location.href = '../finalización.html';
    }, 1500);
  });
});

// Funciones para mostrar y cerrar la alerta personalizada
function mostrarAlerta(mensaje) {
  document.getElementById('mensaje-alerta').textContent = mensaje;
  document.getElementById('alerta-personalizada').style.display = 'flex';
}

function cerrarAlerta() {
  document.getElementById('alerta-personalizada').style.display = 'none';
}
