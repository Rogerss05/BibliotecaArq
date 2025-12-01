import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LibroViewModel } from '../viewmodels/libro.viewmodel';

@Injectable()
export class UnamApiService {
    constructor(private readonly httpService: HttpService) { }

    async buscarEnUnam(termino: string): Promise<LibroViewModel[]> {
        const urlPublica = `http://localhost:3000/libro?q=${termino}`;

        try {
            console.log(` Conectando a internet: ${urlPublica}...`);

            // Hacemos la petición (GET)
            const respuesta = await firstValueFrom(this.httpService.get(urlPublica));

            // evuelve los libros dentro de una propiedad llamada 'docs'
            const librosReales = respuesta.data;

            if (!Array.isArray(librosReales)) {
                return [];
            }

            // MAPEO: Convertimos los datos de OpenLibrary a TU formato (ViewModel)
            return librosReales.map((libroExterno: any) => ({
                titulo: libroExterno.titulo,
                genero: libroExterno.genero ? libroExterno.genero[0] : 'General',
                universidad: libroExterno.universidad || 'Universidad Tecnológica de Zavala',
                portada: libroExterno.portada,
                esExterno: true,
                pdf: libroExterno.archivo_pdf
            }));

        } catch (error) {
            console.error(' Error conectando con la API pública:', error.message);
            return [];
        }
    }
}