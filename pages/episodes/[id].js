import { getEpisodeData, getAllEpisodesId, getEpisodeCharactersData } from "../../lib/episodes";
import Layout from "../../components/layout";

export async function getStaticProps({ params }) {
  const episodeData = await getEpisodeData(params.id);
  const episode = episodeData[0];
  const characters = await getEpisodeCharactersData(episode.characters)
  console.log(characters);
  return {
    props: {
      episode,
      characters
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllEpisodesId();
  return {
    paths,
    fallback: false,
  };
}

export default function Episode({ episode, characters }) {
  return (
    <Layout>
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {episode.title}
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">{episode.series}</p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Episode ID</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {episode.episode_id}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Season</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {episode.season}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Episode</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {episode.episode}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Air Date</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(episode.air_date).toGMTString()}
              </dd>
            </div>

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Characters</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {characters.map((character) => (
                    <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div class="w-0 flex-1 flex items-center">
                        <a
                          href={`/characters/${character.char_id}`}
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {character.name}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  );
}
