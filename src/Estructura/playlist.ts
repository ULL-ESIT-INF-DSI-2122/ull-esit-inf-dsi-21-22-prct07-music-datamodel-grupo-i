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
  constructor(private playlist: playlistType) {
    this.playlist.duracion.hor = 0;
    this.playlist.duracion.min = 0;
    this.incluirGeneros(playlist.canciones);
    this.calcularDuracion(playlist.canciones);
  }

  private incluirGeneros(canciones: Coleccion<Cancion>): void {
    [...canciones].forEach((cancion) => {
      cancion.getGeneros().forEach((genero) => {
        if (!this.playlist.generos.includes(genero)) {
          this.playlist.generos.push(genero);
        }
      });
    });
  }

  private calcularDuracion(canciones: Coleccion<Cancion>): void {
    let min = 0;
    let seg = 0;
    [...canciones].forEach((cancion) => {
      min += cancion.getDuracion().min;
      seg += cancion.getDuracion().seg;
    });

    min += seg / 60 >> 0;
    this.playlist.duracion.hor += min / 60 >> 0;
    this.playlist.duracion.min += min % 60;

    if (this.playlist.duracion.min > 59) {
      this.playlist.duracion.hor += this.playlist.duracion.min / 60 >> 0;
      this.playlist.duracion.min %= 60;
    }
  }

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


export class PrintPlayList {
  constructor(private playlist: PlayList) {}

  print(): void {
    console.log(`Nombre: ${this.playlist.getNombre()}`);
    console.log(`Canciones: ${[...this.playlist.getCanciones()].join(', ')}`);
    console.log(`Duración: ${this.playlist.getDuracion().hor}h ${this.playlist.getDuracion().min}min`);
    console.log(`Generos: ${this.playlist.getGeneros().join(', ')}`);
  }
}
