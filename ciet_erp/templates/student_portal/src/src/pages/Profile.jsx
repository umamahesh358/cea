import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import ProfileDashboard from "@/components/profile/ProfileDashboard";

const Profile = () => (
  <div className="min-h-screen">
    <Sidebar />
    <div className="ml-64">
      <Navbar />
      <main className="p-8 space-y-6 max-w-[1200px]">
        <ProfileDashboard />
      </main>
    </div>
  </div>
);

export default Profile;