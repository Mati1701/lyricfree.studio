// --- Variables globales ---
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;
let audio;

const recordButton = document.getElementById("recordButton");
const stopButton = document.getElementById("stopButton");
const playButton = document.getElementById("playButton");
const downloadButton = document.getElementById("downloadButton");

const btnAbrirMenu = document.getElementById("btnAbrirMenu");
const btnCerrarMenu = document.getElementById("btnCerrarMenu");
const menuLateral = document.getElementById("menuLateral");
const btnBioToggle = document.getElementById("btnBioToggle");
const bioContainer = document.getElementById("bioContainer");

const btnLogin = document.getElementById("btnLogin");
const mensajeBienvenida = document.getElementById("mensajeBienvenida");
const nombreArtisticoInput = document.getElementById("nombreArtistico");
const passwordInput = document.getElementById("password");

const btnSugerirRima = document.getElementById("btnSugerirRima");
const btnLimpiarTexto = document.getElementById("btnLimpiarTexto");
const btnDescargarLetra = document.getElementById("btnDescargarLetra");
const letraTextarea = document.getElementById("letra");

const btnInspirar = document.getElementById("btnInspirar");
const palabraClaveInput = document.getElementById("palabraClave");
const fraseInspiracionP = document.getElementById("fraseInspiracion");

const listaRecomendaciones = document.getElementById("listaRecomendaciones");

const temaSelect = document.getElementById("temaSelect");
const btnBorrarDatos = document.getElementById("btnBorrarDatos");

// --- Funciones ---
// Menú lateral abrir/cerrar
btnAbrirMenu.addEventListener("click", () => {
  menuLateral.classList.remove("menu-cerrado");
});

btnCerrarMenu.addEventListener("click", () => {
  menuLateral.classList.add("menu-cerrado");
});

// Mostrar/ocultar biografía
btnBioToggle.addEventListener("click", () => {
  if (bioContainer.style.display === "block") {
    bioContainer.style.display = "none";
  } else {
    bioContainer.style.display = "block";
  }
});

// Login básico
btnLogin.addEventListener("click", () => {
  const nombre = nombreArtisticoInput.value.trim();
  const pass = passwordInput.value.trim();

  if (!nombre || !pass) {
    alert("Por favor, ingresa nombre artístico o correo y contraseña.");
    return;
  }

  // Guardar en localStorage (simulado, sin backend real)
  localStorage.setItem("nombreArtistico", nombre);
  localStorage.setItem("logueado", "true");

  mensajeBienvenida.textContent = `Bienvenido, ${nombre}! Ahora tienes acceso completo.`;
});

// Sugerir rima (simulado)
btnSugerirRima.addEventListener("click", () => {
  const rimas = ["camino - destino", "latido - perdido", "mirada - llamada", "fuego - ruego"];
  const aleatoria = rimas[Math.floor(Math.random() * rimas.length)];
  alert("Rima sugerida: " + aleatoria);
});

// Limpiar textarea
btnLimpiarTexto.addEventListener("click", () => {
  letraTextarea.value = "";
});

// Descargar letra .txt
btnDescargarLetra.addEventListener("click", () => {
  const texto = letraTextarea.value;
  if (!texto) {
    alert("No hay letra para descargar.");
    return;
  }
  const blob = new Blob([texto], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "letra.txt";
  enlace.click();
});

// Inspiración básica (frases simuladas)
btnInspirar.addEventListener("click", () => {
  const ideas = [
    "Aunque todo se apague, yo sigo brillando.",
    "Mi voz es fuego en medio del hielo.",
    "Entre sombras, encontré mi luz.",
    "Lo que duele, también enseña.",
    "Rompí cadenas con versos, no con gritos."
  ];

  // Puedes filtrar la inspiración según palabra clave (simple ejemplo)
  const palabra = palabraClaveInput.value.trim().toLowerCase();

  let frasesFiltradas = ideas.filter(frase => frase.toLowerCase().includes(palabra));
  if (frasesFiltradas.length === 0) frasesFiltradas = ideas;

  const aleatoria = frasesFiltradas[Math.floor(Math.random() * frasesFiltradas.length)];
  fraseInspiracionP.textContent = aleatoria;
});

// Grabadora
async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      audioUrl = URL.createObjectURL(audioBlob);
      audio = new Audio(audioUrl);
      downloadButton.href = audioUrl;
      downloadButton.download = "grabacion.wav";
      playButton.disabled = false;
      downloadButton.disabled = false;
    };

    mediaRecorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
  } catch (err) {
    alert("No se pudo acceder al micrófono.");
    console.error(err);
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
  }
}

function playRecording() {
  if (audio) audio.play();
}

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
playButton.addEventListener("click", playRecording);

// Tema visual
temaSelect.addEventListener("change", () => {
  document.body.className = ""; // Limpiar clases
  const tema = temaSelect.value;
  if (tema === "claro") {
    document.body.classList.add("tema-claro");
  } else if (tema === "oscuro") {
    document.body.classList.add("tema-oscuro");
  } else if (tema === "emocional") {
    document.body.classList.add("tema-emocional");
  }
  localStorage.setItem("temaUsuario", tema);
});

// Cargar tema guardado
window.addEventListener("load", () => {
  const temaGuardado = localStorage.getItem("temaUsuario");
  if (temaGuardado) {
    temaSelect.value = temaGuardado;
    temaSelect.dispatchEvent(new Event("change"));
  }

  // Mostrar nombre si ya está logueado
  if (localStorage.getItem("logueado") === "true") {
    const nombre = localStorage.getItem("nombreArtistico");
    if (nombre) {
      mensajeBienvenida.textContent = `Bienvenido, ${nombre}! Ahora tienes acceso completo.`;
    }
  }
});

// Borrar datos y reiniciar sesión
btnBorrarDatos.addEventListener("click", () => {
  if (confirm("¿Seguro quieres borrar todos los datos y reiniciar la sesión?")) {
    localStorage.clear();
    location.reload();
  }
});

// Recomendaciones musicales simuladas (puedes mejorar con IA luego)
function mostrarRecomendaciones() {
  // Ejemplo simple analizando letra para emoción (muy básico)
  const texto = letraTextarea.value.toLowerCase();
  listaRecomendaciones.innerHTML = "";

  let recomendaciones = [];

  if (texto.includes("amor") || texto.includes("corazón")) {
    recomendaciones = [
      {titulo: "Perfect - Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g"},
      {titulo: "Someone Like You - Adele", url: "https://www.youtube.com/watch?v=hLQl3WQQoQ0"}
    ];
  } else if (texto.includes("triste") || texto.includes("lágrimas")) {
    recomendaciones = [
      {titulo: "Fix You - Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM"},
      {titulo: "Let Her Go - Passenger", url: "https://www.youtube.com/watch?v=RBumgq5yVrA"}
    ];
  } else {
    recomendaciones = [
      {titulo: "Blinding Lights - The Weeknd", url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ"},
      {titulo: "Uptown Funk - Mark Ronson ft. Bruno Mars", url: "https://www.youtube.com/watch?v=OPf0YbXqDm0"}
    ];
  }

  recomendaciones.forEach(rec => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = rec.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = rec.titulo;
    li.appendChild(a);
    listaRecomendaciones.appendChild(li);
  });
}

// Actualiza recomendaciones cada vez que escribes letra (opcional)
letraTextarea.addEventListener("input", mostrarRecomendaciones);
window.addEventListener("load", mostrarRecomendaciones);

  