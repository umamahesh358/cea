import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, Target, ShieldCheck, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useStudentProfile } from "@/hooks/useStudentProfile";

const AnimatedNumber = ({ target, duration = 1500 }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{value}</>;
};

const DegreeRing = ({ percent }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
      <motion.circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--accent))" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} transform="rotate(-90 50 50)" />
      <text x="50" y="46" textAnchor="middle" className="fill-foreground text-lg font-bold">{percent}%</text>
      <text x="50" y="60" textAnchor="middle" className="fill-muted-foreground text-[8px]">Complete</text>
    </svg>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-sm font-bold text-primary">SGPA: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const TranscriptDashboard = () => {
  const { data, isLoading } = useStudentProfile();
  
  if (isLoading) return <div className="animate-pulse space-y-4"><div className="h-40 bg-white/5 rounded-xl w-full"></div></div>;

  const results = data?.semester_results || [];
  const cgpa = data?.cgpa || "N/A";

  // Group by semester
  const groupedResults = results.reduce((acc, curr) => {
    if (!acc[curr.semester]) acc[curr.semester] = [];
    acc[curr.semester].push(curr);
    return acc;
  }, {});

  const semesters = Object.keys(groupedResults).sort((a, b) => b - a);
  
  // Calculate fake SGPA per semester from the grades just as an example charting data
  const sgpaData = Object.keys(groupedResults).sort((a, b) => a - b).map(sem => {
    // In a real app the SGPA would be provided by API or calculated properly from credits.
    // Assuming simple average of scores converted to 10 point scale.
    const semResults = groupedResults[sem];
    const avgScore = semResults.length > 0 ? semResults.reduce((sum, r) => sum + (r.score / r.max_score) * 10, 0) / semResults.length : 0;
    return {
      sem: `Sem ${sem}`,
      sgpa: parseFloat(avgScore.toFixed(2))
    };
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Dashboard</span>
        <span className="mx-2">/</span>
        <span className="hover:text-foreground cursor-pointer">Academics</span>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Transcript & Progress</span>
      </motion.div>

      {/* Bento Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-elevated p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp size={20} className="text-primary" />
            </div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase">Overall CGPA</span>
          </div>
          <p className="text-4xl font-bold text-foreground">{cgpa}</p>
          <p className="text-sm text-muted-foreground mt-1">Out of 10.0</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-elevated p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Target size={20} className="text-accent" />
            </div>
            <span className="text-xs font-bold text-accent tracking-wider uppercase">Degree Progress</span>
          </div>
          <div className="flex items-center gap-4">
            <DegreeRing percent={77} />
            <div>
              <p className="text-2xl font-bold text-foreground">
                <AnimatedNumber target={124} /> <span className="text-sm font-normal text-muted-foreground">/ 160</span>
              </p>
              <p className="text-sm text-muted-foreground">Credits Earned</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-elevated p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <ShieldCheck size={20} className="text-accent" />
            </div>
            <span className="text-xs font-bold text-accent tracking-wider uppercase">Standing</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-3">
            <ShieldCheck size={16} className="text-accent" />
            <span className="text-sm font-bold text-accent">Clear Standing</span>
          </div>
          <p className="text-sm text-muted-foreground">0 Active Arrears</p>
        </motion.div>
      </div>

      {/* Performance Trajectory Chart */}
      {sgpaData.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-muted-foreground tracking-wider uppercase">
                📊 Performance Trajectory
              </h3>
              <p className="text-xs text-muted-foreground mt-1">SGPA per Semester</p>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sgpaData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="sem" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="sgpa" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--card))", strokeWidth: 3 }} activeDot={{ r: 8, fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Semester Assessments Accordion */}
      {semesters.length > 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-muted-foreground tracking-wider uppercase">
              📚 Semester Assessments
            </h3>
            <button className="flex items-center gap-2 text-xs font-semibold text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors">
              <Download size={14} /> Export
            </button>
          </div>

          <Accordion type="single" collapsible defaultValue={`sem${semesters[0]}`} className="space-y-2">
            {semesters.map(sem => (
              <AccordionItem key={sem} value={`sem${sem}`} className="border rounded-xl px-4 overflow-hidden">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 w-full">
                    <span className="text-sm font-semibold text-foreground">Semester {sem}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject Code</th>
                        <th className="text-left py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject Name</th>
                        <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Score</th>
                        <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Max Score</th>
                        <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedResults[sem].map(course => (
                        <tr key={course.subject_code} className="table-row-hover border-b border-border/50 last:border-0">
                          <td className="py-3 px-2 font-medium text-foreground">{course.subject_code}</td>
                          <td className="py-3 px-2 text-muted-foreground">{course.subject_name}</td>
                          <td className="py-3 px-2 text-center text-foreground font-semibold">{course.score}</td>
                          <td className="py-3 px-2 text-center text-muted-foreground">{course.max_score}</td>
                          <td className="py-3 px-2 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white bg-primary">
                              {course.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      ) : (
        <div className="card-elevated p-10 flex flex-col items-center text-center mt-6">
          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-2xl mb-4">
            <ShieldCheck size={28} className="text-primary" />
          </div>
          <h3 className="font-bold text-foreground">No Semester Results Available</h3>
          <p className="text-sm text-muted-foreground mt-1">Your academic transcripts have not been uploaded by the admin yet.</p>
        </div>
      )}
    </div>
  );
};

export default TranscriptDashboard;