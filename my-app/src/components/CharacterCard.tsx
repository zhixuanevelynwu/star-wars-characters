import { Character } from '../models/Character';

/**
 * 
 * @param param0 character information
 * @returns display a card with the name of each character along with a random picture 
 * for each character (see Picsum photos for random picture inspiration). Each character 
 * card should be colored based on their species and have some kind of animation when the 
 * user hovers over the card. When we click on a character’s card, more information should 
 * appear in a modal about the character.
 */
function CharacterCard({ character }: { character: Character }) {
  return (
    <button>{character.name}</button>
  );
}

export default CharacterCard;