"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StarryBackground from "./components/StarryBackground";
import Message from "./components/Message";
import MainImage from "./components/MainImage";
import AnimatedNumbers from "./components/AnimatedNumbers";
import WishText from "./components/WishText";
import MessageForm from "./components/MessageForm";
import ShareButtons from "./components/ShareButtons";
import { TopAdBanner, BottomAdBanner } from "./components/AdBanners";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sender, setSender] = useState("");
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const urlSender = searchParams.get("n");
    const urlShare = searchParams.get("share");
    if (urlSender) {
      setSender(urlSender);
      setShowShare(urlShare === "true");
    }
  }, [searchParams]);

  const handleCreateMessage = (name: string) => {
    router.push(`/?n=${encodeURIComponent(name)}&share=true`);
  };

  const handleCloseShare = () => {
    setShowShare(false);
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <StarryBackground />

      <div className="relative z-20">
        <TopAdBanner />

        <main className="container mx-auto px-4 sm:px-16 pt-2 sm:pt-4 pb-32 sm:pb-40">
          <Message sender={sender} />
          <MainImage />
          <AnimatedNumbers />
          <div className="mt-4 sm:mt-6">
            <WishText sender={sender} />
          </div>
          <BottomAdBanner />
        </main>

        {showShare ? (
          <ShareButtons
            sender={sender}
            url={`https://anionuevo2025.com/?n=${encodeURIComponent(sender)}`}
            onClose={handleCloseShare}
          />
        ) : (
          <MessageForm onSubmit={handleCreateMessage} />
        )}
      </div>
    </div>
  );
}
