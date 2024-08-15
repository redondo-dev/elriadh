import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Reciters = () => {
  const [reciters, setReciters] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState("");
  const [selectedReciterId, setSelectedReciterId] = useState("");
  const [moshaf, setMoshaf] = useState([]); // Liste des Moshafs pour le récitant sélectionné
  const [selectedMoshaf, setSelectedMoshaf] = useState("");
  const [suratList, setSuratList] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchReciters = async () => {
      try {
        const response = await axios.get(
          "https://mp3quran.net/api/v3/reciters"
        );
        const recitersData = Array.isArray(response.data.reciters)
          ? response.data.reciters
          : [];
        setReciters(recitersData);
      } catch (error) {
        console.error("Erreur lors de la récupération des récitants:", error);
      }
    };

    fetchReciters();
  }, []);

  useEffect(() => {
    const fetchMoshaf = async () => {
      if (selectedReciterId) {
        try {
          const response = await axios.get(
            `https://mp3quran.net/api/v3/reciters?language=ar&id=${selectedReciterId}`
          );

          const reciterData = response.data.reciters.find(
            (reciter) => reciter.id === parseInt(selectedReciterId)
          );

          if (reciterData) {
            const moshafData = Array.isArray(reciterData.moshaf)
              ? reciterData.moshaf
              : [];

            console.log("Moshaf Data for Selected Reciter:", moshafData);

            setMoshaf(moshafData);
            setSuratList([]); // Réinitialiser la liste des sourates lorsque le récitant change
          } else {
            console.error("Reciter not found with ID:", selectedReciterId);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des Moshafs pour le récitant sélectionné:",
            error
          );
        }
      }
    };

    fetchMoshaf();
  }, [selectedReciterId]);

  useEffect(() => {
    const fetchSuratList = async () => {
      if (selectedMoshaf) {
        try {
          const response = await axios.get(
            `https://mp3quran.net/api/v3/suwar?language=ar`
          );
          const suratListData = response.data.suwar.map((surat) => surat.name);
          setSuratList(suratListData);
        } catch (error) {
          console.error("Erreur lors de la récupération des sourates:", error);
        }
      }
    };

    fetchSuratList();
  }, [selectedMoshaf]);

  const handleReciterChange = (e) => {
    const [reciterId, reciterName] = e.target.value.split("|");
    setSelectedReciter(reciterName);
    setSelectedReciterId(reciterId);
    setMoshaf([]);
    setSelectedMoshaf("");
    setSuratList([]);
    setAudioUrl("");
  };

  const handleMoshafChange = (e) => {
    setSelectedMoshaf(e.target.value);
    setSuratList([]);
    setAudioUrl("");
  };

  const handleSuratChange = async (e) => {
    const selectedSurat = e.target.value;

    if (selectedSurat && selectedMoshaf) {
      try {
        // Requête pour obtenir les détails du récitant en utilisant l'ID sélectionné
        const response = await axios.get(
          `https://mp3quran.net/api/v3/reciters?language=ar&id=${selectedReciterId}`
        );

        // Recherche du récitant spécifique par ID
        const reciterData = response.data.reciters.find(
          (reciter) => reciter.id === parseInt(selectedReciterId)
        );

        if (reciterData) {
          // Recherche du Moshaf spécifique par nom
          const selectedMoshafData = reciterData.moshaf.find(
            (m) => m.name === selectedMoshaf
          );

          console.log("Selected Reciter Data:", reciterData);
          console.log("Selected Moshaf Data:", selectedMoshafData);

          if (selectedMoshafData && selectedMoshafData.server) {
            // Formatage de l'ID de la Sourate avec des zéros devant
            const formattedSuratId = selectedSurat.padStart(3, "0");

            // Construction de l'URL de l'audio
            const audioUrl = `${selectedMoshafData.server}/${formattedSuratId}.mp3`;

            console.log("Generated Audio URL:", audioUrl); // Vérification de l'URL générée

            setAudioUrl(audioUrl); // Mise à jour de l'état avec l'URL de l'audio
          } else {
            console.error(
              "Moshaf not found for selected reciter and moshaf name:",
              selectedMoshaf
            );
          }
        } else {
          console.error("Reciter not found with ID:", selectedReciterId);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'URL audio:", error);
      }
    }
  };
  return (
    <div className="search-form">
      <div className="container">
        <div style={{ marginBottom: '30px' }}className="row">
          <div className="col-lg-4">
            <fieldset>
              <label htmlFor="chooseReciter" className="form-label" style={{fontWeight:'bold',fontSize:'22px',color:'white'}}>
                اختر القارئ
              </label>
              <select
                name="Reciter"
                className="form-select"
                aria-label="Default select example"
                id="chooseReciter"
                value={`${selectedReciterId}|${selectedReciter}`}
                onChange={handleReciterChange}
              >
                <option value="">Choose reciter</option>
                {reciters.map((reciter) => (
                  <option
                    key={reciter.id}
                    value={`${reciter.id}|${reciter.name}`}
                  >
                    {reciter.name}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <div className="col-lg-4">
            {moshaf.length > 0 && (
              <div>
                <label htmlFor="chooseMoshaf" className="form-label" style={{fontWeight:'bold',fontSize:'22px',color:'white'}}>
                  اختر المصحف
                </label>
                <select
                  name="Moshaf"
                  className="form-select"
                  aria-label="Default select example"
                  id="chooseMoshaf"
                  value={selectedMoshaf}
                  onChange={handleMoshafChange}
                >
                  <option value="">Choose moshaf</option>
                  {moshaf.map((moshafItem, index) => (
                    <option key={index} value={moshafItem.name}>
                      {moshafItem.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="col-lg-4">
            {selectedMoshaf && suratList.length > 0 && (
              <div>
                <label htmlFor="chooseSurat" className="form-label" style={{fontWeight:'bold',fontSize:'22px', color:'white'}} >
                  اختر السورة
                </label>
                <select
                  name="Surat"
                  className="form-select"
                  aria-label="Default select example"
                  id="chooseSurat"
                  onChange={handleSuratChange}
                >
                  <option value="">Choose surat</option>
                  {suratList.map((surat, index) => (
                    <option key={index} value={(index + 1).toString()}>
                      {surat}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        {audioUrl && (
          <div style={{ marginTop: "30px" }} className="audio-player">
            <audio ref={audioRef} controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reciters;
