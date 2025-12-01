export class EditarUsuarioCommand {
    constructor(
        public readonly id: number,
        public readonly nombreUsuario: string,
        public readonly rol: string,
        public readonly contrasena?: string,
    ) { }
}