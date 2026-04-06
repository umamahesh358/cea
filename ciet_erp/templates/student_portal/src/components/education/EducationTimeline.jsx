import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Pencil, Trash2, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import EducationDrawer from "./EducationDrawer";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { createEducation, deleteEducation } from "@/lib/api";

const EducationTimeline = () => {
  const { data, isLoading } = useStudentProfile();
  const queryClient = useQueryClient();
  const records = data?.education || [];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const completionItems = ["10th", "12th", "Undergraduate"];
  const filledCount = Math.min(records.length, completionItems.length);
  const completion = Math.round((filledCount / completionItems.length) * 100);
  const missingItems = completionItems.filter((i) => !records.some((r) => r.edu_type === i));

  const createMutation = useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      queryClient.invalidateQueries(["studentProfile"]);
      setDrawerOpen(false);
      setEditingRecord(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => queryClient.invalidateQueries(["studentProfile"]),
  });

  const handleAdd = () => {
    setEditingRecord(null);
    setDrawerOpen(true);
  };

  const handleSave = (record) => {
    if (editingRecord) {
      // API currently maps to update, but we don't have separate update functions exported yet. We will just delete and create for now as a workaround, or implement proper PATCH.
      // Assuming we have to add update function or just use create as it is now.
      createMutation.mutate(record);
    } else {
      createMutation.mutate(record);
    }
  };

  const formatScore = (r) => {
    if (r.score_type === "percentage") return `Percentage: ${r.score}%`;
    if (r.score_type === "cgpa") return `CGPA: ${r.score}`;
    return `Grade/Rank: ${r.score}`;
  };

  if (isLoading) return <div className="space-y-4 animate-pulse"><div className="h-20 bg-white/5 rounded-xl w-full"></div><div className="h-40 bg-white/5 w-full rounded-xl"></div></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="text-primary" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Education Background</h1>
            <p className="text-sm text-muted-foreground">Map your academic journey to stand out to recruiters.</p>
          </div>
        </div>
      </motion.div>

      {/* Completion Bar */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-elevated p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Profile Completion</span>
          <span className="text-sm font-bold text-primary">{completion}%</span>
        </div>
        <Progress value={completion} className="h-2" />
        {missingItems.length > 0 && <p className="text-xs text-muted-foreground mt-2">Missing: {missingItems.join(", ")}</p>}
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-elevated p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Your Academic Journey</h2>

        <div className="relative">
          <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute left-[15px] top-0 w-0.5 bg-border" />
          <div className="space-y-0">
            <AnimatePresence>
              {records.map((record, i) => (
                <motion.div key={record.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.1 }} className="relative pl-10 pb-8 last:pb-0 group">
                  <div className="absolute left-[9px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10 z-10" />
                  <div className="flex items-start justify-between p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all duration-200">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-primary" />
                        <h3 className="font-semibold text-foreground text-sm">{record.edu_type}</h3>
                      </div>
                      <p className="text-sm text-foreground font-medium">{record.institution}</p>
                      <p className="text-xs text-muted-foreground">
                        {record.board_university} <span className="mx-2">•</span> Class of {record.year_of_passing} <span className="mx-2">•</span> <span className="font-medium text-foreground">{formatScore(record)}</span>
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button onClick={() => deleteMutation.mutate(record.id)} disabled={deleteMutation.isPending} className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={handleAdd} className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200">
          <Plus size={18} />
          <span className="text-sm font-medium">Add Education</span>
        </motion.button>
      </motion.div>

      <EducationDrawer open={drawerOpen} onClose={() => { setDrawerOpen(false); setEditingRecord(null); }} onSave={handleSave} record={editingRecord} />
    </div>
  );
};

export default EducationTimeline;