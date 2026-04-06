import { motion } from "framer-motion";
import { FileText } from "lucide-react";
const marks = [{
  course: "Data Structures",
  internal: 28,
  external: 65
}, {
  course: "Web Development",
  internal: 29,
  external: 68
}, {
  course: "Algorithms",
  internal: 25,
  external: 60
}, {
  course: "Database Systems",
  internal: 27,
  external: 63
}, {
  course: "Operating Systems",
  internal: 26,
  external: 61
}];
const SemesterMarks = () => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.7,
    duration: 0.4
  }} className="card-elevated p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-muted-foreground" />
          <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
            Latest Semester Marks
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</th>
              <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Internal</th>
              <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">External</th>
              <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((row, i) => <motion.tr key={row.course} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.8 + i * 0.05
          }} className="table-row-hover border-b border-border/50 last:border-0 cursor-default">
                <td className="py-3 px-3 font-medium text-foreground">{row.course}</td>
                <td className="py-3 px-3 text-center text-muted-foreground">{row.internal}</td>
                <td className="py-3 px-3 text-center text-muted-foreground">{row.external}</td>
                <td className="py-3 px-3 text-center font-semibold text-foreground">{row.internal + row.external}</td>
              </motion.tr>)}
          </tbody>
        </table>
      </div>

      <button className="mt-4 text-sm font-semibold text-primary hover:underline">
        View Full Transcript →
      </button>
    </motion.div>;
};
export default SemesterMarks;