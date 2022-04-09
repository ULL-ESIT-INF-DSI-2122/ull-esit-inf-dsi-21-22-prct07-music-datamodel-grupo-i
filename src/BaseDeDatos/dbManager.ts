import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {PlayList} from "../Estructura/playlist";
import {GenerosMusicales} from "../Estructura/generosMusicales";
import {Coleccion} from "../Estructura/coleccionGenerica"; 
import {Artista} from '../Estructura/artistas';
import {Grupo} from '../Estructura/grupo';
import {Album} from '../Estructura/album';
import {Cancion} from '../Estructura/cancion';
import * as Data from "../BaseDeDatos/dataBase";

/**
 * @type schemaType, tipo de dato que se va a guardar en la base de datos
 */
type schemaType = {
  estructura: Coleccion<GenerosMusicales>,
  playList: Coleccion<PlayList>,
}

/**
 * @class JsonDataBase
 */
export class JsonDataBase {
  /**
   * @param estructura, estructura que se va a guardar en la base de datos.
   */
  private database: lowdb.LowdbSync<schemaType>;

  /**
   * Cosntructor
   * @param estructura Informacion de la estructura
   * @param playList informacion de las playlist
   */
  constructor(private estructura: Coleccion<GenerosMusicales>, private playList: Coleccion<PlayList>) {
    this.database = lowdb(new FileSync('src/BaseDeDatos/DataBase.json'));
    if (this.database.has('estructura').value()) {      
      const aux = new Coleccion<GenerosMusicales>(...this.database.get('estructura').value().coleccion);
    
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
      this.estructura = aux;
    } else {
      this.database.set('estructura', this.estructura).write();
    }
    if (this.database.has('playList').value()) {
      const aux = new Coleccion<PlayList>(...this.database.get('playList').value().coleccion);
      let contadorPlayList: number = 0;
      let contadorCancion: number = 0;

      [...aux].forEach((playlist) => {
        playlist = new PlayList(playlist.playlist, false);
        playlist.setCanciones(new Coleccion<Cancion>(...playlist.getCanciones().coleccion));
        [...playlist.getCanciones()].forEach((cancion) => {
          cancion = new Cancion(cancion.cancion);
          playlist.getCanciones().changeElemento(cancion, contadorCancion);
          contadorCancion ++;
        });
        contadorCancion = 0;
        aux.changeElemento(playlist, contadorPlayList);
        contadorPlayList++;
      });
      this.playList = aux;
    } else {
      this.database.set('playList', this.playList).write();
    }
  }

  /**
   * Guarda la nueva informacion en la base de datos
   */
  guardarEstructura() {
    this.database.set('estructura', this.estructura).write();
  }

  /**
   * Guarda la nueva informacion en la base de datos
   */
  guardarPlayList() {
    this.database.set('playList', this.playList).write();
  }

  /**
   * Metodo que retorna la estructura sacada de la base de datos
   * @returns información de la estructura
   */
  getEstructura(): Coleccion<GenerosMusicales> {
    return this.estructura;
  }
  
  /**
   * Metodo que retorna las playlist sacadas de la base de datos
   * @returns información de la playlist
   */
  getPlayList(): Coleccion<PlayList> {
    return this.playList;
  }
}
