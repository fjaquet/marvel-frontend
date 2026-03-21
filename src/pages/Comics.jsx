import { useEffect, useState } from "react";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import "../styles/pages/shared/listing.css";
import "../styles/pages/shared/messages.css";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import addToFavorites from "../utils/manageFavorites";

const ComicsPage = () => {
  const VITE_API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
  const VITE_API_FQDN = import.meta.env.VITE_API_FQDN;
  const VITE_API_PORT = import.meta.env.VITE_API_PORT;

  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchComic, setSearchComic] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/comics?limit=100&skip=${(page - 1) * 100}&title=${searchComic}`,
        });

        setCount(response.data.count);
        setComics(response.data.results);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, searchComic]);

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
              <h1 className="listing-title">COMICS</h1>
              <Search search={searchComic} setSearch={setSearchComic} />
            </div>
            <div className="listing-grid">
              {comics.map((elt) => (
                <div className="listing-card" key={elt._id}>
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
                      setFavoriteMessage(reponse.message);
                      setMessageSuccess(reponse.sucess);

                      setTimeout(() => setFavoriteMessage(""), 1500);
                    }}
                  >
                    Add to favorites
                  </button>
                </div>
              ))}
            </div>
            <Pagination count={count} page={page} setPage={setPage} />
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

export default ComicsPage;
