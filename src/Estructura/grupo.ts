import {Artista} from "./artistas";
import {Album} from "./album";
import {Coleccion} from "./coleccionGenerica";

export type grupoType = {
  nombre: string,
  artistas: Coleccion<Artista>,
  fechaCreacion: number,
  generos: string[],
  albumes: Coleccion<Album>,
  oyentesMensuales: number
}

export class Grupo {
  constructor(private grupo: grupoType) {}

  getNombre(): string {
    return this.grupo.nombre;
  }

  getArtista(): Coleccion<Artista> {
    return this.grupo.artistas;
  }

  getFechaCreacion(): number {
    return this.grupo.fechaCreacion;
  }

  getGeneros(): string[] {
    return this.grupo.generos;
  }

  getAlbumes(): Coleccion<Album> {
    return this.grupo.albumes;
  }

  getOyentesMensuales(): number {
    return this.grupo.oyentesMensuales;
  }

  setNombre(nombre: string): void {
    this.grupo.nombre = nombre;
  }

  setArtistas(artistas: Coleccion<Artista>): void {
    this.grupo.artistas = artistas;
  }

  setFechaCreacion(fechaCreacion: number): void {
    this.grupo.fechaCreacion = fechaCreacion;
  }

  setGeneros(generos: string[]): void {
    this.grupo.generos = generos;
  }

  setAlbumes(albumes: Coleccion<Album>): void {
    this.grupo.albumes = albumes;
  }

  setOyentesMensuales(oyentesMensuales: number): void {
    this.grupo.oyentesMensuales = oyentesMensuales;
  }
}
