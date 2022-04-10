import {Coleccion} from "./coleccionGenerica";
import {Cancion} from "./cancion";
import {Album} from "./album";

/**
 * @type generoMusicalType, tipo de dato que representa un genero musical
 */
type generoMusicalType = {
  nombre: string,
  artistasGrupos: string[],
  albumes: Coleccion<Album>,
  canciones: Coleccion<Cancion>
}

/**
 * @class GeneroMusical
*/
export class GenerosMusicales {
  /**
   * @param genero, genero que almacena la información.
   */
  public genero: generoMusicalType = {nombre: "", artistasGrupos: [], 
    albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>()};
  /**
   * Constructor de la clase GeneroMusical
   * @param genero, genero que almacena.
   * @param memoria false si la información se va a sacar de la base de datos.
  */
  constructor(genero: generoMusicalType, memoria: boolean = true) {
    this.genero.nombre = genero.nombre;
    this.genero.artistasGrupos = genero.artistasGrupos;

    
    if (memoria) {
      this.comprobarAlbumes(genero.albumes);
      this.comprobarCanciones(genero.canciones);
    } else {
      this.genero.artistasGrupos = genero.artistasGrupos;
      this.genero.albumes = genero.albumes;
      this.genero.canciones = genero.canciones;
    }
  }

  /**
   * Método que comprueba que los albumes cumplan con los requisitos.
   * @param albumes Coleccion de albumes a revisar.
   */
  private comprobarAlbumes(albumes: Coleccion<Album>): void {
    [...albumes].forEach((album) => {
      album.getGeneros().forEach((genero) => {
        if (genero === this.genero.nombre) {
          this.genero.albumes.addElemento(album);
        }
      });
    });
  }

  /**
   * Método que comprueba que las canciones cumplan los requisitos.
   * @param canciones Coleccion de canciones a comprobar
   */
  private comprobarCanciones(canciones: Coleccion<Cancion>): void {
    [...canciones].forEach((cancion) => {
      cancion.getGeneros().forEach((genero) => {
        if (genero === this.genero.nombre) {
          this.genero.canciones.addElemento(cancion);
        }
      });
    });
  }

  /**
   * getter del nombre del genero.
   * @returns nombre del genero
   */
  getNombre(): string {
    return this.genero.nombre;
  }

  /**
   * getter del artista o grupo.
   * @returns Coleccion de artistas o grupos.
   */
  getArtistaGrupos(): string[] {
    return this.genero.artistasGrupos;
  }

  /**
   * getter del los albumes.
   * @returns Coleccion de albumes.
   */
  getAlbumes(): Coleccion<Album> {
    return this.genero.albumes;
  }

  /**
   * getter de las canciones.
   * @returns Coleccion de canciones.
   */
  getCanciones(): Coleccion<Cancion> {
    return this.genero.canciones;
  }

  /**
   * setter del nombre del genero.
   * @param nombre nueva nombre del genero.
   */
  setNombre(nombre: string): void {
    this.genero.nombre = nombre;
  }

  /**
   * setter de los artistas o grupos.
   * @param artistasGrupos nueva coleccion de artistas o grupos.
   */
  setArtistasGrupos(artistasGrupos: string[]): void {
    this.genero.artistasGrupos = artistasGrupos;
  }

  /**
   * setter de los albumes.
   * @param albumes nueva coleccion de albumes.
   */
  setAlbumes(albumes: Coleccion<Album>): void {
    this.genero.albumes = albumes;
  }

  /**
   * setter de las canciones.
   * @param canciones nueva coleccion de canciones.
   */
  setCanciones(canciones: Coleccion<Cancion>): void {
    this.genero.canciones = canciones;
  }

  /**
   * método que añade una canción al genero.
   * @param canciones nueva canción
   */
  addCancion(canciones: Cancion): void {
    this.genero.canciones.addElemento(canciones);
  }

  /**
   * método que añade un nuevo album al genero.
   * @param album nuevo album
   */
  addAlbum(album: Album): void {
    this.genero.albumes.addElemento(album);
  }

  /**
   * método que añade un nuevo artista o grupo al genero.
   * @param nombre nuevo artista o grupo
   */
  addArtistaGrupo(nombre: string): void {
    this.genero.artistasGrupos.push(nombre);
  }
}

/**
 * @class PrintGeneroMusical
 */
export class PrintGenerosMusicales {
  /**
   * Constructor de la clase PrintArtista.
   * @param genero genero musical a imprimir.
  */
  constructor(private genero: GenerosMusicales) {}

  /**
   * método que imprime informacion del genero.
   * @returns string con la informacion del genero
  */
  print(): string {
    const salida = `Nombre: ${this.genero.getNombre()}` +
    `\nArtistas: ${[...this.genero.getArtistaGrupos()].join(', ')}` +
    `\nAlbunes: ${[...this.genero.getAlbumes()].join(', ')}` +
    `\nCanciones: ${[...this.genero.getCanciones()].join(', ')}` +
    `\n////////////////////\n\n`;
    console.log(salida);
    return salida;
  }
}
