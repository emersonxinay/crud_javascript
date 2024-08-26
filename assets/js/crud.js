// CRUD = Create - Read - Update - Delete
const insertartarea = document.querySelector("#ingresartarea");
const agregandotarea = document.querySelector("#btnagregar");
const buscadortarea = document.querySelector("#buscador");
const buscandotareas = document.querySelector("#buscartarea");
const contandotareas = document.querySelector("#contartareas");
const mostrandotareas = document.querySelector("#mostrartareas");
const faltantes1 = document.querySelector("#faltantes");
const realizadas = document.querySelector("#realizadas");

const tareas = []; // Aquí no hay un error, pero asegúrate de que esto está definido antes de usarlo
let id = 0
// agregandotarea.addEventListener("click", () => {
//   const nuevatarea = insertartarea.value; // El uso de trim() es opcional pero recomendado
//   tareas.push({ id: Date.now(), tarea: nuevatarea });
//   insertartarea.value = ""; // Aquí se está usando una cadena vacía, lo cual está bien
//   mostrarTareas(tareas); // Debes pasar las tareas para actualizar la vista
// });

function crear() {
  const nuevaTarea = insertartarea.value;
  tareas.push({ id: id++, tarea: nuevaTarea, seleccionada: false });
  insertartarea.value = "";
  mostrarTareas(tareas);
}
agregandotarea.addEventListener("click", crear)


function mostrarTareas(tareas) {
  let html = "";
  for (let tare of tareas) {
    html += ` <li> ${tare.id} - ${tare.tarea} 
    <input type="checkbox"  ${tare.seleccionada ? "checked" : ""} onchange="cajitaSeleccionada(${tare.id})">
    <button onclick="eliminar(${tare.id})">Eliminar</button>
    <button onclick="editar(${tare.id})">Editar</button>
    </li> `;
  }
  mostrandotareas.innerHTML = html; // Aquí se actualiza el HTML para mostrar las tareas
  contandotareas.innerHTML = tareas.length; // Muestra la cantidad de tareas
  contarSeleccionadas();

}

function eliminar(id) {
  const index = tareas.findIndex((ele) => ele.id === id); // Se busca el índice de la tarea
  // Verifica si el índice es válido (no se pidió el if pero es recomendable)
  tareas.splice(index, 1); // Elimina la tarea del array
  mostrarTareas(tareas); // Actualiza la vista después de eliminar
}


function buscar() {
  const buscarTarea = buscadortarea.value;
  const filtrar_tareas = tareas.filter(
    (filtro) => filtro.tarea.toLowerCase().includes(buscarTarea)
  );
  mostrarTareas(filtrar_tareas);
}

buscadortarea.addEventListener("input", buscar)
buscandotareas.addEventListener("click", buscar)

function editar(id) {
  const indiceeditar = tareas.findIndex(x => x.id === id)
  const dato_tarea = tareas[indiceeditar].tarea
  const nuevaTarea = prompt("Nueva tarea:", dato_tarea)
  tareas[indiceeditar].tarea = nuevaTarea
  mostrarTareas(tareas)
}

function cajitaSeleccionada(id) {
  const index = tareas.findIndex((ele) => ele.id === id);
  tareas[index].seleccionada = !tareas[index].seleccionada;
  contarSeleccionadas();
}


function contarSeleccionadas() {
  const selecciondas = tareas.filter(x => x.seleccionada).length
  const faltantes = tareas.length - selecciondas;
  selecciondas.innerHTML = selecciondas
  faltantes1.innerHTML = faltantes
}





