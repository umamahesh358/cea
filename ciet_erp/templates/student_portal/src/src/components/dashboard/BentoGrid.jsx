import { motion } from "framer-motion";
import { GraduationCap, Code2, Award, Plus, TrendingUp } from "lucide-react";
import CGPARing from "./CGPARing";
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};
const BentoGrid = () => {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Academics */}
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <GraduationCap size={20} className="text-accent" />
          </div>
          <span className="text-[10px] font-bold text-accent tracking-[0.15em] uppercase font-[Inter,sans-serif]">Academics</span>
        </div>
        <div className="flex items-center gap-4">
          <CGPARing value={9.2} />
          <div>
            <p className="text-sm font-semibold text-foreground">Top 10%</p>
            <p className="text-xs text-muted-foreground font-[Inter,sans-serif]">of your cohort</p>
            <div className="flex items-center gap-1 mt-2 text-success">
              <TrendingUp size={14} />
              <span className="text-xs font-medium font-[Inter,sans-serif]">+0.3 this sem</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects */}
      <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
            <Code2 size={20} className="text-foreground" />
          </div>
          <span className="text-[10px] font-bold text-foreground/60 tracking-[0.15em] uppercase font-[Inter,sans-serif]">Projects</span>
        </div>
        {/* Mini sparkline bars */}
        <div className="flex items-end gap-1 h-12 mb-3">
          {[30, 50, 40, 70, 60, 80, 55, 90, 75, 65, 85, 70].map((h, i) => <motion.div key={i} initial={{
          height: 0
        }} animate={{
          height: `${h}%`
        }} transition={{
          delay: 0.5 + i * 0.05,
          duration: 0.4
        }} className="flex-1 rounded-sm bg-foreground/10" />)}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">3</span>
            <span className="text-sm text-muted-foreground ml-1.5 font-[Inter,sans-serif]">Active</span>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:bg-primary/5 px-2.5 py-1.5 rounded-lg transition-colors btn-glow">
            <Plus size={14} />
            Add New
          </button>
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Award size={20} className="text-accent" />
          </div>
          <span className="text-[10px] font-bold text-accent tracking-[0.15em] uppercase font-[Inter,sans-serif]">Certified</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {["AWS Cloud", "Azure AI"].map(cert => <span key={cert} className="px-3 py-1.5 rounded-lg bg-foreground/5 text-xs font-medium text-foreground border border-border/50 font-[Inter,sans-serif]">
              {cert}
            </span>)}
        </div>
        <p className="text-sm text-muted-foreground font-[Inter,sans-serif]">
          <span className="text-foreground font-bold">2</span> Verified Credentials
        </p>
      </motion.div>
    </div>;
};
export default BentoGrid;