import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreUsuario: string;

    @Column()
    contrasena: string;

    @Column()
    rol: string; // 'admin' (bibliotecario) o 'alumno'
}