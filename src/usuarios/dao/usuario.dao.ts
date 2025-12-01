import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioDao {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
    ) { }

    async registrarUsuario(datosUsuario: Usuario): Promise<Usuario> {
        const salt = await bcrypt.genSalt();
        datosUsuario.contrasena = await bcrypt.hash(datosUsuario.contrasena, salt);
        return await this.usuarioRepo.save(datosUsuario);
    }

    async validarUsuario(nombre: string, pass: string): Promise<Usuario | null> {
        const usuario = await this.usuarioRepo.findOne({ where: { nombreUsuario: nombre } });
        if (usuario && (await bcrypt.compare(pass, usuario.contrasena))) {
            return usuario;
        }
        return null;
    }

    async obtenerTodos(): Promise<Usuario[]> {
        return await this.usuarioRepo.find();
    }

    async obtenerPorId(id: number): Promise<Usuario | null> {
        return await this.usuarioRepo.findOne({ where: { id } });
    }

    async actualizarUsuario(id: number, datosNuevos: Partial<Usuario>): Promise<void> {
        if (datosNuevos.contrasena) {
            const salt = await bcrypt.genSalt();
            datosNuevos.contrasena = await bcrypt.hash(datosNuevos.contrasena, salt);
        }
        await this.usuarioRepo.update(id, datosNuevos);
    }


    async eliminarUsuario(id: number): Promise<void> {
        await this.usuarioRepo.delete(id);
    }
}