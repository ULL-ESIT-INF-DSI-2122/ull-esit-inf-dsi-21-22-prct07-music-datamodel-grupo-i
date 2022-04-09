import {Artista} from "./artistas";
import {Album} from "./album";
import {Coleccion} from "./coleccionGenerica";
import {Cancion} from "./cancion";

/**
 * @type generoType, tipo de dato que representa un genero musical
 */
export type grupoType = {
  nombre: string,
  artistas: Coleccion<Artista>,
  fechaCreacion: number,
  generos: string[],
  albumes: Coleccion<Album>,
  canciones: Coleccion<Cancion>,
  oyentes: number,
}

/**
 * @class Grupo
 */
export class Grupo {
  /**
   * @param grupo grupotype
   */
  public grupo: grupoType = {nombre: "", artistas: new Coleccion<Artista>(), fechaCreacion: 0, generos: [], 
    albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>(), oyentes: 0};
  /**
   * Constructor de la clase Grupo
   * @param grupo grupo a almacenar
   * @param memoria false si se saca de la base de datos.
   */
  constructor(grupo: grupoType, memoria:boolean = true) {
    this.grupo.nombre = grupo.nombre;
    this.grupo.fechaCreacion = grupo.fechaCreacion;
    this.grupo.generos = grupo.generos;

    if (memoria) {
      this.comprobarAlbumes(grupo.albumes);
      this.comprobarArtistas(grupo.artistas);
      this.comprobarCanciones(grupo.canciones);
    }
  }

  /**
   * Metodo que verifica si un grupo de canciones se pueden añadir a un grupo
   * @param canciones canciones a revisar
   */
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

  /**
   * Metodo que verifica si un grupo de albumes se pueden añadir a un grupo
   * @param albumes Coleccion de albumes a comprobar
   */
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

  /**
   * Metodo que verifica si un grupo de artistas se pueden añadir a un grupo
   * @param artistas Coleccion de artistas a comprobar
   */
  private comprobarArtistas(artistas: Coleccion<Artista>): void {
    [...artistas].forEach((artista) => {
      artista.getGrupos().forEach((grupo) => {
        if (grupo === this.grupo.nombre) {
          this.grupo.artistas.addElemento(artista);
        }
      });
    });
  }

  /**
   * getter nombre grupo
   * @returns nombre del grupo
   */
  getNombre(): string {
    return this.grupo.nombre;
  }

  /**
   * getter artistas del grupo
   * @returns artistas del grupo
   */
  getArtista(): Coleccion<Artista> {
    return this.grupo.artistas;
  }

  /**
   * getter fecha creacion grupo
   * @returns fecha creacion grupo
   */
  getFechaCreacion(): number {
    return this.grupo.fechaCreacion;
  }

  /**
   * getter generos del grupo
   * @returns generos del grupo
   */
  getGeneros(): string[] {
    return this.grupo.generos;
  }

  /**
   * getter albumes del grupo
   * @returns albumes del grupo
   */
  getAlbumes(): Coleccion<Album> {
    return this.grupo.albumes;
  }

  /**
   * getter canciones del grupo
   * @returns canciones del grupo
   */
  getCanciones(): Coleccion<Cancion> {
    return this.grupo.canciones;
  }

  /**
   * getter oyentes cantidad.
   * @returns cantidad de oyentes
   */
  getOyentes(): number {
    return this.grupo.oyentes;
  }

  /**
   * setter nombre
   * @param nombre nuevo nombre
   */
  setNombre(nombre: string): void {
    this.grupo.nombre = nombre;
  }

  /**
   * setter artistas
   * @param artistas nuevos artistas
   */
  setArtistas(artistas: Coleccion<Artista>): void {
    this.comprobarArtistas(artistas);
  }

  /**
   * setter fecha creacion
   * @param fechaCreacion nueva fecha de creacion
   */
  setFechaCreacion(fechaCreacion: number): void {
    this.grupo.fechaCreacion = fechaCreacion;
  }

  /**
   * setter generos
   * @param generos nuevos generos
   */
  setGeneros(generos: string[]): void {
    this.grupo.generos = generos;
  }

  /**
   * setter albumes
   * @param albumes nuevos albumes
   */
  setAlbumes(albumes: Coleccion<Album>): void {
    this.comprobarAlbumes(albumes);
  }

  /**
   * setter canciones
   * @param canciones nuevas canciones
   */
  setCanciones(canciones: Coleccion<Cancion>): void {
    this.comprobarCanciones(canciones);
  }

  /**
   * setter oyentes
   * @param oyentes nuevos oyentes
   */
  setOyentes(oyentes: number): void {
    this.grupo.oyentes = oyentes;
  }

  /**
   * metodo que añade una cancion
   * @param canciones canciones a añadir
   */
  addCancion(canciones: Cancion): void {
    this.grupo.canciones.addElemento(canciones);
  }

  /**
   * metodo que añade un album
   * @param album numero de album
   */
  addAlbum(album: Album): void {
    this.grupo.albumes.addElemento(album);
  }

  /**
   * metodo que añade un nuevo artista
   * @param artista artista a añadir
   */
  addArtista(artista: Artista): void {
    this.grupo.artistas.addElemento(artista);
  }
}

/**
 * @class PrintGrupo
 */
export class PrintGrupo {
  /**
   * Constructor
   * @param grupo grupo a imprimir
   */
  constructor(private grupo: Grupo) {}

  /**
   * Metodo que imprime un grupo.
   */
  print(): void {
    console.log(`Nombre: ${this.grupo.getNombre()}`);
    console.log(`Artistas: ${[...this.grupo.getArtista()].join(', ')}`);
    console.log(`Fecha de Creación: ${this.grupo.getFechaCreacion()}`);
    console.log(`Generos: ${[...this.grupo.getGeneros()].join(', ')}`);
    console.log(`Albumes: ${[...this.grupo.getAlbumes()].join(', ')}`);
    console.log(`Canciones: ${[...this.grupo.getCanciones()].join(', ')}`);
    console.log(`Oyentes: ${this.grupo.getOyentes()}`);
  }
}
