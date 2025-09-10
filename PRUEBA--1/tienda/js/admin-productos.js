
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();


  let msg = document.createElement('div');
  msg.id = 'msgAdmin';
  msg.style.cssText = 'margin:16px 0;padding:12px;border-radius:8px;display:none;font-weight:bold;text-align:center;';
  document.querySelector('.admin-main').insertBefore(msg, document.getElementById('formProducto'));

  function mostrarMensaje(texto, tipo) {
    msg.textContent = texto;
    msg.style.display = 'block';
    msg.style.background = tipo === 'error' ? '#ffcdd2' : '#d4edda';
    msg.style.color = tipo === 'error' ? '#b71c1c' : '#155724';
    setTimeout(() => { msg.style.display = 'none'; }, 2000);
  }

  const form = document.getElementById("formProducto");
  form.addEventListener("submit", (e) => {
    e.preventDefault();


    const descripcion = document.getElementById("descripcion").value.trim();
    const imagen = document.getElementById("imagen").value.trim();

    if (!nombre || isNaN(precio) || isNaN(stock)) {
      mostrarMensaje("Todos los campos son obligatorios.", "error");
      return;
    }

    let productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];

    if (id) {
      const index = productos.findIndex(p => p.id == id);
      productos[index] = { id: parseInt(id), nombre, precio, stock, descripcion, imagen };
      mostrarMensaje("Producto editado correctamente.", "success");
    } else {
     
      const nuevo = {
        id: Date.now(),
        nombre,
        precio,
        stock,
        descripcion,
        imagen
      };
      productos.push(nuevo);
      mostrarMensaje("Producto agregado correctamente.", "success");
    }

    localStorage.setItem("productosAdmin", JSON.stringify(productos));
    form.reset();
    document.getElementById("idProducto").value = "";
    mostrarProductos();
  });
});

function mostrarProductos() {
  const tbody = document.querySelector("#tablaProductos tbody");
  tbody.innerHTML = "";

  let productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];

  productos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nombre}</td>
      <td>$${p.precio}</td>
      <td>${p.stock}</td>
      <td>
        <button onclick="editarProducto(${p.id})">✏️ Editar</button>
        <button onclick="eliminarProducto(${p.id})">🗑️ Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editarProducto(id) {
  let productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];
  const producto = productos.find(p => p.id == id);

  if (producto) {
    document.getElementById("idProducto").value = producto.id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
  }
}

function eliminarProducto(id) {
  let productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];
  productos = productos.filter(p => p.id != id);
  localStorage.setItem("productosAdmin", JSON.stringify(productos));
  mostrarProductos();
  const msg = document.getElementById('msgAdmin');
  if (msg) {
    msg.textContent = "Producto eliminado correctamente.";
    msg.style.display = 'block';
    msg.style.background = '#d4edda';
    msg.style.color = '#155724';
    setTimeout(() => { msg.style.display = 'none'; }, 2000);
  }
}
