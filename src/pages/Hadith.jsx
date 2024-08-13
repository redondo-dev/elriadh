import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const Hadith = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [hadithArabic, setHadithArabic] = useState(""); // État pour stocker le hadith en arabe

  useEffect(() => {
    const apiKey = `$2y$10$7mYcWxkURsoiukiyQ6POCQ1VcHzGkOca3lkjqoB9VTGYej8C6i`;

    if (!apiKey) {
      setError("API Key is missing. Please check your .env file.");
      return;
    }

    const apiUrl = `https://hadithapi.com/api/books?apiKey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data && response.data.books) {
          setBooks(response.data.books);
        } else {
          setError("Data is not in the expected format.");
        }
      })
      .catch((error) => {
        setError(error.toString());
      });
  }, []);

  const handleCardClick = (bookSlug) => {
    const apiKey = `$2y$10$7mYcWxkURsoiukiyQ6POCQ1VcHzGkOca3lkjqoB9VTGYej8C6i`;

    // Appel API pour récupérer le hadith en arabe
    const hadithsUrl = `https://hadithapi.com/public/api/hadiths/?apiKey=${apiKey}&bookSlug=${bookSlug}`;
    axios
      .get(hadithsUrl)
      .then((response) => {
        console.log(response);
        const hadithData = response.data.hadiths.data[0]; // Supposons que nous voulons le premier hadith
        console.log(hadithData);
        setHadithArabic(hadithData.hadithArabic); // Mettre à jour l'état avec le hadith en arabe
      })
      .catch((error) => {
        setError(error.toString());
      });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Livres de hadith-كتب الحديث</h1>
      <div style={{ padding: "20px" }}>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {books.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => handleCardClick(book.bookSlug)} // Ajout du clic
                style={{
                  width: "250px",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ fontSize: "18px", margin: " 10px" }}>
                  {book.bookName}
                </h3>
                <p>
                  <strong>Author:</strong> {book.writerName || "Unknown"}
                </p>
                <p>
                  <strong>Hadiths Count:</strong> {book.hadiths_count}
                </p>
                <p>
                  <strong>Chapters Count:</strong> {book.chapters_count}
                </p>
                <p>
                  <strong>Book Slug:</strong> {book.bookSlug}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {/* Affichage du hadith en arabe */}
        {hadithArabic && (
          <div
            style={{ marginTop: "20px", fontSize: "18px", direction: "rtl" }}
          >
            <h2>Hadith en Arabe :</h2>
            <p>{hadithArabic}</p>
          </div>
        )}
      </div> 
      <Footer/>
    </>
   
  );
};

export default Hadith;
