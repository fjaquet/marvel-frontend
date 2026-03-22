import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import addToFavorites from "../utils/manageFavorites";
import "../styles/pages/shared/listing.css";
import "../styles/pages/character.css";
import "../styles/pages/shared/messages.css";
import Loader from "../components/Loader";

const CharacterPage = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState({});
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(true);

  const VITE_API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
  const VITE_API_FQDN = import.meta.env.VITE_API_FQDN;
  const VITE_API_PORT = import.meta.env.VITE_API_PORT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/character/${id}`,
        });

        setCharacter(response.data);
        const comicList = response.data.comics;
        const comicTab = [];

        for (const comicId of comicList) {
          if (comicId) {
            let co = await axios({
              method: "get",
              url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/comic/${comicId}`,
            });
            comicTab.push(co.data);
          }
        }

        setComics(comicTab);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <main className="characters-page">
          <Loader />
        </main>
      ) : (
        <main className="characters-page">
          <div className="container listing-container">
            <section className="character-hero">
              <div className="character-hero__media">
                <img
                  className="character-hero__image"
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />{" "}
                <button
                  className="listing-favorite-btn character-hero__btn"
                  onClick={async () => {
                    const reponse = await addToFavorites(
                      "favorite_characters",
                      character._id,
                      setFavoriteMessage,
                    );
                    setFavoriteMessage(reponse?.message);
                    setMessageSuccess(reponse?.sucess);

                    setTimeout(() => setFavoriteMessage(""), 1500);
                  }}
                >
                  Add to favorites
                </button>
              </div>

              <aside className="character-hero__content">
                <h1 className="character-hero__name">{character.name}</h1>
                <p className="character-hero__description">
                  {character.description}
                </p>
              </aside>
            </section>
            <div className="listing-header">
              <h2 className="listing-title">COMICS</h2>
            </div>

            <div className="listing-grid">
              {comics.map((elt) => (
                <div key={elt._id} className="listing-card">
                  <ComicCard
                    picture={`${elt.thumbnail.path}.${elt.thumbnail.extension}`}
                    title={elt.title}
                    description={elt.description}
                  />
                  <button
                    className="listing-favorite-btn"
                    onClick={async () => {
                      const reponse = await addToFavorites(
                        "favorite_comics",
                        elt._id,
                        setFavoriteMessage,
                      );
                      setFavoriteMessage(reponse?.message);
                      setMessageSuccess(reponse?.sucess);

                      setTimeout(() => setFavoriteMessage(""), 1500);
                    }}
                  >
                    Add to favorites
                  </button>
                </div>
              ))}
            </div>
          </div>
          {favoriteMessage &&
            (messageSuccess ? (
              <p className="favorite-feedback favorite-feedback--success">
                {favoriteMessage}
              </p>
            ) : (
              <p className="favorite-feedback favorite-feedback--error">
                {favoriteMessage}
              </p>
            ))}
        </main>
      )}
    </>
  );
};

export default CharacterPage;
