import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, Mail, Linkedin, Github, MapPin, ExternalLink, ArrowRight, Briefcase, CalendarDays, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { Link } from "react-router-dom";

const ProfileDashboard = () => {
  const { data, isLoading } = useStudentProfile();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 300], [0, -50]);

  if (isLoading) {
    return <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />;
  }

  const firstName = data?.user?.first_name || "Student";
  const lastName = data?.user?.last_name || "";
  const initial = firstName.charAt(0);
  const department = data?.department || "B.Tech";
  const batch = data?.batch ? `Class of ${parseInt(data.batch) + 4}` : "Student";
  
  // Consolidate skills from projects/internships
  const extractedSkills = new Set();
  data?.projects?.forEach(p => {
    if (p.tech_stack) {
      p.tech_stack.split(',').map(s => s.trim()).forEach(s => extractedSkills.add(s));
    }
  });
  data?.internships?.forEach(i => {
    if (i.technologies) {
      i.technologies.split(',').map(s => s.trim()).forEach(s => extractedSkills.add(s));
    }
  });
  const skills = Array.from(extractedSkills).slice(0, 8); // Top 8 skills

  // Featured items (using Projects and Internships)
  let featuredItems = [];
  if (data?.projects) {
    featuredItems = [...featuredItems, ...data.projects.map((p, i) => ({
      pinLabel: "FEATURED PROJECT",
      title: p.title,
      desc: p.description,
      cta: p.repo_url ? "View Repo" : "View Details",
      link: p.repo_url || "/projects",
      gradient: [
        "from-purple-500/10 to-indigo-500/10",
        "from-amber-500/10 to-orange-500/10",
        "from-sky-500/10 to-cyan-500/10",
        "from-rose-500/10 to-pink-500/10"
      ][i % 4]
    }))];
  }
  featuredItems = featuredItems.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Hero / Cover */}
      <motion.div ref={heroRef} className="relative rounded-3xl overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div style={{ y: bgY }} className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="relative z-10 p-8 pt-16 pb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="w-24 h-24 rounded-2xl bg-card/10 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm shrink-0 overflow-hidden">
              {data?.photo_url ? (
                <img src={data.photo_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-white">{initial}</span>
              )}
            </div>
            <div className="flex-1 text-white">
              <h1 className="text-3xl font-bold">{firstName} {lastName}</h1>
              <p className="text-sm opacity-80 flex items-center gap-2 mt-1">
                {department} • {batch}
              </p>
              <p className="text-sm opacity-70 mt-2 max-w-lg italic">
                {data?.bio || `"Passionate about technology and solving real-world problems."`}
              </p>
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {skills.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300 }}
                >
                  <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-xs">{s}</Badge>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-5">
            {data?.resume && (
              <a href={data.resume} download target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
                <Download size={16} /> Download Resume
              </a>
            )}
            {data?.personal_email && (
              <a href={`mailto:${data.personal_email}`} className="flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20">
                <Mail size={16} /> Message
              </a>
            )}
            {data?.linkedin_url && (
              <a href={data.linkedin_url.startsWith('http') ? data.linkedin_url : `https://${data.linkedin_url}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20">
                <Linkedin size={16} />
              </a>
            )}
            {data?.github_url && (
              <a href={data.github_url.startsWith('http') ? data.github_url : `https://${data.github_url}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20">
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Featured Shelf */}
      {featuredItems.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Featured Shelf</p>
            <p className="text-xs text-muted-foreground italic">HR Recruiters look here first</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="card-elevated p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40 group-hover:opacity-60 transition-opacity`} />
                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-primary">{item.pinLabel}</span>
                  <h3 className="text-base font-bold text-foreground mt-2 truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.desc}</p>
                  {item.link.startsWith('http') ? (
                    <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex mt-4 text-sm text-primary font-medium items-center gap-1 hover:underline">
                      <ExternalLink size={14} /> {item.cta} <ArrowRight size={12} />
                    </a>
                  ) : (
                    <Link to={item.link} className="inline-flex mt-4 text-sm text-primary font-medium items-center gap-1 hover:underline">
                      <ExternalLink size={14} /> {item.cta} <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card-elevated p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Recent Experience</p>
          <Link to="/internships" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        
        {data?.internships && data.internships.length > 0 ? (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Briefcase size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{data.internships[0].role}</p>
              <p className="text-xs text-muted-foreground">{data.internships[0].organization} • {new Date(data.internships[0].start_date).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No recent experience listed.</p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Academic Highlights</p>
          <Link to="/education" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <span className="text-sm">🎓</span>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Chalapathi Institute of Engineering & Tech</p>
            <p className="text-xs text-muted-foreground">CGPA: {data?.cgpa || "N/A"}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDashboard;