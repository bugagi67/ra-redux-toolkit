import MainPages from "./pages/MainPages";
import MovieDescription from "./pages/MovieDescription"
import FavoritesPages from "./pages/FavoritesPages"
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<MainPages />} />
        <Route path="/movie/:id" element={<MovieDescription />} />
        <Route path="/favorites" element={<FavoritesPages />} />
      </Routes>
    </div>
  );
}

export default App;
