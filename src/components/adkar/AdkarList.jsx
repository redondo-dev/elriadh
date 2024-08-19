
import React, { useState, useEffect } from "react";
import axios from "axios";

import {motion } from "framer-motion";
import './adkar.css';


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
  <><h1>Liste des Adkar</h1>
    <div className="containeradkar">
    <ul>
      {adkarList.map((adkar) => (
        <motion.li
          key={adkar.ID}
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{adkar.title}</h2>
          <p>{adkar.ARABIC_TEXT}</p>
          <audio controls>
            <source src={adkar.AUDIO} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </motion.li>
      ))}
    </ul>
  </div>
  </>
  );
};

export default HisnAlMuslim;
