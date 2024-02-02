import { useState } from "react";
import { Character } from "../models/Character";
import CharacterModal from "./CharacterModal";
import useFetchPlanet from "../hooks/UseFetchPlanet";
import "../styles/components/CharacterCard.css";

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
  const [show, setShow] = useState(false);
  const { planet, loading, error } = useFetchPlanet(character.homeworld);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // You might want to handle the loading and error states as well
  return (
    <>
      <div
        id="character-card"
        className="card"
        onClick={handleShow}
        style={{
          backgroundImage: `url(https://picsum.photos/seed/${character.height}/500/500)`,
        }}
      >
        <div className="card-content">
          <h2 className="card-title">{character.name}</h2>
          <p className="card-body">
            Birth Year: {character.birth_year}
            <br />
            Height: {character.height / 100.0} m<br />
            Mass: {character.mass} kg
            <br />
            Hair Color: {character.hair_color}
            <br />
            Skin Color: {character.skin_color}
          </p>
        </div>
      </div>

      <CharacterModal
        show={show}
        handleClose={handleClose}
        character={character}
        planet={planet}
        loading={loading}
        error={error}
      />
    </>
  );
}

export default CharacterCard;
