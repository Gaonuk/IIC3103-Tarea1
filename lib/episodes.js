export async function getBetterCallSaulEpisodes() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch(
    "https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul"
  );
  return res.json();
}

export async function getBreakingBadEpisodes() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch(
    "https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad"
  );
  return res.json();
}

export async function getSortedSeasonsBad() {
  const res = await fetch(
    "https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad"
  );
  const episodes = await res.json();
  let seasons = [];
  let sortedSeasons = [];
  for (let episode of episodes) {
    if (!seasons.includes(episode.season)) {
      seasons.push(episode.season);
      sortedSeasons.push({
        number: episode.season,
        episodes: [],
      });
    } else {
      continue;
    }
  }

  for (let episode of episodes) {
    for (let season of sortedSeasons) {
      if (season.number === episode.season) {
        season.episodes.push(episode);
        break;
      }
    }
  }

  return sortedSeasons;
}

export async function getSortedSeasonsBetter() {
  const res = await fetch(
    "https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul"
  );
  const episodes = await res.json();
  let seasons = [];
  let sortedSeasons = [];
  for (let episode of episodes) {
    if (!seasons.includes(episode.season)) {
      seasons.push(episode.season);
      sortedSeasons.push({
        number: episode.season,
        episodes: [],
      });
    } else {
      continue;
    }
  }

  for (let episode of episodes) {
    for (let season of sortedSeasons) {
      if (season.number === episode.season) {
        season.episodes.push(episode);
        break;
      }
    }
  }

  return sortedSeasons;
}

export async function getEpisodeCharactersData(characters) {
  let charactersData = [];
  for (let char of characters) {
    let charName = char.replace(" ", "+");
    let res = await fetch(
      `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${charName}`
    );
    let charData = await res.json();
    charactersData.push(charData[0]);
  }
  return charactersData
}

export async function getAllSeriesId() {
  const seriesName = ["BetterCallSaul", "BreakingBad"];
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return seriesName.map((fileName) => {
    return {
      params: {
        id: fileName,
      },
    };
  });
}

export async function getAllEpisodesId() {
  const res = await fetch(
    "https://tarea-1-breaking-bad.herokuapp.com/api/episodes"
  );
  const episodes = await res.json();
  return episodes.map((episode) => {
    return {
      params: {
        id: `${episode.episode_id}`,
      },
    };
  });
}

export async function getEpisodeData(id) {
  const res = await fetch(
    `https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${id}`
  );
  return res.json();
}
