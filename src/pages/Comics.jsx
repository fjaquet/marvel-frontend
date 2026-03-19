import { useEffect, useState } from "react";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import "../styles/pages/comics.css";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const ComicsPage = () => {
  const VITE_API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
  const VITE_API_FQDN = import.meta.env.VITE_API_FQDN;
  const VITE_API_PORT = import.meta.env.VITE_API_PORT;

  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchComic, setSearchComic] = useState("");

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
        <main className="comics-page">
          <p>Is loading...</p>
        </main>
      ) : (
        <main className="comics-page">
          <div className="container comics-container">
            <h1>MARVEL COMICS LIST</h1>
            <Search search={searchComic} setSearch={setSearchComic} />
            {comics.map((elt) => (
              <ComicCard
                key={elt._id}
                picture={`${elt.thumbnail.path}.${elt.thumbnail.extension}`}
                title={elt.title}
                description={elt.description}
              />
            ))}
          </div>
          <Pagination count={count} page={page} setPage={setPage} />
        </main>
      )}
    </>
  );
};

export default ComicsPage;
