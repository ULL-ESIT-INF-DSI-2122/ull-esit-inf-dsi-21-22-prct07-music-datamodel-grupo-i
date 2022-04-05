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
const cancion1 = new Cancion({nombre: "Ular SciencE", autor: "Bayside", 
  duracion: {min: 2, seg: 4}, generos: ["Pop", "Rock"], single: true, reproducciones: 200});
const cancion2 = new Cancion({nombre: "Starting Over", autor: "John Lennon",
  duracion: {min: 3, seg: 40}, generos: ["Rock"], single: false, reproducciones: 10000});
const cancion3 = new Cancion({nombre: "J Smoov", autor: "Stephen Malkmus",
  duracion: {min: 2, seg: 50}, generos: ["Rock"], single: true, reproducciones: 5000});
const cancion4 = new Cancion({nombre: "P Power", autor: "Gunna", 
  duracion: {min: 2, seg: 4}, generos: ["Rock"], single: false, reproducciones: 200});
const cancion5 = new Cancion({nombre: "Jack", autor: "AC/DC",
  duracion: {min: 4, seg: 0}, generos: ["Rock", "Trap"], single: false, reproducciones: 50000});

// 5 de tipo Pop
const cancion6 = new Cancion({nombre: "Jack Rabbit", autor: "Breach", 
  duracion: {min: 2, seg: 45}, generos: ["Pop", "Drill"], single: true, reproducciones: 20500});
const cancion7 = new Cancion({nombre: "K", autor: "Iron Maiden",
  duracion: {min: 1, seg: 34}, generos: ["Pop"], single: false, reproducciones: 100});
const cancion8 = new Cancion({nombre: "M.vlopp", autor: "The Beatles",
  duracion: {min: 7, seg: 15}, generos: ["Pop"], single: true, reproducciones: 210});
const cancion9 = new Cancion({nombre: "Kali Ma", autor: "Mesita", 
  duracion: {min: 5, seg: 0}, generos: ["Pop"], single: true, reproducciones: 234000});  
const cancion10 = new Cancion({nombre: "Ndael", autor: "The Beatles",
  duracion: {min: 12, seg: 23}, generos: ["Pop", "Trap"], single: true, reproducciones: 56700});
  
// 5 de tipo Trap
const cancion11 = new Cancion({nombre: "Karate Chop", autor: "Duki", 
  duracion: {min: 1, seg: 32}, generos: ["Trap", "Metal"], single: false, reproducciones: 5460});
const cancion12 = new Cancion({nombre: "Kate", autor: "Queen",
  duracion: {min: 2, seg: 22}, generos: ["Trap"], single: false, reproducciones: 5320});
const cancion13 = new Cancion({nombre: "Pacific Rim", autor: "George Harrison",
  duracion: {min: 7, seg: 15}, generos: ["Trap"], single: true, reproducciones: 210});
const cancion14 = new Cancion({nombre: "Pack Up", autor: "Paul McCartney", 
  duracion: {min: 6, seg: 35}, generos: ["Trap"], single: true, reproducciones: 123});
const cancion15 = new Cancion({nombre: "Pacer", autor: "Pink Floyd",
  duracion: {min: 5, seg: 67}, generos: ["Pop", "Trap"], single: true, reproducciones: 1245});

// 5 de tipo Metal
const cancion16 = new Cancion({nombre: "LOVE", autor: "Pink Floyd", 
  duracion: {min: 1, seg: 52}, generos: ["Metal"], single: true, reproducciones: 2458});
const cancion17 = new Cancion({nombre: "L.A.", autor: "Gunna",
  duracion: {min: 3, seg: 5}, generos: ["Metal"], single: true, reproducciones: 23478});
const cancion18 = new Cancion({nombre: "La Rosa", autor: "AC/DC",
  duracion: {min: 1, seg: 15}, generos: ["Metal"], single: false, reproducciones: 2111});
const cancion19 = new Cancion({nombre: "La La", autor: "Bayside", 
  duracion: {min: 3, seg: 47}, generos: ["Metal"], single: true, reproducciones: 77650});
const cancion20 = new Cancion({nombre: "La Di Da Di", autor: "John Lennon",
  duracion: {min: 1, seg: 22}, generos: ["Metal"], single: false, reproducciones: 3456});

