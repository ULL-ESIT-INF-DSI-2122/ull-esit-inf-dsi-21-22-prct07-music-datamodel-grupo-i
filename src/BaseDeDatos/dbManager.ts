import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {PlayList} from "../Estructura/playlist";
import {GenerosMusicales} from "../Estructura/generosMusicales";
import {Coleccion} from "../Estructura/coleccionGenerica"; 
import * as Data from "./dataBase";

type schemaType = {
  generos: Coleccion<GenerosMusicales>,
}

export class JsonDataBase {
  private database: lowdb.LowdbSync<schemaType>;

  constructor(datos: Coleccion<GenerosMusicales>) {
    this.database = lowdb(new FileSync('Hola.json'));
    if (this.database.has('generos').value()) {
      const dbData = this.database.get('generos').value();
    } else {
      this.database.set('generos', datos).write();
    }
  }
}


const a = new JsonDataBase(Data.generos);
[...Data.generos].forEach((dato) => {
  console.log(dato);
});
