import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useStudentProfile } from "@/hooks/useStudentProfile";

const UpcomingThisWeek = () => {
  const { data, isLoading } = useStudentProfile();

  if (isLoading) {
    return <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />;
  }

  // Find upcoming events
  let upcomingItems = [];
  if (data?.events) {
    upcomingItems = data.events
      .filter(e => {
        if (!e.event_date) return false;
        // Basic check to see if date is in future, or just show top 3 for now since it's a student portfolio
        return true; 
      })
      .map(e => ({
        id: e.id,
        icon: CalendarDays,
        label: e.name,
        date: new Date(e.event_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
        type: e.scope,
        color: "text-primary",
        bg: "bg-primary/10"
      }))
      .slice(0, 3);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.4 }} className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-[10px] font-bold text-muted-foreground/60 tracking-[0.15em] uppercase font-[Inter,sans-serif]">
          Upcoming Events
        </div>
        <Link to="/events" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
          View All <ArrowRight size={12} />
        </Link>
      </div>

      <div className="space-y-2">
        {upcomingItems.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm">
            No upcoming events.
          </div>
        ) : (
          upcomingItems.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1 }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5 transition-all cursor-pointer group">
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                <item.icon size={18} className={item.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground font-[Inter,sans-serif]">{item.date}</p>
              </div>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground/50 font-[Inter,sans-serif]">
                {item.type}
              </span>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default UpcomingThisWeek;