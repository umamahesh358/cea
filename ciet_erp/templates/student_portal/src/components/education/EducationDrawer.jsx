import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const eduTypes = ["10th", "12th", "Diploma", "Undergraduate", "Postgraduate", "PhD"];

const EducationDrawer = ({ open, onClose, onSave, record }) => {
  const [edu_type, setEduType] = useState("");
  const [institution, setInstitution] = useState("");
  const [board_university, setBoardUniversity] = useState("");
  const [year_of_passing, setYearOfPassing] = useState("");
  const [score_type, setScoreType] = useState("percentage");
  const [score, setScore] = useState("");

  useEffect(() => {
    if (record) {
      setEduType(record.edu_type || "");
      setInstitution(record.institution || "");
      setBoardUniversity(record.board_university || "");
      setYearOfPassing(record.year_of_passing || "");
      setScoreType(record.score_type || "percentage");
      setScore(record.score || "");
    } else {
      setEduType("");
      setInstitution("");
      setBoardUniversity("");
      setYearOfPassing("");
      setScoreType("percentage");
      setScore("");
    }
  }, [record, open]);

  const handleSubmit = () => {
    onSave({
      id: record?.id,
      edu_type,
      institution,
      board_university,
      year_of_passing: year_of_passing ? parseInt(year_of_passing) : null,
      score_type,
      score,
    });
  };

  const scoreLabel = score_type === "percentage" ? "Percentage" : score_type === "cgpa" ? "CGPA" : "Grade";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card border-l border-border shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">{record ? "Edit Academic Record" : "Add Academic Record"}</h2>
                <button onClick={onClose} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><X size={18} /></button>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Education Level</Label>
                  <Select value={edu_type} onValueChange={setEduType}>
                    <SelectTrigger><SelectValue placeholder="Select level..." /></SelectTrigger>
                    <SelectContent>
                      {eduTypes.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Institution Name</Label>
                  <Input placeholder="Start typing to search or add new..." value={institution} onChange={(e) => setInstitution(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Board / University</Label>
                  <Input placeholder="Enter board name" value={board_university} onChange={(e) => setBoardUniversity(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Year of Passing</Label>
                  <Input placeholder="YYYY" value={year_of_passing} onChange={(e) => setYearOfPassing(e.target.value)} />
                </div>
                <div className="space-y-3">
                  <Label>Grading System</Label>
                  <RadioGroup value={score_type} onValueChange={setScoreType} className="flex gap-6">
                    {["percentage", "cgpa", "grade"].map((g) => (
                      <div key={g} className="flex items-center gap-2">
                        <RadioGroupItem value={g} id={g} />
                        <Label htmlFor={g} className="cursor-pointer capitalize text-sm">{g}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <motion.div key={score_type} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                  <Label>{scoreLabel}</Label>
                  <Input placeholder={`Enter your ${scoreLabel.toLowerCase()}`} value={score} onChange={(e) => setScore(e.target.value)} />
                </motion.div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                <Button className="flex-1 pulse-cta" onClick={handleSubmit} disabled={!edu_type || !institution}>Save to Profile</Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EducationDrawer;