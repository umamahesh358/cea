import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, Mail, Linkedin, Github, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const skills = ["AI Development", "React", "Supply Chain Strategy", "Python", "Node.js", "UI/UX"];

const featuredItems = [
  {
    pinLabel: "FEATURED PRODUCT",
    title: "Opal App: AI Client Finder",
    desc: "Automated workflow and AI lead generation for digital agencies.",
    cta: "View Live App",
    gradient: "from-purple-500/10 to-indigo-500/10",
  },
  {
    pinLabel: "FEATURED STARTUP",
    title: "Zaykaa: Traditional Food Tech",
    desc: "D2C platform delivering homemade Indian snacks with custom logistics.",
    cta: "View Pitch Deck",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    pinLabel: "FEATURED PROJECT",
    title: "Gamified Debate Learning",
    desc: "Web application for students to practice and learn debate skills.",
    cta: "View GitHub",
    gradient: "from-sky-500/10 to-cyan-500/10",
  },
  {
    pinLabel: "FEATURED BUILD",
    title: "Stealth Interview Copilot",
    desc: "Real-time, undetected interview assistance utilizing WebRTC.",
    cta: "Read PRD",
    gradient: "from-rose-500/10 to-pink-500/10",
  },
];

const ProfileDashboard = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <div className="space-y-6">
      {/* Hero / Cover */}
      <motion.div ref={heroRef} className="relative rounded-3xl overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div style={{ y: bgY }} className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="relative z-10 p-8 pt-16 pb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="w-24 h-24 rounded-2xl bg-card/10 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
              <span className="text-4xl font-bold text-white">J</span>
            </div>
            <div className="flex-1 text-white">
              <h1 className="text-3xl font-bold">John Student</h1>
              <p className="text-sm opacity-80 flex items-center gap-2 mt-1">
                B.Tech CSE • Class of 2026 • <MapPin size={12} /> Hyderabad, India
              </p>
              <p className="text-sm opacity-70 mt-2 max-w-lg italic">
                "Passionate about entrepreneurship, AI-powered applications, and building tools that solve real-world problems."
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {skills.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300 }}
              >
                <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-xs">{s}</Badge>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-5">
            <button className="flex items-center gap-2 bg-white text-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
              <Download size={16} /> Download Resume
            </button>
            <button className="flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20">
              <Mail size={16} /> Message
            </button>
            <button className="p-2.5 rounded-xl bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20">
              <Linkedin size={16} />
            </button>
            <button className="p-2.5 rounded-xl bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20">
              <Github size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Featured Shelf */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Featured Shelf</p>
          <p className="text-xs text-muted-foreground italic">HR Recruiters look here first</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="card-elevated p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40 group-hover:opacity-60 transition-opacity`} />
              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-wider uppercase text-primary">{item.pinLabel}</span>
                <h3 className="text-base font-bold text-foreground mt-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                <button className="mt-4 text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                  <ExternalLink size={14} /> {item.cta} <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card-elevated p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Recent Experience</p>
          <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-sm">🎥</span>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">UGC Creator & Strategist</p>
            <p className="text-xs text-muted-foreground">ParakeetAI • Contract • March 2026 - Present</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Academic Highlights</p>
          <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <span className="text-sm">🎓</span>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Chalapathi Institute of Engineering & Tech</p>
            <p className="text-xs text-muted-foreground">CGPA: 9.2 • Top 10% of Cohort</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDashboard;