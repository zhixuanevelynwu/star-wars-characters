import { Character } from "../types/Character";
import Modal from "react-bootstrap/Modal";
import "../styles/components/CharacterModal.css";
import { Planet } from "../types/Planet";

/**
 *
 * @param param0 character information
 * @returns display information about the person:
 *  name as the header of the modal,
 *  height displayed in meters,
 *  mass in kg,
 *  date person was added to the API (in dd-MM-yyyy format),
 *  number of films the person appears in and their birth year.
 *  We should also fetch information about the person’s homeworld and
 *  display its name,
 *  terrain,
 *  climate,
 *  and amount of residents.
 */
function CharacterModal({
  show,
  handleClose,
  character,
  planet,
  loading,
  error,
}: {
  show: boolean;
  handleClose: () => void;
  character: Character;
  planet: Planet;
  loading: boolean;
  error: string | null;
}) {
  const height: string =
    character.height === "Unknown"
      ? "Unknown"
      : `${parseFloat(character.height) / 100.0} m`;
  const mass =
    character.mass === "unknown" ? "Unknown" : `${character.mass} kg`;
  return (
    <Modal
      className="character-modal"
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {character.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Details</h5>
        <p>
          Height: {height}
          <br />
          Mass: {mass}
          <br />
          Created:{" "}
          {new Date(character.created)
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-")}
          <br />
          Number of Films: {character.films.length}
          <br />
          Birth Year: {character.birth_year}
        </p>
        <h5>Homeworld</h5>
        {loading && <div>Loading...</div>}
        {error && <div>Error loading planet</div>}
        <p>
          Planet: {planet.name}
          <br />
          Terrain: {planet.terrain}
          <br />
          Climate: {planet.climate}
          <br />
          Population: {planet.population}
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default CharacterModal;
