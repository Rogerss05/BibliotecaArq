export class CrearUsuarioCommand {
    constructor(
        public readonly nombreUsuario: string,
        public readonly contrasena: string,
        public readonly rol: string,
    ) { }
}