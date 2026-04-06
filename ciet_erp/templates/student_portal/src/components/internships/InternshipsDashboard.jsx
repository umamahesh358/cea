import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Plus, X, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { createInternship, deleteInternship } from "@/lib/api";

const InternshipsDashboard = () => {
  const { data, isLoading } = useStudentProfile();
  const queryClient = useQueryClient();
  const internships = data?.internships || [];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({
    organization: "",
    role: "",
    start_date: "",
    end_date: "",
    technologies: "",
    description: "",
  });

  const mutation = useMutation({
    mutationFn: createInternship,
    onSuccess: () => {
      queryClient.invalidateQueries(["studentProfile"]);
      setDrawerOpen(false);
      setForm({ organization: "", role: "", start_date: "", end_date: "", technologies: "", description: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInternship,
    onSuccess: () => queryClient.invalidateQueries(["studentProfile"]),
  });

  const handleSave = () => {
    const payload = { ...form };
    if (!payload.start_date) payload.start_date = null;
    if (!payload.end_date) payload.end_date = null;
    mutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-white/5 rounded-xl w-1/3" />
        <div className="h-40 bg-white/5 rounded-2xl w-full" />
        <div className="h-40 bg-white/5 rounded-2xl w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">DASHBOARD / INTERNSHIPS &amp; EXPERIENCE</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Briefcase size={24} className="text-primary" /> Professional Experience
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Highlight your real-world impact to stand out to recruiters.
            </p>
          </div>
          <Button onClick={() => setDrawerOpen(true)} className="gap-2">
            <Plus size={16} /> Add New Internship
          </Button>
        </div>
      </div>

      {internships.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
          >
            <Briefcase size={36} className="text-primary" />
          </motion.div>
          <h2 className="text-xl font-bold text-foreground mb-2">Your career journey starts here!</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            Students with internship experience are 3x more likely to get hired immediately after graduation.
          </p>
          <Button onClick={() => setDrawerOpen(true)} className="gap-2">
            <Plus size={16} /> Add Your First Internship
          </Button>
        </motion.div>
      ) : (
        /* Timeline */
        <div>
          <h2 className="text-sm font-bold text-foreground tracking-wider uppercase mb-6">
            Your Experience Timeline
          </h2>
          <div className="relative pl-8">
            {/* Timeline line */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-3 top-0 w-[2px] bg-border"
            />

            <div className="space-y-8">
              {internships.map((intern, i) => (
                <motion.div
                  key={intern.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <Building2 size={12} className="text-primary" />
                  </div>

                  <div className="card-elevated p-6 group">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{intern.role}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                          <Building2 size={14} /> {intern.organization}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          {intern.start_date || "N/A"} – {intern.end_date || "Present"}
                        </div>
                      </div>
                    </div>

                    {intern.description && (
                      <ul className="space-y-1.5 mb-4">
                        {intern.description.split("\n").filter(Boolean).map((b, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1.5 text-[6px]">●</span> {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-xs text-muted-foreground mr-1">Skills Applied:</span>
                        {intern.technologies?.split(",").filter(Boolean).map((s) => (
                          <span
                            key={s}
                            className="px-2.5 py-1 rounded-lg bg-accent/10 text-xs font-medium text-accent-foreground"
                          >
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMutation.mutate(intern.id)}
                        disabled={deleteMutation.isPending}
                        className="gap-1.5 text-xs text-red-500/80 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X size={14} /> Remove
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add another */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                  <Plus size={12} className="text-muted-foreground" />
                </div>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="w-full card-elevated p-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/20 transition-colors text-left"
                >
                  ➕ Add Another Role
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-50 overflow-y-auto p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-foreground">Add Internship</h2>
                <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
                  <X size={18} />
                </Button>
              </div>

              <div className="space-y-5">
                {[
                  { label: "Organization", key: "organization", type: "text", placeholder: "e.g. Google India" },
                  { label: "Role / Title", key: "role", type: "text", placeholder: "e.g. Software Engineering Intern" },
                  { label: "Start Date", key: "start_date", type: "date", placeholder: "" },
                  { label: "End Date (leave blank if ongoing)", key: "end_date", type: "date", placeholder: "" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                    Description / Key Contributions
                  </label>
                  <Textarea
                    placeholder="Built a REST API that improved latency by 20%..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                    Technologies Applied (comma-separated)
                  </label>
                  <Input
                    placeholder="React, Node.js, Agile"
                    value={form.technologies}
                    onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  />
                </div>

                {mutation.isError && (
                  <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">
                    Failed to save. Please try again.
                  </p>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setDrawerOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSave}
                    disabled={mutation.isPending || !form.organization || !form.role}
                  >
                    {mutation.isPending ? "Saving..." : "Save to Profile"}
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

export default InternshipsDashboard;