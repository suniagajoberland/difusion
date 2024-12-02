document.addEventListener("DOMContentLoaded", (event) => {
  class Contacto {
    constructor(nombre, apellido, telefono) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.telefono = telefono;
    }

    obtenerEnlaceWhatsApp() {
      const saludo = `Hola ${this.nombre} ${this.apellido},`;
      const numeroConCodigo = `+58${this.telefono}`;
      const enlace = `https://wa.me/${numeroConCodigo}?text=${encodeURIComponent(
        saludo
      )}`;
      return enlace;
    }
  }

  const contactos = [
    new Contacto("Joberland", "Suniaga", "4143693311"),
    new Contacto("María", "Gómez", "4143693311"),
    // Agrega manualmente más contactos aquí
  ];

  const contactosDiv = document.getElementById("contactos");
  const contactosPorPagina = 30; // 5 columnas * 6 filas
  let paginaActual = 1;

  function mostrarContactos(pagina) {
    contactosDiv.innerHTML = "";
    const inicio = (pagina - 1) * contactosPorPagina;
    const fin = inicio + contactosPorPagina;
    const contactosPagina = contactos.slice(inicio, fin);

    contactosPagina.forEach((contacto) => {
      const contactoDiv = document.createElement("div");
      contactoDiv.className = "contacto";

      const img = document.createElement("img");
      img.src = "Assets/user.png"; // Reemplaza con la ruta de tu imagen
      img.alt = "WhatsApp";
      img.onclick = () => {
        window.open(contacto.obtenerEnlaceWhatsApp(), "_blank");
      };

      const nombre = document.createElement("span");
      nombre.textContent = `${contacto.nombre} ${contacto.apellido}`;

      contactoDiv.appendChild(img);
      contactoDiv.appendChild(nombre);
      contactosDiv.appendChild(contactoDiv);
    });
  }

  function actualizarPaginacion() {
    document.getElementById("anterior").disabled = paginaActual === 1;
    document.getElementById("siguiente").disabled =
      paginaActual === Math.ceil(contactos.length / contactosPorPagina);
  }

  document.getElementById("anterior").addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      mostrarContactos(paginaActual);
      actualizarPaginacion();
    }
  });

  document.getElementById("siguiente").addEventListener("click", () => {
    if (paginaActual < Math.ceil(contactos.length / contactosPorPagina)) {
      paginaActual++;
      mostrarContactos(paginaActual);
      actualizarPaginacion();
    }
  });

  mostrarContactos(paginaActual);
  actualizarPaginacion();
});
