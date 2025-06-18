// Guardar nombre artístico
function iniciarSesion() {
  const nombre = document.getElementById('nombreArtistico').value.trim();
  if (nombre) {
    localStorage.setItem('nombreArtistico', nombre);
    document.getElementById('bienvenida').innerText = `Bienvenido, ${nombre}! Ahora tienes acceso completo.`;
  } else {
    alert("Por favor ingresa tu nombre artístico o correo.");
  }
}

// Limpiar el textarea
function limpiarTexto() {
  document.getElementById('letra').value = '';
}

// Generar rima aleatoria (simulada por ahora)
function sugerirRima() {
  const rimas = ["camino - destino", "latido - perdido", "mirada - llamada", "fuego - ruego"];
  const aleatoria = rimas[Math.floor(Math.random() * rimas.length)];
  alert("Rima sugerida: " + aleatoria);
}

// Descargar letra como .txt
function descargarLetra() {
  const texto = document.getElementById('letra').value;
  const blob = new Blob([texto], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "letra.txt";
  enlace.click();
}

// Inspiración con frases simuladas
function darInspiracion() {
  const ideas = [
    "Aunque todo se apague, yo sigo brillando.",
    "Mi voz es fuego en medio del hielo.",
    "Entre sombras, encontré mi luz.",
    "Lo que duele, también enseña.",
    "Rompí cadenas con versos, no con gritos."
  ];
  const aleatoria = ideas[Math.floor(Math.random() * ideas.length)];
  document.getElementById('fraseInspiracion').innerText = aleatoria;
}


