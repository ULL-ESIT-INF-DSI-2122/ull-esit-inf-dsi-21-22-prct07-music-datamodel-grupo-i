
export type artistaType = {
  nombre: string,
  artistasGrupos: string[],
  generos: string[],
  albumes: string[],
  canciones: string[],
  oyentesMensuales: number
}

export class Artista {
  constructor(private artista: artistaType) { }

  getNombre(): string {
    return this.artista.nombre;
  }

  getArtistaGrupos(): string[] {
    return this.artista.artistasGrupos;
  }

  getGeneros(): string[] {
    return this.artista.generos;
  }

  getAlbunes(): string[] {
    return this.artista.albumes;
  }

  getCanciones(): string[] {
    return this.artista.canciones;
  }

  getOyentesMensuales(): string[] {
    return this.artista.canciones;
  }

  setNombre(nombre: string): void {
    this.artista.nombre = nombre;
  }

  setArtistasGrupos(artistasGrupos: string[]): void {
    this.artista.artistasGrupos = artistasGrupos;
  }

  setGeneros(generos: string[]): void {
    this.artista.generos = generos;
  }

  setAlbunes(albunes: string[]): void {
    this.artista.albumes = albunes;
  }

  setCanciones(canciones: string[]): void {
    this.artista.canciones = canciones;
  }

  setOyentesMensuales(oyentes: number): void {
    this.artista.oyentesMensuales = oyentes;
  }
}
