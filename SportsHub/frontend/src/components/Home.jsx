import React from "react";
import Hero from "./Hero";
import Highlights from "./Highlights";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Hero />
      <Highlights />
    </div>
  );
}
