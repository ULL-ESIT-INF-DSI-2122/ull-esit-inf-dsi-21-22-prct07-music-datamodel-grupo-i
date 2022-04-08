import {Cancion} from "./cancion";
import {Coleccion} from "./coleccionGenerica";

type playlistType = {
  nombre: string,
  canciones: Coleccion<Cancion>,
  duracion: duracionHorMinType,
  generos: string[],
  creador: string
}

type duracionHorMinType = {
  hor: number,
  min: number
}

export class PlayList {
  public playlist: playlistType = {nombre: "", canciones: new Coleccion(), duracion: {hor: 0, min: 0}, generos: [], creador: ""};
  constructor(playlist: playlistType, memoria: boolean = true ) {
    this.playlist.nombre = playlist.nombre;
    this.playlist.creador = playlist.creador;
    this.playlist.duracion = playlist.duracion;
    this.playlist.generos = playlist.generos;

    if (memoria) {
      this.incluirGeneros(playlist.canciones);
      this.calcularDuracion(playlist.canciones);
      this.playlist.canciones = playlist.canciones;
    }
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

  calcularReproduccionesTotales(): number {
    let total = 0;
    [...this.playlist.canciones].forEach((cancion) => {
      total += cancion.getReproducciones();
    });
    return total;
  }
}


export class PrintPlayList {
  constructor(private playlist: PlayList) {}

  print(): void {
    let result = "";
    [...this.playlist.getCanciones()].forEach((cancion) => {
      result += cancion.getNombre() + "," + " ";
    });
    console.log(`Nombre: ${this.playlist.getNombre()}`);
    console.log(`Canciones: ${result}`);
    console.log(`Duración: ${this.playlist.getDuracion().hor}h ${this.playlist.getDuracion().min}min`);
    console.log(`Generos: ${this.playlist.getGeneros().join(', ')}`);
  }
}
