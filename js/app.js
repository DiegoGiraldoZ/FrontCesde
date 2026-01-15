import {obtenerCursos, crearCurso, actualizarCurso, eliminarCurso} from "./api.js";
import {obtenerDocentes} from "./api.js";
import {renderizarCursos} from "./cursos.js";

const contenedorCursos = document.getElementById("cursos");
const buscador = document.getElementById("buscador");
const filtroPrecio = document.getElementById("filtro-precio");
const precioValor = document.getElementById("precio-valor");
const filtroDuracion = document.getElementById("filtro-duracion");
const limpiarFiltros = document.getElementById("limpiar-filtros");

const modalCurso = document.getElementById("modal-curso");
const cerrarModalCurso = document.getElementById("cerrar-modal-curso");
const tituloModal = document.getElementById("titulo-modal");
const descripcionModal = document.getElementById("modal-descripcion");
const semanasModal = document.getElementById("semanas-modal");
const fechaModal = document.getElementById("fecha-modal");
const docenteNombre = document.getElementById("docente-nombre");
const precioModal = document.getElementById("precio-modal");
const abrirModalDocente = document.getElementById("abrir-modal-docente");

const docenteModalElement = document.getElementById("docente-modal");
const cerrarModalDocente = document.getElementById("cerrar-modal-docente");
const nombreDocente = document.getElementById("nombre-docente");
const documentoDocente = document.getElementById("documento-docente");
const emailDocente = document.getElementById("email-docente");

const btnAgregarCurso = document.getElementById("btn-agregar-curso");
const modalFormCurso = document.getElementById("modal-form-curso");
const cerrarModalForm = document.getElementById("cerrar-modal-form");
const btnCancelarForm = document.getElementById("btn-cancelar-form");
const formCurso = document.getElementById("form-curso");
const tituloFormCurso = document.getElementById("titulo-form-curso");
const inputNombre = document.getElementById("input-nombre");
const inputDescripcion = document.getElementById("input-descripcion");
const inputSemanas = document.getElementById("input-semanas");
const inputPrecio = document.getElementById("input-precio");
const inputFecha = document.getElementById("input-fecha");
const inputDocente = document.getElementById("input-docente");

let cursos = [];
let docentes = [];
let cursoActual = null;
let cursoEditando = null;

const cargarCursos = async () => {
    cursos = await obtenerCursos();
    docentes = await obtenerDocentes();
    cargarSelectDocentes();
    renderizarCursos(cursos, contenedorCursos);
}

const cargarSelectDocentes = () => {
    inputDocente.innerHTML = '<option value="">Seleccione un docente</option>';
    docentes.forEach(docente => {
        inputDocente.innerHTML += `<option value="${docente.id}">${docente.nombre}</option>`;
    });
};

buscador.addEventListener("input", (e) => {
    aplicarFiltros();
});

filtroPrecio.addEventListener("input", (e) => {
    precioValor.textContent = `$${parseInt(e.target.value).toLocaleString("es-CO")}`;
    aplicarFiltros();
});

filtroDuracion.addEventListener("change", () => {
    aplicarFiltros();
});

limpiarFiltros.addEventListener("click", () => {
    buscador.value = "";
    filtroPrecio.value = "2000000";
    precioValor.textContent = "$2,000,000";
    filtroDuracion.value = "todas";
    aplicarFiltros();
});

const aplicarFiltros = () => {
    const texto = buscador.value.toLowerCase();
    const precioMaximo = parseInt(filtroPrecio.value);
    const duracion = filtroDuracion.value;
    
    const cursosFiltrados = cursos.filter(curso => {
        const coincideTexto = curso.nombre.toLowerCase().includes(texto);
        const coincidePrecio = curso.precio <= precioMaximo;
                
        let coincideDuracion = true;
        if (duracion === "1-4") {
            coincideDuracion = curso.semanas >= 1 && curso.semanas <= 4;
        } else if (duracion === "5-7") {
            coincideDuracion = curso.semanas >= 5 && curso.semanas <= 7;
        } else if (duracion === "8-12") {
            coincideDuracion = curso.semanas >= 8;
        }
        
        return coincideTexto && coincidePrecio && coincideDuracion;
    });
    
    renderizarCursos(cursosFiltrados, contenedorCursos);
};


contenedorCursos.addEventListener("click", async (e) => {
    const btnAbrir = e.target.closest(".abrir-modal");
    if (btnAbrir) {
        const cursoData = btnAbrir.getAttribute("data-curso");
        if (cursoData) {
            cursoActual = JSON.parse(cursoData);
            mostrarModalCurso(cursoActual);
        }
        return;
    }
    
    const btnEditar = e.target.closest(".editar-curso");
    if (btnEditar) {
        const cursoId = btnEditar.getAttribute("data-id");
        if (cursoId) {
            await obtenerCursos().then(cursosActualizados => {
                cursos = cursosActualizados;
                const curso = cursos.find(c => c.id == cursoId);
                if (curso) {
                    abrirFormularioEditar(curso);
                } else {
                    console.error("Curso no encontrado con ID:", cursoId);
                    alert("Error: Curso no encontrado");
                }
            });
        }
        return;
    }
    
    const btnEliminar = e.target.closest(".eliminar-curso");
    if (btnEliminar) {
        const cursoId = btnEliminar.getAttribute("data-id");
        if (cursoId) {
            await obtenerCursos().then(cursosActualizados => {
                cursos = cursosActualizados;
                const curso = cursos.find(c => c.id == cursoId);
                if (curso) {
                    eliminarCursoConfirmado(cursoId, curso.nombre);
                } else {
                    console.error("Curso no encontrado con ID:", cursoId);
                    alert("Error: Curso no encontrado");
                }
            });
        }
        return;
    }
});

