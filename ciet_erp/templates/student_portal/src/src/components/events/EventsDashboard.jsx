import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Users, Star, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const upcomingEvents = [{
  id: 1,
  title: "Spring Code Jam 2026",
  date: "April 15, 2026",
  location: "Main Auditorium",
  type: "hackathon",
  attendees: 120,
  daysUntil: 3
}, {
  id: 2,
  title: "Resume Workshop with HR",
  date: "April 22, 2026",
  location: "Seminar Hall B",
  type: "workshop",
  speakers: "Priya Sharma, Google",
  attendees: 45,
  daysUntil: 10
}, {
  id: 3,
  title: "AI/ML Community Meetup",
  date: "April 28, 2026",
  location: "Lab 301",
  type: "meetup",
  attendees: 32,
  daysUntil: 16
}];
const achievements = [{
  title: "Code Jam Winner '25",
  badge: "🥇",
  desc: "1st Place, Fall Hackathon"
}, {
  title: "Best UI Award",
  badge: "🎨",
  desc: "Spring Design Sprint"
}, {
  title: "150+ Hours Volunteered",
  badge: "🤝",
  desc: "Campus Community Service"
}];
const typeColors = {
  hackathon: "bg-primary/10 text-primary",
  workshop: "bg-warning/10 text-warning",
  meetup: "bg-accent/10 text-accent"
};
const EventCard = ({
  event,
  index
}) => {
  const [flipped, setFlipped] = useState(false);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.3 + index * 0.1
  }} className="perspective-1000 cursor-pointer" onClick={() => setFlipped(!flipped)}>
      <motion.div animate={{
      rotateY: flipped ? 180 : 0
    }} transition={{
      duration: 0.5,
      type: "spring",
      stiffness: 200
    }} className="relative h-[200px]" style={{
      transformStyle: "preserve-3d"
    }}>
        {/* Front */}
        <div className="absolute inset-0 card-elevated p-5 flex flex-col justify-between" style={{
        backfaceVisibility: "hidden"
      }}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge className={`${typeColors[event.type]} border-0 text-[10px] font-bold uppercase tracking-wider`}>
                {event.type}
              </Badge>
              {event.daysUntil <= 7 && <div className="flex items-center gap-1 text-xs text-primary font-semibold animate-pulse">
                  <Clock size={12} /> {event.daysUntil}d left
                </div>}
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">{event.title}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CalendarDays size={12} /> {event.date}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Users size={12} /> {event.attendees} attending
            </span>
            <span className="text-[10px] text-muted-foreground/60">Click to flip →</span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 card-elevated p-5 flex flex-col justify-between" style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)"
      }}>
          <div>
            <h3 className="text-base font-bold text-foreground mb-3">Details</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} className="text-primary shrink-0" /> {event.location}
              </p>
              {event.speakers && <p className="flex items-center gap-2 text-muted-foreground">
                  <Star size={14} className="text-warning shrink-0" /> {event.speakers}
                </p>}
              <p className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays size={14} className="text-accent shrink-0" /> {event.date}
              </p>
            </div>
          </div>
          <button className="w-full bg-primary text-primary-foreground py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
            RSVP Now
          </button>
        </div>
      </motion.div>
    </motion.div>;
};
const EventsDashboard = () => {
  return <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <CalendarDays size={24} className="text-primary" /> Campus Events
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              "Your extracurriculars prove leadership and cultural fit to recruiters."
            </p>
          </div>
          <button className="pulse-cta flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus size={16} /> Create Event
          </button>
        </div>
      </motion.div>

      {/* Achievements */}
      <div>
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Your Achievements</p>
        <div className="grid grid-cols-3 gap-4">
          {achievements.map((a, i) => <motion.div key={a.title} initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.1 + i * 0.1
        }} className="card-elevated p-5 text-center group relative overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
            background: "linear-gradient(105deg, transparent 40%, hsla(40,95%,48%,0.12) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite"
          }} />
              <span className="text-3xl">{a.badge}</span>
              <p className="text-sm font-bold text-foreground mt-2">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
            </motion.div>)}
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Campus Radar</p>
        <div className="grid grid-cols-3 gap-4">
          {upcomingEvents.map((event, i) => <EventCard key={event.id} event={event} index={i} />)}
        </div>
      </div>
    </div>;
};
export default EventsDashboard;