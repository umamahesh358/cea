import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award, Zap, Eye, Plus, ExternalLink, ShieldCheck, Cloud, Search, Monitor, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const ghostBadges = [{
  icon: Cloud,
  label: "AWS",
  company: "Amazon Web Services"
}, {
  icon: Search,
  label: "Google",
  company: "Google Cloud"
}, {
  icon: Monitor,
  label: "Meta",
  company: "Meta Engineering"
}];
const sampleCerts = [{
  id: "1",
  title: "AWS Certified Cloud Practitioner",
  issuer: "Amazon Web Services",
  issued: "Jan 2026",
  expires: "Jan 2029",
  skills: ["Cloud", "DevOps", "Infrastructure"],
  credentialUrl: "#",
  verified: true
}, {
  id: "2",
  title: "UI/UX Design Professional",
  issuer: "Coursera / Google",
  issued: "Nov 2025",
  expires: null,
  skills: ["Figma", "Wireframing", "User Research"],
  credentialUrl: "#",
  verified: true
}];
const CertificationsDashboard = () => {
  const [certs, setCerts] = useState(sampleCerts);
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const totalSkills = [...new Set(certs.flatMap(c => c.skills))].length;
  return <div className="space-y-6">
      {/* Breadcrumb */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Certifications</span>
      </motion.div>

      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="card-elevated p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            🏆 My Credentials & Skills
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Showcase your verified industry expertise.
          </p>
        </div>
        <button onClick={() => setShowAddDrawer(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors pulse-cta">
          <Plus size={16} />
          Add New Certification
        </button>
      </motion.div>

      {/* Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[{
        icon: Award,
        label: "Verified Badges",
        value: certs.length,
        sub: certs.length === 0 ? "Get started!" : "credentials",
        color: "text-primary",
        bg: "bg-primary/10"
      }, {
        icon: Zap,
        label: "Skills Unlocked",
        value: totalSkills,
        sub: totalSkills === 0 ? "Connect a cert to extract" : "unique skills",
        color: "text-accent",
        bg: "bg-accent/10"
      }, {
        icon: Eye,
        label: "HR Profile Views",
        value: 24,
        sub: "this month",
        color: "text-primary",
        bg: "bg-primary/10"
      }].map((stat, i) => <motion.div key={stat.label} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1 + i * 0.1
      }} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className={`text-xs font-bold tracking-wider uppercase ${stat.color}`}>{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.sub}</p>
          </motion.div>)}
      </div>

      {/* Section Title */}
      <div className="flex items-center gap-3">
        <h3 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
          Your Digital Trophy Case
        </h3>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Certifications Grid or Empty State */}
      {certs.length === 0 ? <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.4
    }} className="card-elevated p-10 text-center">
          <div className="flex justify-center gap-8 mb-8">
            {ghostBadges.map(badge => <div key={badge.label} className="flex flex-col items-center gap-2 opacity-25">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                  <badge.icon size={28} className="text-muted-foreground" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{badge.label}</span>
              </div>)}
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            You haven't added any certifications yet. Stand out to recruiters
            by linking your Credly account or manually uploading a certificate.
          </p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/15 transition-colors">
            🔗 Connect Credly Account
          </button>
        </motion.div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certs.map((cert, i) => <motion.div key={cert.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3 + i * 0.1
      }} className="card-elevated p-6 group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Glossy glare effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]" style={{
          transition: "transform 0.8s ease"
        }} />

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award size={24} className="text-primary" />
                </div>
                {cert.verified && <div className="flex items-center gap-1 text-accent">
                    <ShieldCheck size={16} />
                    <span className="text-xs font-bold">Verified</span>
                  </div>}
              </div>

              <h4 className="text-base font-bold text-foreground mb-1">{cert.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span>Issued: {cert.issued}</span>
                <span>{cert.expires ? `Expires: ${cert.expires}` : "No Expiration"}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {cert.skills.map(skill => <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>)}
              </div>

              <a href={cert.credentialUrl} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                View Credential
                <ExternalLink size={14} />
              </a>
            </motion.div>)}
        </div>}

      {/* Add Drawer */}
      <AnimatePresence>
        {showAddDrawer && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setShowAddDrawer(false)} />
            <motion.div initial={{
          x: "100%"
        }} animate={{
          x: 0
        }} exit={{
          x: "100%"
        }} transition={{
          type: "spring",
          damping: 30,
          stiffness: 300
        }} className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 shadow-2xl overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Add Certification</h3>
                  <button onClick={() => setShowAddDrawer(false)} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Certification Title</label>
                    <input className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. AWS Cloud Practitioner" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Issuing Organization</label>
                    <input className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Amazon Web Services" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Issue Date</label>
                      <input type="month" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Expiry Date</label>
                      <input type="month" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Credential URL</label>
                    <input className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="https://credly.com/..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Skills (comma-separated)</label>
                    <input className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Cloud, DevOps, AWS" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowAddDrawer(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => setShowAddDrawer(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Save to Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
};
export default CertificationsDashboard;