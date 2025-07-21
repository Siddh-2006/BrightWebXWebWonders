import React from "react";
import { motion } from "motion/react";

const highlights = [
  {
    title: "Discover Clubs",
    desc: "Browse and follow local sports clubs near you.",
    icon: "🏟️",
  },
  {
    title: "Connect with Players",
    desc: "Build your sports network and chat with fellow athletes.",
    icon: "🤝",
  },
  {
    title: "Track Events",
    desc: "Stay updated with upcoming sports events and fixtures.",
    icon: "📅",
  },
];

export default function Highlights() {
  return (
    <section className="py-16 px-6 bg-zinc-900">
      <h2 className="text-4xl font-bold text-center text-orange-400 mb-10">
        Why Join Us?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {highlights.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-zinc-800 border border-orange-600 p-6 rounded-2xl shadow-md hover:shadow-orange-500/40 hover:-translate-y-1 transition-all"
          >
            <div className="text-5xl mb-4 text-orange-400">{item.icon}</div>
            <h3 className="text-xl font-semibold text-orange-300 mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
