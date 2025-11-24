import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EliminarUsuarioCommand } from './eliminar-usuario.command';
import { UsuarioDao } from '../dao/usuario.dao';

@CommandHandler(EliminarUsuarioCommand)
export class EliminarUsuarioHandler implements ICommandHandler<EliminarUsuarioCommand> {
    constructor(private usuarioDao: UsuarioDao) { }

    async execute(command: EliminarUsuarioCommand): Promise<void> {
        await this.usuarioDao.eliminarUsuario(command.id);
    }
}