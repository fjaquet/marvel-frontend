import Cookies from "js-cookie";
import axios from "axios";

const token = Cookies.get("56879_marvel_access_token");

const VITE_API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
const VITE_API_FQDN = import.meta.env.VITE_API_FQDN;
const VITE_API_PORT = import.meta.env.VITE_API_PORT;

const addToFavorites = async (favorite_type, id) => {
  if (["favorite_comics", "favorite_characters"].includes(favorite_type)) {
    try {
      const response = await axios({
        method: "put",
        url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/user/${favorite_type}/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      if (error.response.status == 409) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  }
};

export default addToFavorites;
