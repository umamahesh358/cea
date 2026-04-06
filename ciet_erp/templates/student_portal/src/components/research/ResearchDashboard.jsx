import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, FileText, Target, Brain, Plus, ExternalLink, Pencil, X, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { createResearch, deleteResearch } from "@/lib/api";

const cardStagger = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.45, ease: "easeOut" },
  }),
};

const ResearchDashboard = () => {
  const { data, isLoading } = useStudentProfile();
  const queryClient = useQueryClient();
  const papers = data?.research || [];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({
    research_type: "journal",
    title: "",
    advisor_name: "",
    publisher: "",
    published_date: "",
    outcome: "",
    publication_url: "",
  });

  const published = papers.filter((p) => p.research_type !== "thesis").length;
  const ongoing = papers.filter((p) => p.research_type === "thesis").length;
  const allTags = ["AI/ML", "IoT", "Cloud Computing", "Cybersecurity", "Data Science"]; // Mock tags for now

  const mutation = useMutation({
    mutationFn: createResearch,
    onSuccess: () => {
      queryClient.invalidateQueries(["studentProfile"]);
      setDrawerOpen(false);
      setForm({
        research_type: "journal", title: "", advisor_name: "",
        publisher: "", published_date: "", outcome: "", publication_url: "",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteResearch,
    onSuccess: () => queryClient.invalidateQueries(["studentProfile"]),
  });

  const handleSave = () => {
    const payload = { ...form };
    if (!payload.published_date) payload.published_date = null;
    mutation.mutate(payload);
  };

  if (isLoading) return <div className="animate-pulse space-y-4"><div className="h-10 bg-white/5 rounded-xl w-1/3"></div><div className="h-40 bg-white/5 rounded-xl w-full"></div></div>;

  return (
    <div className="space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">DASHBOARD / RESEARCH & PUBLICATIONS</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FlaskConical size={24} className="text-primary" /> Innovation & Research
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Showcase your academic rigor, thesis work, and deep-tech problem solving.</p>
          </div>
          <Button onClick={() => setDrawerOpen(true)} className="gap-2">
            <Plus size={16} /> Add Publication
          </Button>
        </div>
      </div>

      {papers.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-center">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <FlaskConical size={36} className="text-primary" />
          </motion.div>
          <h2 className="text-xl font-bold text-foreground mb-2">Publish your first breakthrough.</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">Whether it's your final year thesis, a whitepaper, or a published journal article, this is where your ideas live.</p>
          <Button onClick={() => setDrawerOpen(true)} className="pulse-cta gap-2">
            <Plus size={16} /> Add Your First Research Work
          </Button>
        </motion.div>
      ) : (
        <>
          {/* Bento Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: FileText, label: "Publications", value: published, sub: "Verified Papers", color: "text-primary" },
              { icon: Target, label: "Ongoing R&D", value: ongoing, sub: "Active Thesis Work", color: "text-accent" },
            ].map((stat, i) => (
              <motion.div key={stat.label} custom={i} variants={cardStagger} initial="hidden" animate="visible" className="card-elevated p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">{stat.label}</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </motion.div>
            ))}
            <motion.div custom={2} variants={cardStagger} initial="hidden" animate="visible" className="card-elevated p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Brain size={20} className="text-accent" />
                </div>
                <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Core Domains</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {allTags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-accent/10 text-xs font-medium text-accent-foreground">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Paper Cards */}
          <div>
            <h2 className="text-sm font-bold text-foreground tracking-wider uppercase mb-4">Published Works & Thesis</h2>
            <div className="space-y-5">
              {papers.map((paper, i) => (
                <motion.div key={paper.id} custom={i} variants={cardStagger} initial="hidden" animate="visible" className="group card-elevated p-6 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary/60 group-hover:w-full transition-all duration-700 ease-out rounded-full" />
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">
                      {paper.research_type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Published: {paper.published_date || 'N/A'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                    {paper.title}
                  </h3>
                  {paper.advisor_name && <p className="text-sm text-muted-foreground mb-1">Advisor: {paper.advisor_name}</p>}
                  {paper.publisher && <p className="text-sm text-muted-foreground mb-3">Publisher: {paper.publisher}</p>}

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    <span className="font-medium text-foreground">Outcome:</span> {paper.outcome}
                  </p>

                  <div className="flex items-center gap-3">
                    {paper.publication_url && (
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
                        <a href={paper.publication_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} /> View Publication
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(paper.id)} disabled={deleteMutation.isPending} className="ml-auto gap-1.5 text-xs text-red-500/80 hover:text-red-500 hover:bg-red-500/10">
                      <X size={14} /> Remove
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Add Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40" onClick={() => setDrawerOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-50 overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-foreground">Add Publication</h2>
                <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}><X size={18} /></Button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Type</label>
                  <Select value={form.research_type} onValueChange={(v) => setForm({ ...form, research_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="journal">Journal</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="thesis">Thesis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Title</label>
                  <Input placeholder="Your research title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Advisor Name</label>
                  <Input placeholder="Dr. A. Sharma" value={form.advisor_name} onChange={(e) => setForm({ ...form, advisor_name: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Publisher / Venue</label>
                  <Input placeholder="IEEE, ACM, etc." value={form.publisher} onChange={(e) => setForm({ ...form, publisher: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Publication Date</label>
                  <Input type="date" value={form.published_date} onChange={(e) => setForm({ ...form, published_date: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Abstract / Outcome</label>
                  <Textarea placeholder="Brief summary of your research..." value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })} rows={4} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Publication URL</label>
                  <Input placeholder="https://..." value={form.publication_url} onChange={(e) => setForm({ ...form, publication_url: e.target.value })} />
                </div>
                {mutation.isError && <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">Failed to save. Please try again.</p>}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={handleSave} disabled={mutation.isPending || !form.title}>Save to Profile</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResearchDashboard;