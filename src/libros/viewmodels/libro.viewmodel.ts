export class LibroViewModel {
    titulo: string;
    genero: string;
    universidad: string; // Ejemplo: 'Mi Universidad' o 'UNAM'
    portada: string;     // Imagen en base64
    esExterno: boolean;  // Para saber si descargarlo directo o pedirlo a la API
    pdf?: string;        // Opcional, solo si ya lo descargamos
}