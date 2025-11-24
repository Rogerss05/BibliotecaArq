import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CrearUsuarioCommand } from './crear-usuario.command';
import { UsuarioDao } from '../dao/usuario.dao';
import { Usuario } from '../entities/usuario.entity';

@CommandHandler(CrearUsuarioCommand)
export class CrearUsuarioHandler implements ICommandHandler<CrearUsuarioCommand> {
    constructor(private usuarioDao: UsuarioDao) { }

    async execute(command: CrearUsuarioCommand): Promise<Usuario> {
        // Aquí convertimos el comando en una entidad para guardarla
        // (Validamos la regla de que el CQRS usa el DAO)
        const nuevoUsuario = new Usuario();
        nuevoUsuario.nombreUsuario = command.nombreUsuario;
        nuevoUsuario.contrasena = command.contrasena;
        nuevoUsuario.rol = command.rol;

        return await this.usuarioDao.registrarUsuario(nuevoUsuario);
    }
}