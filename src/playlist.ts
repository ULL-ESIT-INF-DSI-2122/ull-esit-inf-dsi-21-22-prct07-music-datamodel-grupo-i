import {Cancion} from "./cancion";
import {Coleccion} from "./coleccionGenerica";

type playlistType = {
  nombre: string,
  canciones: Coleccion<Cancion>,
  duracion: number,
  generos: string[],
}

export class Playlist {
  constructor(private playlist: playlistType) { }

  getNombre(): string {
    return this.playlist.nombre;
  }

  getCanciones(): Coleccion<Cancion> {
    return this.playlist.canciones;
  }

  getDuracion(): number {
    return this.playlist.duracion;
  }

  getGeneros(): string[] {
    return this.playlist.generos;
  }

  setNombre(nombre: string): void {
    this.playlist.nombre = nombre;
  }

  setGeneros(generos: string[]): void {
    this.playlist.generos = generos;
  }

  setDuracion(duracion: number): void {
    this.playlist.duracion = duracion;
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.playlist.canciones = canciones;
  }
}
