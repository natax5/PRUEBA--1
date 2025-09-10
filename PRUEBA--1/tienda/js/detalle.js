
const productosEjemplo = [
  { id: 1, nombre: "Polera", precio: 10000, imagen: "img/polera.jpg", descripcion: "Polera de algodón 100% de alta calidad." },
  { id: 2, nombre: "Pantalón", precio: 20000, imagen: "img/pantalon.jpg", descripcion: "Pantalón cómodo para uso diario." },
  { id: 3, nombre: "Zapatillas", precio: 35000, imagen: "img/zapatos.jpg", descripcion: "Zapatillas de cuero elegantes y duraderas." }
];

document.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("productoDetalle");
  const detalleDiv = document.getElementById("detalleProducto");

  let productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];
  if (productos.length === 0) productos = productosEjemplo;
  const producto = productos.find(p => p.id == id);

  if (producto) {
    detalleDiv.innerHTML = `
      <h2>${producto.nombre}</h2>
      <img src="${producto.imagen || 'img/default.jpg'}" alt="${producto.nombre}" width="250">
      <p><strong>Precio:</strong> $${producto.precio}</p>
      <p><strong>Descripción:</strong> ${producto.descripcion || "Sin descripción"}</p>
      <button onclick="agregarCarrito(${producto.id})">Añadir al Carrito 🛒</button>
    `;
  } else {
    detalleDiv.innerHTML = "<p>Producto no encontrado ❌</p>";
  }
});

function agregarCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productos = [
    { id: 1, nombre: "Polera", precio: 10000, imagen: "img/polera.jpg", descripcion: "Polera de algodón 100% de alta calidad." },
    { id: 2, nombre: "Pantalón", precio: 20000, imagen: "img/pantalon.jpg", descripcion: "Pantalón cómodo para uso diario." },
    { id: 3, nombre: "Zapatillas", precio: 35000, imagen: "img/zapatos.jpg", descripcion: "Zapatillas de cuero elegantes y duraderas." }
  ];
  const producto = productos.find(p => p.id == id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto añadido al carrito");
}
