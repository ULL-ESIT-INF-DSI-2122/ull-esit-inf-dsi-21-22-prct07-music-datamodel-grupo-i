import {Album} from "../Estructura/album";
import {Artista} from "../Estructura/artistas";
import {Cancion} from "../Estructura/cancion";
import {Coleccion} from "../Estructura/coleccionGenerica";
import {GenerosMusicales} from "../Estructura/generosMusicales";
import {Grupo} from "../Estructura/grupo";
import {PlayList} from "../Estructura/playlist";

// Autores:
/* AC/DC = Bayside y John Lennon
Pink Floyd = Stephen Malkmus y Gunna
The Beatles = George Harrison y Paul McCartney
Queen = Breach y John Lennon
Iron Maiden = Mesita y Duki */

// 5 de tipo Rock
const cancion1 = new Cancion({nombre: "Ular SciencE", autor: ["Bayside"], 
  duracion: {min: 2, seg: 4}, generos: ["Pop", "Rock"], single: true, reproducciones: 200});
const cancion2 = new Cancion({nombre: "Starting Over", autor: ["John Lennon"],
  duracion: {min: 3, seg: 40}, generos: ["Rock"], single: false, reproducciones: 10000});
const cancion3 = new Cancion({nombre: "J Smoov", autor: ["Stephen Malkmus"],
  duracion: {min: 2, seg: 50}, generos: ["Rock"], single: false, reproducciones: 5000});
const cancion4 = new Cancion({nombre: "P Power", autor: ["Gunna"], 
  duracion: {min: 2, seg: 4}, generos: ["Rock"], single: false, reproducciones: 200});
const cancion5 = new Cancion({nombre: "Jack", autor: ["Bayside", "John Lennon"],
  duracion: {min: 4, seg: 0}, generos: ["Rock", "Trap"], single: false, reproducciones: 50000});

// 5 de tipo Pop
const cancion6 = new Cancion({nombre: "Jack Rabbit", autor: ["Breach"], 
  duracion: {min: 2, seg: 45}, generos: ["Pop", "Drill"], single: false, reproducciones: 20500});
const cancion7 = new Cancion({nombre: "K", autor: ["Mesita", "Duki"],
  duracion: {min: 1, seg: 34}, generos: ["Pop"], single: false, reproducciones: 100});
const cancion8 = new Cancion({nombre: "M.vlopp", autor: ["George Harrison", "Paul McCartney"],
  duracion: {min: 7, seg: 15}, generos: ["Pop"], single: false, reproducciones: 210});
const cancion9 = new Cancion({nombre: "Kali Ma", autor: ["Mesita"], 
  duracion: {min: 5, seg: 0}, generos: ["Pop"], single: true, reproducciones: 234000});  
const cancion10 = new Cancion({nombre: "Ndael", autor: ["George Harrison", "Paul McCartney"],
  duracion: {min: 12, seg: 23}, generos: ["Pop", "Trap"], single: false, reproducciones: 56700});
  
// 5 de tipo Trap
const cancion11 = new Cancion({nombre: "Karate Chop", autor: ["Duki"], 
  duracion: {min: 1, seg: 32}, generos: ["Trap", "Metal"], single: false, reproducciones: 5460});
const cancion12 = new Cancion({nombre: "Kate", autor: ["Breach", "John Lennon"],
  duracion: {min: 2, seg: 22}, generos: ["Trap"], single: false, reproducciones: 5320});
const cancion13 = new Cancion({nombre: "Pacific Rim", autor: ["George Harrison"],
  duracion: {min: 7, seg: 15}, generos: ["Trap"], single: false, reproducciones: 210});
const cancion14 = new Cancion({nombre: "Pack Up", autor: ["Paul McCartney"], 
  duracion: {min: 6, seg: 35}, generos: ["Trap"], single: true, reproducciones: 123});
const cancion15 = new Cancion({nombre: "Pacer", autor: ["Stephen Malkmus", "Gunna"],
  duracion: {min: 5, seg: 67}, generos: ["Pop", "Trap"], single: false, reproducciones: 1245});

