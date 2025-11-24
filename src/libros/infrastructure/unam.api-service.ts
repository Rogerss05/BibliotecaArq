import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LibroViewModel } from '../viewmodels/libro.viewmodel';

@Injectable()
export class UnamApiService {
    constructor(private readonly httpService: HttpService) { }

    async buscarEnUnam(termino: string): Promise<LibroViewModel[]> {
        const urlPublica = `https://openlibrary.org/search.json?q=${termino}&limit=3`;

        try {
            console.log(` Conectando a internet: ${urlPublica}...`);

            // Hacemos la petición real (GET)
            const respuesta = await firstValueFrom(this.httpService.get(urlPublica));

            // OpenLibrary devuelve los libros dentro de una propiedad llamada 'docs'
            const librosReales = respuesta.data.docs;

            // MAPEO: Convertimos los datos de OpenLibrary a TU formato (ViewModel)
            return librosReales.map((libroExterno: any) => ({
                titulo: libroExterno.title,
                // Si tiene temas, tomamos el primero, si no, ponemos 'General'
                genero: libroExterno.subject ? libroExterno.subject[0] : 'General',
                universidad: 'Open Library (Simulación)',
                portada: 'imagen_simulada_base64', // En una API real aquí vendría el string base64
                esExterno: true,
                pdf: 'pdf_simulado_base64'         // En una API real aquí vendría el string base64
            }));

        } catch (error) {
            console.error(' Error conectando con la API pública:', error.message);
            return [];
        }
    }
}