import {Artista} from "./artistas";
import {Album} from "./album";
import {Coleccion} from "./coleccionGenerica";
import {Cancion} from "./cancion";

export type grupoType = {
  nombre: string,
  artistas: Coleccion<Artista>,
  fechaCreacion: number,
  generos: string[],
  albumes: Coleccion<Album>,
  canciones: Coleccion<Cancion>
}

export class Grupo {
  private grupo: grupoType;
  constructor(grupo: grupoType) {
    this.grupo.nombre = grupo.nombre;
    this.grupo.fechaCreacion = grupo.fechaCreacion;
    this.grupo.generos = grupo.generos;

    this.comprobarAlbumes(grupo.albumes);
    this.comprobarArtistas(grupo.artistas);
    this.comprobarCanciones(grupo.canciones);
  }

  private comprobarCanciones(canciones: Coleccion<Cancion>): void {
    let aux = 0;
    [...canciones].forEach((cancion) => {
      if (this.grupo.nombre === cancion.getAutor()) {
        cancion.getGeneros().forEach((genero) => {
          this.grupo.generos.forEach((generosCanciones) => {
            if (generosCanciones === genero) {
              aux++;
            }
          });
        });
        if (aux === cancion.getGeneros().length) {
          this.grupo.canciones.addElemento(cancion);
        }
      }
    });
  }

  private comprobarAlbumes(albumes: Coleccion<Album>): void {
    let aux = 0;
    [...albumes].forEach((album) => {
      if (this.grupo.nombre === album.getAutor()) {
        album.getGeneros().forEach((genero) => {
          this.grupo.generos.forEach((generosAlbum) => {
            if (generosAlbum === genero) {
              aux++;
            }
          });
        });
        if (aux === album.getGeneros().length) {
          this.grupo.albumes.addElemento(album);
        }
      }
    });
  }

  private comprobarArtistas(artistas: Coleccion<Artista>): void {
    [...artistas].forEach((artista) => {
      artista.getGrupos().forEach((grupo) => {
        if (grupo === this.grupo.nombre) {
          this.grupo.artistas.addElemento(artista);
        }
      });
    });
  }

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

  getCanciones(): Coleccion<Cancion> {
    return this.grupo.canciones;
  }

  setNombre(nombre: string): void {
    this.grupo.nombre = nombre;
  }

  setArtistas(artistas: Coleccion<Artista>): void {
    this.comprobarArtistas(artistas);
  }

  setFechaCreacion(fechaCreacion: number): void {
    this.grupo.fechaCreacion = fechaCreacion;
  }

  setGeneros(generos: string[]): void {
    this.grupo.generos = generos;
  }

  setAlbumes(albumes: Coleccion<Album>): void {
    this.comprobarAlbumes(albumes);
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.comprobarCanciones(canciones);
  }
}
