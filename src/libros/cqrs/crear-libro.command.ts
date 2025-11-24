export class CrearLibroCommand {
    constructor(
        public readonly titulo: string,
        public readonly genero: string,
        public readonly portada: string, // Vendrá en Base64
        public readonly pdf: string,     // Vendrá en Base64
    ) { }
}