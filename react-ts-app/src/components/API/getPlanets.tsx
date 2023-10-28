import { Planets } from "swapi-ts";

export default class GetPlanets {
    static async GetPlanets(){
        const data = await Planets.getPage(1);
           return data.results;
    }
}

export class FindPlanet {
    static async FindPlanet(planet: string[]){
        const data = await Planets.findBySearch(planet);
        console.log(data.resources);
        return data.resources;
    }
}