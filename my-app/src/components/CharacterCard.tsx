import { Character } from "../models/Character";
import "../styles/CharacterCard.css";

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
  // get a random background image
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(https://picsum.photos/seed/${
          Math.random() * 1000
        }/500/500)`,
      }}
    >
      <div className="card-content">
        <h2 className="card-title">{character.name}</h2>
        <p className="card-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
          culpa.
        </p>
      </div>
    </div>
  );
}

export default CharacterCard;
