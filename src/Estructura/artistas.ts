import {Coleccion} from "./coleccionGenerica";
import {Album} from "./album";
import {Cancion} from "./cancion";

type artistaType = {
  nombre: string,
  grupos: string[],
  generos: string[],
  albumes: Coleccion<Album>,
  canciones: Coleccion<Cancion>,
}

export class Artista {
  private artista: artistaType;
  constructor(artista: artistaType) {
    this.artista.nombre = artista.nombre;
    this.artista.grupos = artista.grupos;
    this.artista.generos = artista.generos;
    
    this.comprobarAlbumes(artista.albumes);
    this.comprobarCanciones(artista.canciones);
  }

  private comprobarCanciones(canciones: Coleccion<Cancion>): void {
    let aux = 0;
    [...canciones].forEach((cancion) => {
      if (this.artista.nombre === cancion.getAutor()) {
        cancion.getGeneros().forEach((genero) => {
          this.artista.generos.forEach((generosArtista) => {
            if (generosArtista === genero) {
              aux++;
            }
          });
        });
        if (aux === cancion.getGeneros().length) {
          this.artista.canciones.addElemento(cancion);
        }
      }
    });
  }

  private comprobarAlbumes(albumes: Coleccion<Album>): void {
    let aux = 0;
    [...albumes].forEach((album) => {
      if (this.artista.nombre === album.getAutor()) {
        album.getGeneros().forEach((genero) => {
          this.artista.generos.forEach((generosArtista) => {
            if (generosArtista === genero) {
              aux++;
            }
          });
        });
        if (aux === album.getGeneros().length) {
          this.artista.albumes.addElemento(album);
        }
      }
    });
  }

  getNombre(): string {
    return this.artista.nombre;
  }

  getGrupos(): string[] {
    return this.artista.grupos;
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

  setNombre(nombre: string): void {
    this.artista.nombre = nombre;
  }

  setGrupos(artistasGrupos: string[]): void {
    this.artista.grupos = artistasGrupos;
  }

  setGeneros(generos: string[]): void {
    this.artista.generos = generos;
  }

  setAlbunes(albumes: Coleccion<Album>): void {
    this.comprobarAlbumes(albumes);
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.comprobarCanciones(canciones);
  }
}


