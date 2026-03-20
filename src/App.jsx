import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CharactersPage from "./pages/Characters";
import ComicsPage from "./pages/Comics";
import FavoritesPage from "./pages/Favorites";
import CharacterPage from "./pages/Character";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
