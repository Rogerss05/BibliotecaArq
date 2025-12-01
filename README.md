<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Biblioteca Universal</h1>

<p align="center">
  Sistema distribuido de gestión bibliotecaria diseñado con <strong>Arquitectura Hexagonal</strong>, patrones <strong>CQRS/DDD</strong> e interconexión de nodos universitarios.
</p>

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v18+-green.svg" alt="Node.js" /></a>
  <a href="https://nestjs.com/"><img src="https://img.shields.io/badge/Framework-NestJS-red.svg" alt="NestJS" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Language-TypeScript-blue.svg" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Style-TailwindCSS-06B6D4.svg" alt="Tailwind" /></a>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
</p>

---

##  Descripción del Proyecto

**Biblioteca Universal** es una plataforma que permite la gestión local de acervos bibliográficos y la **consulta distribuida** entre diferentes instituciones (nodos).

El sistema permite a un alumno buscar un libro y obtener resultados tanto de la biblioteca local como de **APIs externas** (otras universidades) en tiempo real, fusionando la información en una interfaz unificada.

### Arquitectura y Patrones
Este proyecto fue construido siguiendo estrictamente patrones de diseño de software empresarial:

* **MVC (Model-View-Controller):** Separación clásica de responsabilidades.
* **DAO (Data Access Object):** Abstracción completa de la capa de datos (SQLite/MySQL).
* **CQRS (Command Query Responsibility Segregation):**
    * *Commands:* Para operaciones de escritura (Crear/Editar/Eliminar libros y usuarios) usando `CommandBus` y `Handlers`.
    * *Queries:* Consultas directas optimizadas a través de DAOs.
* **DDD (Domain-Driven Design):** Separación de la capa de **Infraestructura** (`ApiService`) para la comunicación con nodos externos, mapeando respuestas a **ViewModels**.
* **MVVM (Model-View-ViewModel):** Transformación de datos crudos (Entidades + JSON externos) a vistas listas para el usuario.

---

## Características Principales

### Módulo de Usuarios
* **Roles:** Sistema de permisos para `Bibliotecario` (Administrador) y `Alumno`.
* **Seguridad:** Login validado contra base de datos.
* **Gestión:** CRUD completo de usuarios mediante comandos CQRS.

### Módulo de Libros
* **Catálogo Local:** Gestión de libros propios.
* **Soporte Multimedia:** Carga y almacenamiento de Portadas y PDFs en formato **Base64** para estandarización de transferencia.
* **Buscador Híbrido (Distributed Search):**
    * Consulta simultánea a base de datos local.
    * Consulta paralela a múltiples nodos externos (APIs de compañeros).
    * Fusión de resultados en una sola vista.

### Frontend Moderno
* **Motor de Plantillas:** Handlebars (HBS) con renderizado desde el servidor (SSR).
* **Estilos:** Tailwind CSS para una interfaz oscura, responsiva y moderna.
* **UX:** Indicadores de carga (Spinners) y Alertas animadas (SweetAlert2).

---

## Instalación y Despliegue

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/Rogerss05/BibliotecaArq.git
    cd BibliotecaArq
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    # O si usas yarn
    yarn install
    ```

3.  **Configuración de Entorno**
    Asegúrate de tener el archivo `.env` configurado (si aplica) o verifica la configuración en `src/app.module.ts` para la base de datos.

4.  **Ejecutar el servidor**
    ```bash
    # Modo desarrollo
    npm run start:dev
    ```

5.  **Acceder**
    * **Web:** `http://localhost:3001/usuarios/login`
    * **API Búsqueda:** `http://localhost:3001/libros/catalogo?q={termino}`

---

## Estructura del Proyecto

La estructura de carpetas refleja la arquitectura de paquetes implementada:

```text
src/
├── usuarios/
│   ├── cqrs/       # Comandos y Handlers (Escritura)
│   ├── dao/        # Acceso a Datos
│   ├── entities/   # Modelos de BD
│   └── ...
├── libros/
│   ├── infrastructure/ # Conexión con APIs Externas (DDD)
│   ├── viewmodels/     # Modelos para la vista (MVVM)
│   ├── cqrs/
│   └── ...
└── views/          # Plantillas HTML/HBS
```

---

## Créditos

Desarrollado como proyecto final de la materia **Arquitecturas de Software**.

* **Desarrollado por:** Rogelio Echeveste
* **Framework:** NestJS

---
<p align="center">
  <a href="http://nestjs.com/" target="blank">Hecho con amor, esfuerzo y NestJS</a>
</p>