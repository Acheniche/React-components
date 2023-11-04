import { Planets } from "swapi-ts";

export async function FindPlanet(planet: string[]) {
  const data = await Planets.findBySearch(planet);
  return data.resources;
}

export async function getByName(planet: string[]) {
  const data = await Planets.findBySearch(planet);
  return data.resources;
}

// export async function GetAllPlanetsFromPage(page:number) {
//   const data = await Planets.getPage(page);
//   return data;
// }

// export async function FindPlanet(page:number, planet?: string[]) {
// const data = await axios.get('https://swapi.dev/api/planets', {
//   params: {
//     page: page,
//     search: planet,
//   },
// })
// console.log(data);
// return data.data.results
// }
