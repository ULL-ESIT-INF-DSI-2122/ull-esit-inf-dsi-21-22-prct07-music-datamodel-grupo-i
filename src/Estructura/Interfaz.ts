import {Coleccion} from "./coleccionGenerica";
import {GenerosMusicales} from "./generosMusicales";
import inquirer from 'inquirer';
import {PrintCancion, Cancion} from "./cancion";
import {PrintAlbum, Album} from "./album";
import {Artista} from "./artistas";
import {PlayList, PrintPlayList} from "./playlist";
import {Grupo} from "./grupo";
import {JsonDataBase} from "../BaseDeDatos/dbManager";

const inquirerPrompt = require('inquirer-autocomplete-prompt');
const fuzzy = require('fuzzy');
inquirer.registerPrompt('autocomplete', inquirerPrompt);


enum visualizarEnum {
    canciones,
    albumes,
    playList,
}


enum filterType {
    titulo,
    single,
    reproducciones,
    fechaPublicacion,
    nombreGrupoArtista,
    duracion,
    genero,
}

enum avanzadaPlaylist {
  playListInfoBasica,
  playListInfoAvanzada,
}


export class Interfaz {
  private static interfaz: Interfaz;

  private searchArtistas: string[];
  private searchGrupos: string[];
  private searchAlbumes: string[];
  private searchCanciones: string[];
  private searchGeneros: string[];
  private searchPlayList: string[];

  private generos: Coleccion<GenerosMusicales>;
  private playList: Coleccion<PlayList>;

  private usuarioNick: string = "";

  private constructor(private dataBase: JsonDataBase) {
    this.generos = this.dataBase.getEstructura();
    this.playList = this.dataBase.getPlayList();
    
    this.actualizarSearchArtistasGrupos();
    this.actualizarSearchAlbumes();
    this.actualizarSearchCanciones();
    this.actualizarSearchGeneros();
    this.actualizarSearchPlalist();
  }

  public static getInterfazInstance(datos: JsonDataBase): Interfaz {
    if (!Interfaz.interfaz) {
      Interfaz.interfaz = new Interfaz(datos);
    }
    return Interfaz.interfaz;
  }

