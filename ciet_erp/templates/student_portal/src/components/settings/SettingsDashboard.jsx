import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Link2, Upload, Globe, Shield, Linkedin, Github, ExternalLink, Code2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentProfile } from "@/lib/api";
import { toast } from "sonner";

const SettingsDashboard = () => {
  const { data, isLoading } = useStudentProfile();
  const queryClient = useQueryClient();

  const [isPublic, setIsPublic] = useState(false);
  const [links, setLinks] = useState({
    linkedin_url: "",
    github_url: "",
    leetcode_url: ""
  });

  // Sync state when data is loaded
  useEffect(() => {
    if (data) {
      setIsPublic(!!data.is_public);
      setLinks({
        linkedin_url: data.linkedin_url || "",
        github_url: data.github_url || "",
        leetcode_url: data.leetcode_url || ""
      });
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: (payload) => updateStudentProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["studentProfile"]);
      toast.success("Profile saved!", {
        description: "Your settings have been updated successfully."
      });
    },
    onError: (error) => {
      toast.error("Error saving profile", {
        description: error.message || "Please check your input and try again."
      });
    }
  });

  const handleSave = () => {
    updateMutation.mutate({
      is_public: isPublic,
      ...links
    });
  };

  const handleDiscard = () => {
    if (data) {
      setIsPublic(!!data.is_public);
      setLinks({
        linkedin_url: data.linkedin_url || "",
        github_url: data.github_url || "",
        leetcode_url: data.leetcode_url || ""
      });
      toast.info("Changes discarded.");
    }
  };

  const [dragOver, setDragOver] = useState(false);
  const handleDrop = useCallback(e => {
    e.preventDefault();
    setDragOver(false);
    toast.info("Resume upload via drag and drop not handled by backend yet.");
  }, []);

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-64 bg-white/5 rounded-xl w-full"></div></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
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
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-elevated p-6">
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
            {isPublic && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-accent font-medium mt-3 flex items-center gap-1">
                <Shield size={12} /> Your profile is now visible to recruiters via /portal/{data?.slug || data?.roll_no}.
              </motion.p>
            )}
          </motion.div>

          {/* Professional Links */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-elevated p-6 space-y-4">
            <p className="text-sm font-bold text-foreground flex items-center gap-2">
              <Link2 size={16} /> Professional Integrations
            </p>
            {[
              { key: "linkedin_url", icon: Linkedin, label: "LinkedIn", placeholder: "https://linkedin.com/in/..." },
              { key: "github_url", icon: Github, label: "GitHub", placeholder: "https://github.com/..." },
              { key: "leetcode_url", icon: Code2, label: "LeetCode", placeholder: "https://leetcode.com/u/..." }
            ].map(link => (
              <div key={link.key} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <link.icon size={16} className="text-muted-foreground" />
                </div>
                <input 
                  type="text" 
                  value={links[link.key]} 
                  onChange={e => setLinks({ ...links, [link.key]: e.target.value })} 
                  placeholder={link.placeholder} 
                  className="flex-1 bg-muted/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow" 
                />
              </div>
            ))}
          </motion.div>

          {/* Resume Upload (Mock UI) */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-elevated p-6 space-y-3">
            <p className="text-sm font-bold text-foreground flex items-center gap-2">
              <Upload size={16} /> Resume / CV
            </p>
            <div 
              onDragOver={e => { e.preventDefault(); setDragOver(true); }} 
              onDragLeave={() => setDragOver(false)} 
              onDrop={handleDrop} 
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${dragOver ? "border-primary bg-primary/5 scale-[0.98]" : "border-border hover:border-muted-foreground/30"}`}
            >
              <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag & drop your PDF here, or <span className="text-primary font-medium">browse</span>
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">Max 5MB • PDF only</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - HR Preview */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">HR Preview</p>
          <div className="card-elevated p-5 space-y-4 sticky top-24">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary flex items-center justify-center shrink-0 border border-white/20">
                {data?.photo_url ? (
                  <img src={data.photo_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-primary-foreground font-bold">{data?.user?.first_name?.charAt(0) || "S"}</span>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{data?.user?.first_name} {data?.user?.last_name || ""}</p>
                <p className="text-xs text-muted-foreground">{data?.department || "B.Tech"} • Class of {data?.batch ? parseInt(data.batch) + 4 : ""}</p>
              </div>
            </div>
            <div className="space-y-1.5 flex flex-col gap-1 mt-2">
              {links.linkedin_url && (
                <p className="text-xs text-primary flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                  <Linkedin size={12} className="shrink-0" /> {links.linkedin_url.replace(/^https?:\/\//, '')}
                </p>
              )}
              {links.github_url && (
                <p className="text-xs text-primary flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                  <Github size={12} className="shrink-0" /> {links.github_url.replace(/^https?:\/\//, '')}
                </p>
              )}
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <button 
          onClick={handleDiscard}
          disabled={updateMutation.isPending}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
        >
          ✖ Discard Changes
        </button>
        <button 
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          {updateMutation.isPending ? "Saving..." : "💾 Commit Changes"}
        </button>
      </motion.div>
    </div>
  );
};

export default SettingsDashboard;