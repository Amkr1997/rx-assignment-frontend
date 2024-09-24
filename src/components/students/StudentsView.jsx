import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsAsync } from "../../features/studentSlice";
import { useEffect } from "react";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import StudentList from "./StudentList";

const StudentsView = () => {
  const { students, status, error } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentsAsync());
  }, []);

  return (
    <>
      <Nav />
      {status === "loading" && (
        <p className="fs-3 text-center mt-5">Loading...</p>
      )}
      {error === "error" && <p>{error}</p>}
      <section className="container py-3">
        <h1 className="py-3">Student View</h1>
        <Link
          to={"/studentForm"}
          className="btn btn-warning btn-sm text-danger fw-medium px-3"
        >
          Add Student
        </Link>

        <h2 className="pt-3">Student List</h2>
        <StudentList students={students} />
      </section>
    </>
  );
};

export default StudentsView;
