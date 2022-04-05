import * as Data from "../BaseDeDatos/dataBase";
import {JsonDataBase} from "../BaseDeDatos/dbManager";
import {Interfaz} from "../Estructura/Interfaz";

const interfaz = Interfaz.getInterfazInstance();
const dataBase = new JsonDataBase(interfaz, Data.generos, Data.playList);
// interfaz.setGeneros(Data.generos);
interfaz.run();
