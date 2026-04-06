import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, FileText, Target, Brain, Plus, ExternalLink, FileDown, Pencil, X, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const samplePapers = [{
  id: "1",
  type: "journal",
  title: "Predictive Modeling for Decentralized Energy Grids using AI",
  coAuthors: "Dr. A. Sharma, John Student",
  venue: "IEEE International Conference on Smart Tech",
  date: "Nov 2025",
  abstract: "This paper explores the use of reinforcement learning algorithms to optimize load balancing in decentralized energy grids, achieving a 23% improvement in efficiency.",
  tags: ["Artificial Intelligence", "Energy Tech", "Python"],
  pdfUrl: "#",
  doiUrl: "#",
  status: "published"
}, {
  id: "2",
  type: "thesis",
  title: "Optimizing Edge Computing Latency in IoT Devices",
  coAuthors: "",
  venue: "",
  date: "",
  abstract: "Currently researching novel data compression methods to reduce round-trip latency in low-power IoT sensors for smart agriculture applications.",
  tags: ["Edge Computing", "IoT", "C++"],
  status: "ongoing",
  expectedCompletion: "May 2026"
}];
const cardStagger = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.45,
      ease: "easeOut"
    }
  })
};
const ResearchDashboard = () => {
  const [papers, setPapers] = useState(samplePapers);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({
    type: "journal",
    title: "",
    coAuthors: "",
    venue: "",
    date: "",
    abstract: "",
    tags: "",
    pdfUrl: "",
    doiUrl: "",
    status: "published",
    expectedCompletion: ""
  });
  const published = papers.filter(p => p.status === "published").length;
  const ongoing = papers.filter(p => p.status === "ongoing").length;
  const allTags = [...new Set(papers.flatMap(p => p.tags))];
  const handleSave = () => {
    const newPaper = {
      id: Date.now().toString(),
      type: form.type,
      title: form.title,
      coAuthors: form.coAuthors,
      venue: form.venue,
      date: form.date,
      abstract: form.abstract,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      pdfUrl: form.pdfUrl || undefined,
      doiUrl: form.doiUrl || undefined,
      status: form.status,
      expectedCompletion: form.expectedCompletion || undefined
    };
    setPapers([newPaper, ...papers]);
    setDrawerOpen(false);
    setForm({
      type: "journal",
      title: "",
      coAuthors: "",
      venue: "",
      date: "",
      abstract: "",
      tags: "",
      pdfUrl: "",
      doiUrl: "",
      status: "published",
      expectedCompletion: ""
    });
  };
  return <div className="space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">DASHBOARD / RESEARCH & PUBLICATIONS</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FlaskConical size={24} className="text-primary" /> Innovation & Research
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Showcase your academic rigor, thesis work, and deep-tech problem solving to R&D recruiters.</p>
          </div>
          <Button onClick={() => setDrawerOpen(true)} className="gap-2">
            <Plus size={16} /> Add Publication
          </Button>
        </div>
      </div>

      {papers.length === 0 ? (/* Empty State */
    <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="flex flex-col items-center justify-center py-24 text-center">
          <motion.div animate={{
        y: [0, -8, 0]
      }} transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }} className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <FlaskConical size={36} className="text-primary" />
          </motion.div>
          <h2 className="text-xl font-bold text-foreground mb-2">Publish your first breakthrough.</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">Whether it's your final year thesis, a whitepaper, or a published journal article, this is where your ideas live.</p>
          <Button onClick={() => setDrawerOpen(true)} className="pulse-cta gap-2">
            <Plus size={16} /> Add Your First Research Paper
          </Button>
        </motion.div>) : <>
          {/* Bento Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[{
          icon: FileText,
          label: "Publications",
          value: published,
          sub: "Verified Papers",
          color: "text-primary"
        }, {
          icon: Target,
          label: "Ongoing R&D",
          value: ongoing,
          sub: "Active Thesis Work",
          color: "text-accent"
        }].map((stat, i) => <motion.div key={stat.label} custom={i} variants={cardStagger} initial="hidden" animate="visible" className="card-elevated p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">{stat.label}</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </motion.div>)}
            <motion.div custom={2} variants={cardStagger} initial="hidden" animate="visible" className="card-elevated p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Brain size={20} className="text-accent" />
                </div>
                <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Core Domains</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {allTags.slice(0, 6).map(tag => <span key={tag} className="px-2.5 py-1 rounded-lg bg-accent/10 text-xs font-medium text-accent-foreground">{tag}</span>)}
              </div>
            </motion.div>
          </div>

          {/* Paper Cards */}
          <div>
            <h2 className="text-sm font-bold text-foreground tracking-wider uppercase mb-4">Published Works & Thesis</h2>
            <div className="space-y-5">
              {papers.map((paper, i) => <motion.div key={paper.id} custom={i} variants={cardStagger} initial="hidden" animate="visible" className="group card-elevated p-6 relative overflow-hidden">
                  {/* Reading progress hover bar */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary/60 group-hover:w-full transition-all duration-700 ease-out rounded-full" />

                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">
                      {paper.type === "journal" ? "Journal Article" : paper.type === "thesis" ? "Ongoing Thesis" : "Whitepaper"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {paper.status === "published" ? `Published: ${paper.date}` : `Expected Completion: ${paper.expectedCompletion}`}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-1" style={{
              fontFamily: "'Georgia', 'Times New Roman', serif"
            }}>
                    {paper.title}
                  </h3>
                  {paper.coAuthors && <p className="text-sm text-muted-foreground mb-1">Co-Authors: {paper.coAuthors}</p>}
                  {paper.venue && <p className="text-sm text-muted-foreground mb-3">Presented at: {paper.venue}</p>}

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    <span className="font-medium text-foreground">Abstract:</span> {paper.abstract}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {paper.tags.map(tag => <span key={tag} className="px-2.5 py-1 rounded-lg bg-accent/10 text-xs font-medium text-accent-foreground">{tag}</span>)}
                  </div>

                  <div className="flex items-center gap-3">
                    {paper.pdfUrl && <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <FileDown size={14} /> View PDF
                      </Button>}
                    {paper.doiUrl && <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <ExternalLink size={14} /> External DOI Link
                      </Button>}
                    {paper.status === "ongoing" && <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Lock size={14} /> Draft Document
                      </Button>}
                    <Button variant="ghost" size="sm" className="ml-auto gap-1.5 text-xs text-muted-foreground">
                      <Pencil size={14} /> Edit
                    </Button>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </>}

      {/* Add Drawer */}
      <AnimatePresence>
        {drawerOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40" onClick={() => setDrawerOpen(false)} />
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
        }} className="fixed right-0 top-0 h-full w-full max-w-md bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-50 overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-foreground">Add Publication</h2>
                <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}><X size={18} /></Button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Type</label>
                  <Select value={form.type} onValueChange={v => setForm({
                ...form,
                type: v
              })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="journal">Journal Article</SelectItem>
                      <SelectItem value="thesis">Thesis</SelectItem>
                      <SelectItem value="whitepaper">Whitepaper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Status</label>
                  <Select value={form.status} onValueChange={v => setForm({
                ...form,
                status: v
              })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Title</label>
                  <Input placeholder="Your research title" value={form.title} onChange={e => setForm({
                ...form,
                title: e.target.value
              })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Co-Authors</label>
                  <Input placeholder="Dr. A. Sharma, Jane Doe" value={form.coAuthors} onChange={e => setForm({
                ...form,
                coAuthors: e.target.value
              })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Venue / Conference</label>
                  <Input placeholder="IEEE, ACM, etc." value={form.venue} onChange={e => setForm({
                ...form,
                venue: e.target.value
              })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{form.status === "ongoing" ? "Expected Completion" : "Publication Date"}</label>
                  <Input placeholder="e.g. Nov 2025" value={form.status === "ongoing" ? form.expectedCompletion : form.date} onChange={e => setForm({
                ...form,
                ...(form.status === "ongoing" ? {
                  expectedCompletion: e.target.value
                } : {
                  date: e.target.value
                })
              })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Abstract</label>
                  <Textarea placeholder="Brief summary of your research..." value={form.abstract} onChange={e => setForm({
                ...form,
                abstract: e.target.value
              })} rows={4} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Tags (comma-separated)</label>
                  <Input placeholder="AI, Python, IoT" value={form.tags} onChange={e => setForm({
                ...form,
                tags: e.target.value
              })} />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={handleSave} disabled={!form.title}>Save to Profile</Button>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
};
export default ResearchDashboard;