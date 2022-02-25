import { fetchCharactersData } from "./functions/characters.functions";

fetchCharactersData({ name: 'Daredevil' }).then(console.log).catch(console.error);

export default {};