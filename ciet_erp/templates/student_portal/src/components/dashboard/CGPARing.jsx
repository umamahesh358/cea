import { motion } from "framer-motion";
const CGPARing = ({
  value,
  max = 10
}) => {
  const percentage = value / max * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - percentage / 100 * circumference;
  return <div className="relative w-28 h-28">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
        <motion.circle cx="50" cy="50" r="45" stroke="hsl(var(--accent))" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={circumference} initial={{
        strokeDashoffset: circumference
      }} animate={{
        strokeDashoffset
      }} transition={{
        duration: 1.5,
        delay: 0.3,
        ease: "easeOut"
      }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{value.toFixed(1)}</span>
        <span className="text-[10px] text-muted-foreground font-medium">CGPA</span>
      </div>
    </div>;
};
export default CGPARing;