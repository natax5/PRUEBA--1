

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
  const btnVaciar = document.getElementById("vaciarCarrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      mostrarCarrito();
    });
  }
});

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito");
  const totalTexto = document.getElementById("total");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío 🛒</p>";
    totalTexto.textContent = "Total: $0";
    return;
  }

  let total = 0;

  carrito.forEach((p, index) => {
    total += p.precio;

    const div = document.createElement("div");
    div.classList.add("producto-carrito");
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" width="80">
      <span>${p.nombre}</span>
      <span>$${p.precio}</span>
      <button onclick="eliminarProducto(${index})">❌</button>
    `;
    contenedor.appendChild(div);
  });

  totalTexto.textContent = `Total: $${total}`;
}

function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}