// 5 de tipo Metal
const cancion16 = new Cancion({nombre: "LOVE", autor: ["Stephen Malkmus", "Gunna"], 
  duracion: {min: 1, seg: 52}, generos: ["Metal"], single: false, reproducciones: 2458});
const cancion17 = new Cancion({nombre: "L.A.", autor: ["Gunna"],
  duracion: {min: 3, seg: 5}, generos: ["Metal"], single: false, reproducciones: 23478});
const cancion18 = new Cancion({nombre: "La Rosa", autor: ["Bayside", "John Lennon"],
  duracion: {min: 1, seg: 15}, generos: ["Metal"], single: false, reproducciones: 2111});
const cancion19 = new Cancion({nombre: "La La", autor: ["Bayside"], 
  duracion: {min: 3, seg: 47}, generos: ["Metal"], single: true, reproducciones: 77650});
const cancion20 = new Cancion({nombre: "La Di Da Di", autor: ["John Lennon"],
  duracion: {min: 1, seg: 22}, generos: ["Metal"], single: false, reproducciones: 3456});

// 5 de tipo Drill
const cancion21 = new Cancion({nombre: "Lady Black", autor: ["Breach", "John Lennon"], 
  duracion: {min: 2, seg: 29}, generos: ["Drill"], single: false, reproducciones: 220012});
const cancion22 = new Cancion({nombre: "La Turra Rica", autor: ["Stephen Malkmus", "Gunna"],
  duracion: {min: 3, seg: 33}, generos: ["Drill"], single: false, reproducciones: 555555});
const cancion23 = new Cancion({nombre: "R.I.C.O.", autor: ["Paul McCartney"],
  duracion: {min: 12, seg: 0}, generos: ["Drill"], single: false, reproducciones: 990});
const cancion24 = new Cancion({nombre: "R.A.T.S ", autor: ["Breach"], 
  duracion: {min: 10, seg: 0}, generos: ["Drill"], single: true, reproducciones: 111000});
const cancion25 = new Cancion({nombre: "R.A.F.", autor: ["Duki"],
  duracion: {min: 8, seg: 11}, generos: ["Drill"], single: false, reproducciones: 2348});

// 5 de tipo K-pop
const cancion26 = new Cancion({nombre: "M", autor: ["Mesita", "Duki"], 
  duracion: {min: 3, seg: 49}, generos: ["K-pop", "Jazz"], single: false, reproducciones: 44412});
const cancion27 = new Cancion({nombre: "Mamasita Sabrosa", autor: ["George Harrison", "Paul McCartney"],
  duracion: {min: 2, seg: 9}, generos: ["K-pop"], single: false, reproducciones: 54235});
const cancion28 = new Cancion({nombre: "So Strong", autor: ["Mesita"],
  duracion: {min: 11, seg: 55}, generos: ["K-pop"], single: false, reproducciones: 6565});
const cancion29 = new Cancion({nombre: "Glad To Be Gay", autor: ["George Harrison"], 
  duracion: {min: 10, seg: 0}, generos: ["K-pop"], single: true, reproducciones: 778900});
const cancion30 = new Cancion({nombre: "$(dollar sign)", autor: ["John Lennon"],
  duracion: {min: 3, seg: 0}, generos: ["K-pop"], single: false, reproducciones: 3232});

// 5 de tipo Jazz
const cancion31 = new Cancion({nombre: "M79", autor: ["Bayside", "John Lennon"], 
  duracion: {min: 1, seg: 30}, generos: ["Jazz"], single: false, reproducciones: 12});
const cancion32 = new Cancion({nombre: "Ma and Pa", autor: ["Mesita"],
  duracion: {min: 3, seg: 1}, generos: ["Jazz"], single: false, reproducciones: 23598});
const cancion33 = new Cancion({nombre: "S.A.D", autor: ["Duki"],
  duracion: {min: 1, seg: 32}, generos: ["Jazz"], single: false, reproducciones: 10});
