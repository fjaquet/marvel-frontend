import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import "../styles/pages/shared/listing.css";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import addToFavorites from "../utils/manageFavorites";

const CharactersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchCharacter, setSearchCharacter] = useState("");

  const VITE_API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
  const VITE_API_FQDN = import.meta.env.VITE_API_FQDN;
  const VITE_API_PORT = import.meta.env.VITE_API_PORT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/characters?limit=100&skip=${(page - 1) * 100}&name=${searchCharacter}`,
        });

        setCount(response.data.count);
        setCharacters(response.data.results);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, searchCharacter]);

  return (
    <>
      {isLoading ? (
        <main className="listing-page">
          <p>Is loading...</p>
        </main>
      ) : (
        <main className="listing-page">
          <div className="container listing-container">
            <div className="listing-header">
              <h1 className="listing-title">CHARACTERS</h1>
              <Search search={searchCharacter} setSearch={setSearchCharacter} />
            </div>

            <div className="listing-grid">
              {characters.map((elt) => (
                <div className="listing-card" key={elt._id}>
                  <Link className="listing-link" to={`/character/${elt._id}`}>
                    <CharacterCard
                      picture={`${elt.thumbnail.path}.${elt.thumbnail.extension}`}
                      name={elt.name}
                      description={elt.description}
                    />
                  </Link>
                  <button
                    className="listing-favorite-btn"
                    onClick={() => {
                      addToFavorites("favorite_characters", elt._id);
                    }}
                  >
                    Add to favorites
                  </button>
                </div>
              ))}
            </div>
            <Pagination count={count} page={page} setPage={setPage} />
          </div>
        </main>
      )}
    </>
  );
};

export default CharactersPage;
