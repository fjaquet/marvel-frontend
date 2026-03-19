import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CharactersPage from "./pages/Characters";
import ComicsPage from "./pages/Comics";
import FavorisPage from "./pages/Favoris";
import CharacterPage from "./pages/Character";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/favoris" element={<FavorisPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
