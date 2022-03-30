import {Cancion} from "./cancion";
import {Coleccion} from "./coleccionGenerica";

type playlistType = {
  nombre: string,
  canciones: Coleccion<Cancion>,
  duracion: duracionHorMinType,
  generos: string[],
}

type duracionHorMinType = {
  hor: number,
  min: number
}

export class PlayList {
  constructor(private playlist: playlistType) { }

  getNombre(): string {
    return this.playlist.nombre;
  }

  getCanciones(): Coleccion<Cancion> {
    return this.playlist.canciones;
  }

  getDuracion(): duracionHorMinType {
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

  setDuracion(duracion: duracionHorMinType): void {
    this.playlist.duracion = duracion;
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.playlist.canciones = canciones;
  }
}
