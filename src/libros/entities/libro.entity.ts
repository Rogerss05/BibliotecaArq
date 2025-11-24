import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Libro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    genero: string;

    @Column({ type: 'text' }) // 'text' porque la imagen en base64 puede ser larga
    portada: string;

    @Column({ type: 'text' }) // 'text' porque el PDF en base64 es muy largo
    pdf: string;
}