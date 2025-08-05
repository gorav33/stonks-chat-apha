import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SimliAgent } from "@/components/SimliAgent";

export const SimliAgentPage: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);

  const onStart = () => setShowDottedFace(false);
  const onClose = () => setShowDottedFace(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-2xl  min-h-screen mx-auto flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8 relative">
      {/* Back Arrow */}

      <Link
        to="/"
        className="absolute top-6 left-6 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-all"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </Link>

      <div></div>

      <div className="max-w-2xl flex flex-col items-center gap-6 bg-effect15White p-6 pb-[40px] rounded-xl w-full">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-primary">Next-Gen</span>
            <br />
            <span>Stonks AI</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-5xl">
            Meme-fueled AI that tells you the wrong thing — so you finally do
            the right thing.
          </p>
        </div>

        <SimliAgent onStart={onStart} onClose={onClose} />
      </div>
    </div>
  );
};

// SimliAgent Component
