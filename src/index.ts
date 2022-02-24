import { fetchCharacters } from "./functions/characters.functions";

fetchCharacters({ name: 'Spider-Man (Peter Parker)' }).then(console.log).catch(console.error);

export default {};