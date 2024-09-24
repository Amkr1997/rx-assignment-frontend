import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav";
import { useEffect } from "react";
import {
  deleteAsyncTeacher,
  fetchAsyncTeachers,
} from "../../features/teachersSlice";
import { useParams } from "react-router-dom";

const TeachersDetails = () => {
  const { teachers, status, error } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const teacherId = useParams();
  const teacherDetails = teachers?.teachers?.find(
    (teacher) => teacher._id === teacherId.id
  );

  useEffect(() => {
    dispatch(fetchAsyncTeachers());
  }, []);

  const handleDelete = () => {
    dispatch(deleteAsyncTeacher(teacherDetails._id));
  };

  return (
    <>
      <Nav />
      {status === "loading" && (
        <p className="fs-3 mt-5 text-center">Loading...</p>
      )}
      {error && <p>{error}</p>}
      <section className="container py-3">
        <h1 className="py-2">Teacher Details</h1>
        <p className="fw-medium">Name: {teacherDetails?.name}</p>
        <p className="fw-medium">Age: {teacherDetails?.age}</p>
        <p className="fw-medium">Gender: {teacherDetails?.gender}</p>
        <p className="fw-medium">Subject: {teacherDetails?.subject}</p>
        <button
          className="btn btn-danger px-4 fw-medium btn-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </section>
    </>
  );
};

export default TeachersDetails;
