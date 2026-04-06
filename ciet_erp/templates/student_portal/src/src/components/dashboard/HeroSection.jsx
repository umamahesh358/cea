import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
const HeroSection = () => {
  const profileStrength = 65;
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="hero-gradient rounded-2xl p-8 text-primary-foreground relative overflow-hidden">
      {/* Decorative glass orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-accent/8 translate-y-1/2 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
          <span className="text-3xl font-bold">J</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">John Student</h2>
            <span className="text-sm opacity-50">|</span>
            <span className="text-sm opacity-70 font-[Inter,sans-serif]">B.Tech CSE</span>
            <span className="text-sm opacity-50">|</span>
            <span className="text-sm opacity-70 font-[Inter,sans-serif]">Class of 2026</span>
          </div>
          <p className="text-sm opacity-60 italic mb-4 font-[Inter,sans-serif]">
            <Sparkles size={14} className="inline mr-1 opacity-60" />
            "Aspiring Full-Stack Developer"
          </p>

          {/* Profile Strength */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3 flex-1 max-w-sm">
              <span className="text-xs font-medium whitespace-nowrap opacity-70 font-[Inter,sans-serif]">Profile Strength</span>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div initial={{
                width: 0
              }} animate={{
                width: `${profileStrength}%`
              }} transition={{
                duration: 1,
                delay: 0.5,
                ease: "easeOut"
              }} className="h-full rounded-full bg-gradient-to-r from-white/80 to-accent" />
              </div>
              <span className="text-sm font-bold">{profileStrength}%</span>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm border border-white/10">
              <Plus size={14} />
              Add Internship to boost
            </button>
          </div>
        </div>
      </div>
    </motion.div>;
};
export default HeroSection;