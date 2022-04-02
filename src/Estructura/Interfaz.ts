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

export class Interfaz {
  private static interfaz: Interfaz;
  private searchAutores: string[];
  private generos: Coleccion<GenerosMusicales>;
  private constructor() { }

  public static getInterfazInstance(): Interfaz {
    if (!Interfaz.interfaz) {
      Interfaz.interfaz = new Interfaz();
    }
    return Interfaz.interfaz;
  }

  actualizarSearchAutores(): void {
    this.searchAutores = [];
    [...this.generos].forEach((genero) => {
      [...genero.getArtistaGrupos()].forEach((autores) => {
        this.searchAutores.push(autores.getNombre());
      });
    });
    this.searchAutores = [...new Set(this.searchAutores)];
  }

  searchStates(search: string[], input: string = "") {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = fuzzy.filter(input, search).map((el: any) => el.original);
  
        results.splice(5, 0, new inquirer.Separator());
        results.push(new inquirer.Separator());
        resolve(results);
      }, Math.random() * 470 + 30);
    });
  }
  
  
  getGeneros(): Coleccion<GenerosMusicales> {
    return this.generos;
  }

  setGeneros(generos: Coleccion<GenerosMusicales>): void {
    this.generos = generos;
    this.actualizarSearchAutores();
  }

  run(): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "comando",
      message: "¿Qué desea hacer?",
      choices: ["Añadir, modificar o eliminar", "Visualizar", "Salir"],
    }]).then((answers) => {
      switch (answers["comando"]) {
        case "Añadir, modificar o eliminar":
          this.añadirModificarEliminar();
          break;
        case "Visualizar":
          this.visualizar();
          break;
        case "Salir":
          break;
      }
    });
  }

  añadirModificarEliminar(): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "comando",
      message: "¿Qué desea hacer?",
      choices: ["Añadir", "Modificar", "Eliminar", "Salir"],
    }]).then((answers) => {
      switch (answers["comando"]) {
        case "Añadir":
          this.añadir();
          break;
        case "Modificar":
          console.log("aaa");
          break;
        case "Eliminar":
          console.log("aaa");
          break;
        case "Salir":
          this.run();
          break;
      }
    });
  }

  añadir(): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "comando",
      message: "¿Qué desea añadir?",
      choices: ["Canción", "Album", "Artista", "Grupo", "Género", "Salir"],
    }]).then((answers) => {
      switch (answers["comando"]) {
        case "Canción":
          this.añadirCancion();
          break;
        case "Album":
          console.log("aaa");
          break;
        case "Artista":
          console.log("aaa");
          break;
        case "Grupo":
          console.log("aaa");
          break;
        case "Género":
          console.log("aaa");
          break;
        case "Salir":
          this.añadirModificarEliminar();
          break;
      }
    });
  }

  añadirCancion(): void {
    console.clear();
    const error = 0;
    inquirer.prompt([{
      name: "nombre",
      message: "Nombre de la canción:",
    },
    {
      type: "autocomplete",
      name: "autor",
      message: "Nombre del creador:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchAutores, input),
    },
    {
      name: "duracion",
      message: "Duracion de la canción en segundos:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "La duración debe ser un número";
        }
        return true;
      },
    },
    {
      name: "generos",
      message: "Generos de la canción:",
    },
    {
      name: "reproducciones",
      message: "Reproducciones de la canción",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "Las reproducciones deben ser un número";
        }
        return true;
      },
    }]).then((answers) => {  
      const generos: string[] = answers["generos"].split(' ');
      let contador: number = 0;
      generos.forEach((valores) => {
        [...this.generos].forEach((genero) => {
          if (valores === genero.getNombre()) {
            [...genero.getArtistaGrupos()].forEach((autor) => {
              if (autor.getNombre() === answers["autor"]) {
                autor.getGeneros().forEach((generoAutor) => {
                  if (generoAutor === valores) {
                    contador ++;
                  }
                });
              }
            });
          }
        });
      });
  
      if (contador !== generos.length) {
        console.log("¡¡¡¡¡ERROR: Géneros incorrectos!!!!!");
        throw error;
      }
  
      const min = parseInt(answers["duracion"]) / 60 << 0;
      const seg = parseInt(answers["duracion"]) % 60;
      
      const cancion = new Cancion({nombre: answers["nombre"], autor: answers["autor"], 
        duracion: {min: min, seg: seg}, generos: generos, single: true, reproducciones: parseInt(answers["reproducciones"])});
  
      [...this.generos].forEach((genero) => {
        cancion.getGeneros().forEach((generoCancion) => {
          if (generoCancion === genero.getNombre()) {
            genero.addCancion(cancion);
          }
        });
        [...genero.getArtistaGrupos()].forEach((autor) => {
          if (autor.getNombre() === cancion.getAutor()) {
            autor.addCancion(cancion);
          }
        });
      });
      
      this.añadir();
    }).catch((error) => {
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }

  visualizar(): void {
    console.clear();
    inquirer.prompt([{
      type: "rawlist",
      name: "comando",
      message: "¿Qué desea visualizar?",
      choices: ["Canciones", "Albumes", "Artistas", "Géneros", "Playlist", "Salir"],
    }, 
    {
      type: "input",
      name: "filtro",
      message: "Quiere aplicar un filtro?",
      default: "No",
    }]).then((answers) => {
      let aux;
      switch (answers["comando"]) {
        case "Canciones":
          if (answers["filtro"] == "No") {
            [...this.generos].forEach((genero) => {
              [...genero.getCanciones()].forEach((cancion) => {
                aux = new PrintCancion(cancion);
                aux.print();
              });
            });
          }
          break;
        case "Albumes":
          if (answers["filtro"] == "No") {
            [...this.generos].forEach((genero) => {
              [...genero.getAlbumes()].forEach((album) => {
                aux = new PrintAlbum(album);
                aux.print();
              });
            });
          }
          break;
        case "Artistas":
          if (answers["filtro"] == "No") {
            [...this.generos].forEach((genero) => {
              [...genero.getArtistaGrupos()].forEach((elemento) => {
                if (elemento instanceof Artista) {
                  aux = new PrintArtista(elemento);
                  aux.print();
                }
              });
            });
          }
          break;
        case "Grupos":
          if (answers["filtro"] == "No") {
            [...this.generos].forEach((genero) => {
              [...genero.getArtistaGrupos()].forEach((elemento) => {
                if (elemento instanceof Grupo) {
                  aux = new PrintGrupo(elemento);
                  aux.print();
                }
              });
            });
          }
          break;
        case "Generos":
          if (answers["filtro"] == "No") {
            [...this.generos].forEach((genero) => {
              aux = new PrintGenerosMusicales(genero);
              aux.print();
            });
          }
          break;
          /* case "Playlist":
          if (answers["filtro"] == "No") {
            [...this.generos].forEach((genero) => {
              [...genero.getPlaylist()].forEach((playlist) => {
                aux = new PrintPlaylist(playlist);
                aux.print();
              });
            });
          }
          break; */
        default:
          break;
          this.visualizar();
      }
    });
  }
}
