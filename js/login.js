
function mostrarAlertaPersonalizada() {
  const alerta = document.getElementById('alerta-personalizada');
  if (alerta) {
    alerta.style.display = 'flex';
  }
}

function cerrarAlerta() {
  const alerta = document.getElementById('alerta-personalizada');
  if (alerta) {
    alerta.style.display = 'none';
  }
}
async function validarCredenciales(event) {
  event.preventDefault();

  const emailUsuario = document.getElementById('email').value.trim();
  console.log('Correo ingresado:', emailUsuario);

  try {
    const tokenUrl = `http://172.16.150.38:5252/EcoIvrVisual/api/mtdGenerarToken?Email=ivr_visual@atento.com&password=4Dm1n3c02026`;

    const tokenResponse = await fetch(tokenUrl);
    if (!tokenResponse.ok) throw new Error('Error al obtener el token');

    const tokenData = await tokenResponse.json();
    const token = tokenData.token;
    console.log('TOKEN:', token);

    const callId = '123423';
    const loginUrl = `http://172.16.150.38:5252/EcoIvrVisual/api/mtdGestion/Login?Callid=${callId}&Email=${encodeURIComponent(emailUsuario)}`;

    const loginResponse = await fetch(loginUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!loginResponse.ok) throw new Error('Error al validar el usuario');

    const loginData = await loginResponse.json();
    console.log('LOGIN DATA:', loginData);

    if (!loginData.existeCliente) {
      mostrarAlertaPersonalizada();
    } else {
      const tipo = loginData.tipoCliente?.toLowerCase();
      console.log('TIPO DE CLIENTE:', tipo);

      if (tipo === 'pensionado') {
        window.location.href = 'templates/grupo_poblacional/pensionado.html';
      } else {
        window.location.href = 'templates/grupo_poblacional/activo.html';
      }
    }

  } catch (error) {
    console.error('Error durante la validación:', error);
    mostrarAlertaPersonalizada();
  }
}
