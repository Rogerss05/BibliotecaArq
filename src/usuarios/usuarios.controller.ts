import { Controller, Post, Body, Get, Render, Res, Param } from '@nestjs/common';
import type { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { CrearUsuarioCommand } from './cqrs/crear-usuario.command';
import { EliminarUsuarioCommand } from './cqrs/eliminar-usuario.command';
import { UsuarioDao } from './dao/usuario.dao';
import { Usuario } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
    constructor(
        private commandBus: CommandBus,
        private usuarioDao: UsuarioDao,
    ) { }

    // ==========================================
    // ZONA DE VISTAS (ADMINISTRACIÓN)
    // ==========================================

    // 1. Ver lista de usuarios (Botón "Usuarios" del panel)
    @Get('admin')
    @Render('lista-usuarios')
    async verUsuarios() {
        const usuarios = await this.usuarioDao.obtenerTodos();
        return { usuarios }; // Pasamos la lista al HTML
    }

    // 2. Ver formulario de alta
    @Get('crear')
    @Render('alta-usuario')
    verFormularioRegistro() {
        return;
    }

    // 3. Guardar usuario desde el formulario HTML (Redirige a la lista)
    @Post('guardar')
    async guardarDesdeFormulario(@Body() body: any, @Res() res: Response) {
        const { nombreUsuario, contrasena, rol } = body;
        // Usamos CQRS (Reutilizamos el comando que ya existía)
        await this.commandBus.execute(
            new CrearUsuarioCommand(nombreUsuario, contrasena, rol),
        );
        // Redirigimos a la lista
        return res.redirect('/usuarios/admin');
    }

    @Post('eliminar/:id')
    async eliminar(@Param('id') id: number, @Res() res: Response) {
        await this.commandBus.execute(new EliminarUsuarioCommand(id));
        return res.redirect('/usuarios/admin'); // Recargamos la lista
    }

    // ==========================================
    // ZONA DE LOGIN Y API
    // ==========================================

    @Get('login')
    @Render('login')
    verLogin() {
        return;
    }

    @Post('login')
    async entrar(@Body() body: any, @Res() res: Response) {
        const { nombreUsuario, contrasena } = body;
        const usuarioEncontrado = await this.usuarioDao.validarUsuario(nombreUsuario, contrasena);

        if (usuarioEncontrado) {
            if (usuarioEncontrado.rol === 'alumno') {
                return res.redirect('/libros/catalogo');
            } else {
                return res.redirect('/libros/admin'); // Va al Dashboard Principal
            }
        } else {
            return res.render('login', { error: 'Usuario o contraseña incorrectos' });
        }
    }

    // API POST 
    @Post()
    async registrar(@Body() body: any) {
        const { nombreUsuario, contrasena, rol } = body;
        return await this.commandBus.execute(
            new CrearUsuarioCommand(nombreUsuario, contrasena, rol),
        );
    }

    // API GET (JSON)
    @Get()
    async consultarTodosApi(): Promise<Usuario[]> {
        return await this.usuarioDao.obtenerTodos();
    }
}