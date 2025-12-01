import { Controller, Post, Body, Get, Query, Render, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { CrearLibroCommand } from './cqrs/crear-libro.command';
import { LibroDao } from './dao/libro.dao';
import { UnamApiService } from './infrastructure/unam.api-service';
import { LibroViewModel } from './viewmodels/libro.viewmodel';
import { EliminarLibroCommand } from './cqrs/eliminar-libro.command';
import { Param } from '@nestjs/common';
import { EditarLibroCommand } from './cqrs/editar-libro.command';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Libros')
@Controller('libros')
export class LibrosController {
    constructor(
        private commandBus: CommandBus,
        private libroDao: LibroDao,
        private unamApiService: UnamApiService,
    ) { }

    // 1. Dashboard Principal
    @Get('admin')
    @Render('admin')
    verAdmin() {
        return;
    }

    // 2. Formulario para subir libro
    @Get('crear')
    @Render('alta-libro')
    verFormulario() {
        return;
    }

    // 3. Procesar el formulario (Guardar y Redirigir)
    @Post('guardar')
    async guardarDesdeFormulario(@Body() body: any, @Res() res: Response) {
        const { titulo, genero, portada, pdf } = body;

        // Ejecutamos el CQRS (Igual que en la API)
        await this.commandBus.execute(
            new CrearLibroCommand(titulo, genero, portada, pdf),
        );

        // Redirigimos al admin con éxito
        return res.redirect('/libros/admin');
    }

    // POST: Registrar libro (Bibliotecario)
    @Post()
    async registrar(@Body() body: any) {
        const { titulo, genero, portada, pdf } = body;
        return await this.commandBus.execute(
            new CrearLibroCommand(titulo, genero, portada, pdf),
        );
    }

    // Ver lista de gestión de libros (Como la de usuarios)
    @Get('admin-lista')
    @Render('lista-libros')
    async verListaGestion() {
        const libros = await this.libroDao.obtenerLibrosInternos();
        return { libros };
    }

    //Eliminar Libro
    @Post('eliminar/:id')
    async eliminarLibro(@Param('id') id: number, @Res() res: Response) {
        await this.commandBus.execute(new EliminarLibroCommand(id));
        return res.redirect('/libros/admin-lista');
    }

    // VISTA HTML: Catálogo visual para el alumno
    // Esta ruta renderiza el archivo 'buscador.hbs' que creamos
    @Get('catalogo')
    @Render('buscador')
    async verCatalogo(@Query('q') termino: string = '') {
        // 1. Internos
        const librosInternos = await this.libroDao.buscarPorTitulo(termino);
        const vistaInternos = librosInternos.map(libro => ({
            titulo: libro.titulo,
            genero: libro.genero,
            universidad: 'Mi Universidad (UTL)',
            portada: libro.portada,
            esExterno: false,
            pdf: libro.pdf
        }));

        // 2. Externos
        const vistaExternos = await this.unamApiService.buscarEnUnam(termino);

        // 3. Unimos todo
        const todosLosLibros = [...vistaInternos, ...vistaExternos];

        // 4. Retornamos el objeto que usará el HTML (Handlebars)
        return {
            libros: todosLosLibros,
            termino: termino
        };
    }

    // GET: BUSCADOR PARA ALUMNOS (DDD + DAO)
    @Get('buscar')
    async buscarParaAlumno(@Query('q') termino: string = ''): Promise<LibroViewModel[]> {
        console.log('🔍 Buscando:', termino);

        // 1. Buscar Internos (DAO) y convertir a ViewModel
        const librosInternos = await this.libroDao.buscarPorTitulo(termino);
        const vistaInternos: LibroViewModel[] = librosInternos.map(libro => ({
            titulo: libro.titulo,
            genero: libro.genero,
            universidad: 'Mi Universidad (UTL)',
            portada: libro.portada,
            esExterno: false,
            pdf: libro.pdf
        }));

        // 2. Buscar Externos (ApiService / DDD)
        const vistaExternos = await this.unamApiService.buscarEnUnam(termino);

        // 3. Unir las dos listas
        return [...vistaInternos, ...vistaExternos];
    }

    // GET: Listar todos 
    @Get()
    async obtenerTodos() {
        return await this.libroDao.obtenerLibrosInternos();
    }

    // Editar Libros
    @Get('editar/:id')
    @Render('editar-libro')
    async verEdicion(@Param('id') id: number) {
        const libro = await this.libroDao.obtenerPorId(id);
        return { libro };
    }

    @Post('actualizar/:id')
    async actualizar(@Param('id') id: number, @Body() body: any, @Res() res: Response) {
        const { titulo, genero, portada, pdf } = body;
        await this.commandBus.execute(
            new EditarLibroCommand(id, titulo, genero, portada, pdf),
        );
        return res.redirect('/libros/admin-lista');
    }
}