import {Coleccion} from "./coleccionGenerica";
import {Album} from "./album";
import {Cancion} from "./cancion";

type artistaType = {
  nombre: string,
  grupos: string[],
  generos: string[],
  albumes: Coleccion<Album>,
  canciones: Coleccion<Cancion>,
  oyentes: number,
}

export class Artista {
  public artista: artistaType = {nombre: "", grupos: [], generos: [], albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>(),
    oyentes: 0}; 
  constructor(artista: artistaType, memoria: boolean = true) {
    this.artista.nombre = artista.nombre;
    this.artista.grupos = artista.grupos;
    this.artista.generos = artista.generos;
    this.artista.oyentes = artista.oyentes;
    
    if (memoria) {
      this.comprobarAlbumes(artista.albumes);
      this.comprobarCanciones(artista.canciones);
    }
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

  getAlbumes(): Coleccion<Album> {
    return this.artista.albumes;
  }

  getCanciones(): Coleccion<Cancion> {
    return this.artista.canciones;
  }

  getOyentes(): number {
    return this.artista.oyentes;
  }

  setOyentes(oyentes: number): void {
    this.artista.oyentes = oyentes;
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

  setAlbumes(albumes: Coleccion<Album>): void {
    this.comprobarAlbumes(albumes);
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.comprobarCanciones(canciones);
  }

  addCancion(canciones: Cancion): void {
    this.artista.canciones.addElemento(canciones);
  }

  addAlbum(album: Album): void {
    this.artista.albumes.addElemento(album);
  }
}


export class PrintArtista {
  constructor(private artista: Artista) {}

  print(): void {
    console.log(`Nombre: ${this.artista.getNombre()}`);
    console.log(`Grupo: ${this.artista.getGrupos().join(", ")}`);
    console.log(`Generos: ${this.artista.getGeneros().join(', ')}`);
    console.log(`Albumes: ${[...this.artista.getAlbumes()].join(', ')}`);
    console.log(`Canciones: ${[...this.artista.getCanciones()].join(', ')}`);
    console.log(`Oyentes: ${this.artista.getOyentes()}`);
  }
}
