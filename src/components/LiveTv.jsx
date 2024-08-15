import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Hls from 'hls.js';

const LiveTv = () => {
  const [channels, setChannels] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    axios.get('https://mp3quran.net/api/v3/live-tv')
      .then(response => {
        setChannels(response.data.livetv);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des chaînes TV:", error);
      });
  }, []);

  useEffect(() => {
    if (channels.length > 0) {
      channels.forEach((channel, index) => {
        const video = videoRefs.current[index];
        if (video) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(channel.url);
            hls.attachMedia(video);
            return () => {
              hls.destroy();
            };
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = channel.url;
          }
        }
      });
    }
  }, [channels]);

  return (
    <div className="live-tv-container">
      <h1 className='titre'>بث مباشر</h1>
      <div className="live-tv-list">
        {channels.map((channel, index) => (
          <div className="live-tv-item" key={channel.id}>
            <h2>{channel.name}</h2>
            <video ref={el => (videoRefs.current[index] = el)} controls>
              Votre navigateur ne prend pas en charge la balise vidéo.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveTv;
