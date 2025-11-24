import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs'; // Importante
import { UsuariosController } from './usuarios.controller';
import { UsuarioDao } from './dao/usuario.dao';
import { Usuario } from './entities/usuario.entity';
import { CrearUsuarioHandler } from './cqrs/crear-usuario.handler';
import { EliminarUsuarioHandler } from './cqrs/eliminar-usuario.handler';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), CqrsModule], // Agregamos CqrsModule
  controllers: [UsuariosController],
  providers: [
    UsuarioDao,
    CrearUsuarioHandler,
    EliminarUsuarioHandler,
  ],
})
export class UsuariosModule { }