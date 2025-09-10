
document.addEventListener("DOMContentLoaded", () => {
	const formLogin = document.getElementById("formLogin");

	if (formLogin) {
		formLogin.addEventListener("submit", (e) => {
			e.preventDefault();

			const correo = document.getElementById("correoLogin").value.trim();
			const password = document.getElementById("passwordLogin").value.trim();
			const mensaje = document.getElementById("mensajeLogin");

			let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

			const usuarioValido = usuarios.find(u => u.correo === correo && u.password === password);

			if (usuarioValido) {
				mensaje.textContent = "Login exitoso ✅";
				mensaje.style.color = "green";
				localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));
				setTimeout(() => {
					window.location.href = "index.html";
				}, 1000);
			} else {
				mensaje.textContent = "Correo o contraseña incorrectos.";
				mensaje.style.color = "red";
			}
		});
	}
});

document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("formRegistro");

  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const apellido = document.getElementById("apellido").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const password = document.getElementById("password").value.trim();
      const mensaje = document.getElementById("mensajeRegistro");

      if (nombre === "" || apellido === "" || correo === "" || password === "") {
        mensaje.textContent = "Todos los campos son obligatorios.";
        mensaje.style.color = "red";
        return;
      }

    
      const regexCorreo = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
      if (!regexCorreo.test(correo)) {
        mensaje.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        mensaje.style.color = "red";
        return;
      }

      let usuarios = JSON.parse(localStorage.getItem("usuariosAdmin")) || [];

      
      const nuevo = {
        id: Date.now(),
        run: "", 
        nombre,
        apellidos: apellido,
        correo,
        password,
        fechaNac: "",
        tipoUsuario: "Cliente", 
        region: "",
        comuna: "",
        direccion: ""
      };

      usuarios.push(nuevo);
      localStorage.setItem("usuariosAdmin", JSON.stringify(usuarios));

      mensaje.textContent = "Registro exitoso ✅";
      mensaje.style.color = "green";
      formRegistro.reset();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const correo = document.getElementById("correoLogin").value.trim();
      const password = document.getElementById("passwordLogin").value.trim();
      const mensaje = document.getElementById("mensajeLogin");

      let usuarios = JSON.parse(localStorage.getItem("usuariosAdmin")) || [];

      const usuarioValido = usuarios.find(
        u => u.correo === correo && (u.password === password || u.run === password) 
      );

      if (usuarioValido) {
        mensaje.textContent = "Login exitoso ✅";
        mensaje.style.color = "green";

        
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));

        setTimeout(() => {
        
          if (usuarioValido.tipoUsuario === "Administrador") {
            window.location.href = "admin/admin.html";
          } else {
            window.location.href = "index.html";
          }
        }, 1000);
      } else {
        mensaje.textContent = "Correo o contraseña incorrectos.";
        mensaje.style.color = "red";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const formContacto = document.getElementById("formContacto");

  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombreContacto").value.trim();
      const correo = document.getElementById("correoContacto").value.trim();
      const telefono = document.getElementById("telefonoContacto").value.trim();
      const comentario = document.getElementById("comentarioContacto").value.trim();
      const mensaje = document.getElementById("mensajeContacto");

      
      if (!nombre || !correo || !telefono || !comentario) {
        mensaje.textContent = "Todos los campos son obligatorios.";
        mensaje.style.color = "red";
        return;
      }

      if (nombre.length > 100) {
        mensaje.textContent = "El nombre no puede superar 100 caracteres.";
        mensaje.style.color = "red";
        return;
      }

      if (comentario.length > 500) {
        mensaje.textContent = "El comentario no puede superar 500 caracteres.";
        mensaje.style.color = "red";
        return;
      }

      const regexCorreo = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
      if (!regexCorreo.test(correo)) {
        mensaje.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        mensaje.style.color = "red";
        return;
      }

      const regexTel = /^[0-9\-\+ ]{7,15}$/;
      if (!regexTel.test(telefono)) {
        mensaje.textContent = "Teléfono inválido. Ejemplo: +56912345678";
        mensaje.style.color = "red";
        return;
      }

      let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
      mensajes.push({ nombre, correo, telefono, comentario, fecha: new Date().toLocaleString() });
      localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));

      mensaje.textContent = "Mensaje enviado con éxito ✅";
      mensaje.style.color = "green";
      formContacto.reset();
    });
  }
});
