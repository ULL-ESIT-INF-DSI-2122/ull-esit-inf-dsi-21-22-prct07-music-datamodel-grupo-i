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
  canciones: Coleccion<Cancion>,
  oyentesMensuales: number
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
    [...canciones].forEach((cancion) => {
      if (this.grupo.nombre === cancion.getAutor()) {
        if (this.grupo.generos.sort().length === cancion.getGeneros().sort().length &&
          this.grupo.generos.every((valor, index) => {
            return valor === cancion.getGeneros()[index];
          })) {
          this.grupo.canciones.addElemento(cancion);
        }
      }
    });
  }

  private comprobarAlbumes(albumes: Coleccion<Album>): void {
    [...albumes].forEach((album) => {
      if (this.grupo.nombre === album.getAutor()) {
        if (this.grupo.generos.sort().length === album.getGeneros().sort().length &&
          this.grupo.generos.every((valor, index) => {
            return valor === album.getGeneros()[index];
          })) {
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

  getOyentesMensuales(): number {
    return this.grupo.oyentesMensuales;
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

  setOyentesMensuales(oyentesMensuales: number): void {
    this.grupo.oyentesMensuales = oyentesMensuales;
  }
}
