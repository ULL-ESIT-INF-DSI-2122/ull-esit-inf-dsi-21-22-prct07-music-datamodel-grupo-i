import * as Data from "../BaseDeDatos/dataBase";
import {JsonDataBase} from "../BaseDeDatos/dbManager";
import {Interfaz} from "../Estructura/Interfaz";

const dataBase = new JsonDataBase(Data.generos, Data.playList);
const interfaz = Interfaz.getInterfazInstance(dataBase);

interfaz.run();
