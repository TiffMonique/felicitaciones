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
      } else {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch((error: DOMException) => {
          console.log("Error al reproducir audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
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
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch((error: Error) => {
        console.log("Error al reproducir audio:", error);
      });
    }
  }, []);

  const handleCreateMessage = (name: string) => {
    router.push(`/?n=${encodeURIComponent(name)}&share=true`);
  };

  const handleCloseShare = () => {
    setShowShare(false);
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <audio ref={audioRef} loop src="/audio.mp3" />
      <button
        onClick={toggleAudio}
        className="fixed bottom-4 right-4 z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? "🔇" : "🔊"}
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