// 5 de tipo Drill
const cancion21 = new Cancion({nombre: "Lady Black", autor: "Queen", 
  duracion: {min: 2, seg: 29}, generos: ["Drill"], single: false, reproducciones: 220012});
const cancion22 = new Cancion({nombre: "La Turra Rica", autor: "Pink Floyd",
  duracion: {min: 3, seg: 33}, generos: ["Drill"], single: true, reproducciones: 555555});
const cancion23 = new Cancion({nombre: "R.I.C.O.", autor: "Paul McCartney",
  duracion: {min: 12, seg: 0}, generos: ["Drill"], single: true, reproducciones: 990});
const cancion24 = new Cancion({nombre: "R.A.T.S ", autor: "Breach", 
  duracion: {min: 10, seg: 0}, generos: ["Drill"], single: true, reproducciones: 111000});
const cancion25 = new Cancion({nombre: "R.A.F.", autor: "Duki",
  duracion: {min: 8, seg: 11}, generos: ["Drill"], single: false, reproducciones: 2348});

// 5 de tipo K-pop
const cancion26 = new Cancion({nombre: "M", autor: "Iron Maiden", 
  duracion: {min: 3, seg: 49}, generos: ["K-pop", "Jazz"], single: false, reproducciones: 44412});
const cancion27 = new Cancion({nombre: "Mamasita Sabrosa", autor: "The Beatles",
  duracion: {min: 2, seg: 9}, generos: ["K-pop"], single: true, reproducciones: 54235});
const cancion28 = new Cancion({nombre: "So Strong", autor: "Mesita",
  duracion: {min: 11, seg: 55}, generos: ["K-pop"], single: false, reproducciones: 6565});
const cancion29 = new Cancion({nombre: "Glad To Be Gay", autor: "George Harrison", 
  duracion: {min: 10, seg: 0}, generos: ["K-pop"], single: true, reproducciones: 778900});
const cancion30 = new Cancion({nombre: "$(dollar sign)", autor: "John Lennon",
  duracion: {min: 3, seg: 0}, generos: ["K-pop"], single: false, reproducciones: 3232});

// 5 de tipo Jazz
const cancion31 = new Cancion({nombre: "M79", autor: "AC/DC", 
  duracion: {min: 1, seg: 30}, generos: ["Jazz"], single: false, reproducciones: 12});
const cancion32 = new Cancion({nombre: "Ma and Pa", autor: "Mesita",
  duracion: {min: 3, seg: 1}, generos: ["Jazz"], single: false, reproducciones: 23598});
const cancion33 = new Cancion({nombre: "S.A.D", autor: "Duki",
  duracion: {min: 1, seg: 32}, generos: ["Jazz"], single: false, reproducciones: 10});
const cancion34 = new Cancion({nombre: "Bad Tattoo", autor: "Gunna", 
  duracion: {min: 2, seg: 22}, generos: ["Jazz"], single: true, reproducciones: 777700});
const cancion35 = new Cancion({nombre: "S&M", autor: "Bayside",
  duracion: {min: 3, seg: 15}, generos: ["Jazz"], single: false, reproducciones: 1213234});

// 5 de tipo Country
const cancion36 = new Cancion({nombre: "Mamon Loco", autor: "Queen", 
  duracion: {min: 1, seg: 30}, generos: ["Country"], single: false, reproducciones: 18762});
const cancion37 = new Cancion({nombre: "No Mames Wey", autor: "John Lennon",
  duracion: {min: 2, seg: 15}, generos: ["Country"], single: false, reproducciones: 354978});
const cancion38 = new Cancion({nombre: "The Monkees", autor: "Mesita",
  duracion: {min: 2, seg: 11}, generos: ["Country"], single: false, reproducciones: 98756});
const cancion39 = new Cancion({nombre: "is the Damn Season", autor: "Breach", 
  duracion: {min: 1, seg: 20}, generos: ["Country"], single: true, reproducciones: 918273});
const cancion40 = new Cancion({nombre: "Til Kingdom Come", autor: "Stephen Malkmus",
  duracion: {min: 1, seg: 0}, generos: ["Country"], single: true, reproducciones: 2340});

// 5 de tipo Rap
const cancion41 = new Cancion({nombre: "Na na na Batman", autor: "Pink Floyd", 
  duracion: {min: 2, seg: 10}, generos: ["Rap"], single: true, reproducciones: 76244});
