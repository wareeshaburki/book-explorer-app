import { useState, useEffect } from "react";
import FavoritesContext from "./FavoritesContext";

const FavoritesState = (props) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addBooks = (book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeBooks = (bookId) => {
    setFavorites(favorites.filter((book) => book.id !== bookId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addBooks, removeBooks }}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesState;
