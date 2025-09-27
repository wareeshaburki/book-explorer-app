import React, { useContext } from "react";
import FavoritesContext from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, removeBooks } = useContext(FavoritesContext);

  return (
    <div className="favorite-book-container">
      {favorites.length === 0 ? (
        <h3>No Favorites Yet</h3>
      ) : (
        favorites.map((book) => (
          <div className="favorite-book-card" key={book.id}>
            <Link to={`/book/${book.id}`}>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
            </Link>
            <div className="favorite-book-info">
              <h3>{book.volumeInfo.title}</h3>
              <p>
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : "Unknown Author"}
              </p>
            </div>
            <button
              className="remove-fvt-overlay"
              onClick={() => removeBooks(book.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
