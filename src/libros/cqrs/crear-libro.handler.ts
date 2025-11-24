import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CrearLibroCommand } from './crear-libro.command';
import { LibroDao } from '../dao/libro.dao';
import { Libro } from '../entities/libro.entity';

@CommandHandler(CrearLibroCommand)
export class CrearLibroHandler implements ICommandHandler<CrearLibroCommand> {
    constructor(private libroDao: LibroDao) { }

    async execute(command: CrearLibroCommand): Promise<Libro> {
        const nuevoLibro = new Libro();
        nuevoLibro.titulo = command.titulo;
        nuevoLibro.genero = command.genero;
        nuevoLibro.portada = command.portada;
        nuevoLibro.pdf = command.pdf;

        return await this.libroDao.guardarLibro(nuevoLibro);
    }
}