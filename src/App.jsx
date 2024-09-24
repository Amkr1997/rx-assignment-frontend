import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentsView from "./components/students/StudentsView";
import SchoolView from "./components/school/SchoolView";
import ClassView from "./components/class/ClassView";
import StudentForm from "./components/students/StudentForm";
import StudentDetails from "./components/students/StudentDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import TeachersView from "./components/teachers/TeachersView";
import TeacherForm from "./components/teachers/TeacherForm";
import TeachersDetails from "./components/teachers/TeachersDetails";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="" element={<StudentsView />} />
            <Route path="studentForm" element={<StudentForm />} />
            <Route path="studentDetails/:id" element={<StudentDetails />} />
            <Route path="classView" element={<ClassView />} />
            <Route path="schoolView" element={<SchoolView />} />
            <Route path="teachersView" element={<TeachersView />} />
            <Route path="teacherForm" element={<TeacherForm />} />
            <Route path="teachersDetails/:id" element={<TeachersDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
