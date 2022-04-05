import {Coleccion} from "./coleccionGenerica";
import {Cancion} from "./cancion";
import {Album} from "./album";
import {Artista} from "./artistas";
import {Grupo} from "./grupo";

type generoMusicalType = {
  nombre: string,
  artistasGrupos: Coleccion<Artista | Grupo>,
  albumes: Coleccion<Album>,
  canciones: Coleccion<Cancion>
}

export class GenerosMusicales {
  public genero: generoMusicalType = {nombre: "", artistasGrupos: new Coleccion<Artista | Grupo>(), 
    albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>()};
  constructor(genero: generoMusicalType, memoria: boolean = true) {
    this.genero.nombre = genero.nombre;

    
    if (memoria) {
      this.comprobarAlbumes(genero.albumes);
      this.comprobarCanciones(genero.canciones);
      this.comprobarArtistasGrupos(genero.artistasGrupos);
    } else {
      this.genero.artistasGrupos = genero.artistasGrupos;
      this.genero.albumes = genero.albumes;
      this.genero.canciones = genero.canciones;
    }
  }

  private comprobarArtistasGrupos(artistasGrupos: Coleccion<Artista | Grupo>): void {
    [...artistasGrupos].forEach((creador) => {
      creador.getGeneros().forEach((genero) => {
        if (genero === this.genero.nombre) {
          this.genero.artistasGrupos.addElemento(creador);
        }
      });
    });
  }

  private comprobarAlbumes(albumes: Coleccion<Album>): void {
    [...albumes].forEach((album) => {
      album.getGeneros().forEach((genero) => {
        if (genero === this.genero.nombre) {
          this.genero.albumes.addElemento(album);
        }
      });
    });
  }

  private comprobarCanciones(canciones: Coleccion<Cancion>): void {
    [...canciones].forEach((cancion) => {
      cancion.getGeneros().forEach((genero) => {
        if (genero === this.genero.nombre) {
          this.genero.canciones.addElemento(cancion);
        }
      });
    });
  }

  getNombre(): string {
    return this.genero.nombre;
  }

  getArtistaGrupos(): Coleccion<Artista | Grupo> {
    return this.genero.artistasGrupos;
  }

  getAlbumes(): Coleccion<Album> {
    return this.genero.albumes;
  }

  getCanciones(): Coleccion<Cancion> {
    return this.genero.canciones;
  }

  setNombre(nombre: string): void {
    this.genero.nombre = nombre;
  }

  setArtistasGrupos(artistasGrupos: Coleccion<Artista | Grupo>): void {
    this.genero.artistasGrupos = artistasGrupos;
  }

  setAlbumes(albumes: Coleccion<Album>): void {
    this.genero.albumes = albumes;
  }

  setCanciones(canciones: Coleccion<Cancion>): void {
    this.genero.canciones = canciones;
  }

  addCancion(canciones: Cancion): void {
    this.genero.canciones.addElemento(canciones);
  }

  addAlbum(album: Album): void {
    this.genero.albumes.addElemento(album);
  }

  addArtistaGrupo(nombre: Artista | Grupo): void {
    this.genero.artistasGrupos.addElemento(nombre);
  }
}


export class PrintGenerosMusicales {
  constructor(private genero: GenerosMusicales) {}

  print(): void {
    console.log(`Nombre: ${this.genero.getNombre()}`);
    console.log(`Artistas: ${[...this.genero.getArtistaGrupos()].join(', ')}`);
    console.log(`Albunes: ${[...this.genero.getAlbumes()].join(', ')}`);
    console.log(`Canciones: ${[...this.genero.getCanciones()].join(', ')}`);
  }
}
