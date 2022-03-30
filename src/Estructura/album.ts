import {Cancion} from "./cancion";
import {Coleccion} from "./coleccionGenerica";

type albumType = {
  nombre: string,
  artistasGrupos: string[],
  fechaPublicacion: number,
  generos: string[],
  canciones: Coleccion<Cancion>
}

export class Album {
  constructor(private album: albumType) {}

  getNombre(): string {
    return this.album.nombre;
  }

  getArtistaGrupos(): string[] {
    return this.album.artistasGrupos;
  }

  getFechaPublicacion(): number {
    return this.album.fechaPublicacion;
  }

  getGeneros(): string[] {
    return this.album.generos;
  }

  getCanciones(): Coleccion<Cancion> {
    return this.album.canciones;
  }

  setNombre(nombre: string): void {
    this.album.nombre = nombre;
  }

  setArtistasGrupos(artistasGrupos: string[]): void {
    this.album.artistasGrupos = artistasGrupos;
  }

  setFechaPublicacion(fechaPublicacion: number): void {
    this.album.fechaPublicacion = fechaPublicacion;
  }

  setGeneros(generos: string[]): void {
    this.album.generos = generos;
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.album.canciones = canciones;
  }
}
