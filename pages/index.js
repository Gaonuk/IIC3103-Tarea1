import Layout from "../components/layout";
import { getSortedSeasonsBad, getSortedSeasonsBetter } from "../lib/episodes";
import { Menu } from "@headlessui/react";

export async function getServerSideProps() {
  const breakingSeasons = await getSortedSeasonsBad();
  const betterSeasons = await getSortedSeasonsBetter();
  return {
    props: {
      breakingSeasons,
      betterSeasons,
    },
  };
}

export default function Home({ breakingSeasons, betterSeasons }) {
  return (
    <Layout home>
      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div class="relative">
            <dt>
              <img src="https://storage.googleapis.com/lanacion-media-storage/2021/02/c0a7cc92-better.jpg"></img>
            </dt>
            <div class="grid grid-cols-1 gap-x-8">
              {betterSeasons.map((season) => (
                <Menu>
                  <Menu.Button
                    class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    key={`BetterCallSaul-${season.number}`}
                  >
                    Season {season.number}
                    <svg
                      class="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Menu.Button>
                  <Menu.Items>
                    {season.episodes.map((episode) => (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            href={`/episodes/${episode.episode_id}`}
                            key={episode.episode_id}
                          >
                            {episode.title}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              ))}
            </div>
          </div>

          <div class="relative">
            <dt>
              <img src="https://i.blogs.es/6d84c8/breaking-bad/1366_2000.jpg" />
            </dt>
            <div class="grid grid-cols-1 gap-x-8">
              {breakingSeasons.map((season) => (
                <Menu>
                  <Menu.Button
                    class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    key={`BreakingBad-${season.number}`}
                  >
                    Season {season.number}
                    <svg
                      class="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Menu.Button>
                  <Menu.Items>
                    {season.episodes.map((episode) => (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            href={`/episodes/${episode.episode_id}`}
                          >
                            {episode.title}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              ))}
            </div>
          </div>
        </dl>
      </div>
    </Layout>
  );
}
