import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import ProjectsDashboard from "@/components/projects/ProjectsDashboard";
const Projects = () => <div className="min-h-screen">
    <Sidebar />
    <div className="ml-64">
      <Navbar />
      <main className="p-8 space-y-6 max-w-[1200px]">
        <ProjectsDashboard />
      </main>
    </div>
  </div>;
export default Projects;