const cancion42 = new Cancion({nombre: "Nashii", autor: "Iron Maiden",
  duracion: {min: 3, seg: 45}, generos: ["Rap", "Country"], single: false, reproducciones: 93821});
const cancion43 = new Cancion({nombre: "U Got the Look", autor: "Bayside",
  duracion: {min: 1, seg: 2}, generos: ["Rap"], single: false, reproducciones: 75420});
const cancion44 = new Cancion({nombre: "U Get Me High", autor: "Duki", 
  duracion: {min: 5, seg: 23}, generos: ["Rap"], single: false, reproducciones: 20201});
const cancion45 = new Cancion({nombre: "U 2 Luv", autor: "Paul McCartney",
  duracion: {min: 6, seg: 30}, generos: ["Rap"], single: true, reproducciones: 11723});

// 5 de tipo Flamenco
const cancion46 = new Cancion({nombre: "S.O.S", autor: "The Beatles", 
  duracion: {min: 3, seg: 29}, generos: ["Flamenco"], single: true, reproducciones: 45334});
const cancion47 = new Cancion({nombre: "Sad Angel", autor: "AC/DC",
  duracion: {min: 1, seg: 38}, generos: ["Flamenco"], single: false, reproducciones: 93821});
const cancion48 = new Cancion({nombre: "Vacancy", autor: "Breach",
  duracion: {min: 9, seg: 2}, generos: ["Flamenco"], single: true, reproducciones: 2341});
const cancion49 = new Cancion({nombre: "V.E.N.O.M", autor: "Stephen Malkmus", 
  duracion: {min: 1, seg: 23}, generos: ["Flamenco"], single: true, reproducciones: 14567});
const cancion50 = new Cancion({nombre: "V-2 Schneider", autor: "Gunna",
  duracion: {min: 2, seg: 30}, generos: ["Flamenco"], single: false, reproducciones: 120000});

const album1 = new Album({nombre: "Hola bby", autor: "Bayside", fechaPublicacion: 2000, generos: ["Rap", "Jazz"], 
  canciones: new Coleccion<Cancion>(cancion43, cancion35)});
const album2 = new Album({nombre: "Ahora soy peor", autor: "AC/DC", fechaPublicacion: 2060, generos: ["Rock", "Trap", "Flamenco", "Jazz", "Metal"], 
  canciones: new Coleccion<Cancion>(cancion47, cancion31, cancion18, cancion5)});
const album3 = new Album({nombre: "Mala vida", autor: "John Lennon", fechaPublicacion: 2001, generos: ["Country", "K-pop", "Metal", "Rock"], 
  canciones: new Coleccion<Cancion>(cancion37, cancion30, cancion20, cancion2)});
const album4 = new Album({nombre: "Sin City", autor: "Iron Maiden", fechaPublicacion: 1975, generos: ["Pop", "K-pop", "Jazz", "Rap", "Country"], 
  canciones: new Coleccion<Cancion>(cancion7, cancion26, cancion42)});
const album5 = new Album({nombre: "La calle es MALA", autor: "Mesita", fechaPublicacion: 2020, generos: ["K-pop", "Jazz", "Country"], 
  canciones: new Coleccion<Cancion>(cancion28, cancion32, cancion38)});
const album6 = new Album({nombre: "Tvrp House", autor: "Gunna", fechaPublicacion: 1990, generos: ["Rock", "Jazz", "Metal", "Flamenco"], 
  canciones: new Coleccion<Cancion>(cancion4, cancion50)});
const album7 = new Album({nombre: "Las mamis saben bien rico", autor: "Queen", fechaPublicacion: 2015, generos: ["Country", "Drill", "Trap"], 
  canciones: new Coleccion<Cancion>(cancion36, cancion21, cancion12)});
const album8 = new Album({nombre: "Tvrp House", autor: "Duki", fechaPublicacion: 2012, generos: ["Trap", "Jazz", "Metal", "Drill", "Rap"], 
  canciones: new Coleccion<Cancion>(cancion11, cancion25, cancion33, cancion44)});

const artista1 = new Artista({nombre: "Bayside", grupos: ["AC/DC"], generos: ["Pop", "Rock", "Metal", "Jazz", "Rap"], 
  albumes: new Coleccion<Album>(album1), canciones: new Coleccion<Cancion>(cancion1, cancion19), oyentes: 500});
