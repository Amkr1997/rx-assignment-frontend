import { useEffect } from "react";
import Nav from "../Nav";
import { useDispatch, useSelector } from "react-redux";
import {
  setTopStudent,
  updateSchoolStats,
  updateTeacherStats,
} from "../../features/schoolSlice";
import { fetchStudentsAsync } from "../../features/studentSlice";
import { fetchAsyncTeachers } from "../../features/teachersSlice";
import Loading from "../Loading";

const SchoolView = () => {
  const { students } = useSelector((state) => state.students);
  const { updatedSchoolStats, topStudent, updatedTeacherStats } = useSelector(
    (state) => state.school
  );
  const { teachers, status, error } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();

  const handleStudentStats = () => {
    if (students.length > 0) {
      const totalNoOfStud = students.length;
      const attendanceSum = students.reduce((acc, curr) => {
        acc += curr.attendance;
        return acc;
      }, 0);
      const marksSum = students.reduce((acc, curr) => {
        acc += curr.marks;
        return acc;
      }, 0);
      const topPerformerMarks = Math.max(
        ...students.map((student) => student.marks)
      );

      const studentStats = {
        totalStudents: totalNoOfStud,
        averageAttendance: attendanceSum / students.length,
        averageMarks: marksSum / students.length,
      };

      const topPerformerStudent = students.find(
        (student) => student.marks === topPerformerMarks
      );

      dispatch(updateSchoolStats(studentStats));
      dispatch(setTopStudent(topPerformerStudent));
    }

    if (teachers?.teachers?.length > 0) {
      const totalNoOfTeacher = teachers.teachers.length;
      const totalSubjects = teachers.teachers.map((teacher) => teacher.subject);

      const teacherStats = {
        allTeachers: totalNoOfTeacher,
        allSubjects: totalSubjects.join(", "),
      };

      dispatch(updateTeacherStats(teacherStats));
    }
  };

  useEffect(() => {
    dispatch(fetchStudentsAsync());
    dispatch(fetchAsyncTeachers());
  }, []);

  useEffect(() => {
    handleStudentStats();
  }, [students, teachers]);

  return (
    <>
      <Nav />
      {error === "error" && <p>{error}</p>}

      {status === "loading" ? (
        <Loading />
      ) : (
        teachers?.teachers?.length > 0 && (
          <section className="container py-3">
            <h1 className="py-2">School View</h1>
            <p>
              Total Students:{" "}
              {updatedSchoolStats?.totalStudents || "Loading..."}
            </p>
            <p>
              Average Attendance:{" "}
              {updatedSchoolStats?.averageAttendance?.toFixed(2) ||
                "Loading..."}
            </p>
            <p>
              Average Marks:{" "}
              {updatedSchoolStats?.averageMarks?.toFixed(2) || "Loading..."}
            </p>
            <p>Top Student: {topStudent?.name || "Loading..."}</p>
            <p>
              Total Teachers: {updatedTeacherStats?.allTeachers || "Loading..."}
            </p>
            <p>
              Total Subjects Taught:{" "}
              {updatedTeacherStats?.allSubjects?.toLowerCase() || "Loading..."}
            </p>
          </section>
        )
      )}
    </>
  );
};

export default SchoolView;
