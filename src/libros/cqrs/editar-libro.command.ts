export class EditarLibroCommand {
    constructor(
        public readonly id: number,
        public readonly titulo: string,
        public readonly genero: string,
        public readonly portada: string,
        public readonly pdf: string,
    ) { }
}