const artista2 = new Artista({nombre: "John Lennon", grupos: ["AC/DC", "Queen"], generos: ["Rock", "Metal", "K-pop", "Country"], 
  albumes: new Coleccion<Album>(album3), canciones: new Coleccion<Cancion>(), oyentes: 12098});
const artista3 = new Artista({nombre: "Stephen Malkmus", grupos: ["Pink Floyd"], generos: ["Rock", "Country", "Flamenco"], 
  albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>(cancion3, cancion40, cancion49), oyentes: 111111});
const artista4 = new Artista({nombre: "Gunna", grupos: ["Pink Floyd"], generos: ["Rock", "Metal", "Jazz", "Flamenco"], 
  albumes: new Coleccion<Album>(album6), canciones: new Coleccion<Cancion>(cancion17, cancion34), oyentes: 12411});
const artista5 = new Artista({nombre: "George Harrison", grupos: ["The Beatles"], generos: ["Trap", "K-pop"], 
  albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>(cancion13, cancion29), oyentes: 3456});
const artista6 = new Artista({nombre: "Paul McCartney", grupos: ["The Beatles"], generos: ["Trap", "Drill", "Rap"], 
  albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>(cancion14, cancion23, cancion45), oyentes: 1200});
const artista7 = new Artista({nombre: "Breach", grupos: ["Queen"], generos: ["Pop", "Drill", "Country", "Flamenco"], 
  albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>(cancion6, cancion24, cancion39, cancion48), oyentes: 1234});
const artista8 = new Artista({nombre: "Mesita", grupos: ["Iron Maiden"], generos: ["Pop", "Jazz", "Country", "K-pop"], 
  albumes: new Coleccion<Album>(album5), canciones: new Coleccion<Cancion>(cancion9), oyentes: 4567});
const artista9 = new Artista({nombre: "Duki", grupos: ["Iron Maiden"], generos: ["Trap", "Drill", "Metal", "Jazz", "Rap"], 
  albumes: new Coleccion<Album>(album8), canciones: new Coleccion<Cancion>(), oyentes: 123});

const grupo1 = new Grupo({nombre: "AC/DC", artistas: new Coleccion<Artista>(artista1, artista2), fechaCreacion: 2008, 
  generos: ["Rock", "Trap", "Metal", "Jazz", "Flamenco"], albumes: new Coleccion<Album>(album2), canciones: new Coleccion<Cancion>(),
  oyentes: 300});
const grupo2 = new Grupo({nombre: "Pink Floyd", artistas: new Coleccion<Artista>(artista3, artista4), fechaCreacion: 2012, 
  generos: ["Pop", "Trap", "Drill", "Metal", "Rap"], albumes: new Coleccion<Album>(), 
  canciones: new Coleccion<Cancion>(cancion41, cancion22, cancion16, cancion15), oyentes: 500});
const grupo3 = new Grupo({nombre: "The Beatles", artistas: new Coleccion<Artista>(artista5, artista6), fechaCreacion: 2005, 
  generos: ["Pop", "Trap", "K-pop", "Flamenco"], albumes: new Coleccion<Album>(),
  canciones: new Coleccion<Cancion>(cancion8, cancion10, cancion27, cancion46), oyentes: 700});
const grupo4 = new Grupo({nombre: "Queen", artistas: new Coleccion<Artista>(artista2, artista7), fechaCreacion: 1865, 
  generos: ["Trap", "Drill", "Country"], albumes: new Coleccion<Album>(album7), canciones: new Coleccion<Cancion>(), oyentes: 900});
const grupo5 = new Grupo({nombre: "Iron Maiden", artistas: new Coleccion<Artista>(artista8, artista9), fechaCreacion: 2060,
  generos: ["Pop", "Jazz", "K-pop", "Rap", "Country"], albumes: new Coleccion<Album>(album4),
  canciones: new Coleccion<Cancion>(), oyentes: 1100});

const genero1 = new GenerosMusicales({nombre: "Rock", artistasGrupos: new Coleccion<Artista | Grupo>(artista1, artista2, artista3, artista4, grupo1), 
  albumes: new Coleccion<Album>(album2, album3, album6), canciones: new Coleccion<Cancion>(cancion1, cancion2, cancion3, cancion4, cancion5)});
const genero3 = new GenerosMusicales({nombre: "Trap", artistasGrupos: new Coleccion<Artista | Grupo>(artista5, artista6, artista7, grupo1, grupo2, grupo3, grupo4), 
  albumes: new Coleccion<Album>(album8, album7, album2), canciones: new Coleccion<Cancion>(cancion5, cancion10, cancion11, cancion12, cancion13, cancion14, cancion15)});
