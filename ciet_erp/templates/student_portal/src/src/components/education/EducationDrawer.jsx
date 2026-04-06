import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const levelOptions = ["10th / SSC", "Intermediate (12th)", "Diploma", "EAMCET", "ECET", "B.Tech CSE", "B.Tech ECE", "B.Tech EEE", "B.Tech Mech", "B.Tech Civil", "M.Tech"];
const EducationDrawer = ({
  open,
  onClose,
  onSave,
  record
}) => {
  const [level, setLevel] = useState("");
  const [institution, setInstitution] = useState("");
  const [board, setBoard] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gradingSystem, setGradingSystem] = useState("percentage");
  const [score, setScore] = useState("");
  useEffect(() => {
    if (record) {
      setLevel(record.level);
      setInstitution(record.institution);
      setBoard(record.board);
      setStartDate(record.startDate);
      setEndDate(record.endDate);
      setGradingSystem(record.gradingSystem);
      setScore(record.score);
    } else {
      setLevel("");
      setInstitution("");
      setBoard("");
      setStartDate("");
      setEndDate("");
      setGradingSystem("percentage");
      setScore("");
    }
  }, [record, open]);
  const handleSubmit = () => {
    onSave({
      id: record?.id || "",
      level,
      institution,
      board,
      startDate,
      endDate,
      gradingSystem,
      score
    });
  };
  const scoreLabel = gradingSystem === "percentage" ? "Percentage" : gradingSystem === "gpa" ? "GPA / CGPA" : "Rank";
  return <AnimatePresence>
      {open && <>
          {/* Overlay */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div initial={{
        x: "100%"
      }} animate={{
        x: 0
      }} exit={{
        x: "100%"
      }} transition={{
        type: "spring",
        damping: 28,
        stiffness: 300
      }} className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card border-l border-border shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">
                  {record ? "Edit Academic Record" : "Add Academic Record"}
                </h2>
                <button onClick={onClose} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Level */}
                <div className="space-y-2">
                  <Label>Education Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level..." />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Institution */}
                <div className="space-y-2">
                  <Label>Institution Name</Label>
                  <Input placeholder="Start typing to search or add new..." value={institution} onChange={e => setInstitution(e.target.value)} />
                </div>

                {/* Board & Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Board / University</Label>
                    <Input placeholder="Enter board name" value={board} onChange={e => setBoard(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Year / Duration</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Start" value={startDate} onChange={e => setStartDate(e.target.value)} />
                      <Input placeholder="End" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Grading System */}
                <div className="space-y-3">
                  <Label>Grading System</Label>
                  <RadioGroup value={gradingSystem} onValueChange={v => setGradingSystem(v)} className="flex gap-6">
                    {["percentage", "gpa", "rank"].map(g => <div key={g} className="flex items-center gap-2">
                        <RadioGroupItem value={g} id={g} />
                        <Label htmlFor={g} className="cursor-pointer capitalize text-sm">
                          {g === "gpa" ? "GPA" : g.charAt(0).toUpperCase() + g.slice(1)}
                        </Label>
                      </div>)}
                  </RadioGroup>
                </div>

                {/* Score */}
                <motion.div key={gradingSystem} initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.2
            }} className="space-y-2">
                  <Label>{scoreLabel}</Label>
                  <Input placeholder={`Enter your ${scoreLabel.toLowerCase()}`} value={score} onChange={e => setScore(e.target.value)} />
                </motion.div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="flex-1 pulse-cta" onClick={handleSubmit}>
                  Save to Profile
                </Button>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};
export default EducationDrawer;