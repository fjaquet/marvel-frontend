import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ComicCard from "../components/ComicCard";

const CharacterPage = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState({});
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          let co = await axios({
            method: "get",
            url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/comic/${comicId}`,
          });
          comicTab.push(co.data);
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
          <p>Is loading...</p>
        </main>
      ) : (
        <main className="characters-page">
          <h1>{character.name}</h1>
          <p>{character.description}</p>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          {comics.map((elt) => (
            <ComicCard
              key={elt._id}
              picture={`${elt.thumbnail.path}.${elt.thumbnail.extension}`}
              title={elt.title}
              description={elt.description}
            />
          ))}
        </main>
      )}
    </>
  );
};

export default CharacterPage;
