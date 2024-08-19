import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../videoTypes/videoType.css';
import Header from '../Header';
import Footer from '../Footer';

const VideoTypes = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const response = await axios.get('https://www.mp3quran.net/api/v3/videos?language=ar');
          setVideos(response.data.videos);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchVideos();
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
     
      <div>
      <h1>Video List</h1>
      {videos.map((reciter) => (
        <div key={reciter.id}>
          <h2>{reciter.reciter_name}</h2>
          <div className="video-grid">
            {reciter.videos.map((video) => (
              <div className="video-item" key={video.id}>
                <a href={video.video_url} target="_blank" rel="noopener noreferrer">
                  <img src={video.video_thumb_url} alt={`Thumbnail of ${reciter.reciter_name}`} />
                  <p>Watch Video</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  
  );
};
  

export default VideoTypes;
