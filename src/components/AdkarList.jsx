
import React, { useState, useEffect } from "react";
import axios from "axios";

const HisnAlMuslim = () => {
  const [adkarList, setAdkarList] = useState([]);

  useEffect(() => {
    const fetchAdkarData = async () => {
      try {
        // Fetch titles of Adkar
        const titleResponse = await axios.get(
          "https://www.hisnmuslim.com/api/ar/husn_ar.json"
        );
        const titles = titleResponse.data["العربية"];

        // Fetch Adkar details
        const adkarResponse = await axios.get(
          "https://www.hisnmuslim.com/api/ar/27.json"
        );
        const adkarData = adkarResponse.data["أذكار الصباح والمساء"];

        // Combine titles with their corresponding Adkar details
        const combinedData = adkarData.map((adkar, index) => ({
          ...adkar,
          title: titles[index]?.TITLE,
        }));

        setAdkarList(combinedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données des Adkar :", error);
      }
    };

    fetchAdkarData();
  }, []);

  return (
    <div>
      <h1>Liste des Adkar</h1>
      <ul>
        {adkarList.map((adkar) => (
          <li key={adkar.ID}>
            <h2> {adkar.title}</h2>
            <p>{adkar.ARABIC_TEXT}</p>
            <audio controls>
              <source src={adkar.AUDIO} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HisnAlMuslim;
