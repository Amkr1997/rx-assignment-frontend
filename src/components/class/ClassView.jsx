import { useEffect } from "react";
import Nav from "../Nav";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentsAsync,
  setFilter,
  setSortBy,
} from "../../features/studentSlice";

const ClassView = () => {
  const { filteredStudents, sortedStudents } = useSelector(
    (state) => state.students
  );
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    const { value } = e.target;

    dispatch(setFilter(value));
  };

  const handleSort = (e) => {
    const { value } = e.target;

    dispatch(setSortBy(value));
  };

  useEffect(() => {
    dispatch(fetchStudentsAsync());
  }, []);

  return (
    <>
      <Nav />

      <section className="container py-4">
        <h1 className="py-2">Class View</h1>

        <label>Filter by Gender:</label>
        <select className="w-10 ms-2" onChange={handleFilter}>
          <option value="All">All</option>
          <option value="male">Boys</option>
          <option value="female">Girls</option>
        </select>
        <br />
        <br />
        <label>Sort by:</label>
        <select className="w-10 ms-2" onChange={handleSort}>
          <option value="name">Name</option>
          <option value="marks">Marks</option>
          <option value="attendance">Attendance</option>
        </select>

        <ul className="py-3">
          {sortedStudents?.length > 0 &&
            sortedStudents?.map((student) => {
              return (
                <li key={student._id} className="fw-medium">
                  {student.name.toUpperCase()} - {student.gender} -
                  {student.marks
                    ? ` Marks: ${student.marks}`
                    : "Update marks please"}{" "}
                  -
                  {student.attendance
                    ? ` Attendance: ${student.attendance}`
                    : "Update attendance please"}
                </li>
              );
            })}
        </ul>
      </section>
    </>
  );
};

export default ClassView;
