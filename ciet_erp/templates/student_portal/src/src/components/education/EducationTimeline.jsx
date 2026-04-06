import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Pencil, Trash2, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import EducationDrawer from "./EducationDrawer";
const defaultRecords = [{
  id: "1",
  level: "B.Tech CSE",
  institution: "Chalapathi Institute of Engineering and Technology (Autonomous)",
  board: "JNTUK",
  startDate: "Aug 2022",
  endDate: "Present",
  gradingSystem: "gpa",
  score: "9.2"
}, {
  id: "2",
  level: "Intermediate (12th)",
  institution: "Sri Chaitanya Junior College",
  board: "Board of Intermediate Education, AP",
  startDate: "June 2020",
  endDate: "May 2022",
  gradingSystem: "percentage",
  score: "94"
}, {
  id: "3",
  level: "10th / SSC",
  institution: "Montessori High School",
  board: "Board of Secondary Education, AP",
  startDate: "March 2020",
  endDate: "March 2020",
  gradingSystem: "gpa",
  score: "9.8"
}];
const EducationTimeline = () => {
  const [records, setRecords] = useState(defaultRecords);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const completionItems = ["B.Tech", "12th", "10th", "Entrance Rank"];
  const filledCount = Math.min(records.length, completionItems.length);
  const completion = Math.round(filledCount / completionItems.length * 100);
  const missingItems = completionItems.slice(filledCount);
  const handleAdd = () => {
    setEditingRecord(null);
    setDrawerOpen(true);
  };
  const handleEdit = record => {
    setEditingRecord(record);
    setDrawerOpen(true);
  };
  const handleDelete = id => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };
  const handleSave = record => {
    if (editingRecord) {
      setRecords(prev => prev.map(r => r.id === record.id ? record : r));
    } else {
      setRecords(prev => [...prev, {
        ...record,
        id: crypto.randomUUID()
      }]);
    }
    setDrawerOpen(false);
    setEditingRecord(null);
  };
  const formatScore = r => {
    if (r.gradingSystem === "percentage") return `Percentage: ${r.score}%`;
    if (r.gradingSystem === "gpa") return `CGPA: ${r.score}`;
    return `Rank: ${r.score}`;
  };
  return <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 12
    }} animate={{
      opacity: 1,
      y: 0
    }} className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="text-primary" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Education Background</h1>
            <p className="text-sm text-muted-foreground">
              Map your academic journey to stand out to recruiters.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Completion Bar */}
      <motion.div initial={{
      opacity: 0,
      y: 12
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="card-elevated p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Profile Completion</span>
          <span className="text-sm font-bold text-primary">{completion}%</span>
        </div>
        <Progress value={completion} className="h-2" />
        {missingItems.length > 0 && <p className="text-xs text-muted-foreground mt-2">
            Missing: {missingItems.join(", ")}
          </p>}
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{
      opacity: 0,
      y: 12
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }} className="card-elevated p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
          Your Academic Journey
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <motion.div initial={{
          height: 0
        }} animate={{
          height: "100%"
        }} transition={{
          duration: 0.8,
          ease: "easeOut"
        }} className="absolute left-[15px] top-0 w-0.5 bg-border" />

          <div className="space-y-0">
            <AnimatePresence>
              {records.map((record, i) => <motion.div key={record.id} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -20
            }} transition={{
              delay: i * 0.1
            }} className="relative pl-10 pb-8 last:pb-0 group">
                  {/* Timeline dot */}
                  <div className="absolute left-[9px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10 z-10" />

                  <div className="flex items-start justify-between p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all duration-200">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-primary" />
                        <h3 className="font-semibold text-foreground text-sm">{record.level}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{record.institution}</p>
                      <p className="text-xs text-muted-foreground">
                        {record.startDate === record.endDate ? record.startDate : `${record.startDate} – ${record.endDate}`}
                        <span className="mx-2">•</span>
                        <span className="font-medium text-foreground">{formatScore(record)}</span>
                      </p>
                    </div>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button onClick={() => handleEdit(record)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(record.id)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>)}
            </AnimatePresence>
          </div>
        </div>

        {/* Add button */}
        <motion.button whileHover={{
        scale: 1.01
      }} whileTap={{
        scale: 0.99
      }} onClick={handleAdd} className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200">
          <Plus size={18} />
          <span className="text-sm font-medium">Add Education / Rank</span>
        </motion.button>
      </motion.div>

      {/* Drawer */}
      <EducationDrawer open={drawerOpen} onClose={() => {
      setDrawerOpen(false);
      setEditingRecord(null);
    }} onSave={handleSave} record={editingRecord} />
    </div>;
};
export default EducationTimeline;