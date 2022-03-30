import {Coleccion} from "./coleccionGenerica";
import {Album} from "./album";
import {Cancion} from "./cancion";

type artistaType = {
  nombre: string,
  artistasGrupos: string[],
  generos: string[],
  albumes: Coleccion<Album>,
  canciones: Coleccion<Cancion>,
  oyentesMensuales: number
}

export class Artista {
  constructor(private artista: artistaType) {}

  getNombre(): string {
    return this.artista.nombre;
  }

  getArtistaGrupos(): string[] {
    return this.artista.artistasGrupos;
  }

  getGeneros(): string[] {
    return this.artista.generos;
  }

  getAlbunes(): Coleccion<Album> {
    return this.artista.albumes;
  }

  getCanciones(): Coleccion<Cancion> {
    return this.artista.canciones;
  }

  getOyentesMensuales(): number {
    return this.artista.oyentesMensuales;
  }

  setNombre(nombre: string): void {
    this.artista.nombre = nombre;
  }

  setArtistasGrupos(artistasGrupos: string[]): void {
    this.artista.artistasGrupos = artistasGrupos;
  }

  setGeneros(generos: string[]): void {
    this.artista.generos = generos;
  }

  setAlbunes(albunes: Coleccion<Album>): void {
    this.artista.albumes = albunes;
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.artista.canciones = canciones;
  }

  setOyentesMensuales(oyentes: number): void {
    this.artista.oyentesMensuales = oyentes;
  }
}
