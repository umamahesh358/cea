import { LayoutDashboard, GraduationCap, Briefcase, Rocket, FlaskConical, Award, Settings, LogOut, Users, CalendarDays, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const menuSections = [
  {
    label: "MAIN",
    items: [
      { icon: LayoutDashboard, label: "Overview", href: "/" },
      { icon: UserCircle,      label: "Profile",  href: "/profile" },
    ],
  },
  {
    label: "CAREER",
    items: [
      { icon: GraduationCap, label: "Education",      href: "/education" },
      { icon: Briefcase,     label: "Internships",    href: "/internships" },
      { icon: Rocket,        label: "Projects",       href: "/projects" },
      { icon: FlaskConical,  label: "Research",       href: "/research" },
      { icon: Award,         label: "Certifications", href: "/certifications" },
    ],
  },
  {
    label: "CAMPUS",
    items: [
      { icon: Users,        label: "Cohorts", href: "/cohorts" },
      { icon: CalendarDays, label: "Events",  href: "/events" },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (href) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-heavy flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm tracking-tight">CI</span>
        </div>
        <span className="font-bold text-lg text-foreground tracking-tight">CIET Portal</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto space-y-6">
        {menuSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-bold text-muted-foreground/50 tracking-[0.2em] uppercase px-3 mb-2">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.label}>
                    <Link to={item.href} className="no-underline">
                      <motion.div
                        whileHover={{ x: active ? 0 : 2 }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <item.icon size={18} strokeWidth={active ? 2.5 : 1.8} />
                        {item.label}
                      </motion.div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* System */}
      <div className="px-4 pb-4 space-y-0.5 border-t border-border/50 pt-4">
        <p className="text-[10px] font-bold text-muted-foreground/50 tracking-[0.2em] uppercase px-3 mb-2">SYSTEM</p>
        <Link to="/settings" className="no-underline">
          <motion.div
            whileHover={{ x: 2 }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive("/settings")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            <Settings size={18} strokeWidth={isActive("/settings") ? 2.5 : 1.8} />
            Settings
          </motion.div>
        </Link>
        {/* Sign out goes to Django logout — full page navigation intentional */}
        <a href="/accounts/logout/" className="no-underline">
          <motion.div
            whileHover={{ x: 2 }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Sign Out
          </motion.div>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;