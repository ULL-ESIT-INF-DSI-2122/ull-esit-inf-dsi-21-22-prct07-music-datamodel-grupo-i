import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {PlayList} from "../Estructura/playlist";
import {GenerosMusicales} from "../Estructura/generosMusicales";
import {Coleccion} from "../Estructura/coleccionGenerica"; 
import * as Data from "./dataBase";
import {Interfaz} from '../Estructura/Interfaz';
import {Artista} from '../Estructura/artistas';
import {Grupo} from '../Estructura/grupo';
import {Album} from '../Estructura/album';
import {Cancion} from '../Estructura/cancion';

type schemaType = {
  generos: Coleccion<GenerosMusicales>,
}

export class JsonDataBase {
  private database: lowdb.LowdbSync<schemaType>;

  constructor(private interfaz: Interfaz, datos: Coleccion<GenerosMusicales>) {
    this.database = lowdb(new FileSync('src/BaseDeDatos/Hola.json'));
    if (this.database.has('generos').value()) {      
      const aux = new Coleccion<GenerosMusicales>(...this.database.get('generos').value().coleccion);
    
      let contadorGenero = 0;
      let contadorAutor = 0;
      let contadorAlbum = 0;
      let contadorCancion = 0;
      [...aux].forEach((genero) => {
        genero = new GenerosMusicales(genero.genero, false);
        genero.setArtistasGrupos(new Coleccion<Artista | Grupo>(...genero.getArtistaGrupos().coleccion));
        genero.setAlbumes(new Coleccion<Album>(...genero.getAlbumes().coleccion));
        genero.setCanciones(new Coleccion<Cancion>(...genero.getCanciones().coleccion));

        [...genero.getArtistaGrupos()].forEach((autor) => {
          if ("artista" in autor) {
            autor = new Artista(autor.artista, false);
          } else {
            autor = new Grupo(autor.grupo, false);
          }
          autor.setAlbumes(new Coleccion<Album>(...autor.getAlbumes().coleccion));
          autor.setCanciones(new Coleccion<Cancion>(...autor.getCanciones().coleccion));
          genero.getArtistaGrupos().changeElemento(autor, contadorAutor);
          contadorAutor++;

          [...autor.getCanciones()].forEach((cancion) => {
            cancion = new Cancion(cancion.cancion);
            autor.getCanciones().changeElemento(cancion, contadorCancion);
            contadorCancion ++;
          });
          contadorCancion = 0;

          [...autor.getAlbumes()].forEach((album) => {
            album = new Album(album.album, false);
            album.setCanciones(new Coleccion<Cancion>(...autor.getCanciones().coleccion));
            autor.getAlbumes().changeElemento(album, contadorAlbum);
            contadorAlbum++;
            [...album.getCanciones()].forEach((cancion) => {
              cancion = new Cancion(cancion.cancion);
              album.getCanciones().changeElemento(cancion, contadorCancion);
              contadorCancion ++;
            });
            contadorCancion = 0;
          });
          contadorAlbum = 0;
        });
        contadorAutor = 0;

        [...genero.getAlbumes()].forEach((album) => {
          album = new Album(album.album, false);
          album.setCanciones(new Coleccion<Cancion>(...genero.getCanciones().coleccion));
          genero.getAlbumes().changeElemento(album, contadorAlbum);
          contadorAlbum++;
          [...album.getCanciones()].forEach((cancion) => {
            cancion = new Cancion(cancion.cancion);
            album.getCanciones().changeElemento(cancion, contadorCancion);
            contadorCancion ++;
          });
          contadorCancion = 0;
        });
        contadorAlbum = 0;

        [...genero.getCanciones()].forEach((cancion) => {
          cancion = new Cancion(cancion.cancion);
          genero.getCanciones().changeElemento(cancion, contadorCancion);
          contadorCancion ++;
        });
        contadorCancion = 0;
        
        aux.changeElemento(genero, contadorGenero);
        contadorGenero++;
      });
      interfaz.setGeneros(aux);
    } else {
      this.database.set('generos', datos).write();
    }
  }
}

const interfaz = Interfaz.getInterfazInstance();
const dataBase = new JsonDataBase(interfaz, Data.generos);
console.log(Data.generos instanceof Coleccion);

function callback(genero: any): (value: GenerosMusicales, index: number, array: GenerosMusicales[]) => void {
  throw new Error('Function not implemented.');
}