  mirarGeneros(generos: string[], autorTeclado: string): number {
    let contador: number = 0;

    generos.forEach((valores) => {
      [...this.generos].forEach((genero) => {
        if (valores === genero.getNombre()) {
          [...genero.getArtistaGrupos()].forEach((autor) => {
            if (autor.getNombre() === autorTeclado) {
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
    return contador;
  }

  searchCancionesPlaylist(nombre: string): string[] {
    const aux: string[] = [];
    [...this.playList].forEach((playList) => {
      if (playList.getNombre() === nombre) {
        [...playList.getCanciones()].forEach((cancion) => {
          aux.push(cancion.getNombre());
        });
      }
    });

    return aux;
  }

  actualizarSearchGeneros(): void {
    this.searchGeneros = [];
    [...this.generos].forEach((genero) => {
      this.searchGeneros.push(genero.getNombre());
    });

    this.searchGeneros = [...new Set(this.searchGeneros)];
  }

  actualizarSearchArtistasGrupos(): void {
    this.searchArtistas = [];
    this.searchGrupos = [];
    [...this.generos].forEach((genero) => {
      [...genero.getArtistaGrupos()].forEach((autores) => {
        if (autores instanceof Artista) {
          this.searchArtistas.push(autores.getNombre());
        } else {
          this.searchGrupos.push(autores.getNombre());
        }
      });
    });
    this.searchArtistas = [...new Set(this.searchArtistas)];
    this.searchGrupos = [...new Set(this.searchGrupos)];
  }

  actualizarSearchAlbumes(): void {
    this.searchAlbumes = [];
    [...this.generos].forEach((genero) => {
      [...genero.getAlbumes()].forEach((album) => {
        this.searchAlbumes.push(album.getNombre());
      });
    });
    this.searchAlbumes = [...new Set(this.searchAlbumes)];
  }

  actualizarSearchCanciones(): void {
    this.searchCanciones = [];
    [...this.generos].forEach((genero) => {
      [...genero.getCanciones()].forEach((cancion) => {
        this.searchCanciones.push(cancion.getNombre());
      });
    });
    this.searchArtistas = [...new Set(this.searchArtistas)];
  }

  actualizarSearchPlalist(): void {
    this.searchPlayList = [];
    [...this.playList].forEach((playList) => {
      this.searchPlayList.push(playList.getNombre());
    });
    this.searchPlayList = [...new Set(this.searchPlayList)];
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

  run(): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "comando",
      message: "¿Qué desea hacer?",
      choices: ["Añadir, modificar o eliminar", "Visualizar", "Gestión avanzada de PlayLists", "Salir"],
    }]).then((answers) => {
      switch (answers["comando"]) {
        case "Añadir, modificar o eliminar":
          this.añadirModificarEliminar();
          break;
        case "Visualizar":
          this.visualizarLista();
          break;
        case "Gestión avanzada de PlayLists":
          this.inicioPlayList();
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
          this.modificar();
          break;
        case "Eliminar":
          this.eliminar();
          break;
        case "Salir":
          this.run();
          break;
      }
    });
  }

  eliminar(): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "comando",
      message: "¿Qué desea eliminar?",
      choices: ["Canción", "Album", "Artista", "Grupo", "Género", "Salir"],
    }]).then((answers) => {
      switch (answers["comando"]) {
        case "Canción":
          this.eliminarCancion();
          break;
        case "Album":
          this.eliminarAlbum();
          break;
        case "Artista o grupo":
          this.eliminarArtistaGrupo();
          break;
        case "Género":
          this.eliminarGenero();
          break;
        case "Salir":
          this.añadirModificarEliminar();
          break;
      }
    });
  }

  eliminarGenero(): void {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre del genero:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchGeneros, input),
    }]).then((answers) => {
      this.generos.removeElemento(answers["nombre"]);
      this.dataBase.almacenarInformacion();

      this.actualizarSearchGeneros();
      this.eliminar();
    });
  }

  eliminarArtistaGrupo(): void {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre del autor:",
      source: (answersSoFar: any, input: string) => this.searchStates([...this.searchArtistas, ...this.searchGrupos], input),
    }]).then((answers) => {
      [...this.generos].forEach((genero) => {
        genero.getArtistaGrupos().removeElemento(answers["nombre"]);
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchArtistasGrupos();
      this.eliminar();
    });
  }

  eliminarAlbum(): void {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre del album:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchAlbumes, input),
    }]).then((answers) => {
      [...this.generos].forEach((genero) => {
        genero.getAlbumes().removeElemento(answers["nombre"]);

        [...genero.getArtistaGrupos()].forEach((autor) => {
          autor.getAlbumes().removeElemento(answers["nombre"]);
        });
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchAlbumes();
      this.eliminar();
    });
  }

  eliminarCancion(): void {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre de la canción:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchCanciones, input),
    }]).then((answers) => {
      [...this.generos].forEach((genero) => {
        genero.getCanciones().removeElemento(answers["nombre"]);

        [...genero.getAlbumes()].forEach((album) => {
          album.getCanciones().removeElemento(answers["nombre"]);
        });

        [...genero.getArtistaGrupos()].forEach((autor) => {
          [...autor.getAlbumes()].forEach((album) => {
            album.getCanciones().removeElemento(answers["nombre"]);
          });
        });
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchCanciones();
      this.eliminar();
    });
  }

  modificar(): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "comando",
      message: "¿Qué desea modificar?",
      choices: ["Canción", "Album", "Artista", "Grupo", "Género", "Salir"],
    }]).then((answers) => {
      switch (answers["comando"]) {
        case "Canción":
          this.modificarCancion();
          break;
        case "Album":
          this.modificarAlbum();
          break;
        case "Artista":
          this.modificarArtista();
          break;
        case "Grupo":
          this.modificarGrupo();
          break;
        case "Género":
          this.modificarGenero();
          break;
        case "Salir":
          this.añadirModificarEliminar();
          break;
      }
    });
  }

  modificarGenero(): void {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre del genero:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchGeneros, input),
    },
    {
      name: "nombreNuevo",
      message: "Nuevo nombre del genero:",
    }]).then((answers) => {
      [...this.generos].forEach((genero) => {
        if (genero.getNombre() === answers["nombre"]) {
          genero.setNombre(answers["nombreNuevo"]);
        }
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchGeneros();
      this.modificar();
    });
  }

  modificarGrupo(): void {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre del grupo:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchGrupos, input),
    },
    {
      name: "nombreNuevo",
      message: "Nuevo nombre del grupo:",
    },
    {
      name: "fechaNuevo",
      message: "Nueva fecha de creación del grupo:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "Las reproducciones deben ser un número";
        }
        return true;
      },
    },
    {
      name: "oyentes",
      message: "Cantidad de oyentes mensuales:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "El valor debe ser un número";
        }
        return true;
      },
    }]).then((answers) => {
      [...this.generos].forEach((genero) => {
        [...genero.getArtistaGrupos()].forEach((autor) => {
          if (autor.getNombre() === answers["nombre"] && autor instanceof Grupo) {
            autor.setNombre(answers["nombreNuevo"]);
            autor.setFechaCreacion(parseInt(answers["fechaNuevo"]));
            autor.setOyentes(parseInt(answers["oyentes"]));
          }
        });
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchArtistasGrupos();
      this.modificar();
    });
  }

  modificarArtista(): void {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre del artista:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchArtistas, input),
    },
    {
      name: "nombreNuevo",
      message: "Nuevo nombre del artista:",
    },
    {
      name: "oyentes",
      message: "Nueva cantidad de oyentes mensuales:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "El valor debe ser un número";
        }
        return true;
      },
    }]).then((answers) => {
      [...this.generos].forEach((genero) => {
        [...genero.getArtistaGrupos()].forEach((autor) => {
          if (autor.getNombre() === answers["nombre"]) {
            autor.setNombre(answers["nombreNuevo"]);
            autor.setOyentes(parseInt(answers["oyentes"]));
          }
        });
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchArtistasGrupos();
      this.modificar();
    });
  }

  modificarAlbum(): void {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre del album:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchAlbumes, input),
    },
    {
      name: "nombreNuevo",
      message: "Nuevo nombre del album:",
    },
    {
      name: "fechaNuevo",
      message: "Nueva fecha de creación del album:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "Las reproducciones deben ser un número";
        }
        return true;
      },
    }]).then((answers) => {
      [...this.generos].forEach((genero) => {
        [...genero.getAlbumes()].forEach((album) => {
          if (album.getNombre() === answers["nombre"]) {
            album.setNombre(answers["nombre"]);
            album.setFechaPublicacion(parseInt(answers["fechaNuevo"]));
          }
        });

        [...genero.getArtistaGrupos()].forEach((autor) => {
          [...autor.getAlbumes()].forEach((album) => {
            if (album.getNombre() === answers["nombre"]) {
              album.setNombre(answers["nombre"]);
              album.setFechaPublicacion(parseInt(answers["fechaNuevo"]));
            }
          });
        });
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchAlbumes();
      this.modificar();
    });
  }

  modificarCancion(): void {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre de la canción:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchCanciones, input),
    },
    {
      name: "nombreNuevo",
      message: "Nuevo nombre de la canción:",
    },
    {
      name: "reproduccionNuevo",
      message: "Nuevas reproducciones de la canción:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "Las reproducciones deben ser un número";
        }
        return true;
      },
    }]).then((answers) => {
      [...this.generos].forEach((genero) => {
        [...genero.getCanciones()].forEach((cancion) => {
          if (cancion.getNombre() === answers["nombre"]) {
            cancion.setNombre(answers["nombreNuevo"]);
            cancion.setReproducciones(parseInt(answers["reproduccionNuevo"]));
          }
        });

        [...genero.getAlbumes()].forEach((album) => {
          [...album.getCanciones()].forEach((cancion) => {
            if (cancion.getNombre() === answers["nombre"]) {
              cancion.setNombre(answers["nombreNuevo"]);
              cancion.setReproducciones(parseInt(answers["reproduccionNuevo"]));
            }
          });
        });

        [...genero.getArtistaGrupos()].forEach((autor) => {
          [...autor.getAlbumes()].forEach((album) => {
            [...album.getCanciones()].forEach((cancion) => {
              [...album.getCanciones()].forEach((cancion) => {
                if (cancion.getNombre() === answers["nombre"]) {
                  cancion.setNombre(answers["nombreNuevo"]);
                  cancion.setReproducciones(parseInt(answers["reproduccionNuevo"]));
                }
              });
              if (cancion.getNombre() === answers["nombre"]) {
                cancion.setNombre(answers["nombreNuevo"]);
                cancion.setReproducciones(parseInt(answers["reproduccionNuevo"]));
              }
            });
          });
        });
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchCanciones();
      this.modificar();
    });
  }

  añadir(): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "comando",
      message: "¿Qué desea añadir?",
      choices: ["Canción", "Album", "Canción a un album", "Artista", "Grupo", "Género", "Salir"],
    }]).then((answers) => {
      switch (answers["comando"]) {
        case "Canción":
          this.añadirCancion();
          break;
        case "Album":
          this.añadirAlbum();
          break;
        case "Artista":
          this.añadirArtista();
          break;
        case "Grupo":
          this.añadirGrupo();
          break;
        case "Género":
          this.añadirGenero();
          break;
        case "Salir":
          this.añadirModificarEliminar();
          break;
      }
    });
  }

  añadirGenero(): void {
    console.clear();
    inquirer.prompt([{
      name: "nombre",
      message: "Nombre del género:",
    }]).then((answers) => { 
      const genero = new GenerosMusicales({nombre: answers["nombre"], artistasGrupos: new Coleccion<Artista | Grupo>(), 
        albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>()});

      this.generos.addElemento(genero);

      this.actualizarSearchGeneros();
      this.dataBase.almacenarInformacion();
      this.añadir();
    });
  }

  añadirGrupo(): void {
    console.clear();
    inquirer.prompt([{
      name: "nombre",
      message: "Nombre del grupo:",
    },
    {
      name: "artistas",
      message: "Nombre de los componentes:",
    },
    {
      name: "fecha",
      message: "Año de creacion del grupo:",
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
      name: "oyentes",
      message: "Cantidad de oyentes mensuales:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "El valor debe ser un número";
        }
        return true;
      },
    }]).then((answers) => {  
      const generos: string[] = answers["generos"].split(' ');
  
      if (this.mirarGeneros(generos, answers["autor"]) !== generos.length) {
        throw new Error("¡¡¡¡¡ERROR: Géneros incorrectos!!!!!");
      }
      
      const grupo = new Grupo({nombre: answers["nombre"], artistas: new Coleccion<Artista>(), fechaCreacion: answers["fecha"],
        generos: generos, albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>(), oyentes: answers["oyentes"]});

      [...this.generos].forEach((genero) => {
        grupo.getGeneros().forEach((generosGrupo) => {
          if (generosGrupo === genero.getNombre()) {
            genero.addArtistaGrupo(grupo);
          }
        });
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchArtistasGrupos();
      this.añadir();
    }).catch((error) => {
      console.log(error.message);
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }


  añadirArtista(): void {
    console.clear();    
    inquirer.prompt([{
      name: "nombre",
      message: "Nombre del artista:",
    },
    {
      name: "grupos",
      message: "Nombre de los grupos del artista:",
    },
    {
      name: "generos",
      message: "Generos del artista:",
    },
    {
      name: "oyentes",
      message: "Cantidad de oyentes mensuales:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "El valor debe ser un número";
        }
        return true;
      },
    }]).then((answers) => {  
      const generos: string[] = answers["generos"].split(' ');

      if (this.mirarGeneros(generos, answers["autor"]) !== generos.length) {
        throw new Error("¡¡¡¡¡ERROR: Géneros incorrectos!!!!!");
      }

      const artista = new Artista({nombre: answers["nombre"], grupos: answers["grupos"].split(' '), 
        generos: generos, albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>(), oyentes: parseInt(answers["oyentes"])});

      [...this.generos].forEach((genero) => {
        artista.getGeneros().forEach((generosArtista) => {
          if (generosArtista === genero.getNombre()) {
            genero.addArtistaGrupo(artista);
            [...artista.getGrupos()].forEach((grupo) => {
              [...this.generos].forEach((genero) => {
                [...genero.getArtistaGrupos()].forEach((grupoGenero) => {
                  if (grupo === grupoGenero.getNombre() && grupoGenero instanceof Grupo) {
                    grupoGenero.addArtista(artista);
                  } 
                });
              });
            });
          }
        });
      });
      
      this.dataBase.almacenarInformacion();
      this.actualizarSearchArtistasGrupos();
      this.añadir();
    }).catch((error) => {
      console.log(error.message);
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }

  añadirAlbum(): void {
    console.clear();
    inquirer.prompt([{
      name: "nombre",
      message: "Nombre de album:",
    },
    {
      type: "autocomplete",
      name: "autor",
      message: "Nombre del creador:",
      source: (answersSoFar: any, input: string) => this.searchStates([...this.searchArtistas, ...this.searchGrupos], input),
    },
    {
      name: "creacion",
      message: "Año de creación del album:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "El año debe ser un número";
        }
        return true;
      },
    },
    {
      name: "generos",
      message: "Generos del album:",
    },
    {
      name: "canciones",
      message: "Cantidad de canciones del album:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "La cantidad debe ser un número";
        }
        if (parseInt(value) <= 0) {
          return "La cantidad mínima es 1";
        }
        return true;
      },
    }]).then((answers) => {
      const generos: string[] = answers["generos"].split(' ');

      if (this.mirarGeneros(generos, answers["autor"]) !== generos.length) {
        throw new Error("¡¡¡¡¡ERROR: Géneros incorrectos!!!!!");
      }

      const album = new Album({nombre: answers["nombre"], autor: answers["autor"], 
        fechaPublicacion: answers["creacion"], generos: generos, canciones: new Coleccion<Cancion>()});

      [...this.generos].forEach((genero) => {
        album.getGeneros().forEach((generoAlbum) => {
          if (generoAlbum === genero.getNombre()) {
            genero.addAlbum(album);
            [...genero.getArtistaGrupos()].forEach((autor) => {
              if (autor.getNombre() === album.getAutor()) {
                autor.addAlbum(album);
              }
            });
          }
        });
      });
      
      this.dataBase.almacenarInformacion();
      this.actualizarSearchAlbumes();
      this.añadirCancion(false, answers["nombre"], parseInt(answers["canciones"]) - 1);
    }).catch((error) => {
      console.log(error.message);
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }

  
  añadirCancion(single: boolean = true, nombreAlbum: string = "", cantidad: number = 0): void {
    console.clear();
    inquirer.prompt([{
      name: "nombre",
      message: "Nombre de la canción:",
    },
    {
      type: "autocomplete",
      name: "autor",
      message: "Nombre del creador:",
      source: (answersSoFar: any, input: string) => this.searchStates([...this.searchArtistas, ...this.searchGrupos], input),
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
      message: "Reproducciones de la canción:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "Las reproducciones deben ser un número";
        }
        return true;
      },
    }]).then((answers) => {  
      const generos: string[] = answers["generos"].split(' ');
  
      if (this.mirarGeneros(generos, answers["autor"]) !== generos.length) {
        throw new Error("¡¡¡¡¡ERROR: Géneros incorrectos!!!!!");
      }
  
      const min = parseInt(answers["duracion"]) / 60 << 0;
      const seg = parseInt(answers["duracion"]) % 60;
      
      const cancion = new Cancion({nombre: answers["nombre"], autor: answers["autor"], 
        duracion: {min: min, seg: seg}, generos: generos, single: single, reproducciones: parseInt(answers["reproducciones"])});
  
      [...this.generos].forEach((genero) => {
        cancion.getGeneros().forEach((generoCancion) => {
          if (generoCancion === genero.getNombre()) {
            genero.addCancion(cancion);
            if (!single) {
              [...genero.getAlbumes()].forEach((album) => {
                if (album.getNombre() === nombreAlbum) {
                  album.addCancion(cancion);
                }
              });
            }
            [...genero.getArtistaGrupos()].forEach((autor) => {
              if (autor.getNombre() === cancion.getAutor()) {
                if (single) {
                  autor.addCancion(cancion);  
                } else {
                  [...autor.getAlbumes()].forEach((album) => {
                    if (album.getNombre() === nombreAlbum) {
                      album.addCancion(cancion);
                    }
                  }); 
                }
              }
            });
          }
        });
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchCanciones();
      if (cantidad) {
        this.añadirCancion(single, nombreAlbum, cantidad - 1);
      } else {
        this.añadir();
      }
    }).catch((error) => {
      console.log(error.message);
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }
  

  visualizarLista(): void {
    console.clear();
    inquirer.prompt([{  
      type: "autocomplete",
      name: "autor",
      message: "¿Qué Artistas o Grupos desea visualizar?",
      source: (answersSoFar: any, input: string) => this.searchStates([...this.searchArtistas, ...this.searchGrupos], input),
    }, 
    {
      type: "list",
      name: "opcion",
      message: "¿Qué desea ver del autor seleccionado?",
      choices: ["Albumes", "Canciones", "Playlists", "Salir"],
    }]).then((answers) => {
      switch (answers["opcion"]) {
        case "Albumes":
          this.visualizarAlbumes(answers["autor"]);
          break;
        case "Canciones":
          this.visualizarCanciones(answers["autor"]);
          break;
        case "Playlists":
          this.visualizarPlaylist(answers["autor"]);
          break;
        case "Salir":
          this.run();
          break;
      }
    });
  }

  visualizarSalir(): void {
    inquirer.prompt([{
      type: "confirm",
      name: "confirmacion",
      message: "¿Desea seguir filtrando o no?",
    }]).then((answers) => {
      if (answers["confirmacion"]) {
        this.visualizarLista();
      } else {
        this.run();
      }
    });
  }


  visualizarCanciones(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "opciondeFiltrado",
      message: "¿Qué filtro quiere aplicar?",
      choices: ["Título", "Single", "Reproducciones", "Salir"],
      default: "Titulo",
    }]).then((answers) => {
      switch (answers["opciondeFiltrado"]) {
        case "Título":
          this.filtradoTiTulo(opcion, visualizarEnum.canciones);
          break;
        case "Single":
          this.imprimirCanciones(this.filtrosCanciones(opcion, filterType.single));
          break;
        case "Reproducciones":
          this.filtradoReproducciones(opcion);
          break;
        case "Salir":
          this.visualizarLista();
          break;
      }
    });
  }


  visualizarAlbumes(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "opciondeFiltrado",
      message: "¿Qué filtro quiere aplicar?",
      choices: ["Titulo", "Año Lanzamiento", "Reproducciones Totales", "Salir"],
      default: "Titulo",
    }]).then((answers) => {
      switch (answers["opciondeFiltrado"]) {
        case "Titulo":
          this.filtradoTiTulo(opcion, visualizarEnum.albumes);
          break;
        case "Año Lanzamiento":
          this.fechaPublicacion(opcion);
          break;
        case "Reproducciones Totales":
          this.filtradoReproduccionesTotales(opcion, visualizarEnum.albumes);
          break;
        case "Salir":
          this.visualizarLista();
          break;
      }
    });
  }


  visualizarPlaylist(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "opciondeFiltrado",
      message: "¿Qué filtro quiere aplicar?",
      choices: ["Titulo", "Reproducciones Totales", "Salir"],
      default: "Titulo",
    }]).then((answers) => {
      switch (answers["opciondeFiltrado"]) {
        case "Titulo":
          this.filtradoTiTulo(opcion, visualizarEnum.playList);
          break;
        case "Reproducciones Totales":
          this.filtradoReproduccionesTotales(opcion, visualizarEnum.playList);
          break;
        case "Salir":
          this.visualizarLista();
          break;
      }
    });
  }


  filtradoTiTulo(opcion: string, tipo:number): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroTitulo",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
      default: "ASC",
    }]).then((answers) => {
      switch (answers["filtroTitulo"]) {
        case "ASC":
          if (tipo === visualizarEnum.canciones) {
            this.imprimirCanciones(this.filtrosCanciones(opcion, filterType.titulo));
          } else if (tipo === visualizarEnum.albumes) {
            this.imprimirAlbumes(this.filtrosAlbumes(opcion, filterType.titulo));
          } else if (tipo === visualizarEnum.playList) {
            this.imprimirPlaylist(this.filtrosPlayList(opcion, filterType.titulo));
          }
          break;
        case "DESC":
          if (tipo === visualizarEnum.canciones) {
            this.imprimirCanciones(this.filtrosCanciones(opcion, filterType.titulo).reverse());
          } else if (tipo === visualizarEnum.albumes) {
            this.imprimirAlbumes(this.filtrosAlbumes(opcion, filterType.titulo).reverse());
          } else if (tipo === visualizarEnum.playList) {
            this.imprimirPlaylist(this.filtrosPlayList(opcion, filterType.titulo).reverse());
          }
          break;
        case "Salir":
          this.visualizarLista();
          break;
      }
    });
  }


  filtradoReproducciones(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroReproduciones",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
      default: "ASC",
    }]).then((answers) => {
      let reproducciones: string[] = [];
      const nombre: string[] = [];

      if (answers["filtroReproduciones"] !== "Salir") {
        if (answers["filtroReproduciones"] === "ASC") {
          reproducciones = this.filtrosCanciones(opcion, filterType.reproducciones);
        } else {
          reproducciones = this.filtrosCanciones(opcion, filterType.reproducciones).reverse();
        }
        [...reproducciones].forEach((element) => {
          [...this.generos].forEach((genero) => {
            [...genero.getCanciones()].forEach((cancion) => {
              if (cancion.getAutor() === opcion && cancion.getReproducciones() === +element) {
                nombre.push(cancion.getNombre());
              }
            });
          });
        });
        this.imprimirCanciones([...new Set(nombre)]);
      } else {
        this.visualizarLista();
      }
    });
  }


  filtradoReproduccionesTotales(opcion: string, tipo:number): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroReproducionesTotales",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
      default: "ASC",
    }]).then((answers) => {
      let reproducciones: string[] = [];
      const nombre: string[] = [];

      if (answers["filtroReproducionesTotales"] === "ASC" && tipo === visualizarEnum.albumes) {
        reproducciones = this.filtrosAlbumes(opcion, filterType.reproducciones);
      } else if (answers["filtroReproducionesTotales"] === "DESC" && tipo === visualizarEnum.albumes) {
        reproducciones = this.filtrosAlbumes(opcion, filterType.reproducciones).reverse();
      } else if (answers["filtroReproducionesTotales"] === "ASC" && tipo === visualizarEnum.playList) {
        reproducciones = this.filtrosPlayList(opcion, filterType.reproducciones);
      } else if (answers["filtroReproducionesTotales"] === "DESC" && tipo === visualizarEnum.playList) {
        reproducciones = this.filtrosPlayList(opcion, filterType.reproducciones).reverse();
      }

      if (answers["filtroReproducionesTotales"] !== "Salir" && tipo === visualizarEnum.albumes) {
        [...reproducciones].forEach((element) => {
          [...this.generos].forEach((genero) => {
            [...genero.getAlbumes()].forEach((album) => {
              if (album.getAutor() === opcion && album.calcularReproduccionesTotales() === +element) {
                nombre.push(album.getNombre());
              }
            });
          });
        });
        this.imprimirAlbumes([...new Set(nombre)]);
      } else if (answers["filtroReproducionesTotales"] !== "Salir" && tipo === visualizarEnum.playList) {
        [...reproducciones].forEach((element) => {
          [...this.playList].forEach((play) => {
            [...play.getCanciones()].forEach((cancion) => {
              if (cancion.getAutor() === opcion && play.calcularReproduccionesTotales() === +element) {
                nombre.push(play.getNombre());
              }
            });
          });
        });
        this.imprimirPlaylist([...new Set(nombre)]);
      } else {
        this.visualizarLista();
      }
    });
  }


  filtrosCanciones(opcion: string, value: number): string[] {
    const aux: string[] = [];
    [...this.generos].forEach((genero) => {
      [...genero.getCanciones()].forEach((cancion) => {
        if (cancion.getAutor() === opcion) {
          if (value === filterType.titulo) {
            aux.push(cancion.getNombre());
          }
          if (value === filterType.single && cancion.getSingle()) {
            aux.push(cancion.getNombre());
          }
          if (value === filterType.reproducciones) {
            aux.push(String(cancion.getReproducciones()));
          }
        }
      });
    });
    if (value === filterType.reproducciones) {
      return this.ordenar([...new Set(aux)]);
    } else {
      return [...new Set(aux)].sort();
    }
  }

  ordenar(numeros: string[]): string[] {
    let aux: string;
    for (let i = 0; i < numeros.length; i++) {
      for (let j = i + 1; j < numeros.length; j++) {
        if (Number(numeros[i]) > Number(numeros[j])) {
          aux = numeros[i];
          numeros[i] = numeros[j];
          numeros[j] = aux;
        }
      }
    }
    
    return numeros;
  }


  filtrosAlbumes(opcion:string, value: number): string[] {  
    const aux: string[] = [];
    [...this.generos].forEach((genero) => {
      [...genero.getAlbumes()].forEach((album) => {
        if (album.getAutor() === opcion) {
          if (value === filterType.titulo) {
            aux.push(album.getNombre());
          }
          if (value === filterType.fechaPublicacion) {
            aux.push(String(album.getFechaPublicacion()));
          }
          if (value === filterType.reproducciones) {
            aux.push(String(album.calcularReproduccionesTotales()));
          }
        }
      });
    });
    if (value !== filterType.titulo) {
      return this.ordenar([...new Set(aux)]);
    } else {
      return [...new Set(aux)].sort();
    }
  }


  filtrosPlayList(opcion:string, value: number): string[] {  
    const aux: string[] = [];
    [...this.playList].forEach((play) => {
      [...play.getCanciones()].forEach((cancion) => {
        if (cancion.getAutor() === opcion) {
          if (value === filterType.titulo) {
            aux.push(play.getNombre());
          }
          if (value === filterType.reproducciones) {
            aux.push(String(play.calcularReproduccionesTotales()));
          }
        }
      });
    });
    if (value === filterType.reproducciones) {
      return this.ordenar([...new Set(aux)]);
    } else {
      return [...new Set(aux)].sort();
    }
  }

  
  fechaPublicacion(opcion: any): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "fechaPublicacion",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
      default: "ASC",
    }]).then((answers) => {
      let publicaciones: string[] = [];
      const nombre: string[] = [];

      if (answers["fechaPublicacion"] !== "Salir") {
        if (answers["fechaPublicacion"] === "ASC") {
          publicaciones = this.filtrosAlbumes(opcion, filterType.fechaPublicacion);
        } else {
          publicaciones = this.filtrosAlbumes(opcion, filterType.fechaPublicacion).reverse();
        }
        [...publicaciones].forEach((element) => {
          [...this.generos].forEach((genero) => {
            [...genero.getAlbumes()].forEach((album) => {
              if (album.getAutor() === opcion && album.getFechaPublicacion() === +element) {
                nombre.push(album.getNombre());
              }
            });
          });
        });
        this.imprimirAlbumes([...new Set(nombre)]);
      } else {
        this.visualizarLista();
      }
    });
  }


  imprimirCanciones(aux: string[], value:boolean = true): void {
    let print;
    let primeraVez: boolean = false;
    if (aux.length === 0) {
      console.log("No hay canciones disponibles con los requisitos especificados");
    } else {
      aux.forEach((cancion) => {
        [...this.generos].forEach((genero) => {
          [...genero.getCanciones()].forEach((cancionGenero) => {
            if (cancion === cancionGenero.getNombre() && !primeraVez) {
              print = new PrintCancion(cancionGenero);
              print.print();
              primeraVez = true;
            }
          });
        });
        primeraVez = false;
      });
    }
    if (value) {
      this.visualizarSalir();
    } else {
      this.visualizarAvanzadoSalir(avanzadaPlaylist.playListInfoAvanzada);
    }
  }


  imprimirAlbumes(aux: string[]): void {
    let print;
    let primeraVez: boolean = false;
    if (aux.length === 0) {
      console.log("No hay albumes disponibles con los requisitos especificados");
    } else {
      aux.forEach((cancion) => {
        [...this.generos].forEach((genero) => {
          [...genero.getAlbumes()].forEach((albumGenero) => {
            if (cancion === albumGenero.getNombre() && !primeraVez) {
              print = new PrintAlbum(albumGenero);
              primeraVez = true;
              print.print();
            }
          });
        });
        primeraVez = false;
      });
    }
    this.visualizarSalir();
  }

  imprimirPlaylist(aux: string[]): void {
    let print;
    let primeraVez: boolean = false;
    if (aux.length === 0) {
      console.log("No hay playlists disponibles con los requisitos especificados");
    } else {
      aux.forEach((elemento) => {
        [...this.playList].forEach((playlist) => {
          if (elemento === playlist.getNombre() && !primeraVez) {
            print = new PrintPlayList(playlist);
            primeraVez = true;
            print.print();
          }
        });
        primeraVez = false;
      });
    }
    this.visualizarSalir();
  }

  inicioPlayList(): void {
    console.clear();
    inquirer.prompt([{
      name: "nombre",
      message: "Nombre de usuario:",
      validate: (value: any) => {
        if (value === "SYSTEM") {
          return "Ese nombre está reservado, pruebe con otro!!!";
        }
        return true;
      },
    }]).then((answers) => {  
      this.usuarioNick = answers["nombre"];
      this.gestionAvanzadaPlayList();
    });
  }

  gestionAvanzadaPlayList(): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "opcion",
      message: "Eliga una opción:",
      choices: ["Informarción básica de una playlist", "Información avanzada de una playlist", "Gestionar playlist", "Salir"],
    }]).then((answers) => {
      switch (answers["opcion"]) {
        case "Informarción básica de una playlist":
          this.playListInfoBasica();
          break;
        case "Información avanzada de una playlist":
          this.playListInfoAvanzada();
          break;
        case "Gestionar playlist":
          this.playListGestion();
          break;
        case "Salir":
          this.usuarioNick = "";
          this.run();
          break;
      }
    });
  }

  playListInfoBasica() {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "opcion",
      message: "Que playlist desea ver:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchPlayList, input),
    }]).then((answers) => {
      if (answers["opcion"] !== "Salir") {
        [...this.playList].forEach((playlist) => {
          if (playlist.getNombre() === answers["opcion"]) {
            console.log(`Nombre: ${playlist.getNombre()}`);
            console.log(`Generos: ${playlist.getGeneros().join(', ')}`);
            console.log(`Duración: ${playlist.getDuracion().hor}h ${playlist.getDuracion().min}min`);
          }
        });
            
        this.visualizarAvanzadoSalir(avanzadaPlaylist.playListInfoBasica);
      } else {
        this.gestionAvanzadaPlayList();
      }
    });
  }


  playListInfoAvanzada() {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "opcion",
      message: "Que playlist desea navegar",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchPlayList, input),
    },
    {
      type: "list",
      name: "filtro",
      message: "Que filtro desea aplicar a las canciones:",
      choices: ["Titulo", "Artista/Grupo", "Año de Lanzamiento", "duracion", "Genero", "Reproducciones", "Salir"],

    }]).then((answers) => {
      if (answers["opcion"] !== "Salir") {
        switch (answers["filtro"]) {
          case "Titulo":
            this.filtradoAvanzadoTiTulo(answers["opcion"]);
            break;
          case "Artista/Grupo":
            this.filtradoAvanzadoArtistaGrupo(answers["opcion"]);
            break;
          case "Año de Lanzamiento":
            this.filtradoAvanzadoLanzamiento(answers["opcion"]);
            break;
          case "duracion":
            this.filtradoAvanzadoDuracion(answers["opcion"]);
            break;
          case "Genero":
            this.filtradoAvanzadoGenero(answers["opcion"]);
            break;
          case "Reproducciones":
            this.filtradoAvanzadoReproducciones(answers["opcion"]);
            break;
        }
        this.visualizarAvanzadoSalir(avanzadaPlaylist.playListInfoAvanzada);
      } else {
        this.gestionAvanzadaPlayList();
      }
    });
  }

  filtradoAvanzadoTiTulo(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroTitulo",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
      default: "ASC",
    }]).then((answers) => {
      switch (answers["filtroTitulo"]) {
        case "ASC":
          this.imprimirCanciones(this.filtrosAvanzadoPlayList(opcion, filterType.titulo), false);
          break;
        case "DESC":
          this.imprimirCanciones(this.filtrosAvanzadoPlayList(opcion, filterType.titulo).reverse(), false);
          break;
        case "Salir":
          this.visualizarAvanzadoSalir(avanzadaPlaylist.playListInfoAvanzada);
          break;
      }
    });
  }

  filtradoAvanzadoArtistaGrupo(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroArtistaGrupo",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
    }]).then((answers) => {
      let artistaGrupos: string[] = [];
      const nombreCancion: string[] = [];
      if (answers["filtroArtistaGrupo"] !== "Salir") {
        if (answers["filtroArtistaGrupo"] === "ASC") {
          artistaGrupos = this.filtrosAvanzadoPlayList(opcion, filterType.nombreGrupoArtista);
        } else {
          artistaGrupos = this.filtrosAvanzadoPlayList(opcion, filterType.nombreGrupoArtista).reverse();
        }
        [...artistaGrupos].forEach((elemento) => {
          [...this.playList].forEach((playlist) => {
            if (playlist.getNombre() === opcion) {
              [...playlist.getCanciones()].forEach((cancion) => {
                if (cancion.getAutor() === elemento) {
                  nombreCancion.push(cancion.getNombre());
                }
              });
            }
          });
        });
        this.imprimirCanciones(nombreCancion, false);
      } else {
        this.visualizarAvanzadoSalir(avanzadaPlaylist.playListInfoAvanzada);
      }
    });
  }

  filtradoAvanzadoLanzamiento(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroLanzamiento",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
    }]).then((answers) => {
      let fechaspublicacion: string[] = [];
      const nombreCancion: string[] = [];
      if (answers["filtroLanzamiento"] !== "Salir") {
        if (answers["filtroLanzamiento"] === "ASC") {
          fechaspublicacion = this.filtrosAvanzadoPlayList(opcion, filterType.fechaPublicacion);
        } else {
          fechaspublicacion = this.filtrosAvanzadoPlayList(opcion, filterType.fechaPublicacion).reverse();
        }
        [...fechaspublicacion].forEach((elemento) => {
          [...this.generos].forEach((genero) => {
            [...genero.getAlbumes()].forEach((album) => {
              [...album.getCanciones()].forEach((cancion) => {
                if (String(album.getFechaPublicacion()) === elemento) {
                  nombreCancion.push(cancion.getNombre());
                }
              });
            });
          });
        });
        this.imprimirCanciones(nombreCancion, false);
      } else {
        this.visualizarAvanzadoSalir(avanzadaPlaylist.playListInfoAvanzada);
      }
    });
  }

  filtradoAvanzadoDuracion(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroDuracion",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
    }]).then((answers) => {
      let tiempoTotal: string[] = [];
      const nombreCancion: string[] = [];
      if (answers["filtroDuracion"] !== "Salir") {
        if (answers["filtroDuracion"] === "ASC") {
          tiempoTotal = this.filtrosAvanzadoPlayList(opcion, filterType.duracion);
        } else {
          tiempoTotal = this.filtrosAvanzadoPlayList(opcion, filterType.duracion).reverse();
        }
        [...tiempoTotal].forEach((elemento) => {
          [...this.playList].forEach((playlist) => {
            if (playlist.getNombre() === opcion) {
              [...playlist.getCanciones()].forEach((cancion) => {
                if (cancion.devolverTiempoTotal() === elemento) {
                  nombreCancion.push(cancion.getNombre());
                }
              });
            }
          });
        });
        this.imprimirCanciones(nombreCancion, false);
      } else {
        this.visualizarAvanzadoSalir(avanzadaPlaylist.playListInfoAvanzada);
      }
    });
  }

  filtradoAvanzadoGenero(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroGenero",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
    }]).then((answers) => {
      let generos: string[] = [];
      const nombreCancion: string[] = [];
      if (answers["filtroGenero"] !== "Salir") {
        if (answers["filtroGenero"] === "ASC") {
          generos = this.filtrosAvanzadoPlayList(opcion, filterType.genero);
        } else {
          generos = this.filtrosAvanzadoPlayList(opcion, filterType.genero).reverse();
        }
        [...generos].forEach((elemento) => {
          [...this.playList].forEach((playlist) => {
            if (playlist.getNombre() === opcion) {
              [...playlist.getCanciones()].forEach((cancion) => {
                if (cancion.getGeneros()[0] === elemento) {
                  nombreCancion.push(cancion.getNombre());
                }
              });
            }
          });
        });
        this.imprimirCanciones(nombreCancion, false);
      } else {
        this.visualizarAvanzadoSalir(avanzadaPlaylist.playListInfoAvanzada);
      }
    });
  }

  filtradoAvanzadoReproducciones(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroReproducciones",
      message: "Eliga una opción:",
      choices: ["ASC", "DESC", "Salir"],
    }]).then((answers) => {
      let reproducciones: string[] = [];
      const nombreCancion: string[] = [];
      if (answers["filtroReproducciones"] !== "Salir") {
        if (answers["filtroReproducciones"] === "ASC") {
          reproducciones = this.filtrosAvanzadoPlayList(opcion, filterType.reproducciones);
        } else {
          reproducciones = this.filtrosAvanzadoPlayList(opcion, filterType.reproducciones).reverse();
        }
        [...reproducciones].forEach((elemento) => {
          [...this.playList].forEach((playlist) => {
            if (playlist.getNombre() === opcion) {
              [...playlist.getCanciones()].forEach((cancion) => {
                if (cancion.getReproducciones() === Number(elemento)) {
                  nombreCancion.push(cancion.getNombre());
                }
              });
            }
          });
        });
        this.imprimirCanciones(nombreCancion, false);
      } else {
        this.visualizarAvanzadoSalir(avanzadaPlaylist.playListInfoAvanzada);
      }
    });
  }
  
  // REVISAR
  filtrosAvanzadoPlayList(nombre:string, tipoFiltro: number): string[] {  
    const aux: string[] = [];
    [...this.playList].forEach((playlist) => {
      if (playlist.getNombre() === nombre) {
        [...playlist.getCanciones()].forEach((cancion) => {
          switch (tipoFiltro) {
            case filterType.titulo:
              aux.push(cancion.getNombre());
              break;
            case filterType.nombreGrupoArtista:
              aux.push(cancion.getAutor());
              break;
            case filterType.fechaPublicacion:
              const nombreAux = cancion.getAutor();
              [...this.generos].forEach((genero) => {
                [...genero.getAlbumes()].forEach((album) => {
                  [...album.getCanciones()].forEach((cancion) => {
                    if (cancion.getAutor() === nombreAux) {
                      aux.push(String(album.getFechaPublicacion()));
                    }
                  });
                });
              });    
              break;
            case filterType.duracion:
              aux.push(String(cancion.devolverTiempoTotal()));
              break;
            case filterType.genero:
              aux.push(cancion.getGeneros()[0]);
              break;
            case filterType.reproducciones:
              aux.push(String(cancion.getReproducciones()));
              break;
          }
        });
      }
    });
    if (tipoFiltro === filterType.reproducciones || tipoFiltro === filterType.fechaPublicacion || tipoFiltro === filterType.duracion) {
      return this.ordenar([...new Set(aux)]);
    } else {
      return [...new Set(aux)].sort();
    }
  }

  visualizarAvanzadoSalir(opcion: number): void {
    inquirer.prompt([{
      type: "confirm",
      name: "confirmacion",
      message: "¿Desea continuar?",
    }]).then((answers) => {
      if (answers["confirmacion"]) {
        switch (opcion) {
          case avanzadaPlaylist.playListInfoBasica:
            this.playListInfoBasica();
            break;
          case avanzadaPlaylist.playListInfoAvanzada:
            this.playListInfoAvanzada();
          default:
            break;
        }
      } else {
        this.gestionAvanzadaPlayList();
      }
    });
  }

  playListGestion() {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "comando",
      message: "¿Qué desea hacer?",
      choices: ["Crear una playlist a partir de otra", "Crear una playlist desde 0", "Modificar una playlist", "Eliminar una playlist", "Salir"],
    }]).then((answers) => {
      switch (answers["comando"]) {
        case "Crear una playlist a partir de otra":
          this.crearPlayListExistente();
          break;
        case "Crear una playlist desde 0":
          this.crearPlayListDesde0();
          break;
        case "Modificar una playlist":
          this.borrarPlayList();
          break;
        case "Eliminar una playlist":
          this.modificarPlayList();
          break;
        case "Salir":
          this.gestionAvanzadaPlayList();
          break;
      }
    });
  }
  
  crearPlayListExistente() {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Seleccione la playlist de la que partir:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchPlayList, input),
    },
    {
      name: "nuevoNombre",
      message: "Nombre de la nueva playlist:",
    },
    {
      name: "cantidadCanciones",
      message: "¿Cuántas canciones quiere añadir?:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "La cantidad debe ser un número";
        }
        return true;
      },
    }]).then((answers) => {
      if (this.searchPlayList.indexOf(answers["nuevoNombre"]) !== -1) {
        throw new Error("Ya existe una playlist con ese nombre");
      }

      let play: PlayList = new PlayList({nombre: "", canciones: new Coleccion(), duracion: {hor: 0, min: 0}, generos: [], creador: ""});

      [...this.playList].forEach((playlist) => {
        if (answers["nombre"] === playlist.getNombre()) {
          play = playlist;
          play.setCreador(this.usuarioNick);
          play.setNombre(answers["nuevoNombre"]);
        }
      });
      
      this.playList.addElemento(play);
      this.actualizarSearchPlalist();

      this.añadirCancionPlayList(play.getNombre(), parseInt(answers["cantidadCanciones"]) - 1);
    }).catch((error) => {
      console.log(error.message);
      setTimeout(() => {
        this.playListGestion();
      }, 3000);
    });
  }

  crearPlayListDesde0() {
    console.clear();
    inquirer.prompt([{
      name: "nuevoNombre",
      message: "Nombre de la nueva playlist:",
    },
    {
      name: "cantidadCanciones",
      message: "¿Cuántas canciones quiere añadir?:",
      validate: (value: any) => {
        const regex: RegExp = /^[0-9]*$/;
        if (!regex.test(value)) {
          return "La cantidad debe ser un número";
        }
        return true;
      },
    }]).then((answers) => {
      if (this.searchPlayList.indexOf(answers["nuevoNombre"]) !== -1) {
        throw new Error("Ya existe una playlist con ese nombre");
      }

      const play: PlayList = new PlayList({nombre: answers["nuevoNombre"], canciones: new Coleccion(), duracion: {hor: 0, min: 0}, generos: [], creador: this.usuarioNick});
      
      this.playList.addElemento(play);
      this.actualizarSearchPlalist();

      this.añadirCancionPlayList(play.getNombre(), parseInt(answers["cantidadCanciones"]) - 1);
    }).catch((error) => {
      console.log(error.message);
      setTimeout(() => {
        this.playListGestion();
      }, 3000);
    });
  }

  borrarPlayList() {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre de la playlist:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchPlayList, input),
    }]).then((answers) => {
      [...this.playList].forEach((playlist) => {
        if (answers["nombre"] === playlist.getNombre()) {
          if (this.usuarioNick === playlist.getCreador()) {
            this.playList.removeElemento(answers["nombre"]);
          } else {
            throw new Error("No tiene permisos para eliminar esta playlist");
          }
        }
      });
      
      this.dataBase.almacenarInformacion();
      this.actualizarSearchPlalist();
      this.playListGestion();
    }).catch((error) => {
      console.log(error.message);
      setTimeout(() => {
        this.playListGestion();
      }, 3000);
    });
  }

  modificarPlayList() {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre de la playlist:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchPlayList, input),
    }]).then((answers) => {
      this.gestionModificarPlayList(answers["nombre"]);
      [...this.playList].forEach((playlist) => {
        if (answers["nombre"] === playlist.getNombre()) {
          if (this.usuarioNick !== playlist.getCreador()) {
            throw new Error("No tiene permisos para modificar esta playlist");
          }
        }
      });
      this.gestionModificarPlayList(answers["nombre"]);
    }).catch((error) => {
      console.log(error.message);
      setTimeout(() => {
        this.playListGestion();
      }, 3000);
    });
  }

  gestionModificarPlayList(nombre: string) {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "comando",
      message: "¿Qué desea hacer?",
      choices: ["Cambiar nombre", "Eliminar canción", "Añadir canción", "Salir"],
      validate: (value: any) => {
        if (this.searchCancionesPlaylist(nombre) === [] && value === "Eliminar canción") {
          return "No se puede eliminar un elemento de una playlist vacía";
        }
        return true;
      },
    }]).then((answers) => {
      switch (answers["comando"]) {
        case "Cambiar nombre":
          this.modificarNombrePlayList(nombre);
          break;
        case "Eliminar canción":
          this.eliminarCancionPlayList(nombre);
          break;
        case "Añadir canción":
          this.añadirCancionPlayList(nombre);
          break;
        case "Salir":
          this.playListGestion();
          break;
      }
    });
  }
  
  modificarNombrePlayList(nombre: string) {
    console.clear();
    inquirer.prompt([{
      name: "nombreNuevo",
      message: "Nuevo nombre de la playlist:",
    }]).then((answers) => {
      [...this.playList].forEach((playlist) => {
        if (playlist.getNombre() === nombre) {
          playlist.setNombre(answers["nombreNuevo"]);
        }
      });

      this.dataBase.almacenarInformacion();
      this.actualizarSearchPlalist();
      this.playListGestion();
    });
  }

  eliminarCancionPlayList(nombre: string) {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre del canción a elimianr:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchCancionesPlaylist(nombre), input),
    }]).then((answers) => {
      [...this.playList].forEach((playlist) => {
        if (playlist.getNombre() === nombre) {
          playlist.eliminarCancion(answers["nombre"]);
        }
      });
      
      this.dataBase.almacenarInformacion();
      this.playListGestion();
    });
  }

  añadirCancionPlayList(nombre: string, contador: number = 0) {
    console.clear();
    inquirer.prompt([{
      type: "autocomplete",
      name: "nombre",
      message: "Nombre del canción a añadir:",
      source: (answersSoFar: any, input: string) => this.searchStates(this.searchCanciones.filter((elemento) => this.searchCancionesPlaylist(nombre).indexOf(elemento) === -1), input),
    }]).then((answers) => {
      let primeraVez = false;
      [...this.playList].forEach((playlist) => {
        if (playlist.getNombre() === nombre) {
          [...this.generos].forEach((genero) => {
            [...genero.getCanciones()].forEach((cancion) => {
              if (cancion.getNombre() === answers["nombre"] && !primeraVez) {
                playlist.addCancion(cancion);
                primeraVez = true;
              }
            });
          });
        }
      });
      if (contador > 0) {
        this.añadirCancionPlayList(nombre, contador - 1);
      } else {
        this.dataBase.almacenarInformacion();
        this.playListGestion();
      }
    });
  }
}
