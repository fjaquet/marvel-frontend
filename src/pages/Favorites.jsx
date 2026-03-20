import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import CharacterCard from "../components/CharacterCard";
import ComicCard from "../components/ComicCard";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const token = Cookies.get("56879_marvel_access_token");

  const VITE_API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
  const VITE_API_FQDN = import.meta.env.VITE_API_FQDN;
  const VITE_API_PORT = import.meta.env.VITE_API_PORT;

  const [isLoading, setIsLoading] = useState(true);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Characters
        const responseCharacter = await axios({
          method: "get",
          url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/user/favorite_characters`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const favoriteCharactersIds =
          responseCharacter.data.favorite_characters;
        const newFavoriteCharacters = [];

        for (let i = 0; i < favoriteCharactersIds.length; i++) {
          const response = await axios({
            method: "get",
            url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/character/${favoriteCharactersIds[i]}`,
          });
          newFavoriteCharacters.push(response.data);
        }
        setFavoriteCharacters(newFavoriteCharacters);
        //get Comics
        const response = await axios({
          method: "get",
          url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/user/favorite_comics`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const favoriteComicsIds = response.data.favorite_comics;
        const newFavoriteComics = [];

        for (let i = 0; i < favoriteComicsIds.length; i++) {
          const response = await axios({
            method: "get",
            url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/comic/${favoriteComicsIds[i]}`,
          });
          newFavoriteComics.push(response.data);
        }

        setFavoriteComics(newFavoriteComics);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const delFromFavorites = async (favorite_type, id) => {
    try {
      await axios({
        method: "delete",
        url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/user/${favorite_type}/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      if (favorite_type === "favorite_characters") {
        setFavoriteCharacters((prev) => prev.filter((item) => item._id !== id));
      } else if (favorite_type === "favorite_comics") {
        setFavoriteComics((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      if (error.response?.data) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return token ? (
    isLoading ? (
      <main>
        <p>Is loading...</p>
      </main>
    ) : (
      <main>
        <h2>Favorites characters</h2>
        <div>
          {favoriteCharacters.map((elt) => (
            <div key={elt._id}>
              <Link to={`/character/${elt._id}`}>
                <CharacterCard
                  picture={`${elt.thumbnail.path}.${elt.thumbnail.extension}`}
                  name={elt.name}
                  description={elt.description}
                />
              </Link>
              <button
                onClick={() => {
                  delFromFavorites("favorite_characters", elt._id);
                }}
              >
                Remove from favorites
              </button>
            </div>
          ))}
        </div>

        <h2>Favorites comics</h2>
        {favoriteComics.map((elt) => (
          <div key={elt._id}>
            <ComicCard
              picture={`${elt.thumbnail.path}.${elt.thumbnail.extension}`}
              title={elt.title}
              description={elt.description}
            />
            <button
              onClick={() => {
                delFromFavorites("favorite_comics", elt._id);
              }}
            >
              Remove from favorites
            </button>
          </div>
        ))}
      </main>
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default FavoritesPage;
