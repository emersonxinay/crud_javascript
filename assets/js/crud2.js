const ingresar = document.querySelector("#input_ingresar")
const agregar = document.querySelector("#boton_agregar")
const mostrar = document.querySelector("#ul_mostrar")
const buscando = document.querySelector("#input_buscar")
const buscar = document.querySelector("#boton_buscar")
const contar_tareas = document.querySelector("#contador_tareas")
const p_tareas_seleccionas = document.querySelector("#p_tareas_seleccionas")

// contador de tareas
let contador = 0;


// datos prellenados y mostrados
let tareas = [
  { id: 1, tarea: "desafio1", check: false },
  { id: 2, tarea: "desafio2", check: false },

]
tareas.forEach(mostrarTareas)
// función para agregar tareas
function crear() {
  tareas.push({ id: Date.now(), tarea: ingresar.value })
  ingresar.value = ""
  mostrarTareas()
}

// función para mostrar tareas
function mostrarTareas() {
  mostrar.innerHTML = "";
  // for (const datos of tareas) {
  //   mostrar.innerHTML += `<li> id: ${datos.id} tarea:${datos.tarea} <button onclick="editar(${datos.id})" >editar</button> <button onclick="eliminar(${datos.id})" >eliminar</button>  </li>`;
  // }
  tareas.forEach(datos => {
    mostrar.innerHTML += `<li> 
    id: ${datos.id} tarea:${datos.tarea} 
    <input type="checkbox" onchange="seleccionando(${datos.id})" ${datos.check ? "checked" : ""}>
    <button onclick="editar(${datos.id})" >editar</button> 
    <button onclick="eliminar(${datos.id})" >eliminar</button> 
            
    </li>`;
  });
  // contar las tareas
  contar_tareas.innerHTML = `<h2>${tareas.length}</h2>`;
  // contar las tareas seleccionadas
}

// function para ingresar al dar un enter
function tecladoEnter(evento) {
  if (evento.key === 'Enter') {
    crear();
  }
}

// función para editar 
function editar(id) {
  const indiceeditar = tareas.findIndex(tarea => tarea.id === id)
  const tareadato = tareas[indiceeditar].tarea
  const nuevaTarea = prompt("Ingrese la nueva tarea", tareadato)// si no ingresó nada cancela la edición
  tareas[indiceeditar].tarea = nuevaTarea
  mostrarTareas()
}

// función para eliminar
function eliminar(id) {
  const indice_eliminar = tareas.findIndex(eli => eli.id === id);
  tareas.splice(indice_eliminar, 1);
  mostrarTareas()
}

// para buscar 


function buscador() {
  const tarea = buscando.value;
  mostrar.innerHTML = "";
  const busqueda = tareas.filter(buscarlo => buscarlo.tarea.toLowerCase().includes(tarea.toLowerCase()))
  busqueda.forEach(buscarlo => {
    mostrar.innerHTML += `<li> 
    id: ${buscarlo.id} tarea:${buscarlo.tarea} 
    <button onclick="editar(${buscarlo.id})" >editar</button> 
    <button onclick="eliminar(${buscarlo.id})" >eliminar</button>  
    </li>

            
    `;
  })
  if (tarea === "") {
    mostrarTareas()
  }
}

// función para el checkbox
function selecciondo(id) {

  tareas = tareas.map(tarea =>
    tarea.id === id ? { ...tarea, check: !tarea.check } : tarea
  );
  p_tareas_seleccionas.innerHTML = `<h2>${tareas.filter(tarea => tarea.check).length}</h2>`;


  // Volver a mostrar las tareas y actualizar los contadores
  mostrarTareas();
}

// para que funcione
buscando.addEventListener("input", buscador)
buscar.addEventListener("click", buscador)
// agregar
agregar.addEventListener("click", crear)
ingresar.addEventListener("keydown", tecladoEnter)




