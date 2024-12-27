"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StarryBackground } from "./components/StarryBackground";
import Message from "./components/Message";
import MainImage from "./components/MainImage";
import AnimatedNumbers from "./components/AnimatedNumbers";
import WishText from "./components/WishText";
import MessageForm from "./components/MessageForm";
import ShareButtons from "./components/ShareButtons";
import { trackEvent } from "./lib/utils";

// import { TopAdBanner, BottomAdBanner } from "./components/AdBanners";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <StarryBackground />
      <Suspense
        fallback={
          <div className="relative z-20 flex items-center justify-center min-h-screen">
            <div className="text-white">Cargando...</div>
          </div>
        }
      >
        <ClientContent />
      </Suspense>
    </div>
  );
}

function ClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sender, setSender] = useState("");
  const [showShare, setShowShare] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        trackEvent("Audio Interaction", {
          action: "pause",
          currentTime: audioRef.current.currentTime,
        });
      } else {
        // Reiniciar el audio si ha terminado
        if (audioRef.current.currentTime > 0) {
          audioRef.current.currentTime = 0;
        }

        audioRef.current.volume = 0.5;
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              trackEvent("Audio Interaction", {
                action: "play",
                currentTime: audioRef?.current?.currentTime,
              });
              console.log("Audio reproduciendo exitosamente");
            })
            .catch((error: DOMException) => {
              console.log("Error al reproducir audio:", error);
              setIsPlaying(false);
              trackEvent("Audio Error", {
                error: error.message,
              });
            });
        }
      }
    }
  };

  useEffect(() => {
    const urlSender = searchParams.get("n");
    const urlShare = searchParams.get("share");
    if (urlSender) {
      setSender(urlSender);
      setShowShare(urlShare === "true");
    }
  }, [searchParams]);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioElement?.addEventListener("ended", handleEnded);

    return () => {
      audioElement?.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    trackEvent("Page View", {
      sender: sender || "no_sender",
      has_share: showShare,
    });
  }, [sender, showShare]);

  const handleCreateMessage = (name: string) => {
    router.push(`/?n=${encodeURIComponent(name)}&share=true`);
  };

  const handleCloseShare = () => {
    setShowShare(false);
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <audio
        ref={audioRef}
        src="/audio.mp3"
        loop
        preload="auto"
        onError={(e) => console.log("Error en el elemento audio:", e)}
      />
      <button
        onClick={toggleAudio}
        className="fixed bottom-24 right-4 z-50 bg-white/25 hover:bg-white/40 p-4 rounded-full 
    transition-all duration-300 transform hover:scale-110 
    animate-bounce shadow-lg shadow-white/10 border border-white/20
    backdrop-blur-sm flex flex-col items-center gap-2"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        <span className="text-2xl">{isPlaying ? "🔇" : "🎵"}</span>
        {!isPlaying && (
          <span className="text-xs text-white font-medium whitespace-nowrap px-1">
            Click para música
          </span>
        )}
      </button>
      <div className="relative z-20">
        {/* <TopAdBanner /> */}

        <main className="container mx-auto px-4 sm:px-16 pt-2 sm:pt-4 pb-32 sm:pb-40">
          <Message sender={sender} />
          <MainImage />
          <AnimatedNumbers />
          <div className="mt-4 sm:mt-6">
            <WishText sender={sender} />
          </div>
          {/* <BottomAdBanner /> */}
        </main>

        {showShare ? (
          <ShareButtons
            sender={sender}
            url={`https://felicitaciones.vercel.app/?n=${encodeURIComponent(
              sender
            )}`}
            onClose={handleCloseShare}
          />
        ) : (
          <MessageForm onSubmit={handleCreateMessage} />
        )}
      </div>
    </div>
  );
}
