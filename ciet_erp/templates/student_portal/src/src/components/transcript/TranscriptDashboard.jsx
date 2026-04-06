import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, Target, ShieldCheck, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const sgpaData = [{
  sem: "Sem 1",
  sgpa: 8.2
}, {
  sem: "Sem 2",
  sgpa: 8.8
}, {
  sem: "Sem 3",
  sgpa: 9.6
}, {
  sem: "Sem 4",
  sgpa: 9.4
}];
const semesterDetails = [{
  id: "sem4",
  label: "Semester 4",
  status: "Current",
  sgpa: 9.4,
  courses: [{
    name: "Data Structures",
    internal: 38,
    external: 55,
    total: 93,
    grade: "O",
    color: "bg-accent"
  }, {
    name: "Web Development",
    internal: 35,
    external: 52,
    total: 87,
    grade: "A+",
    color: "bg-primary"
  }, {
    name: "Algorithms",
    internal: 32,
    external: 48,
    total: 80,
    grade: "A",
    color: "bg-purple-500"
  }, {
    name: "Database Systems",
    internal: 34,
    external: 50,
    total: 84,
    grade: "A+",
    color: "bg-primary"
  }, {
    name: "Operating Systems",
    internal: 30,
    external: 46,
    total: 76,
    grade: "A",
    color: "bg-purple-500"
  }]
}, {
  id: "sem3",
  label: "Semester 3",
  status: "Completed",
  sgpa: 9.6,
  courses: [{
    name: "Computer Networks",
    internal: 37,
    external: 56,
    total: 93,
    grade: "O",
    color: "bg-accent"
  }, {
    name: "Software Engineering",
    internal: 36,
    external: 54,
    total: 90,
    grade: "O",
    color: "bg-accent"
  }, {
    name: "Discrete Mathematics",
    internal: 33,
    external: 50,
    total: 83,
    grade: "A+",
    color: "bg-primary"
  }]
}, {
  id: "sem2",
  label: "Semester 2",
  status: "Completed",
  sgpa: 8.8,
  courses: [{
    name: "Object Oriented Programming",
    internal: 30,
    external: 48,
    total: 78,
    grade: "A",
    color: "bg-purple-500"
  }, {
    name: "Digital Logic Design",
    internal: 32,
    external: 50,
    total: 82,
    grade: "A+",
    color: "bg-primary"
  }, {
    name: "Linear Algebra",
    internal: 28,
    external: 45,
    total: 73,
    grade: "B+",
    color: "bg-blue-500"
  }]
}, {
  id: "sem1",
  label: "Semester 1",
  status: "Completed",
  sgpa: 8.2,
  courses: [{
    name: "Programming in C",
    internal: 28,
    external: 44,
    total: 72,
    grade: "B+",
    color: "bg-blue-500"
  }, {
    name: "Engineering Mathematics I",
    internal: 30,
    external: 46,
    total: 76,
    grade: "A",
    color: "bg-purple-500"
  }, {
    name: "Engineering Physics",
    internal: 27,
    external: 42,
    total: 69,
    grade: "B+",
    color: "bg-blue-500"
  }]
}];
const AnimatedNumber = ({
  target,
  duration = 1500
}) => {
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
const DegreeRing = ({
  percent
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percent / 100 * circumference;
  return <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
      <motion.circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--accent))" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} initial={{
      strokeDashoffset: circumference
    }} animate={{
      strokeDashoffset: offset
    }} transition={{
      duration: 1.5,
      ease: "easeOut",
      delay: 0.3
    }} transform="rotate(-90 50 50)" />
      <text x="50" y="46" textAnchor="middle" className="fill-foreground text-lg font-bold">
        {percent}%
      </text>
      <text x="50" y="60" textAnchor="middle" className="fill-muted-foreground text-[8px]">
        Complete
      </text>
    </svg>;
};
const CustomTooltip = ({
  active,
  payload,
  label
}) => {
  if (active && payload && payload.length) {
    return <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-sm font-bold text-primary">SGPA: {payload[0].value}</p>
      </div>;
  }
  return null;
};
const TranscriptDashboard = () => {
  return <div className="space-y-6">
      {/* Breadcrumb */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Dashboard</span>
        <span className="mx-2">/</span>
        <span className="hover:text-foreground cursor-pointer">Academics</span>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Transcript & Progress</span>
      </motion.div>

      {/* Bento Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="card-elevated p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp size={20} className="text-primary" />
            </div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase">Overall CGPA</span>
          </div>
          <p className="text-4xl font-bold text-foreground">9.2</p>
          <p className="text-sm text-muted-foreground mt-1">Out of 10.0</p>
          <div className="flex items-center gap-1 mt-3 text-accent">
            <TrendingUp size={14} />
            <span className="text-xs font-medium">Top 10% of Class</span>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="card-elevated p-6">
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

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="card-elevated p-6">
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
          <p className="text-xs text-accent font-medium mt-1">Eligible for Hiring</p>
        </motion.div>
      </div>

      {/* Performance Trajectory Chart */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.4
    }} className="card-elevated p-6">
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
            <LineChart data={sgpaData} margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="sem" tick={{
              fontSize: 12,
              fill: "hsl(var(--muted-foreground))"
            }} axisLine={{
              stroke: "hsl(var(--border))"
            }} />
              <YAxis domain={[6, 10]} tick={{
              fontSize: 12,
              fill: "hsl(var(--muted-foreground))"
            }} axisLine={{
              stroke: "hsl(var(--border))"
            }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="sgpa" stroke="hsl(var(--primary))" strokeWidth={3} dot={{
              r: 6,
              fill: "hsl(var(--primary))",
              stroke: "hsl(var(--card))",
              strokeWidth: 3
            }} activeDot={{
              r: 8,
              fill: "hsl(var(--primary))"
            }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Semester Assessments Accordion */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }} className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-muted-foreground tracking-wider uppercase">
            📚 Semester Assessments
          </h3>
          <button className="flex items-center gap-2 text-xs font-semibold text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors">
            <Download size={14} />
            Export
          </button>
        </div>

        <Accordion type="single" collapsible defaultValue="sem4" className="space-y-2">
          {semesterDetails.map(sem => <AccordionItem key={sem.id} value={sem.id} className="border rounded-xl px-4 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 w-full">
                  <span className="text-sm font-semibold text-foreground">{sem.label}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${sem.status === "Current" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {sem.status}
                  </span>
                  <span className="ml-auto mr-4 text-sm font-bold text-foreground">SGPA: {sem.sgpa}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</th>
                      <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Internal (40)</th>
                      <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">External (60)</th>
                      <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                      <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem.courses.map(course => <tr key={course.name} className="table-row-hover border-b border-border/50 last:border-0">
                        <td className="py-3 px-2 font-medium text-foreground">{course.name}</td>
                        <td className="py-3 px-2 text-center text-muted-foreground">{course.internal}</td>
                        <td className="py-3 px-2 text-center text-muted-foreground">{course.external}</td>
                        <td className="py-3 px-2 text-center font-semibold text-foreground">{course.total}</td>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white ${course.color}`}>
                            {course.grade}
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>)}
        </Accordion>
      </motion.div>
    </div>;
};
export default TranscriptDashboard;