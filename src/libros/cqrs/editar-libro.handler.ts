import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LibroDao } from "../dao/libro.dao";
import { EditarLibroCommand } from "./editar-libro.command";

@CommandHandler(EditarLibroCommand)
export class EditarLibroHandler implements ICommandHandler<EditarLibroCommand> {
    constructor(private readonly libroDao: LibroDao) { }

    async execute(command: EditarLibroCommand): Promise<void> {
        const datosAActualizar = {
            titulo: command.titulo,
            genero: command.genero,
            portada: command.portada,
            pdf: command.pdf
        };

        await this.libroDao.actualizarLibro(command.id, datosAActualizar);
    }
}
