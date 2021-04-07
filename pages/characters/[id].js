import {
  getCharacterData,
  getAllCharactersId,
  getCharacterQuotes,
  getCharacterBadSeasons,
  getCharacterBetterSeasons,
} from "../../lib/characters";
import Layout from "../../components/layout";
import SeasonModal from "../../components/seasonModal";

export async function getStaticProps({ params }) {
  const charactersData = await getCharacterData(params.id);
  const character = charactersData[0];
  const characterQuotes = await getCharacterQuotes(character.name);
  const characterBadSeasons = await getCharacterBadSeasons(
    character.appearance
  );
  const characterBetterSeasons = await getCharacterBetterSeasons(
    character.better_call_saul_appearance
  );
  console.log(character);
  return {
    props: {
      character,
      characterQuotes,
      characterBadSeasons,
      characterBetterSeasons,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllCharactersId();
  return {
    paths,
    fallback: false,
  };
}

export default function Character({
  character,
  characterQuotes,
  characterBadSeasons,
  characterBetterSeasons,
}) {
  return (
    <Layout>
      <div class="pt-12 max-w-5xl flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="profile"
          class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div class="p-4 md:p-12 text-center lg:text-left">
            <h1 class="text-3xl font-bold pt-8 lg:pt-0">
              {character.name} aka "{character.nickname}"
            </h1>
            <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-indigo-600 opacity-25"></div>
            {character.occupation.length == 1 && (
              <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                <strong class="text-indigo-700">Occupations:</strong>&nbsp;
                {character.occupation.map((occupation) => (
                  <span>{occupation}&nbsp;&nbsp;</span>
                ))}
              </p>
            )}
            {character.occupation.length > 1 && (
              <div>
                <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                  <strong class="text-indigo-700">Occupations:</strong>
                </p>
                <p class="pt-1 text-base font-bold flex items-center justify-center lg:justify-start">
                  <br />
                  <ul style={{ listStyle: "disc" }} class="items-center pl-8">
                    {character.occupation.map((occupation) => (
                      <li>{occupation}&nbsp;&nbsp;</li>
                    ))}
                  </ul>
                </p>
              </div>
            )}

            <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-indigo-600 opacity-25"></div>
            <p class="pt-8 text-base font-bold flex items-center justify-center lg:justify-start">
              <strong class="text-indigo-700">Status:</strong>&nbsp;&nbsp;
              {character.status.toUpperCase()}
            </p>

            <p class="pt-6 text-base font-bold flex items-center justify-center lg:justify-start">
              <strong class="text-indigo-700">Portrayed:</strong>&nbsp;&nbsp;
              {character.portrayed}
            </p>
            <p class="pt-6 text-base font-bold flex items-center justify-center lg:justify-start">
              <strong class="text-indigo-700">Category:</strong>&nbsp;&nbsp;
              {character.category}
            </p>
            {character.appearance.length != 0 && (
              <p class="pt-6 text-base font-bold flex items-center justify-center lg:justify-start">
                <strong class="text-indigo-700">
                  Breaking Bad Appearances:
                </strong>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {characterBadSeasons.map((season) => (
                  <SeasonModal seasonData={season} />
                ))}
              </p>
            )}
            {character.better_call_saul_appearance.length != 0 && (
              <p class="pt-6 text-base font-bold flex items-center justify-center lg:justify-start">
                <strong class="text-indigo-700">
                  Better Call Saul Appearances:
                </strong>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {characterBetterSeasons.map((season) => (
                  <SeasonModal seasonData={season} />
                ))}
              </p>
            )}
          </div>
        </div>

        <div class="w-full lg:w-2/5">
          <img
            src={character.img}
            class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          />
        </div>
      </div>

      <div class="pt-12 flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="quotes"
          class="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div class="p-4 md:p-12 text-center lg:text-left">
            <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div>

            <h1 class="text-3xl font-bold pt-8 lg:pt-0">Quotes</h1>

            <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-indigo-600 opacity-25"></div>
            {characterQuotes.length > 0 && (
              <ul>
                {characterQuotes.map((quote) => (
                  <li class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                    {quote.quote}&nbsp;&nbsp;-&nbsp;&nbsp;
                    <span class="text-indigo-700">{quote.series}</span>
                  </li>
                ))}
              </ul>
            )}
            {characterQuotes.length === 0 && (
              <div class="pt-6">
                <span class="font-bold pt-5">
                  This character does not posses any quotes
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
