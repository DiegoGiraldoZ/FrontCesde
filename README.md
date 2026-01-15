# Cursos Cesde - Plataforma de Gestión de Cursos

Aplicación web para la gestión de cursos educativos que permite visualizar, crear, editar y eliminar cursos, así como consultar información de los docentes asignados.

## Descripción

Esta es una aplicación de página única (SPA) desarrollada con JavaScript vanilla que consume una API REST para la gestión completa de cursos. La aplicación ofrece una interfaz moderna y responsive con funcionalidades de búsqueda y filtrado avanzado.

## Características Principales

- **Gestión completa de cursos (CRUD)**
  - Crear nuevos cursos
  - Editar cursos existentes
  - Eliminar cursos
  - Visualizar detalles completos de cada curso

- **Sistema de filtros**
  - Búsqueda por nombre de curso
  - Filtro por precio máximo con control deslizante
  - Filtro por duración en semanas

- **Información de docentes**
  - Visualización de datos del docente asignado
  - Enlace directo de contacto por correo electrónico

- **Interfaz responsive**
  - Diseño adaptable a diferentes dispositivos
  - Grid responsive que se ajusta automáticamente

- **Validaciones de formulario**
  - Validación de campos requeridos
  - Límites de caracteres
  - Validación de rangos numéricos

## Tecnologías Utilizadas

- HTML5
- CSS3 (Tailwind CSS vía CDN)
- JavaScript ES6+ (Módulos)
- JSON Server (API REST local)
- Fetch API para peticiones HTTP

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Git (opcional, para clonar el repositorio)

## Instalación

1. Clona el repositorio o descarga los archivos del proyecto:
```bash
git clone https://github.com/DiegoGiraldoZ/FrontCesde
```

2. Instala las dependencias del proyecto:
```bash
npm install
```

Esto instalará:
- `json-server`: Para ejecutar la API REST local
- `live-server`: Para servir la aplicación web

## Ejecución

### Paso 1: Iniciar el servidor de API

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm run start:api
```

El servidor API estará disponible en `http://localhost:3000`

### Paso 2: Iniciar el servidor web

Abre una segunda terminal en la carpeta del proyecto y ejecuta:

```bash
npm run start:front
```

La aplicación se abrirá automáticamente en tu navegador predeterminado en `http://127.0.0.1:5500`

**Nota**: Es importante mantener ambas terminales abiertas mientras uses la aplicación.

## Uso de la Aplicación

### Visualizar Cursos

Al cargar la aplicación, se mostrarán todos los cursos disponibles en formato de tarjetas. Cada tarjeta muestra:
- Nombre del curso
- Descripción
- Duración en semanas
- Precio
- Botones de editar y eliminar

### Buscar y Filtrar Cursos

1. **Búsqueda por nombre**: Escribe en el campo de búsqueda para filtrar cursos por nombre en tiempo real.

2. **Filtro por precio**: Ajusta el control deslizante para establecer un precio máximo. Solo se mostrarán cursos con precio igual o inferior al seleccionado.

3. **Filtro por duración**: Selecciona un rango de duración:
   - Todas las duraciones
   - 1-4 semanas
   - 5-7 semanas
   - 8+ semanas

4. **Limpiar filtros**: Haz clic en el botón "Limpiar filtros" para restablecer todos los filtros y mostrar todos los cursos.

### Agregar un Nuevo Curso

1. Haz clic en el botón "Agregar Curso" en la parte superior derecha.
2. Completa el formulario con la siguiente información:
   - Nombre del curso (3-100 caracteres)
   - Descripción (10-500 caracteres)
   - Semanas de duración (1-52)
   - Precio (mínimo 0, múltiplo de 1000)
   - Fecha de inicio
   - Docente asignado
3. Haz clic en "Guardar" para crear el curso o "Cancelar" para cerrar sin guardar.

### Editar un Curso

1. En la tarjeta del curso que deseas editar, haz clic en el icono de lápiz.
2. Modifica los campos necesarios en el formulario.
3. Haz clic en "Guardar" para aplicar los cambios.

### Eliminar un Curso

1. En la tarjeta del curso que deseas eliminar, haz clic en el icono de papelera.
2. Confirma la eliminación en el diálogo que aparece.

### Ver Detalles del Curso

1. Haz clic en el botón "Ver detalles" de cualquier curso.
2. Se abrirá un modal con información completa:
   - Nombre completo
   - Descripción completa
   - Duración
   - Fecha de inicio
   - Docente asignado
   - Precio

### Contactar al Docente

1. Desde el modal de detalles del curso, haz clic en "Contactar" junto al nombre del docente.
2. Se abrirá un segundo modal con la información del docente:
   - Nombre completo
   - Número de documento
   - Correo electrónico (clickeable para enviar email)

## Estructura del Proyecto

```
CursosCesde/
├── index.html              # Página principal
├── db.json                 # Base de datos JSON
├── package.json            # Dependencias del proyecto
├── README.md              # Este archivo
├── css/
│   └── tailwind.css       # Estilos personalizados (si aplica)
└── js/
    ├── api.js             # Funciones para consumir la API
    ├── app.js             # Lógica principal de la aplicación
    └── cursos.js          # Función de renderizado de cursos
```

## API Endpoints

La aplicación consume los siguientes endpoints de la API REST:

### Cursos

- `GET /cursos` - Obtener todos los cursos
- `POST /cursos` - Crear un nuevo curso
- `PUT /cursos/:id` - Actualizar un curso existente
- `DELETE /cursos/:id` - Eliminar un curso

### Docentes

- `GET /docentes` - Obtener todos los docentes

## Estructura de Datos

### Curso

```json
{
  "id": 1,
  "nombre": "Java Backend",
  "descripcion": "Spring Boot desde cero",
  "semanas": 8,
  "precio": 1200000,
  "fechaInicio": "2024-03-10T08:00",
  "docenteId": 1
}
```

### Docente

```json
{
  "id": 1,
  "nombre": "Juan Perez",
  "identificacion": "123456789",
  "email": "juan@cesde.edu.co"
}
```