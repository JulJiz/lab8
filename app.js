// Referencias al DOM
const campoEntrada = document.querySelector('#ingresar-tarea');
const botonAdd = document.querySelector('#boton-agregar');
const contenedorTareas = document.querySelector('#lista-tareas');

// Cargar tareas desde localStorage (o inicializar si no hay nada)
function cargarTareas() {
  const json = localStorage.getItem('misTareas');
  if (!json) {
    const defecto = [
      { texto: 'Pasear al perro', hecha: false },
      { texto: 'Pagar servicios', hecha: false },
      { texto: 'Estudiar para el examen', hecha: false },
      { texto: 'Comprar pan', hecha: false }
    ];
    localStorage.setItem('misTareas', JSON.stringify(defecto));
    return defecto;
  }
  return JSON.parse(json);
}

// Guardar en localStorage
function guardarTareas(lista) {
  localStorage.setItem('misTareas', JSON.stringify(lista));
}

// Dibujar tareas en pantalla
function renderizar() {
  const lista = cargarTareas();
  contenedorTareas.innerHTML = '';

  lista.forEach((item, idx) => {
    // crear elemento <li>
    const elemento = document.createElement('li');
    elemento.classList.add('task-item');

    // contenido de texto
    const textoNodo = document.createElement('span');
    textoNodo.className = 'task-texto';
    if (item.hecha) textoNodo.classList.add('done');
    textoNodo.textContent = item.texto;
    elemento.appendChild(textoNodo);

    // botones
    const btns = document.createElement('div');
    btns.className = 'task-buttons';

    const btnCheck = document.createElement('button');
    btnCheck.textContent = '✔️';
    btnCheck.addEventListener('click', () => marcar(idx));
    btns.appendChild(btnCheck);

    const btnTrash = document.createElement('button');
    btnTrash.textContent = '❌';
    btnTrash.addEventListener('click', () => borrar(idx));
    btns.appendChild(btnTrash);

    elemento.appendChild(btns);
    contenedorTareas.appendChild(elemento);
  });
}

// Alternar estado hecha/no hecha
function marcar(indice) {
  const lista = cargarTareas();
  lista[indice].hecha = !lista[indice].hecha;
  guardarTareas(lista);
  renderizar();
}

// Eliminar tarea
function borrar(indice) {
  const lista = cargarTareas();
  lista.splice(indice, 1);
  guardarTareas(lista);
  renderizar();
}

// Añadir nueva tarea
function agregar() {
  const texto = campoEntrada.value.trim();
  if (!texto) return;
  const lista = cargarTareas();
  lista.push({ texto, hecha: false });
  guardarTareas(lista);
  campoEntrada.value = '';
  renderizar();
}

// Listeners
botonAdd.addEventListener('click', agregar);
campoEntrada.addEventListener('keydown', e => {
  if (e.key === 'Enter') agregar();
});

// Arrancar al cargar la página
document.addEventListener('DOMContentLoaded', renderizar);
