import { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import { LuGrid2X2Plus } from "react-icons/lu";
import ProjectInput from "../Components/project/ProjectInput";
import axiosInstance from "../config/axios";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  // Handle the form submission
  const handleCreateProject = async (e) => {
    e.preventDefault();

    const res = await axiosInstance.post(
      "/api/project/create",
      {
        name: projectName,
      },
      { withCredentials: true },
    );
    console.log(res.data.newProject);

    setIsModalOpen(false);
    setProjectName("");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 pb-4 border-b border-slate-200">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, {user?.email || "User"} 👋
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your workspaces and create new projects.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Create New Project Button (Styled as a Card) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center h-48 gap-3 bg-white border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group shadow-sm hover:shadow-md"
          >
            <LuGrid2X2Plus className="text-5xl group-hover:scale-110 transition-transform duration-200" />
            <span className="font-semibold text-lg">New Project</span>
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">
                  Create New Project
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="p-6">
                <div className="mb-6">
                  <ProjectInput
                    label="Enter Project Name"
                    type="text"
                    name="project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter Name of the project"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
