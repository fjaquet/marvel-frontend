import "../styles/components/shared/card.css";

const CharacterCard = ({ picture, name, description }) => {
  return (
    <>
      <img className="listing-card__image" src={picture} alt="" />
      <p className="listing-card__name">{name}</p>
      <p className="listing-card__description">{description}</p>
    </>
  );
};

export default CharacterCard;
