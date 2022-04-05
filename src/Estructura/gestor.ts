import {Coleccion} from "./coleccionGenerica";
import {GenerosMusicales, PrintGenerosMusicales} from "./generosMusicales";
import inquirer from 'inquirer';
import {PrintCancion, Cancion} from "./cancion";
import {PrintAlbum, Album} from "./album";
import {PrintArtista, Artista} from "./artistas";
import {PrintPlayList, PlayList} from "./playlist";
import {PrintGrupo, Grupo} from "./grupo";
const inquirerPrompt = require('inquirer-autocomplete-prompt');
const fuzzy = require('fuzzy');

inquirer.registerPrompt('autocomplete', inquirerPrompt);

export class Gestor {
  private static gestor: Gestor;
  private playList: Coleccion<PlayList>;

  private constructor() { }

  public static getGestorInstance(): Gestor {
    if (!Gestor.gestor) {
      Gestor.gestor = new Gestor();
    }
    return Gestor.gestor;
  }

  setPlayList(playList: Coleccion<PlayList>): void {
    this.playList = playList;
  }

  getPlayList(): Coleccion<PlayList> {
    return this.playList;
  }
}
