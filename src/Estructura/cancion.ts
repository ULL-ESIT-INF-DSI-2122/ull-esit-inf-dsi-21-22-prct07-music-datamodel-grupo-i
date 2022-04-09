
/**
 * @type tipo de dato para las canciones
 */
type cancionType = {
  nombre: string;
  autor: string;
  duracion: duracionMinSegType;
  generos: string[];
  single: boolean;
  reproducciones: number;
}

/**
 * @type tipo de datos para las duraciones de las canciones
 */
type duracionMinSegType = {
  min: number,
  seg: number
}

/**
 * @class Cancion
 */
export class Cancion {
  /**
   * Constructor
   * @param cancion cancion a almacenar
   */
  constructor(public cancion: cancionType) {}

  /**
   * getter nombre de la canción
   * @returns nombre de la canción
   */
  getNombre(): string {
    return this.cancion.nombre;
  }

  /**
   * getter nombre del autor
   * @returns nombre del autor
   */
  getAutor(): string {
    return this.cancion.autor;
  }

  /**
   * getter duracion cancion
   * @returns duracion de la cancion
   */
  getDuracion(): duracionMinSegType {
    return this.cancion.duracion;
  }

  /**
   * getters de los generos de la cancion
   * @returns generos de la cancion
   */
  getGeneros(): string[] {
    return this.cancion.generos;
  }

  /**
   * getter single
   * @returns true si la canción es single
   */
  getSingle(): boolean {
    return this.cancion.single;
  }

  /**
   * getter reproducciones
   * @returns cantidad de reproducciones
   */
  getReproducciones(): number {
    return this.cancion.reproducciones;
  }

  /**
   * setter nombre cancion
   * @param nombre nuevo nombre de la cancion
   */
  setNombre(nombre: string): void {
    this.cancion.nombre = nombre;
  }

  /**
   * setter nombre autor
   * @param autor nuevo nombre del autor
   */
  setAutor(autor: string): void {
    this.cancion.autor = autor;
  }

  /**
   * setter duracion cancion
   * @param duracion nueva duración de la canción
   */
  setDuracion(duracion: duracionMinSegType): void {
    this.cancion.duracion = duracion;
  }

  /**
   * setter generos cancion
   * @param generos nuevos generos de la cancion
   */
  setGeneros(generos: string[]): void {
    this.cancion.generos = generos;
  }

  /**
   * setter single
   * @param single si el metodo es un single
   */
  setSingle(single: boolean): void {
    this.cancion.single = single;
  }

  /**
   * setter reproducciones
   * @param reproducciones nueva cantidad de reporducciones
   */
  setReproducciones(reproducciones: number): void {
    this.cancion.reproducciones = reproducciones;
  }

  /**
   * metodo que devuelve el tiempo en segundos
   * @returns tiempo en segundos de la cancion
   */
  devolverTiempoTotal(): string {
    let minutos: number = this.getDuracion().min;
    const segundos: number = this.getDuracion().seg;
    minutos = minutos * 60;
    return String(minutos + segundos);
  }
}

/**
 * @class ColeccionCanciones
 */
export class PrintCancion {
  /**
   * Constructor
   * @param cancion cancion a imprimir
   */
  constructor(private cancion: Cancion) {}

  /**
   * imprime la cancion
   */
  print(): void {
    console.log(`Nombre: ${this.cancion.getNombre()}`);
    console.log(`Autor: ${this.cancion.getAutor()}`);
    console.log(`Duracion: ${this.cancion.getDuracion().min}:${this.cancion.getDuracion().seg}`);
    console.log(`Generos: ${this.cancion.getGeneros().join(', ')}`);
    console.log(`Single: ${this.cancion.getSingle()}`);
    console.log(`Reproducciones: ${this.cancion.getReproducciones()}`);
    console.log("////////////////////\n\n");
  }
}
