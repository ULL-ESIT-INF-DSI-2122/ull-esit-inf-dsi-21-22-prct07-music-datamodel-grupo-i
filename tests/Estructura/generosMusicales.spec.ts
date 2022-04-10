import 'mocha';
import {expect} from "chai";
import {GenerosMusicales, PrintGenerosMusicales} from "../../src/Estructura/generosMusicales";
import {Album} from '../../src/Estructura/album';
import {Cancion} from '../../src/Estructura/cancion';
import {Coleccion} from '../../src/Estructura/coleccionGenerica';
import {Artista} from '../../src/Estructura/artistas';
import {Grupo} from '../../src/Estructura/grupo';

const cancion1 = new Cancion({nombre: "Ular SciencE", autor: "Bayside", 
  duracion: {min: 2, seg: 4}, generos: ["Pop", "Rock"], single: true, reproducciones: 200});
const cancion19 = new Cancion({nombre: "La La", autor: "Bayside", 
  duracion: {min: 3, seg: 47}, generos: ["Metal"], single: true, reproducciones: 77650});
const cancion35 = new Cancion({nombre: "S&M", autor: "Bayside",
  duracion: {min: 3, seg: 15}, generos: ["Jazz"], single: false, reproducciones: 1213234});
const cancion43 = new Cancion({nombre: "U Got the Look", autor: "Bayside",
  duracion: {min: 1, seg: 2}, generos: ["Rap"], single: false, reproducciones: 75420});
const artista1 = new Artista({nombre: "Bayside", grupos: ["AC/DC"], generos: ["Pop", "Rock", "Metal", "Jazz", "Rap"], 
  albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>(), oyentes: 500});
const album1 = new Album({nombre: "Hola bby", autor: "Bayside", fechaPublicacion: 2000, generos: ["Pop", "Rock", "Metal", "Jazz", "Rap"], 
  canciones: new Coleccion<Cancion>(cancion43, cancion35, cancion1, cancion19)});
  const genero1 = new GenerosMusicales({nombre: "Rock", artistasGrupos: ["Bayside", "John Lennon", "Stephen Malkmus", "Gunna", "AC/DC"], 
  albumes: new Coleccion<Album>(), canciones: new Coleccion<Cancion>()});

describe('GenerosMusicales', () => {
  it('Debería ser una instancia de GenerosMusicales', () => {
    expect(genero1).to.be.instanceOf(GenerosMusicales);
  });
  it("Se puede obtener el nombre del genero", () => {
    expect(genero1.getNombre()).to.equal("Rock");
  });
  it("Se puede obtener el artista o grupo del genero", () => {
    expect(genero1.getArtistaGrupos()).eql(["Bayside", "John Lennon", "Stephen Malkmus", "Gunna", "AC/DC"]);
  });
  it("Se puede obtener los albumes del genero", () => {
    expect(genero1.getAlbumes()).eql(new Coleccion<Album>());
  });
  it("Se puede obtener las canciones del genero", () => {
    expect(genero1.getCanciones()).eql(new Coleccion<Cancion>());
  });
  it("Se puede obtener el nombre del genero", () => {
    expect(genero1.getNombre()).to.equal("Rock");
  });
  it("Se puede cambiar el nombre del genero", () => {
    genero1.setNombre("Pop");
    expect(genero1.getNombre()).to.equal("Pop");
  });
  it("Se puede cambiar el artista o grupo del genero", () => {
    genero1.setArtistasGrupos(["Bayside", "John Lennon", "Stephen Malkmus", "Gunna", "AC/DC", "Bruno Mars"]);
    expect(genero1.getArtistaGrupos()).eql(["Bayside", "John Lennon", "Stephen Malkmus", "Gunna", "AC/DC", "Bruno Mars"]);
  });
  it("Se puede cambiar los albumes del genero", () => {
    genero1.setAlbumes(new Coleccion<Album>());
    expect(genero1.getAlbumes()).eql(new Coleccion<Album>());
  });
  it("Se puede cambiar las canciones del genero", () => {
    genero1.setCanciones(new Coleccion<Cancion>());
    expect(genero1.getCanciones()).eql(new Coleccion<Cancion>());
  });
  it("Se puede añadir una cancion" , () => {
    genero1.addCancion(cancion1);
    expect(genero1.getCanciones()).eql(new Coleccion(cancion1));
  });
  it("Se puede añadir un album" , () => {
    genero1.addAlbum(album1);
    expect(genero1.getAlbumes()).eql(new Coleccion(album1));
  });
  it("Se puede añadir un artista o grupo" , () => {
    genero1.addArtistaGrupo("PEPE");
    expect(genero1.getArtistaGrupos()).eql(["Bayside", "John Lennon", "Stephen Malkmus", "Gunna", "AC/DC", "Bruno Mars", "PEPE"]);
  });
});

const prueba = new PrintGenerosMusicales(genero1);
describe('PrintGenerosMusicales', () => {
  it('Deberia crearse un PrintGenerosMusicales', () => {
      expect(prueba).to.be.an.instanceof(PrintGenerosMusicales);
  });
  it('Deberia devolver el nombre del album', () => {
    let result = prueba.print();
      expect(prueba.print()).to.equal(result);
  });
});