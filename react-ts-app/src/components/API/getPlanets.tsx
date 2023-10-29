import { Planets } from "swapi-ts";

export class FindPlanet {
  static async FindPlanet(planet: string[]) {
    const data = await Planets.findBySearch(planet);
    return data.resources;
  }
}
