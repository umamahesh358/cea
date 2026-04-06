import { motion } from "framer-motion";
import { Rocket, Plus, Briefcase, Award, Code2, CalendarDays, FlaskConical, GraduationCap } from "lucide-react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { Link } from "react-router-dom";

const ActivityFeed = () => {
  const { data, isLoading } = useStudentProfile();

  if (isLoading) {
    return <div className="h-[280px] rounded-2xl bg-white/5 animate-pulse" />;
  }

  // Aggregate all activities
  let activities = [];

  if (data?.internships) {
    activities = [...activities, ...data.internships.map(i => ({
      id: `int-${i.id}`, type: "internship", title: `Started internship at ${i.organization}`,
      date: i.created_at, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10",
      link: "/internships"
    }))];
  }

  if (data?.certifications) {
    activities = [...activities, ...data.certifications.map(c => ({
      id: `cert-${c.id}`, type: "certification", title: `Earned certification: ${c.title}`,
      date: c.created_at, icon: Award, color: "text-amber-500", bg: "bg-amber-500/10",
      link: "/certifications"
    }))];
  }

  if (data?.projects) {
    activities = [...activities, ...data.projects.map(p => ({
      id: `proj-${p.id}`, type: "project", title: `Added new project: ${p.title}`,
      date: p.created_at, icon: Code2, color: "text-primary", bg: "bg-primary/10",
      link: "/projects"
    }))];
  }

  if (data?.events) {
    activities = [...activities, ...data.events.map(e => ({
      id: `evt-${e.id}`, type: "event", title: `Participated in ${e.name}`,
      date: e.created_at, icon: CalendarDays, color: "text-green-500", bg: "bg-green-500/10",
      link: "/events"
    }))];
  }

  if (data?.research) {
    activities = [...activities, ...data.research.map(r => ({
      id: `res-${r.id}`, type: "research", title: `Published research: ${r.title}`,
      date: r.created_at, icon: FlaskConical, color: "text-purple-500", bg: "bg-purple-500/10",
      link: "/research"
    }))];
  }

  // Sort by date descending
  activities.sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentActivities = activities.slice(0, 5); // Take top 5

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }} className="glass-card p-6 flex flex-col min-h-[280px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-bold text-muted-foreground/60 tracking-[0.15em] uppercase font-[Inter,sans-serif]">
          Professional Activity Feed
        </h3>
      </div>

      {recentActivities.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center flex-1">
          <div className="w-20 h-20 rounded-2xl bg-foreground/5 flex items-center justify-center mb-4">
            <Rocket size={36} className="text-muted-foreground/40" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Your feed is waiting to launch!</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs font-[Inter,sans-serif]">
            Share your first project, certification, or internship to start building your professional timeline.
          </p>
          <Link to="/projects" className="pulse-cta btn-glow flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
            <Plus size={16} /> Post Your First Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {recentActivities.map((activity, i) => (
            <motion.div key={activity.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex gap-4 group">
              <div className="relative flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg} ${activity.color} ring-4 ring-card z-10`}>
                  <activity.icon size={16} />
                </div>
                {i !== recentActivities.length - 1 && (
                  <div className="w-0.5 h-full bg-border absolute top-10" />
                )}
              </div>
              <div className="pt-2 pb-4">
                <p className="text-sm font-semibold text-foreground leading-snug">{activity.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground font-[Inter,sans-serif]">
                    {new Date(activity.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Link to={activity.link} className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground hover:text-primary transition-colors">
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ActivityFeed;