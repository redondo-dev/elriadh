import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import './quran.css'

const Quran = () => {
  const [surahList, setSurahList] = useState([]);
  const [verses, setVerses] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);

  useEffect(() => {
    const fetchSurahList = async () => {
      try {
        
        const response = await axios.get("https://api.alquran.cloud/v1/surah");
        setSurahList(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des sourates :", error);
      }
    };

    fetchSurahList();
  }, []);

  const handleSurahClick = async (surahNumber) => {
    try {
      const arabicResponse = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`
      );
      const frenchResponse = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/fr.hamidullah`
      );

      const arabicVerses = arabicResponse.data.data.ayahs;
      const frenchVerses = frenchResponse.data.data.ayahs;

      const combinedVerses = arabicVerses.map((verse, index) => ({
        arabic: verse.text,
        french: frenchVerses[index]?.text,
      }));

      setVerses(combinedVerses);
      setSelectedSurah(surahNumber);
    } catch (error) {
      console.error("Erreur lors de la récupération des versets :", error);
    }
  };

  return (
    <div className="quran-container">
      <h1>Liste des Sourates</h1>
      <div className="surah-list">
        <ul>
          {surahList.map((surah) => (
            <li
              key={surah.number}
              onClick={() => handleSurahClick(surah.number)}
              className={selectedSurah === surah.number ? "selected" : ""}
            >
              {surah.number}. {surah.englishName} - {surah.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedSurah && (
        <div className="verses-container">
          <h2>Versets de la Sourate {selectedSurah}</h2>
          <ul>
            {verses.map((verse, index) => (
              <li key={index}>
                <p className="arabic"><strong>Arabe :</strong> {verse.arabic}</p>
                <p className="french"><strong>Français :</strong> {verse.french}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quran;
