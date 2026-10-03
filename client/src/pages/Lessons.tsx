import axios from "axios";
import { useEffect } from "react";
import CurriculumSidebar from "../components/CurriculumSidebar";
import LessonMain from "../components/Lessons/LessonMain";
import { useLesson } from "../hooks/useLesson";

const Lessons = () => {
  const { modules, setModules } = useLesson();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/lessons")
      .then((res) => setModules(res.data));
  }, []);

  if (!modules.length)
    return (
      <div className="animate-fade-in">
        <p>Loading Academy Curriculum...</p>
      </div>
    );

  return (
    <div
      className="animate-fade-in"
      style={{ height: "100%", display: "flex", gap: "24px" }}
    >
      {/* Curriculum Sidebar */}
      <CurriculumSidebar />

      {/* Main Content Area */}
      <LessonMain />
    </div>
  );
};

export default Lessons;
