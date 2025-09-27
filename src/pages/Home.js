import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [bookList, setBookList] = useState([]);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Error fetching data");
      return;
    }
    const data = await response.json();
    setBookList(data.items || []);
  };

  return (
    <>
      <div className="home-main-conatiner">
        <div className="search-bar">
          <input
            value={query}
            onChange={handleQuery}
            type="text"
            className="search-input"
            placeholder="Enter Book Here..."
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        <div className="book-results">
          {bookList.map((book) => (
            <Link to={`/book/${book.id}`} key={book.id}>
              <div key={book.id} className="book-card">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt={book.volumeInfo.title}
                />
                <h3>{book.volumeInfo.title}</h3>
                <p>
                  {book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(", ")
                    : "Unknown Author"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
