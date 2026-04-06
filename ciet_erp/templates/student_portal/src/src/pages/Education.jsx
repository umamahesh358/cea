import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import EducationTimeline from "@/components/education/EducationTimeline";
const Education = () => {
  return <div className="min-h-screen">
      <Sidebar />
      <div className="ml-64">
        <Navbar />
        <main className="p-8 space-y-6 max-w-[1200px]">
          <EducationTimeline />
        </main>
      </div>
    </div>;
};
export default Education;