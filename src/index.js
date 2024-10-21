import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Alya from "./assets/alya.jpg";
import Song from "./assets/songs.mp3";
import Video from "./assets/vid-ucapan.mp4";

function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    let audioInstance = new Audio(Song);
    audioInstance.loop = true;
    audioInstance.volume = 0.1; // Set volume to a reasonable level
    setAudio(audioInstance);

    const playAudio = () => {
      audioInstance.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    };

    // Play audio once user interaction is detected to comply with browser policies
    const handleUserInteraction = () => {
      playAudio();
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keypress", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keypress", handleUserInteraction);

    return () => {
      audioInstance.pause();
      audioInstance = null;
    };
  }, []);

  const handleShowVideo = () => {
    if (audio) {
      audio.volume = 0.09; // Lower the background audio volume
    }
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    if (audio) {
      audio.volume = 0.5; // Restore the background audio volume
    }
    setShowVideo(false);
  };

  return (
    <div className="container">
      <h1>Happy 20th Birthday, Alya Satya! ✨❤</h1>
      <p className="message">
        Haloo ibu yakult! Selamat ulang tahun yaa buat kamuu ☺❤
      </p>
      <img
        className="birthday-image"
        src={Alya}
        alt="Alya's Birthday Celebration"
      />
      <p className="joke">
        btw sorry yaa kalau webnya buriq, aku gatau lagi harus desain kaya
        gimana wkwkwk😅✨
      </p>
      <button className="button" onClick={handleShowVideo}>
        klik inii buat...🧐
      </button>
      {showVideo && (
        <div className="video-popup">
          <video width="600" controls autoPlay>
            <source src={Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className="button" onClick={handleCloseVideo}>
            Tutup Video
          </button>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
