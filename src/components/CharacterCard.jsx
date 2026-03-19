import "../styles/components/character.css";

const CharacterCard = ({ picture, name, description }) => {
  return (
    <div className="character-card">
      <img className="character-card__image" src={picture} alt="" />
      <p className="character-card__name">{name}</p>
      <p className="character-card__description">{description}</p>
    </div>
  );
};

export default CharacterCard;
