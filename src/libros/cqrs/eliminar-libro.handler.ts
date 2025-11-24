import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EliminarLibroCommand } from './eliminar-libro.command';
import { LibroDao } from '../dao/libro.dao';

@CommandHandler(EliminarLibroCommand)
export class EliminarLibroHandler implements ICommandHandler<EliminarLibroCommand> {
    constructor(private libroDao: LibroDao) { }

    async execute(command: EliminarLibroCommand): Promise<void> {
        await this.libroDao.eliminarLibro(command.id);
    }
}