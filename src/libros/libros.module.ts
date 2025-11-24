import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { LibrosController } from './libros.controller';
import { LibroDao } from './dao/libro.dao';
import { Libro } from './entities/libro.entity';
import { CrearLibroHandler } from './cqrs/crear-libro.handler';
import { UnamApiService } from './infrastructure/unam.api-service';
import { EliminarLibroHandler } from './cqrs/eliminar-libro.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Libro]), // Registramos la tabla Libro
    CqrsModule,
    HttpModule,
  ],
  controllers: [LibrosController],
  providers: [
    LibroDao,
    CrearLibroHandler,
    UnamApiService,
    EliminarLibroHandler,
  ],
  exports: [LibroDao] // Exportamos el DAO por si lo necesitamos fuera
})
export class LibrosModule { }