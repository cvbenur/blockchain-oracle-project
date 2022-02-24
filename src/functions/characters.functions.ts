import { requestBuilder, optionsToParamArray, RequestOptions } from "./request.functions";
import { MarvelCharacter } from "../models/marvel-character.model";
import axios from 'axios';

interface CharacterOptions extends RequestOptions {
  offset?: number;
  limit?: number;
  name?: string;
  nameStartsWith?: string;
}

export async function fetchCharacters (options?: CharacterOptions): Promise<MarvelCharacter[]> {
  const req = requestBuilder(
    '/characters',
    (
      options
        ? optionsToParamArray(options)
        : []
    )
  );

  let ret: MarvelCharacter[] = [];

  const res = (await axios.get(req)).data as any;

  for (const characterData of res.data.results) {
    ret.push({
      id: characterData.id,
      name: characterData.name,
      description: characterData.description,
      appearances: characterData.comics.available,
    });
  }

  return ret;
}
