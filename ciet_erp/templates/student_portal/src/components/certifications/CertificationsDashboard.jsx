import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award, Zap, Eye, Plus, ExternalLink, ShieldCheck, Cloud, Search, Monitor, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { createCertification, deleteCertification } from "@/lib/api";

const ghostBadges = [
  { icon: Cloud, label: "AWS", company: "Amazon Web Services" },
  { icon: Search, label: "Google", company: "Google Cloud" },
  { icon: Monitor, label: "Meta", company: "Meta Engineering" },
];

const CertificationsDashboard = () => {
  const { data, isLoading } = useStudentProfile();
  const queryClient = useQueryClient();
  const certs = data?.certifications || [];

  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [form, setForm] = useState({
    title: "", issuer: "", issued_date: "", cert_url: "", cert_type: "link",
  });

  const totalSkills = certs.length;

  const mutation = useMutation({
    mutationFn: createCertification,
    onSuccess: () => {
      queryClient.invalidateQueries(["studentProfile"]);
      setShowAddDrawer(false);
      setForm({ title: "", issuer: "", issued_date: "", cert_url: "", cert_type: "link" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCertification,
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
    <div className="space-y-6">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Certifications</span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card-elevated p-6 flex items-center justify-between"
      >
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">🏆 My Credentials &amp; Skills</h2>
          <p className="text-sm text-muted-foreground mt-1">Showcase your verified industry expertise.</p>
        </div>
        <Button onClick={() => setShowAddDrawer(true)} className="gap-2">
          <Plus size={16} /> Add New Certification
        </Button>
      </motion.div>

      {/* Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: Award, label: "Verified Badges", value: certs.filter(c => c.is_verified).length, sub: "verified credentials", color: "text-primary", bg: "bg-primary/10" },
          { icon: Zap, label: "Total Certifications", value: totalSkills, sub: "in your profile", color: "text-accent", bg: "bg-accent/10" },
          { icon: Eye, label: "Pending Review", value: certs.filter(c => !c.is_verified).length, sub: "awaiting verification", color: "text-primary", bg: "bg-primary/10" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className={`text-xs font-bold tracking-wider uppercase ${stat.color}`}>{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Section Title */}
      <div className="flex items-center gap-3">
        <h3 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Your Digital Trophy Case</h3>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Certifications Grid or Empty State */}
      {certs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="card-elevated p-10 text-center"
        >
          <div className="flex justify-center gap-8 mb-8">
            {ghostBadges.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-2 opacity-25">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                  <badge.icon size={28} className="text-muted-foreground" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{badge.label}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            You haven't added any certifications yet. Click the button above to add your first one.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              className="card-elevated p-6 group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award size={24} className="text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  {cert.is_verified ? (
                    <div className="flex items-center gap-1 text-green-500">
                      <ShieldCheck size={16} />
                      <span className="text-xs font-bold">Verified</span>
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs text-yellow-500 border-yellow-500/40">Pending</Badge>
                  )}
                  <Button
                    variant="ghost" size="icon"
                    onClick={() => deleteMutation.mutate(cert.id)}
                    className="h-7 w-7 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={14} />
                  </Button>
                </div>
              </div>

              <h4 className="text-base font-bold text-foreground mb-1">{cert.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span>Issued: {cert.issued_date}</span>
              </div>

              {cert.cert_url && (
                <a href={cert.cert_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  View Credential <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Drawer */}
      <AnimatePresence>
        {showAddDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setShowAddDrawer(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Add Certification</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowAddDrawer(false)}><X size={18} /></Button>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Certification Title</label>
                  <Input placeholder="e.g. AWS Cloud Practitioner" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Issuing Organization</label>
                  <Input placeholder="e.g. Amazon Web Services" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Issue Date</label>
                  <Input type="date" value={form.issued_date} onChange={(e) => setForm({ ...form, issued_date: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Credential URL</label>
                  <Input placeholder="https://credly.com/..." value={form.cert_url} onChange={(e) => setForm({ ...form, cert_url: e.target.value })} />
                </div>
                {mutation.isError && (
                  <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">Failed to save. Please try again.</p>
                )}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowAddDrawer(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={() => {
                    const payload = { ...form };
                    if (!payload.issued_date) payload.issued_date = null;
                    mutation.mutate(payload);
                  }} disabled={mutation.isPending || !form.title || !form.issuer}>
                    {mutation.isPending ? "Saving..." : "Save Certification"}
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

export default CertificationsDashboard;