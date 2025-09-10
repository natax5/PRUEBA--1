
const regiones = {
  "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
};

document.addEventListener("DOMContentLoaded", () => {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

 
  for (let region in regiones) {
    let option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    selectRegion.appendChild(option);
  }


  selectRegion.addEventListener("change", () => {
    selectComuna.innerHTML = "";
    regiones[selectRegion.value].forEach(comuna => {
      let option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      selectComuna.appendChild(option);
    });
  });

  mostrarUsuarios();

  const form = document.getElementById("formUsuario");
  form.addEventListener("submit", guardarUsuario);
});


function guardarUsuario(e) {
  e.preventDefault();

  const id = document.getElementById("idUsuario").value;
  const run = document.getElementById("run").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const fechaNac = document.getElementById("fechaNac").value;
  const tipoUsuario = document.getElementById("tipoUsuario").value;
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const direccion = document.getElementById("direccion").value.trim();

  
  if (!validarRun(run)) {
    alert("RUN inválido. Ejemplo: 19011022K");
    return;
  }

  const regexCorreo = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!regexCorreo.test(correo)) {
    alert("Correo inválido. Solo se permiten duoc.cl, profesor.duoc\.cl o gmail.com");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuariosAdmin")) || [];

  if (id) {
    // Editar
    const index = usuarios.findIndex(u => u.id == id);
    usuarios[index] = { id: parseInt(id), run, nombre, apellidos, correo, fechaNac, tipoUsuario, region, comuna, direccion };
  } else {
    // Nuevo
    const nuevo = { id: Date.now(), run, nombre, apellidos, correo, fechaNac, tipoUsuario, region, comuna, direccion };
    usuarios.push(nuevo);
  }

  localStorage.setItem("usuariosAdmin", JSON.stringify(usuarios));
  document.getElementById("formUsuario").reset();
  document.getElementById("idUsuario").value = "";
  mostrarUsuarios();
}


function mostrarUsuarios() {
  const tbody = document.querySelector("#tablaUsuarios tbody");
  tbody.innerHTML = "";

  let usuarios = JSON.parse(localStorage.getItem("usuariosAdmin")) || [];

  usuarios.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.run}</td>
      <td>${u.nombre} ${u.apellidos}</td>
      <td>${u.correo}</td>
      <td>${u.tipoUsuario}</td>
      <td>
        <button onclick="editarUsuario(${u.id})">✏️</button>
        <button onclick="eliminarUsuario(${u.id})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


function editarUsuario(id) {
  let usuarios = JSON.parse(localStorage.getItem("usuariosAdmin")) || [];
  const usuario = usuarios.find(u => u.id == id);

  if (usuario) {
    document.getElementById("idUsuario").value = usuario.id;
    document.getElementById("run").value = usuario.run;
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("apellidos").value = usuario.apellidos;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById("fechaNac").value = usuario.fechaNac;
    document.getElementById("tipoUsuario").value = usuario.tipoUsuario;
    document.getElementById("region").value = usuario.region;


    const selectComuna = document.getElementById("comuna");
    selectComuna.innerHTML = "";
    regiones[usuario.region].forEach(comuna => {
      let option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      if (comuna === usuario.comuna) option.selected = true;
      selectComuna.appendChild(option);
    });

    document.getElementById("direccion").value = usuario.direccion;
  }
}


function eliminarUsuario(id) {
  let usuarios = JSON.parse(localStorage.getItem("usuariosAdmin")) || [];
  usuarios = usuarios.filter(u => u.id != id);
  localStorage.setItem("usuariosAdmin", JSON.stringify(usuarios));
  mostrarUsuarios();
}



function validarRun(run) {
  const regexRun = /^[0-9]{7,8}[0-9Kk]$/;
  return regexRun.test(run);
}
