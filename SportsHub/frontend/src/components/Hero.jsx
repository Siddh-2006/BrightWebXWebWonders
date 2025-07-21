export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/background-sports.jpg')" }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 px-6 transition-opacity duration-1000 ease-in-out">
        <h1 className="text-5xl md:text-6xl font-bold text-orange-500 mb-4 drop-shadow-lg">
          Connect Through Sports
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Welcome to the LinkedIn of Sports. Find clubs. Meet players. Build your game.
        </p>
      </div>
    </section>
  );
}