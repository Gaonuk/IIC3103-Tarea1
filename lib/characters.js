import { getSortedSeasonsBad, getSortedSeasonsBetter } from "./episodes";

export async function getAllCharactersId() {
  let characters = [];
  const firstRes = await fetch(
    "https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=10&offset=0"
  );
  let iterationChars = await firstRes.json();
  let offset = 10;
  do {
    iterationChars = iterationChars.map((char) => char.char_id);
    characters = characters.concat(iterationChars);
    let res = await fetch(
      `https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=10&offset=${offset}`
    );
    iterationChars = await res.json();
    offset += 10;
  } while (iterationChars.length != 0);

  return characters.map((character) => {
    return {
      params: {
        id: `${character}`,
      },
    };
  });
}

export async function getCharacterData(id) {
  const res = await fetch(
    `https://tarea-1-breaking-bad.herokuapp.com/api/characters/${id}`
  );
  return res.json();
}

export async function getCharacterQuotes(name) {
  let charName = name.replace(" ", "+");
  const res = await fetch(
    `https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${charName}`
  );
  return res.json();
}

export async function getCharacterBadSeasons(seasons) {
  if (seasons.length == 0) return [];
  let seasonsData = await getSortedSeasonsBad();
  let finalSeasons = [];
  for (let season of seasonsData) {
    if (seasons.includes(parseInt(season.number))) finalSeasons.push(season);
  }
  if (seasons.includes(5)) finalSeasons.push({ number: 5, episodes: [] });
  return finalSeasons;
}

export async function getCharacterBetterSeasons(seasons) {
  if (seasons.length == 0) return [];
  let seasonsData = await getSortedSeasonsBetter();
  let finalSeasons = [];
  for (let season of seasonsData) {
    if (seasons.includes(parseInt(season.number))) finalSeasons.push(season);
  }
  if (seasons.includes(5)) finalSeasons.push({ number: 5, episodes: [] });
  return finalSeasons;
}
