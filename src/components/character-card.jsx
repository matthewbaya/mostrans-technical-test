import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/character-card.css"; // Import the CSS file

export default function CharacterCard({ character }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/character/" + character.id);
  };
  return (
    <div className="character-card col-md-3 col-lg-3" onClick={handleNavigate}>
      <img src={character.image} alt={character.name} className="img-fluid" />
      <h2 className="character-name">{character.name}</h2>
    </div>
  );
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
