import React, { useEffect, useRef } from "react";

export const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const STORAGE_KEY = "lastVideoTime";

  useEffect(() => {
    const savedTime = localStorage.getItem(STORAGE_KEY);
    if (videoRef.current && savedTime) {
      videoRef.current.currentTime = parseFloat(savedTime);
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      localStorage.setItem(STORAGE_KEY, String(videoElement.currentTime));
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <video ref={videoRef} width="560" controls>
      <source src="" type="video/mp4" />
          Ваш браузер не поддерживает видео-тег.
    </video>
  );
};
