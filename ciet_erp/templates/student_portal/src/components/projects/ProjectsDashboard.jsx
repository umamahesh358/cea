import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Package, Zap, Eye, Plus, Github, ExternalLink, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { createProject, deleteProject } from "@/lib/api";

const gradients = [
  "from-primary/20 to-accent/20",
  "from-accent/20 to-success/20",
  "from-primary/10 to-primary/30",
  "from-success/20 to-accent/10",
];

const cardStagger = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.45, ease: "easeOut" },
  }),
};

const ProjectsDashboard = () => {
  const { data, isLoading } = useStudentProfile();
  const queryClient = useQueryClient();
  const projects = data?.projects || [];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", tech_stack: "", repo_url: "", project_type: "external",
  });

  const allTags = [...new Set(projects.flatMap((p) => p.tech_stack?.split(",").map((s) => s.trim()) || []))];

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["studentProfile"]);
      setDrawerOpen(false);
      setForm({ title: "", description: "", tech_stack: "", repo_url: "", project_type: "external" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries(["studentProfile"]),
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-white/5 rounded-xl w-1/2" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-48 bg-white/5 rounded-2xl" />
          <div className="h-48 bg-white/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">DASHBOARD / PORTFOLIO</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Rocket size={24} className="text-primary" /> Projects Showcase
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Your engineering proof-of-work. Build, deploy, and impress.</p>
          </div>
          <Button onClick={() => setDrawerOpen(true)} className="gap-2">
            <Plus size={16} /> Deploy New Project
          </Button>
        </div>
      </div>

      {/* Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: Package, label: "Active Builds", value: projects.length, sub: "projects", color: "text-primary" },
          { icon: Zap, label: "Dominant Stack", value: null, sub: "Top detected skills", color: "text-accent", tags: allTags.slice(0, 3) },
          { icon: Eye, label: "Profile Strength", value: projects.length > 2 ? "Strong" : "Growing", sub: "based on projects", color: "text-success" },
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i} variants={cardStagger} initial="hidden" animate="visible" className="card-elevated p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">{stat.label}</span>
            </div>
            {stat.value !== null ? (
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {stat.tags?.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-accent/10 text-xs font-medium text-accent-foreground">{t}</span>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Project Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground tracking-wider uppercase">Your Deployments</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id} custom={i} variants={cardStagger} initial="hidden" animate="visible"
              className="group card-elevated overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}
                  className={`h-32 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}
                >
                  <Rocket size={32} className="text-foreground/20" />
                </motion.div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-foreground mb-1.5 flex items-center gap-2">
                  🌐 {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech_stack?.split(",").filter(Boolean).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-accent/10 text-xs font-medium text-accent-foreground">{tag.trim()}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {project.repo_url && (
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer"><Github size={14} /> GitHub</a>
                    </Button>
                  )}
                  <Button
                    variant="ghost" size="sm"
                    onClick={() => deleteMutation.mutate(project.id)}
                    disabled={deleteMutation.isPending}
                    className="gap-1.5 text-xs text-red-500/80 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all ml-auto"
                  >
                    <X size={14} /> Remove
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Ghost Card */}
          <motion.div
            custom={projects.length} variants={cardStagger} initial="hidden" animate="visible"
            onClick={() => setDrawerOpen(true)}
            className="card-elevated border-2 border-dashed border-border hover:border-primary/30 transition-colors cursor-pointer flex flex-col items-center justify-center py-16 text-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <Plus size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">Your Next Big Idea</h3>
            <p className="text-sm text-muted-foreground mb-4">What will you build next?</p>
            <Button variant="outline" size="sm">Initialize Project</Button>
          </motion.div>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-50 overflow-y-auto p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-foreground">Deploy New Project</h2>
                <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}><X size={18} /></Button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Project Title</label>
                  <Input placeholder="e.g. AI Chat Platform" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Description</label>
                  <Textarea placeholder="What problem does it solve?" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Tech Stack (comma-separated)</label>
                  <Input placeholder="React, Node.js, MongoDB" value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">GitHub / Repo URL</label>
                  <Input placeholder="https://github.com/..." value={form.repo_url} onChange={(e) => setForm({ ...form, repo_url: e.target.value })} />
                </div>
                {mutation.isError && (
                  <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">Failed to save. Please try again.</p>
                )}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={() => mutation.mutate(form)} disabled={mutation.isPending || !form.title}>
                    {mutation.isPending ? "Saving..." : "Deploy to Portfolio"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsDashboard;