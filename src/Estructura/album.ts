import {Cancion} from "./cancion";
import {Coleccion} from "./coleccionGenerica";

type albumType = {
  nombre: string,
  autor: string,
  fechaPublicacion: number,
  generos: string[],
  canciones: Coleccion<Cancion>
}

export class Album {
  private album: albumType;
  constructor(album: albumType) {
    this.album.nombre = album.nombre;
    this.album.autor = album.autor;
    this.album.fechaPublicacion = album.fechaPublicacion;
    this.album.generos = album.generos;

    this.comprobarCanciones(album.canciones);
  }

  private comprobarCanciones(canciones: Coleccion<Cancion>): void {
    let aux = 0;
    [...canciones].forEach((cancion) => {
      if (!cancion.getSingle() && this.album.autor === cancion.getAutor()) {
        cancion.getGeneros().forEach((genero) => {
          this.album.generos.forEach((generosAlbum) => {
            if (generosAlbum === genero) {
              aux++;
            }
          });
        });
        if (aux === cancion.getGeneros().length) {
          this.album.canciones.addElemento(cancion);
        }
      }
    });
  }

  getNombre(): string {
    return this.album.nombre;
  }

  getAutor(): string {
    return this.album.autor;
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

  setAutor(autor: string): void {
    this.album.autor = autor;
  }

  setFechaPublicacion(fechaPublicacion: number): void {
    this.album.fechaPublicacion = fechaPublicacion;
  }

  setGeneros(generos: string[]): void {
    this.album.generos = generos;
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.comprobarCanciones(canciones);
  }
}
