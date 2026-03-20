import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import CharacterCard from "../components/CharacterCard";
import { Link } from "react-router-dom";

const FavorisPage = () => {
  const token = Cookies.get("56879_marvel_access_token");

  const VITE_API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
  const VITE_API_FQDN = import.meta.env.VITE_API_FQDN;
  const VITE_API_PORT = import.meta.env.VITE_API_PORT;

  const [isLoading, setIsLoading] = useState(true);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/user/favorite_characters`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const favoriteCharactersIds = response.data.favorite_characters;
        const newFavoriteCharacters = [];

        for (let i = 0; i < favoriteCharactersIds.length; i++) {
          const response = await axios({
            method: "get",
            url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/character/${favoriteCharactersIds[i]}`,
          });
          newFavoriteCharacters.push(response.data);
        }

        setFavoriteCharacters(newFavoriteCharacters);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return token ? (
    isLoading ? (
      <main>
        <p>Is loading...</p>
      </main>
    ) : (
      <main>
        <h2>Favorites characters</h2>
        {favoriteCharacters.map((elt) => (
          //   <p key={elt}>{elt}</p>
          <Link key={elt._id} to={`/character/${elt._id}`}>
            <CharacterCard
              picture={`${elt.thumbnail.path}.${elt.thumbnail.extension}`}
              name={elt.name}
              description={elt.description}
            />
          </Link>
        ))}
        <h2>Favorites comics</h2>
      </main>
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default FavorisPage;
