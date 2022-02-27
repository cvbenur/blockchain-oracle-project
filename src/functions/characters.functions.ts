import { requestBuilder, optionsToParamArray, RequestOptions } from "./request.functions";
import { MarvelCharacter } from "../models/marvel-character.model";
import axios from 'axios';

interface CharacterOptions extends RequestOptions {
  offset?: number;
  limit?: number;
  name?: string;
  nameStartsWith?: string;
}

// RegExp for one double quote (")
const re = /\"/gi;

/**
 * Fetches character data from the Marvel Comics API
 * @param options {@link CharacterOptions}
 * @returns An array of character data
 */
export async function fetchCharactersData(options?: CharacterOptions): Promise<MarvelCharacter[]> {
  // Craft HTTP request for the characters endpoint
  const req = requestBuilder(
    '/characters',
    (
      options
        ? optionsToParamArray(options)
        : []
    )
  );

  // Initialize empty array
  let ret: MarvelCharacter[] = [];

  // Fetch data from Marvel Comics API
  const res = (await axios.get(req)).data as any;

  // Fill array with retrieved data from API
  for (const characterData of res.data.results) {
    ret.push({
      marvelId: characterData.id,
      name: characterData.name,
      description: characterData.description.replace(re, '\''),
      appearances: characterData.comics.available,
    });
  }

  // Return filled array
  return ret;
}
