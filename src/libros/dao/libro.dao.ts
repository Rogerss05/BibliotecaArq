import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Libro } from '../entities/libro.entity';

@Injectable()
export class LibroDao {
    constructor(
        @InjectRepository(Libro)
        private libroRepo: Repository<Libro>,
    ) { }

    // Guardar libro (usado por CQRS)
    async guardarLibro(libro: Libro): Promise<Libro> {
        return await this.libroRepo.save(libro);
    }

    // Buscar todos los libros (Catálogo interno)
    async obtenerLibrosInternos(): Promise<Libro[]> {
        return await this.libroRepo.find();
    }

    // Buscar por título (Para el buscador del alumno)
    async buscarPorTitulo(termino: string): Promise<Libro[]> {
        return await this.libroRepo.find({
            where: { titulo: Like(`%${termino}%`) },
        });
    }

    async eliminarLibro(id: number): Promise<void> {
        await this.libroRepo.delete(id);
    }
}