import {Coleccion} from "./coleccionGenerica";
import {GenerosMusicales, PrintGenerosMusicales} from "./generosMusicales";
import inquirer from 'inquirer';
import {PrintCancion, Cancion} from "./cancion";
import {PrintAlbum, Album} from "./album";
import {PrintArtista, Artista} from "./artistas";
import {PrintPlayList, PlayList} from "./playlist";
import {PrintGrupo, Grupo} from "./grupo";
import {Gestor} from "./gestor";

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
    reproduccionesTotales,
    fechaPublicacion,
}


export class Interfaz {
  private static interfaz: Interfaz;
  private searchArtistas: string[];
  private searchGrupos: string[];
  private searchAlbumes: string[];
  private searchCanciones: string[];
  private searchGeneros: string[];
  private generos: Coleccion<GenerosMusicales>;
  private gestor: Gestor = Gestor.getGestorInstance();
  private constructor() { }

  public static getInterfazInstance(): Interfaz {
    if (!Interfaz.interfaz) {
      Interfaz.interfaz = new Interfaz();
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
    this.actualizarSearchArtistasGrupos();
    this.actualizarSearchAlbumes();
    this.actualizarSearchCanciones();
  }

  setDataGestor(playList: Coleccion<PlayList>): void {
    this.gestor.setPlayList(playList);
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
          this.visualizarLista();
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

      this.actualizarSearchGeneros();
      this.modificar();
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

      this.actualizarSearchArtistasGrupos();
      this.modificar();
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

      this.añadir();
    }).catch((error) => {
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }

  añadirGrupo(): void {
    console.clear();
    const error = 0;
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
        console.log("¡¡¡¡¡ERROR: Géneros incorrectos!!!!!");
        throw error;
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

      this.actualizarSearchArtistasGrupos();
      this.añadir();
    }).catch((error) => {
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }


  añadirArtista(): void {
    console.clear();
    const error = 0;
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
        console.log("¡¡¡¡¡ERROR: Géneros incorrectos!!!!!");
        throw error;
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
      
      this.actualizarSearchArtistasGrupos();
      this.añadir();
    }).catch((error) => {
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }

  añadirAlbum(): void {
    console.clear();
    const error = 0;
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
        console.log("¡¡¡¡¡ERROR: Géneros incorrectos!!!!!");
        throw error;
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
      
      this.actualizarSearchAlbumes();
      this.añadirCancion(false, answers["nombre"], parseInt(answers["canciones"]) - 1);
    }).catch((error) => {
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }

  añadirCancion(single: boolean = true, nombreAlbum: string = "", cantidad: number = 0): void {
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
        console.log("¡¡¡¡¡ERROR: Géneros incorrectos!!!!!");
        throw error;
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

      this.actualizarSearchCanciones();
      if (cantidad) {
        this.añadirCancion(single, nombreAlbum, cantidad - 1);
      } else {
        this.añadir();
      }
    }).catch((error) => {
      setTimeout(() => {
        this.añadir();
      }, 3000);
    });
  }
  
  // Elegir Artista o Grupo
  visualizarLista(): void {
    console.clear();
    inquirer.prompt([{  
      type: "autocomplete",
      name: "comando",
      message: "¿Que Artistas|Grupos desea visualizar?",
      source: (answersSoFar: any, input: string) => this.searchStates([...this.searchArtistas, ...this.searchGrupos], input),
    }, 
    {
      type: "list",
      name: "opcion",
      message: "Que desea ver respecto a ...",
      choices: ["Albumes", "Canciones", "Playlists", "Salir"],
    }]).then((answers) => {
      switch (answers["opcion"]) {
        case "Albumes":
          this.visualizarAlbumes(answers["comando"]);
          break;
        case "Canciones":
          this.visualizarCanciones(answers["comando"]);
          break;
        case "Playlists":
          this.visualizarPlaylist(answers["comando"]);
          break;
        case "Salir":
          this.run();
          break;
      }
    });
  }

  visualizarCanciones(opcion: string): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "opciondeFiltrado",
      message: "Que filtro quiere aplicar",
      choices: ["Titulo", "Single", "Reproducciones", "Salir"],
      default: "Titulo",
    }]).then((answers) => {
      switch (answers["opciondeFiltrado"]) {
        case "Titulo":
          this.filtradoTiTulo(opcion, visualizarEnum.canciones);
          break;
        case "Single":
          this.filtradoSingle(opcion, visualizarEnum.canciones);
          break;
        case "Reproducciones":
          this.filtradoReproducciones(opcion, visualizarEnum.canciones);
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
      message: "Que filtro quiere aplicar",
      choices: ["Titulo", "Año Lanzamiento", "Reproducciones Totales", "Salir"],
      default: "Titulo",
    }]).then((answers) => {
      switch (answers["opciondeFiltrado"]) {
        case "Titulo":
          this.filtradoTiTulo(opcion, visualizarEnum.albumes);
          break;
        case "Año Lanzamiento":
          this.fechaPublicacion(opcion, visualizarEnum.albumes);
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
      message: "Que filtro quiere aplicar",
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
      message: "Eliga Una Opción",
      choices: ["ASC", "DESC", "Salir"],
      default: "ASC",
    }]).then((answers) => {
      switch (answers["filtroTitulo"]) {
        case "ASC":
          if (tipo === visualizarEnum.canciones) {
            console.log("Estamos entrando en filtro Canciones");
            this.imprimirCanciones(this.filtrosCanciones(opcion, filterType.titulo));
          }
          if (tipo === visualizarEnum.albumes) {
            this.imprimirAlbumes(this.filtrosAlbumes(opcion, filterType.titulo));
          }
          if (tipo === visualizarEnum.playList) {
            // this.imprimirPlaylist(this.filtrosPlaylist(opcion, filterType.titulo).sort());
          }
          break;
        case "DESC":
          if (tipo === visualizarEnum.canciones) {
            this.imprimirCanciones(this.filtrosCanciones(opcion, filterType.titulo).reverse());
          }
          if (tipo === visualizarEnum.albumes) {
            this.imprimirAlbumes(this.filtrosAlbumes(opcion, filterType.titulo).reverse());
          }
          break;
        case "Salir":
          this.visualizarLista();
          break;
      }
    });
  }

  filtradoSingle(opcion: string, tipo: number): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroSingle",
      message: "Eliga Una Opción",
      choices: ["SI", "NO", "Salir"],
      default: "SI",
    }]).then((answers) => {
      let aux: any[] = [];
      switch (answers["filtroSingle"]) {
        case "SI":
          aux = this.filtrosCanciones(opcion, filterType.single);
          if (aux.length === 0) {
            console.log("No hay canciones con este filtro");
          } else {
            this.imprimirCanciones(aux);
          }
          break;
        case "NO":
          this.imprimirCanciones(this.filtrosCanciones(opcion, filterType.titulo));
          break;
        case "Salir":
          this.visualizarLista();
          break;
      }
    });
  }

  filtradoReproducciones(opcion: string, tipo:number): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroReproduciones",
      message: "Eliga Una Opción",
      choices: ["ASC", "DESC", "Salir"],
      default: "ASC",
    }]).then((answers) => {
      let reproducciones: string[] = [];
      const nombre: string[] = [];
      let primeraVez: boolean = false;
      if (answers["filtroReproduciones"] === "ASC") {
        reproducciones = this.filtrosCanciones(opcion, filterType.reproducciones);
      } else {
        reproducciones = this.filtrosCanciones(opcion, filterType.reproducciones).reverse();
      }
      [...reproducciones].forEach((element) => {
        [...this.generos].forEach((genero) => {
          [...genero.getCanciones()].forEach((cancion) => {
            if (cancion.getAutor() === opcion && cancion.getReproducciones() === +element && !primeraVez) {
              nombre.push(cancion.getNombre());
              primeraVez = true;
            }
          });
        });
        primeraVez = false;
      });
      this.imprimirCanciones(nombre);
    });
  }
  // JOSEPH QUEDA POR HACER EL FILTRO REPRODUCCIONES TOTALES
  filtradoReproduccionesTotales(opcion: any, tipo:number): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "filtroReproducionesTotales",
      message: "Eliga Una Opción",
      choices: ["ASC", "DESC", "Salir"],
      default: "ASC",
    }]).then((answers) => {
      switch (answers["filtroReproducionesTotales"]) {
        case visualizarEnum.albumes:
          if (tipo === visualizarEnum.albumes) {
            console.log(this.filtrosAlbumes(opcion, filterType.reproduccionesTotales).sort());
            this.imprimirAlbumes(this.filtrosAlbumes(opcion, filterType.reproduccionesTotales).sort());
          }
          if (tipo === visualizarEnum.playList) {
            // this.imprimirPlaylist(this.filtrosPlaylist(opcion, filterType.reproduccionesTotales).sort());
          }
          inquirer.prompt([{
            message: "Desea volver a la lista principal?",
            type: "confirm",
            name: "confirmar",
            default: true,
          }]).then((answers) => {
            if (answers["confirmar"]) {
              this.visualizarLista();
            }
          });
          console.log("HOLAAAAAAAAAAAAA");
          break;
        case "DESC":
          if (tipo === visualizarEnum.albumes) {
            this.imprimirAlbumes(this.filtrosAlbumes(opcion, filterType.reproduccionesTotales).sort().reverse());
          }
          if (tipo === visualizarEnum.playList) {
            // this.imprimirPlaylist(this.filtrosPlaylist(opcion, filterType.reproduccionesTotales).sort().reverse());
          }
          break;
        case "Salir":
          this.visualizarLista();
          break;
      }
    });
  }

  fechaPublicacion(opcion: any, tipo:number): void {
    console.clear();
    inquirer.prompt([{
      type: "list",
      name: "fechaPublicacion",
      message: "Eliga Una Opción",
      choices: ["ASC", "DESC", "Salir"],
      default: "ASC",
    }]).then((answers) => {
      let publicaciones: string[] = [];
      const nombre: string[] = [];
      let primeraVez: boolean = false;
      if (answers["fechaPublicacion"] === "ASC") {
        publicaciones = this.filtrosAlbumes(opcion, filterType.fechaPublicacion);
      } else {
        publicaciones = this.filtrosAlbumes(opcion, filterType.fechaPublicacion).reverse();
      }
      [...publicaciones].forEach((element) => {
        [...this.generos].forEach((genero) => {
          [...genero.getAlbumes()].forEach((album) => {
            if (album.getAutor() === opcion && album.getFechaPublicacion() === +element && !primeraVez) {
              nombre.push(album.getNombre());
              primeraVez = true;
            }
          });
        });
        primeraVez = false;
      });
      this.imprimirAlbumes(nombre);
    });
  }

  imprimirCanciones(aux: string[]): void {
    let print;
    let primeraVez: boolean = false;
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

  imprimirAlbumes(aux: string[]): void {
    let print;
    let primeraVez: boolean = false;
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

  imprimirPlaylist(aux: string[]): void {
    let print;
    let primeraVez: boolean = false;
    aux.forEach((elemento) => {
      [...this.gestor.getPlayList()].forEach((playlist) => {
        if (elemento === playlist.getNombre() && !primeraVez) {
          print = new PrintPlayList(playlist);
          primeraVez = true;
          print.print();
        }
      });
      primeraVez = false;
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
      aux.sort();
    }
    return [...new Set(aux)].sort(); // Sale Ordenado
  }

  filtrosAlbumes(opcion:string, value: number): any[] {  
    let aux: any[] = [];
    [...this.generos].forEach((genero) => {
      [...genero.getAlbumes()].forEach((album) => {
        if (album.getAutor() === opcion) {
          if (value === filterType.titulo) {
            aux.push(album.getNombre());
          }
          if (value === filterType.fechaPublicacion) {
            aux.push(album.getFechaPublicacion());
          }
          if (value === filterType.reproduccionesTotales) {
            aux.push(album.calcularReproduccionesTotales());
          }
        }
      });
    });
    if (value === filterType.fechaPublicacion || value === filterType.reproduccionesTotales) {
      aux = aux.sort((a, b) => {
        return b[1] - a[1];
      });
    }
    return [...new Set(aux)].sort(); // Sale Ordenado
  }
}
