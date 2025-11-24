import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { LibrosModule } from './libros/libros.module';
import { Libro } from './libros/entities/libro.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'biblioteca.db', // Así se llama el archivo de la base de datos
      entities: [Usuario, Libro],       // Aquí registramos la tabla Usuario
      synchronize: true,
    }),
    UsuariosModule,
    LibrosModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }