import fs from 'fs';
import { console } from 'inspector';

//Clase para representar un Superhéroe
class Superheroe {
    constructor (id, nombreSuperheroe, nombreReal, nombreSociedad, edad, planetaOrigen, debilidad, poder, habilidadEspecial, aliado, enemigo){
    
        this.id = id;
        this.nombreSuperheroe= nombreSuperheroe;
        this.nombreReal= nombreReal;
        this.nombreSociedad= nombreSociedad;
        this.edad= edad;
        this.planetaOrigen= planetaOrigen;
        this.debilidad= debilidad;
        this.poder= poder;
        this.habilidadEspecial= habilidadEspecial;
        this.aliado= aliado;
        this.enemigo= enemigo;
    }
}

//funcion para leer y ordenar los superh
export function leerSuperheroes(ruta){
    const datos =fs.readFileSync(ruta, 'utf8');
    const superheroesArray = JSON.parse(datos);

    // conv a instancias de superher
    const superheroes = superheroesArray.map(
        hero=> new Superheroe (hero.id, hero.nombreSuperheroe, hero.nombreReal, hero.nombreSociedad, hero.edad, hero.planetaOrigen, hero.debilidad, hero.poder, hero.habilidadEspecial, hero.aliado, hero.enemigo)
    );

    //ordenar por nombre de superhero
    superheroes.sort((a,b) =>a.nombreSuperheroe.localeCompare(
        b.nombreSuperheroe));
    return superheroes;
}
  
//nueva función agregar superhéroes
export function agregarSuperheroes(rutaOriginal, rutaNuevos){
   const datosOriginales = fs.readFileSync(rutaOriginal, 'utf8');
   const datosNuevos = fs.readFileSync(rutaNuevos, 'utf8');

   const superheroesOriginales= JSON.parse(datosOriginales);
   const superheroesNuevos = JSON.parse(datosNuevos);

   //conv los nuevos superhero a instancias de superheroe
   const instanciasNuevos = superheroesNuevos.map(
    hero => new Superheroe (hero.id, hero.nombreSuperheroe, hero.nombreReal, hero.nombreSociedad, hero.edad, hero.planetaOrigen, hero.debilidad, hero.poder, hero.habilidadEspecial, hero.aliado, hero.enemigo)
   );

   //combinar listas
   const listaActualizada = [...superheroesOriginales, ...instanciasNuevos];


   //guardas la lista actualizada 
   fs.writeFileSync(rutaOriginal, JSON.stringify(listaActualizada, null, 2), 'utf8');
   console.log('Lista Superhéroes Actualizada con éxito:');

}
   