import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import FavoritesContext from "../contexts/FavoritesContext";
import "./BookDetails.css";

export default function BookDetails() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const { addBooks, favorites } = useContext(FavoritesContext);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_KEY;
      const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error fetching data");
        return;
      }
      const bookData = await response.json();
      setBookDetails(bookData);
    };

    fetchBook();
  }, [id]);

  const isFavorite =
    bookDetails && favorites.some((fav) => fav.id === bookDetails.id);

  const addFav = () => {
    if (!isFavorite) {
      addBooks(bookDetails);
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1500);
    }
  };

  return (
    <>
      <h1 className="book-details-main-heading">Searched Book Details</h1>
      {!bookDetails ? (
        <h4>Loading...</h4>
      ) : (
        <div className="book-details-card">
          <img
            src={bookDetails.volumeInfo.imageLinks?.thumbnail}
            alt={bookDetails.volumeInfo.title}
          />
          <h2>{bookDetails.volumeInfo.title}</h2>
          {bookDetails.volumeInfo.authors ? (
            <h4>{bookDetails.volumeInfo.authors.join(", ")}</h4>
          ) : (
            <h4>Unknown Author</h4>
          )}
          {!bookDetails.volumeInfo.description ? (
            <p>No Description Available</p>
          ) : (
            bookDetails.volumeInfo.description
              .replace(/<p>/g, "")
              .replace(/<br\s*\/?>/g, " ")
              .split("</p>")
              .map((paragraph) => paragraph.trim())
              .filter((paragraph) => paragraph !== "")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)
          )}
          <h5>{bookDetails.volumeInfo.publisher}</h5>

          {isFavorite ? (
            <p className="already-favorite">Already in Favorites</p>
          ) : (
            <button onClick={addFav} className="add-to-fvt">
              Add To Favorites
            </button>
          )}

          {showAnimation && <div className="fav-animation">Added to Favorites! ❤️</div>}
        </div>
      )}
    </>
  );
}
