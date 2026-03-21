import Cookies from "js-cookie";
import axios from "axios";

const addToFavorites = async (favorite_type, id) => {
  const VITE_API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
  const VITE_API_FQDN = import.meta.env.VITE_API_FQDN;
  const VITE_API_PORT = import.meta.env.VITE_API_PORT;
  const token = Cookies.get("56879_marvel_access_token");

  if (["favorite_comics", "favorite_characters"].includes(favorite_type)) {
    try {
      const response = await axios({
        method: "put",
        url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/user/${favorite_type}/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return { sucess: true, message: response.data?.message || "" };
    } catch (error) {
      if (error.response?.status == 409) {
        return { sucess: false, message: error.response.data?.message || "" };
      } else {
        console.log(error);
        return { sucess: false, message: "" };
      }
    }
  }
};

export default addToFavorites;