const genero5 = new GenerosMusicales({nombre: "Drill", artistasGrupos: new Coleccion<Artista | Grupo>(artista6, artista7, artista9, grupo2, grupo4), 
  albumes: new Coleccion<Album>(album7, album8), canciones: new Coleccion<Cancion>(cancion6, cancion21, cancion22, cancion23, cancion24, cancion25)});
const genero7 = new GenerosMusicales({nombre: "Jazz", artistasGrupos: new Coleccion<Artista | Grupo>(artista1, artista4, artista8, artista9, grupo1, grupo5), 
  albumes: new Coleccion<Album>(album1, album2, album4, album5, album6, album8), canciones: new Coleccion<Cancion>(cancion26, cancion31, cancion32, cancion33, cancion34, cancion35)});
const genero9 = new GenerosMusicales({nombre: "Rap", artistasGrupos: new Coleccion<Artista | Grupo>(artista1, artista6, artista9, grupo2, grupo5), 
  albumes: new Coleccion<Album>(album1, album4, album8), canciones: new Coleccion<Cancion>(cancion41, cancion42, cancion43, cancion44, cancion45)});
const genero2 = new GenerosMusicales({nombre: "Pop", artistasGrupos: new Coleccion<Artista | Grupo>(artista1, artista8, artista7, grupo5, grupo3, grupo2),
  albumes: new Coleccion<Album>(album4), canciones: new Coleccion<Cancion>(cancion6, cancion7, cancion8, cancion9, cancion10, cancion15)});
const genero4 = new GenerosMusicales({nombre: "Metal", artistasGrupos: new Coleccion<Artista | Grupo>(artista1, artista2, artista4, artista9, grupo1, grupo2),
  albumes: new Coleccion<Album>(album2, album3, album6, album8), canciones: new Coleccion<Cancion>(cancion16, cancion17, cancion18, cancion19, cancion20, cancion15, cancion11)});
const genero6 = new GenerosMusicales({nombre: "K-pop", artistasGrupos: new Coleccion<Artista | Grupo>(artista2, artista5, artista8, grupo3, grupo5),
  albumes: new Coleccion<Album>(album3, album4, album5), canciones: new Coleccion<Cancion>(cancion26, cancion27, cancion28, cancion29, cancion30)});
const genero8 = new GenerosMusicales({nombre: "Country", artistasGrupos: new Coleccion<Artista | Grupo>(artista2, artista3, artista7, artista8, grupo4, grupo5),
  albumes: new Coleccion<Album>(album3, album4, album5, album7), canciones: new Coleccion<Cancion>(cancion36, cancion37, cancion38, cancion39, cancion30, cancion42)});
const genero10 = new GenerosMusicales({nombre: "Flamenco", artistasGrupos: new Coleccion<Artista | Grupo>(artista3, artista4, artista7, grupo3, grupo1),
  albumes: new Coleccion<Album>(album3, album4, album7), canciones: new Coleccion<Cancion>(cancion46, cancion47, cancion48, cancion49, cancion50)});

export const generos = new Coleccion<GenerosMusicales>(genero1, genero2, genero3, genero4, genero5, genero6, genero7, genero8, genero9, genero10);

const playlist1 = new PlayList({nombre: "La mandanga", canciones: new Coleccion<Cancion>(cancion1, cancion3, cancion14, cancion38, cancion22, cancion33, cancion41, cancion19), 
  duracion: {hor: 0, min: 0}, generos: [], creador: "SYSTEM"});
const playlist2 = new PlayList({nombre: "Amor y Odio", canciones: new Coleccion<Cancion>(cancion13, cancion23, cancion36, cancion38, cancion11, cancion12, cancion2, cancion45, cancion49), 
  duracion: {hor: 0, min: 0}, generos: [], creador: "SYSTEM"});
const playlist3 = new PlayList({nombre: "Los de Socorro", canciones: new Coleccion<Cancion>(cancion33, cancion44, cancion22, cancion11, cancion2, cancion25, cancion50, cancion37), 
  duracion: {hor: 0, min: 0}, generos: [], creador: "SYSTEM"});

export const playList = new Coleccion<PlayList>(playlist1, playlist2, playlist3);
