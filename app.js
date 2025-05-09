// Seleccionar los elementos del DOM
const inputTarea = document.getElementById("ingresar-tarea");
const botonAgregar = document.getElementById("boton-agregar");
const listaTareas = document.getElementById("lista-tareas");

// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
  const tareas = localStorage.getItem("tareas");
  return tareas ? JSON.parse(tareas) : [];
}

// Guardar tareas en localStorage
function guardarTareasLocalStorage(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Renderizar la lista de tareas en el DOM
function mostrarTareas() {
  const tareas = obtenerTareasLocalStorage();
  listaTareas.innerHTML = "";

  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.className = "tarea-item";
    li.innerHTML = `
      <span class="tarea-texto ${tarea.completada ? 'completada' : ''}">${tarea.texto}</span>
      <button class="btn-completar" onclick="completarTarea(${index})">✔️</button>
      <button class="btn-eliminar" onclick="eliminarTarea(${index})">❌</button>
    `;
    listaTareas.appendChild(li);
  });
}

// Marcar la tarea como completada
function completarTarea(index) {
  const tareas = obtenerTareasLocalStorage();
  tareas[index].completada = !tareas[index].completada;
  guardarTareasLocalStorage(tareas);
  mostrarTareas();
}

// Eliminar la tarea correspondiente
function eliminarTarea(index) {
  const tareas = obtenerTareasLocalStorage();
  tareas.splice(index, 1);
  guardarTareasLocalStorage(tareas);
  mostrarTareas();
}

// Crear una nueva tarea
function nuevaTarea() {
  const texto = inputTarea.value.trim();
  if (texto !== "") {
    const tareas = obtenerTareasLocalStorage();
    tareas.push({ texto, completada: false });
    guardarTareasLocalStorage(tareas);
    inputTarea.value = "";
    mostrarTareas();
  }
}

// Escuchar el botón Agregar
botonAgregar.addEventListener("click", nuevaTarea);

// Escuchar la tecla Enter
inputTarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    nuevaTarea();
  }
});

// Mostrar tareas al cargar
const tareasIniciales = [
  { texto: "Pasear el perro", completada: false },
  { texto: "Pagar los Servicios", completada: false},
  { texto: "Estudiar para el examen", completada: false },
  { texto: "Comprar el Pan", completada: false }
];

const tareasGuardadas = obtenerTareasLocalStorage();
if (tareasGuardadas.length === 0) {
  guardarTareasLocalStorage(tareasIniciales);
}

mostrarTareas();