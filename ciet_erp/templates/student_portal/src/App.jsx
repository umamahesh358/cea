import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.jsx";
import Education from "./pages/Education.jsx";
import Transcript from "./pages/Transcript.jsx";
import Certifications from "./pages/Certifications.jsx";
import Cohorts from "./pages/Cohorts.jsx";
import Events from "./pages/Events.jsx";
import Internships from "./pages/Internships.jsx";
import Projects from "./pages/Projects.jsx";
import Research from "./pages/Research.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* basename="/student/portal" maps React routes under the Django portal URL */}
      <BrowserRouter basename="/student/portal">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/education" element={<Education />} />
          <Route path="/transcript" element={<Transcript />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/research" element={<Research />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;