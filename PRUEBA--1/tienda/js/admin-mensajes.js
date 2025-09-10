

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tablaMensajes tbody");
  if (!tbody) return;
  let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
  tbody.innerHTML = "";
  mensajes.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.nombre}</td>
      <td>${m.correo}</td>
      <td>${m.telefono}</td>
      <td>${m.comentario}</td>
      <td>${m.fecha}</td>
    `;
    tbody.appendChild(tr);
  });
});