const mostrarModalCurso = (curso) => {
    const docente = docentes.find(d => d.id === curso.docenteId);
    
    tituloModal.textContent = curso.nombre;
    descripcionModal.textContent = curso.descripcion;
    semanasModal.textContent = curso.semanas;
    fechaModal.textContent = new Date(curso.fechaInicio).toLocaleDateString("es-ES");
    docenteNombre.textContent = docente ? docente.nombre : "No asignado";
    precioModal.textContent = curso.precio.toLocaleString("es-CO");
    
    modalCurso.classList.remove("hidden");
    modalCurso.classList.add("flex");
};


cerrarModalCurso.addEventListener("click", () => {
    modalCurso.classList.add("hidden");
    modalCurso.classList.remove("flex");
});


modalCurso.addEventListener("click", (e) => {
    if (e.target === modalCurso) {
        modalCurso.classList.add("hidden");
        modalCurso.classList.remove("flex");
    }
});


abrirModalDocente.addEventListener("click", () => {
    if (cursoActual) {
        const docente = docentes.find(d => d.id === cursoActual.docenteId);
        if (docente) {
            mostrarModalDocente(docente);
        }
    }
});

const mostrarModalDocente = (docente) => {
    nombreDocente.textContent = docente.nombre;
    documentoDocente.textContent = docente.identificacion;
    emailDocente.textContent = docente.email;
    emailDocente.href = `mailto:${docente.email}`;
    
    docenteModalElement.classList.remove("hidden");
    docenteModalElement.classList.add("flex");
};


cerrarModalDocente.addEventListener("click", () => {
    docenteModalElement.classList.add("hidden");
    docenteModalElement.classList.remove("flex");
});


docenteModalElement.addEventListener("click", (e) => {
    if (e.target === docenteModalElement) {
        docenteModalElement.classList.add("hidden");
        docenteModalElement.classList.remove("flex");
    }
});

btnAgregarCurso.addEventListener("click", () => {
    abrirFormularioNuevo();
});

cerrarModalForm.addEventListener("click", () => {
    cerrarFormulario();
});

btnCancelarForm.addEventListener("click", () => {
    cerrarFormulario();
});

modalFormCurso.addEventListener("click", (e) => {
    if (e.target === modalFormCurso) {
        cerrarFormulario();
    }
});

formCurso.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const curso = {
        nombre: inputNombre.value.trim(),
        descripcion: inputDescripcion.value.trim(),
        semanas: parseInt(inputSemanas.value),
        precio: parseInt(inputPrecio.value),
        fechaInicio: inputFecha.value,
        docenteId: parseInt(inputDocente.value)
    };
    
    try {
        if (cursoEditando) {
            await actualizarCurso(cursoEditando.id, curso);
        } else {
            await crearCurso(curso);
        }
        
        cerrarFormulario();
        
        const cursosActualizados = await obtenerCursos();
        cursos = cursosActualizados;
        
        renderizarCursos(cursos, contenedorCursos);
    } catch (error) {
        console.error("Error al guardar:", error);
        alert("Error al guardar el curso");
    }
});

const abrirFormularioNuevo = () => {
    cursoEditando = null;
    tituloFormCurso.textContent = "Agregar Curso";
    formCurso.reset();
    modalFormCurso.classList.remove("hidden");
    modalFormCurso.classList.add("flex");
};

const abrirFormularioEditar = (curso) => {
    cursoEditando = curso;
    tituloFormCurso.textContent = "Editar Curso";
    
    inputNombre.value = curso.nombre;
    inputDescripcion.value = curso.descripcion;
    inputSemanas.value = curso.semanas;
    inputPrecio.value = curso.precio;
    inputFecha.value = curso.fechaInicio;
    inputDocente.value = curso.docenteId;
    
    modalFormCurso.classList.remove("hidden");
    modalFormCurso.classList.add("flex");
};

const cerrarFormulario = () => {
    modalFormCurso.classList.add("hidden");
    modalFormCurso.classList.remove("flex");
    formCurso.reset();
    cursoEditando = null;
};

const confirmarEliminar = async (cursoId) => {
    const curso = cursos.find(c => c.id === cursoId);
    if (!curso) {
        console.error("Curso no encontrado. ID buscado:", cursoId, "IDs disponibles:", cursos.map(c => c.id));
        alert("Curso no encontrado");
        return;
    }
    
    if (confirm(`¿Está seguro de eliminar el curso "${curso.nombre}"?`)) {
        try {
            await eliminarCurso(cursoId);
            
            const cursosActualizados = await obtenerCursos();
            cursos = cursosActualizados;
            
            aplicarFiltros();
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Error al eliminar el curso");
        }
    }
};

const eliminarCursoConfirmado = async (cursoId, cursoNombre) => {
    if (confirm(`¿Está seguro de eliminar el curso "${cursoNombre}"?`)) {
        try {
            await eliminarCurso(cursoId);
            cursos = await obtenerCursos();
            aplicarFiltros();
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Error al eliminar el curso");
        }
    }
};

cargarCursos();

