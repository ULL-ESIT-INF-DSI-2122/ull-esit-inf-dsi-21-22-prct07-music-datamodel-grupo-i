
interface NombreInterfaz {
  getNombre: () => string,
}

export class Coleccion<T extends NombreInterfaz> implements Iterable<T> {
  public coleccion: T[];
  
  constructor(...coleccion: T[]) {
    this.coleccion = coleccion;
  }

  getSize(): number {
    return this.coleccion.length;
  }

  getElemento(nombre: string) {
    return [...this.coleccion.values()].find((elemento) =>
      elemento.getNombre() === nombre);
  }

  changeElemento(valor: T, posicion: number): void {
    this.coleccion[posicion] = valor;
  }

  addElemento(elemento: T) {
    this.coleccion.push(elemento);
  }

  limpiarElementos(): void {
    this.coleccion = [];
  }

  deleteElemento(elemento: T) { // Lo deja sin huecos revisar
    this.coleccion.splice(this.coleccion.indexOf(elemento), 1);
  }

  [Symbol.iterator](): Iterator<T> {
    return this.coleccion.values();
  }
}


// [...new Set(myArr)] 
