
const productosEjemplo = [
	{ id: 1, nombre: "Polera", precio: 10000, imagen: "img/polera.jpg", descripcion: "Polera de algodón 100% de alta calidad." },
	{ id: 2, nombre: "Pantalón", precio: 20000, imagen: "img/pantalon.jpg", descripcion: "Pantalón cómodo para uso diario." },
	{ id: 3, nombre: "Zapatillas", precio: 35000, imagen: "img/zapatos.jpg", descripcion: "Zapatillas de cuero elegantes y duraderas." }
];


function obtenerProductos() {
	let productosAdmin = JSON.parse(localStorage.getItem("productosAdmin")) || [];
	if (productosAdmin.length > 0) {
		return productosAdmin.map(p => ({
			...p,
			imagen: p.imagen || 'img/default.jpg',
			descripcion: p.descripcion || ''
		}));
	}
	return productosEjemplo;
}

document.addEventListener("DOMContentLoaded", () => {

	const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
	const navBienvenida = document.getElementById("navBienvenida");
	if (usuarioActivo && navBienvenida) {
		navBienvenida.innerHTML = `Bienvenido, ${usuarioActivo.nombre} <button id='btnLogout' style='margin-left:10px;padding:4px 10px;border-radius:5px;background:#dc3545;color:#fff;border:none;cursor:pointer;'>Logout</button>`;
		document.getElementById('btnLogout').onclick = function() {
			localStorage.removeItem("usuarioActivo");
			window.location.href = "login.html";
		};
	}

	const contenedor = document.getElementById("lista-productos");
	if (contenedor) {
		const productos = obtenerProductos();
		productos.forEach(p => {
			const div = document.createElement("div");
			div.classList.add("producto");
			div.innerHTML = `
				<img src="${p.imagen}" alt="${p.nombre}" width="150">
				<h3>${p.nombre}</h3>
				<p>$${p.precio}</p>
				<button onclick="verDetalle(${p.id})">Ver Detalle</button>
			`;
			contenedor.appendChild(div);
		});
	}
});

function verDetalle(id) {
	localStorage.setItem("productoDetalle", id);
	window.location.href = "producto-detalle.html";
}

function agregarCarrito(id) {
	let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
	const productos = obtenerProductos();
	const producto = productos.find(p => p.id == id);
	carrito.push(producto);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	alert("Producto añadido al carrito");
}
