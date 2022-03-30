
type cancionType = {
  nombre: string;
  autor: string;
  duracion: string;
  generos: string[];
  single: boolean;
  reproducciones: number;
}

export class Cancion {
  constructor(private cancion: cancionType) {}

  getNombre(): string {
    return this.cancion.nombre;
  }

  getAutor(): string {
    return this.cancion.autor;
  }

  getDuracion(): string {
    return this.cancion.duracion;
  }

  getGeneros(): string[] {
    return this.cancion.generos;
  }

  getSingle(): boolean {
    return this.cancion.single;
  }

  getReproducciones(): number {
    return this.cancion.reproducciones;
  }

  setNombre(nombre: string): void {
    this.cancion.nombre = nombre;
  }

  setAutor(autor: string): void {
    this.cancion.autor = autor;
  }

  setDuracion(duracion: string): void {
    this.cancion.duracion = duracion;
  }

  setGeneros(generos: string[]): void {
    this.cancion.generos = generos;
  }

  setSingle(single: boolean): void {
    this.cancion.single = single;
  }

  setReproducciones(reproducciones: number): void {
    this.cancion.reproducciones = reproducciones;
  }
}
