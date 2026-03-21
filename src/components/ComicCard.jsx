import "../styles/components/shared/card.css";

const ComicCard = ({ picture, title, description }) => {
  return (
    <>
      <img className="listing-card__image" src={picture} alt="" />
      <p className="listing-card__name">{title}</p>
      <p className="listing-card__description">{description}</p>
    </>
  );
};

export default ComicCard;
