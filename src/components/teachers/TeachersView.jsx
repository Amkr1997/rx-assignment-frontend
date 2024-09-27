import { Link } from "react-router-dom";
import Nav from "../Nav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncTeachers } from "../../features/teachersSlice";
import TeacherList from "./TeacherList";
import Loading from "../Loading";

const TeachersView = () => {
  const { teachers, status, error } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncTeachers());
  }, []);

  return (
    <>
      <Nav />
      {error && <p>{error}</p>}
      {status === "loading" ? (
        <Loading />
      ) : (
        <section className="container py-4">
          <h1 className="pt-2 pb-3">Teachers View</h1>
          <Link
            to={"/teacherForm"}
            className="btn btn-warning btn-sm px-3 text-danger fw-medium"
          >
            Add Teacher
          </Link>

          <h2 className="pb-1 pt-3">Teacher List</h2>
          <TeacherList teachers={teachers} />
        </section>
      )}
    </>
  );
};

export default TeachersView;
