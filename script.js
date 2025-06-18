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
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;
let audio;

const recordButton = document.getElementById("recordButton");
const stopButton = document.getElementById("stopButton");
const playButton = document.getElementById("playButton");
const downloadButton = document.getElementById("downloadButton");

// Solicitar permisos de micrófono
async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
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
  mediaRecorder.stop();
  recordButton.disabled = false;
  stopButton.disabled = true;
}

function playRecording() {
  if (audio) {
    audio.play();
  }
}

// Conectar botones
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
playButton.addEventListener("click", playRecording);
const micSelect = document.getElementById("micSelect");
let selectedDeviceId = null;

// Listar dispositivos de entrada (micrófonos)
navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    devices.forEach(device => {
      if (device.kind === "audioinput") {
        const option = document.createElement("option");
        option.value = device.deviceId;
        option.text = device.label || `Micrófono ${micSelect.length + 1}`;
        micSelect.appendChild(option);
      }
    });
  });

micSelect.addEventListener("change", () => {
  selectedDeviceId = micSelect.value;
});

async function startRecording() {
  try {
    const constraints = {
      audio: selectedDeviceId ? { deviceId: selectedDeviceId } : true
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
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



