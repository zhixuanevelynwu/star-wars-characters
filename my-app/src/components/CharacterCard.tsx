import { useState } from "react";
import { Character } from "../types/Character";
import CharacterModal from "./CharacterModal";
import useFetchPlanet from "../hooks/UseFetchPlanet";
import "../styles/components/CharacterCard.css";

// 37 species as per SWAPI documentation, so we create 37 card colors to select from
const speciesColors: string[] = [
  "#AC2F75",
  "#C043FB",
  "#C36709",
  "#D315F2",
  "#245746",
  "#D8588C",
  "#3AC1E6",
  "#2757AE",
  "#5851A5",
  "#194D48",
  "#099473",
  "#D0F3C5",
  "#FE4FAF",
  "#C05263",
  "#D8B1F3",
  "#1D9393",
  "#8EA720",
  "#C109B9",
  "#7F201F",
  "#CAF497",
  "#A3FECB",
  "#72B71C",
  "#228080",
  "#A43585",
  "#26E8F4",
  "#114F84",
  "#692ABA",
  "#1F7801",
  "#41E7A9",
  "#392366",
  "#770BAE",
  "#525B80",
  "#8E6335",
  "#8C79AA",
  "#54CB44",
  "#06C42F",
  "#7FF483",
];

function getSpeciesColor(species: string[]): string {
  if (!species || species.length === 0) return "var(--default-specie-color)";
  const segments: string[] = species[0].split("/");
  const index: number = parseInt(segments[segments.length - 2]) - 1;
  return speciesColors[index];
}

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
  const [show, setShow] = useState<boolean>(false);
  const { planet, loading, error } = useFetchPlanet(character.homeworld);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div
        id="character-card"
        className="card"
        onClick={handleShow}
        style={{
          backgroundImage: `url(https://picsum.photos/seed/${character.height}/500/500)`,
          border: `4px solid ${getSpeciesColor(character.species)}`,
        }}
      >
        <div className="card-content">
          <h4 className="card-title">{character.name}</h4>
          <p className="card-body">
            Gender: {character.gender}
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
