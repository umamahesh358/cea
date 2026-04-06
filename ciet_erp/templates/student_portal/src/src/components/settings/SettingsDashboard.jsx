import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Settings, Link2, Upload, Globe, Shield, Linkedin, Github, ExternalLink } from "lucide-react";
import { Switch } from "@/components/ui/switch";
const SettingsDashboard = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [bio, setBio] = useState("Aspiring Full-Stack Developer");
  const [links, setLinks] = useState({
    linkedin: "linkedin.com/in/johnstudent",
    github: "github.com/johnstudent",
    portfolio: ""
  });
  const [dragOver, setDragOver] = useState(false);
  const handleDrop = useCallback(e => {
    e.preventDefault();
    setDragOver(false);
    // Handle file upload logic here
  }, []);
  return <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings size={24} className="text-primary" /> Profile Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          "Control what HR sees. Customize your professional presence."
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Settings */}
        <div className="lg:col-span-2 space-y-5">
          {/* Public Profile Toggle */}
          <motion.div initial={{
          opacity: 0,
          y: 15
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Globe size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Public Profile</p>
                  <p className="text-xs text-muted-foreground">Allow HR recruiters to discover your profile</p>
                </div>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
            {isPublic && <motion.p initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: "auto"
          }} className="text-xs text-accent font-medium mt-3 flex items-center gap-1">
                <Shield size={12} /> Your profile is now visible to recruiters
              </motion.p>}
          </motion.div>

          {/* Bio */}
          <motion.div initial={{
          opacity: 0,
          y: 15
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="card-elevated p-6 space-y-3">
            <p className="text-sm font-bold text-foreground">Professional Bio</p>
            <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full bg-muted/50 rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow resize-none h-24" placeholder="Tell recruiters about yourself..." />
            <p className="text-xs text-muted-foreground text-right">{bio.length}/200</p>
          </motion.div>

          {/* Professional Links */}
          <motion.div initial={{
          opacity: 0,
          y: 15
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="card-elevated p-6 space-y-4">
            <p className="text-sm font-bold text-foreground flex items-center gap-2">
              <Link2 size={16} /> Professional Integrations
            </p>
            {[{
            key: "linkedin",
            icon: Linkedin,
            label: "LinkedIn",
            placeholder: "linkedin.com/in/..."
          }, {
            key: "github",
            icon: Github,
            label: "GitHub",
            placeholder: "github.com/..."
          }, {
            key: "portfolio",
            icon: ExternalLink,
            label: "Portfolio / Startup",
            placeholder: "yoursite.com"
          }].map(link => <div key={link.key} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <link.icon size={16} className="text-muted-foreground" />
                </div>
                <input type="text" value={links[link.key]} onChange={e => setLinks({
              ...links,
              [link.key]: e.target.value
            })} placeholder={link.placeholder} className="flex-1 bg-muted/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow" />
              </div>)}
          </motion.div>

          {/* Resume Upload */}
          <motion.div initial={{
          opacity: 0,
          y: 15
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="card-elevated p-6 space-y-3">
            <p className="text-sm font-bold text-foreground flex items-center gap-2">
              <Upload size={16} /> Resume / CV
            </p>
            <div onDragOver={e => {
            e.preventDefault();
            setDragOver(true);
          }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${dragOver ? "border-primary bg-primary/5 scale-[0.98]" : "border-border hover:border-muted-foreground/30"}`}>
              <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag & drop your PDF here, or <span className="text-primary font-medium">browse</span>
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">Max 5MB • PDF only</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - HR Preview */}
        <motion.div initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.3
      }} className="space-y-4">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">HR Preview</p>
          <div className="card-elevated p-5 space-y-4 sticky top-24">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">J</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">John Student</p>
                <p className="text-xs text-muted-foreground">B.Tech CSE • Class of 2026</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">"{bio || "No bio added yet"}"</p>
            <div className="space-y-1.5">
              {links.linkedin && <p className="text-xs text-primary flex items-center gap-1.5">
                  <Linkedin size={12} /> {links.linkedin}
                </p>}
              {links.github && <p className="text-xs text-primary flex items-center gap-1.5">
                  <Github size={12} /> {links.github}
                </p>}
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {isPublic ? "🟢 Public" : "🔴 Private"}
              </span>
              <span className="text-[10px] text-muted-foreground">Live Preview</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.5
    }} className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
          ✖ Discard Changes
        </button>
        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
          💾 Commit Changes
        </button>
      </motion.div>
    </div>;
};
export default SettingsDashboard;