const cancion34 = new Cancion({nombre: "Bad Tattoo", autor: ["Gunna"], 
  duracion: {min: 2, seg: 22}, generos: ["Jazz"], single: true, reproducciones: 777700});
const cancion35 = new Cancion({nombre: "S&M", autor: ["Bayside"],
  duracion: {min: 3, seg: 15}, generos: ["Jazz"], single: false, reproducciones: 1213234});

// 5 de tipo Country
const cancion36 = new Cancion({nombre: "Mamon Loco", autor: ["Breach", "John Lennon"], 
  duracion: {min: 1, seg: 30}, generos: ["Country"], single: false, reproducciones: 18762});
const cancion37 = new Cancion({nombre: "No Mames Wey", autor: ["John Lennon"],
  duracion: {min: 2, seg: 15}, generos: ["Country"], single: false, reproducciones: 354978});
const cancion38 = new Cancion({nombre: "The Monkees", autor: ["Mesita"],
  duracion: {min: 2, seg: 11}, generos: ["Country"], single: false, reproducciones: 98756});
const cancion39 = new Cancion({nombre: "is the Damn Season", autor: ["Breach"], 
  duracion: {min: 1, seg: 20}, generos: ["Country"], single: true, reproducciones: 918273});
const cancion40 = new Cancion({nombre: "Til Kingdom Come", autor: ["Stephen Malkmus"],
  duracion: {min: 1, seg: 0}, generos: ["Country"], single: false, reproducciones: 2340});

// 5 de tipo Rap
const cancion41 = new Cancion({nombre: "Na na na Batman", autor: ["Stephen Malkmus", "Gunna"], 
  duracion: {min: 2, seg: 10}, generos: ["Rap"], single: false, reproducciones: 76244});
const cancion42 = new Cancion({nombre: "Nashii", autor: ["Mesita", "Duki"],
  duracion: {min: 3, seg: 45}, generos: ["Rap", "Country"], single: false, reproducciones: 93821});
const cancion43 = new Cancion({nombre: "U Got the Look", autor: ["Bayside"],
  duracion: {min: 1, seg: 2}, generos: ["Rap"], single: false, reproducciones: 75420});
const cancion44 = new Cancion({nombre: "U Get Me High", autor: ["Duki"], 
  duracion: {min: 5, seg: 23}, generos: ["Rap"], single: true, reproducciones: 20201});
const cancion45 = new Cancion({nombre: "U 2 Luv", autor: ["Paul McCartney"],
  duracion: {min: 6, seg: 30}, generos: ["Rap"], single: false, reproducciones: 11723});

// 5 de tipo Flamenco
const cancion46 = new Cancion({nombre: "S.O.S", autor: ["George Harrison", "Paul McCartney"], 
  duracion: {min: 3, seg: 29}, generos: ["Flamenco"], single: false, reproducciones: 45334});
const cancion47 = new Cancion({nombre: "Sad Angel", autor: ["Bayside", "John Lennon"],
  duracion: {min: 1, seg: 38}, generos: ["Flamenco"], single: false, reproducciones: 93821});
const cancion48 = new Cancion({nombre: "Vacancy", autor: ["Breach"],
  duracion: {min: 9, seg: 2}, generos: ["Flamenco"], single: false, reproducciones: 2341});
const cancion49 = new Cancion({nombre: "V.E.N.O.M", autor: ["Stephen Malkmus"], 
  duracion: {min: 1, seg: 23}, generos: ["Flamenco"], single: true, reproducciones: 14567});
const cancion50 = new Cancion({nombre: "V-2 Schneider", autor: ["Gunna"],
  duracion: {min: 2, seg: 30}, generos: ["Flamenco"], single: false, reproducciones: 120000});

// Grupos:
/* AC/DC = Bayside y John Lennon
Pink Floyd = Stephen Malkmus y Gunna
The Beatles = George Harrison y Paul McCartney
Queen = Breach y John Lennon
Iron Maiden = Mesita y Duki */
