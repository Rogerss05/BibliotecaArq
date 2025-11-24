import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioDao {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
    ) { }

    // Método: Validar credenciales
    async validarUsuario(nombre: string, pass: string): Promise<Usuario | null> {
        return await this.usuarioRepo.findOne({
            where: { nombreUsuario: nombre, contrasena: pass }
        });
    }

    // Método para guardar un usuario nuevo
    async registrarUsuario(datosUsuario: Usuario): Promise<Usuario> {
        return await this.usuarioRepo.save(datosUsuario);
    }

    // Método para listar todos los usuarios
    async obtenerTodos(): Promise<Usuario[]> {
        return await this.usuarioRepo.find();
    }

    async eliminarUsuario(id: number): Promise<void> {
        await this.usuarioRepo.delete(id);
    }
}