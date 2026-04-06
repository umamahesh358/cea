import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Zap, MessageSquare, ArrowRight, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const sampleCohorts = [{
  id: 1,
  name: "AI Mastermind",
  description: "Building production-ready ML models and deploying them at scale.",
  members: [{
    name: "Alice",
    initials: "A",
    online: true
  }, {
    name: "Bob",
    initials: "B",
    online: true
  }, {
    name: "Charlie",
    initials: "C",
    online: false
  }, {
    name: "Diana",
    initials: "D",
    online: true
  }, {
    name: "Eve",
    initials: "E",
    online: false
  }],
  theme: "from-purple-500/10 to-indigo-500/10",
  borderGlow: "hover:border-purple-400/50 hover:shadow-[0_0_20px_hsl(270_60%_60%/0.1)]",
  tags: ["Python", "TensorFlow", "MLOps"],
  nextMeeting: "Wed, 4:00 PM"
}, {
  id: 2,
  name: "Full-Stack Builders",
  description: "Shipping real-world apps with React, Node.js, and cloud infrastructure.",
  members: [{
    name: "Frank",
    initials: "F",
    online: true
  }, {
    name: "Grace",
    initials: "G",
    online: false
  }, {
    name: "Hank",
    initials: "H",
    online: true
  }],
  theme: "from-sky-500/10 to-cyan-500/10",
  borderGlow: "hover:border-sky-400/50 hover:shadow-[0_0_20px_hsl(200_80%_55%/0.1)]",
  tags: ["React", "Node.js", "AWS"],
  nextMeeting: "Thu, 6:00 PM"
}, {
  id: 3,
  name: "Startup Sprint",
  description: "Founders building MVPs and pitching to real investors.",
  members: [{
    name: "Ivy",
    initials: "I",
    online: true
  }, {
    name: "Jake",
    initials: "J",
    online: true
  }, {
    name: "Kim",
    initials: "K",
    online: true
  }, {
    name: "Leo",
    initials: "L",
    online: false
  }],
  theme: "from-amber-500/10 to-orange-500/10",
  borderGlow: "hover:border-amber-400/50 hover:shadow-[0_0_20px_hsl(40_90%_50%/0.1)]",
  tags: ["Product", "Pitch", "Lean"],
  nextMeeting: "Fri, 5:00 PM"
}];
const Facepile = ({
  members
}) => {
  const [expanded, setExpanded] = useState(false);
  return <div className="flex items-center cursor-pointer" onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
      {members.slice(0, 5).map((m, i) => <motion.div key={m.name} animate={{
      x: expanded ? i * 8 : 0
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 25
    }} className="relative" style={{
      marginLeft: i === 0 ? 0 : -10,
      zIndex: members.length - i
    }}>
          <div className={`w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-bold text-foreground relative`}>
            {m.initials}
            {m.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-card" />}
          </div>
        </motion.div>)}
      {members.length > 5 && <span className="ml-2 text-xs text-muted-foreground font-medium">+{members.length - 5}</span>}
    </div>;
};
const CohortsDashboard = () => {
  return <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Users size={24} className="text-primary" /> Active Cohorts
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              "Prove to recruiters you can collaborate, not just code."
            </p>
          </div>
          <button className="pulse-cta flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus size={16} /> Join a Cohort
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[{
        icon: Users,
        label: "Active Cohorts",
        value: "3",
        sub: "Currently enrolled"
      }, {
        icon: MessageSquare,
        label: "Discussions",
        value: "24",
        sub: "This month"
      }, {
        icon: Zap,
        label: "Contributions",
        value: "12",
        sub: "Code reviews & PRs"
      }].map((s, i) => <motion.div key={s.label} initial={{
        opacity: 0,
        y: 15
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1 + i * 0.1
      }} className="card-elevated p-5 text-center">
            <s.icon size={20} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </motion.div>)}
      </div>

      {/* Cohort Cards */}
      <div className="space-y-4">
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Your Mastermind Groups</p>
        <AnimatePresence>
          {sampleCohorts.map((cohort, i) => <motion.div key={cohort.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3 + i * 0.1
        }} className={`card-elevated p-6 border border-transparent transition-all duration-300 ${cohort.borderGlow}`}>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cohort.theme} opacity-50 pointer-events-none`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{cohort.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{cohort.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
                    <Wifi size={12} /> {cohort.members.filter(m => m.online).length} online
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cohort.tags.map(tag => <Badge key={tag} variant="secondary" className="text-[10px] font-semibold">{tag}</Badge>)}
                </div>

                <div className="flex items-center justify-between">
                  <Facepile members={cohort.members} />
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">Next: {cohort.nextMeeting}</span>
                    <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                      Open <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>)}
        </AnimatePresence>
      </div>
    </div>;
};
export default CohortsDashboard;