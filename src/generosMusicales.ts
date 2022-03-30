import {Coleccion} from "./coleccionGenerica";
import {Cancion} from "./cancion";
import {Album} from "./album";
import {Artista} from "./artistas";
import {Grupo} from "./grupo";

export type generoMusicalType = {
  nombre: string,
  artistasGrupos: Coleccion<Artista> | Coleccion<Grupo>,
  albumes: Coleccion<Album>,
  canciones: Coleccion<Cancion>
}

export class GenerosMusicales {
  constructor(private genero: generoMusicalType) {}

  getNombre(): string {
    return this.genero.nombre;
  }

  getArtistaGrupos(): Coleccion<Artista> | Coleccion<Grupo> {
    return this.genero.artistasGrupos;
  }

  getAlbumes(): Coleccion<Album> {
    return this.genero.albumes;
  }

  getCanciones(): Coleccion<Cancion> {
    return this.genero.canciones;
  }

  setNombre(nombre: string): void {
    this.genero.nombre = nombre;
  }

  setArtistasGrupos(artistasGrupos: Coleccion<Artista> | Coleccion<Grupo>): void {
    this.genero.artistasGrupos = artistasGrupos;
  }

  setAlbumes(albumes: Coleccion<Album>): void {
    this.genero.albumes = albumes;
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.genero.canciones = canciones;
  }
}
