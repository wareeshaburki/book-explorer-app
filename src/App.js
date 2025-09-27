import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Navbar from "./pages/Navbar";
import FavoritesState from "./contexts/FavoritesState";

function App() {
  return (
    <>
      <FavoritesState>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="book/:id" element={<BookDetails />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </FavoritesState>
    </>
  );
}

export default App;
