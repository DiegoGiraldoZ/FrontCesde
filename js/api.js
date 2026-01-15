const API_URL = "http://localhost:3000";

export async function obtenerCursos() {
    const response = await fetch(`${API_URL}/cursos`);
    return response.json();
}

export async function obtenerDocentes() {
    const response = await fetch(`${API_URL}/docentes`);
    return response.json();
}

export async function crearCurso(curso) {
    const response = await fetch(`${API_URL}/cursos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(curso)
    });
    return response.json();
}

export async function actualizarCurso(id, curso) {
    const response = await fetch(`${API_URL}/cursos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(curso)
    });
    return response.json();
}

export async function eliminarCurso(id) {
    const response = await fetch(`${API_URL}/cursos/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}