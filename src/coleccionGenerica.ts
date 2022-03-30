
interface NombreInterfaz {
  getNombre: () => string,
}

export class Coleccion<T extends NombreInterfaz> implements Iterable<T> {
  private coleccion: Set<T>;
  
  constructor(...coleccion: T[]) {
    this.coleccion = new Set(coleccion);
  } 

  getSize(): number {
    return this.coleccion.size;
  }

  getElemento(nombre: string) {
    return [...this.coleccion.values()].find((elemento) =>
      elemento.getNombre() === nombre);
  }

  addElemento(elemento: T) {
    this.coleccion.add(elemento);
  }

  [Symbol.iterator](): Iterator<T> {
    return this.coleccion.values();
  }
}

// [...new Set(myArr)] 
