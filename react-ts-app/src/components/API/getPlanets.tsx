import { Planets } from "swapi-ts";

export async function FindPlanet(planet: string[]) {
  const data = await Planets.findBySearch(planet);
  return data.resources;
}
