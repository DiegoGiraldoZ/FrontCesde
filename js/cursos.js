export const renderizarCursos = (cursos, contenedor) => {
    contenedor.innerHTML = "";
    
    if (cursos.length === 0) {
        contenedor.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="text-gray-400 mb-3">
                    <svg class="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-700 mb-1">No se encontraron cursos</h3>
                <p class="text-gray-500 text-sm">Intenta ajustar los filtros de búsqueda</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    cursos.forEach(curso => {
        html += `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
                <div class="p-5 flex-1 flex flex-col">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-lg text-gray-900 flex-1">
                            ${curso.nombre}
                        </h3>
                        <div class="flex gap-1 ml-2">
                            <button class="editar-curso p-1.5 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded transition" data-id="${curso.id}" title="Editar" type="button">
                                <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </button>
                            <button class="eliminar-curso p-1.5 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded transition" data-id="${curso.id}" title="Eliminar" type="button">
                                <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 flex-1">
                        ${curso.descripcion}
                    </p>
                    
                    <div class="space-y-2 mb-4 pt-4 border-t border-gray-100">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-600">Duración</span>
                            <span class="font-semibold text-gray-900">${curso.semanas} semanas</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-600">Precio</span>
                            <span class="font-bold text-blue-900">$${curso.precio.toLocaleString('es-CO')}</span>
                        </div>
                    </div>
                    
                    <button class="abrir-modal w-full bg-blue-900 hover:bg-blue-950 text-white font-medium py-2.5 px-4 rounded-lg transition-colors" 
                            data-curso='${JSON.stringify(curso)}' type="button">
                        Ver detalles
                    </button>
                </div>
            </div>
        `;
    });
    contenedor.innerHTML = html;
}
