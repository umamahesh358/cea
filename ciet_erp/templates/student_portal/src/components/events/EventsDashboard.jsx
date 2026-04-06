import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, MapPin, Users, Star, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { createEvent, deleteEvent } from "@/lib/api";

const achievements = [
  { title: "Code Jam Winner '25", badge: "🥇", desc: "1st Place, Fall Hackathon" },
  { title: "Best UI Award", badge: "🎨", desc: "Spring Design Sprint" },
  { title: "150+ Hours Volunteered", badge: "🤝", desc: "Campus Community Service" },
];

const EventCard = ({ event, index, onDelete, isDeleting }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}
      className="perspective-1000 cursor-pointer h-[200px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative h-full" style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 card-elevated p-5 flex flex-col justify-between" style={{ backfaceVisibility: "hidden" }}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-primary/10 text-primary border-0 text-[10px] font-bold uppercase tracking-wider">{event.scope}</Badge>
              <Button
                variant="ghost" size="icon"
                onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
                disabled={isDeleting}
                className="h-6 w-6 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all z-10"
              >
                <X size={12} />
              </Button>
            </div>
            <h3 className="text-base font-bold text-foreground mb-1 line-clamp-1">{event.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CalendarDays size={12} /> {event.event_date || 'N/A'}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Star size={12} /> {event.role}
            </span>
            <span className="text-[10px] text-muted-foreground/60" onClick={() => setFlipped(true)}>Click to flip →</span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 card-elevated p-5 flex flex-col justify-between" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div onClick={() => setFlipped(false)}>
            <h3 className="text-base font-bold text-foreground mb-3">Details</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} className="text-primary shrink-0" /> {event.location || 'College'}
              </p>
              {event.organizer && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Users size={14} className="text-warning shrink-0" /> {event.organizer}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const EventsDashboard = () => {
  const { data, isLoading } = useStudentProfile();
  const queryClient = useQueryClient();
  const events = data?.events || [];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", scope: "campus", role: "participant", position: "", organizer: "", location: "", event_date: "",
  });

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["studentProfile"]);
      setDrawerOpen(false);
      setForm({ name: "", scope: "campus", role: "participant", position: "", organizer: "", location: "", event_date: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => queryClient.invalidateQueries(["studentProfile"]),
  });

  const handleSave = () => {
    const payload = { ...form };
    if (!payload.event_date) payload.event_date = null;
    mutation.mutate(payload);
  };

  if (isLoading) return <div className="space-y-4 animate-pulse"><div className="h-10 bg-white/5 w-1/3 rounded-xl" /><div className="h-32 bg-white/5 w-full rounded-2xl" /></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <CalendarDays size={24} className="text-primary" /> Campus Events
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              "Your extracurriculars prove leadership and cultural fit to recruiters."
            </p>
          </div>
          <Button onClick={() => setDrawerOpen(true)} className="gap-2">
            <Plus size={16} /> Add Event
          </Button>
        </div>
      </motion.div>

      {/* Achievements */}
      <div>
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Your Achievements</p>
        <div className="grid grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.1 }} className="card-elevated p-5 text-center group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 40%, hsla(40,95%,48%,0.12) 50%, transparent 60%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
              <span className="text-3xl">{a.badge}</span>
              <p className="text-sm font-bold text-foreground mt-2">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div>
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Event Participation</p>
        {events.length === 0 ? (
          <div className="card-elevated p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-2xl mb-4">
              <CalendarDays size={28} className="text-primary" />
            </div>
            <h3 className="font-bold text-foreground">No events recorded</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Add your participation in hackathons, workshops, or clubs.</p>
            <Button onClick={() => setDrawerOpen(true)} className="gap-2">
              <Plus size={16} /> Add Event
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {events.map((event, i) => <EventCard key={event.id} event={event} index={i} onDelete={deleteMutation.mutate} isDeleting={deleteMutation.isPending} />)}
          </div>
        )}
      </div>

      {/* Add Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40" onClick={() => setDrawerOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-50 overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-foreground">Add Event Participation</h2>
                <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}><X size={18} /></Button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Event Name</label>
                  <Input placeholder="e.g. Spring Hackathon 2026" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Scope</label>
                    <Select value={form.scope} onValueChange={(v) => setForm({ ...form, scope: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="campus">Campus</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Role</label>
                    <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="participant">Participant</SelectItem>
                        <SelectItem value="winner">Winner</SelectItem>
                        <SelectItem value="organizer">Organizer</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Position (Optional)</label>
                  <Input placeholder="e.g. 1st Place, Head Coordinator" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Organizer</label>
                  <Input placeholder="e.g. CSE Department, IEEE" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Location</label>
                  <Input placeholder="e.g. Main Auditorium" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Event Date</label>
                  <Input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
                </div>
                {mutation.isError && <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">Failed to save. Please try again.</p>}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={handleSave} disabled={mutation.isPending || !form.name}>Save Event</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsDashboard;