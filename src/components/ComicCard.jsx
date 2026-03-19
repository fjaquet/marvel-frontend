const ComicCard = ({ picture, title, description }) => {
  return (
    <div className="comic-card">
      <img className="comic-card__image" src={picture} alt="" />
      <p className="comic-card__name">{title}</p>
      <p className="comic-card__description">{description}</p>
    </div>
  );
};

export default ComicCard;
