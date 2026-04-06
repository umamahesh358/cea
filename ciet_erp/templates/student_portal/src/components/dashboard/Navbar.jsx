import { Search, Bell, Mail, Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useStudentProfile } from "@/hooks/useStudentProfile";

const Navbar = () => {
  const { data } = useStudentProfile();
  const firstName = data?.user?.first_name || "";
  const lastName = data?.user?.last_name || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Student";
  const initials = (firstName?.[0] || "") + (lastName?.[0] || "") || "S";
  const department = data?.department || "Student Portal";

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-20 glass-nav">
      <div className="flex items-center justify-between px-8 py-3">
        <h1 className="text-xl font-bold text-foreground tracking-tight">Dashboard</h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-foreground/5 rounded-xl px-4 py-2 w-72 border border-border/50">
            <Search size={16} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, peers, courses..."
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground font-[Inter,sans-serif]"
            />
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-1.5">
            <Sun size={14} className="text-muted-foreground" />
            <Switch checked={isDark} onCheckedChange={setIsDark} />
            <Moon size={14} className="text-muted-foreground" />
          </div>

          {/* Icons */}
          <button className="relative p-2.5 rounded-xl hover:bg-foreground/5 transition-colors">
            <Bell size={19} className="text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          </button>
          <button className="relative p-2.5 rounded-xl hover:bg-foreground/5 transition-colors">
            <Mail size={19} className="text-muted-foreground" />
          </button>

          {/* Avatar — now shows real user data */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border/50">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-tight">{fullName}</p>
              <p className="text-xs text-muted-foreground font-[Inter,sans-serif]">{department}</p>
            </div>
            {data?.photo_url ? (
              <img src={data.photo_url} alt={fullName} className="w-9 h-9 rounded-xl object-cover shadow-md" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-sm uppercase">{initials}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;