import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsuarioDao } from "../dao/usuario.dao";
import { EditarUsuarioCommand } from "./editar-usuario.command";

@CommandHandler(EditarUsuarioCommand)
export class EditarUsuarioHandler implements ICommandHandler<EditarUsuarioCommand> {
    constructor(private readonly usuarioDao: UsuarioDao) { }

    async execute(command: EditarUsuarioCommand): Promise<void> {
        const datos: any = {
            nombreUsuario: command.nombreUsuario,
            rol: command.rol,
        };

        if (command.contrasena && command.contrasena !== '') {
            datos.contrasena = command.contrasena;
        }

        await this.usuarioDao.actualizarUsuario(command.id, datos);
    }
}