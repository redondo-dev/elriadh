
// import React, { useState, useRef, useEffect } from 'react';

// const AudioPlayer = ({ src }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const audio = audioRef.current;

//     audio.addEventListener('loadedmetadata', () => {
//       setDuration(audio.duration);
//     });

//     audio.addEventListener('timeupdate', () => {
//       setCurrentTime(audio.currentTime);
//     });
//   }, []);

//   const handlePlayPause = () => {
//     const audio = audioRef.current;

//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }

//     setIsPlaying(!isPlaying);
//   };

//   const handleTimeUpdate = () => {
//     const audio = audioRef.current;

//     setCurrentTime(audio.currentTime);
//   };

//   const handleSeek = (event) => {
//     const audio = audioRef.current;

//     audio.currentTime = event.target.value;
//     setCurrentTime(audio.currentTime);
//   };

//   return (
//     <div>
//       <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} />
//       <button onClick={handlePlayPause}>{isPlaying? 'Pause' : 'Play'}</button>
//       <input type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} />
//       <div>Current time: {currentTime} seconds</div>
//       <div>Duration: {duration} seconds</div>
//     </div>
//   );
// };

// export default AudioPlayer;
