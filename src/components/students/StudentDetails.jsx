import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "../Nav";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentAsync } from "../../features/studentSlice";

const StudentDetails = () => {
  const studentId = useParams();
  const { students } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const foundStudent = students?.find(
    (student) => student._id === studentId.id
  );

  const handleDelete = () => {
    dispatch(deleteStudentAsync(foundStudent._id));
  };

  return (
    <>
      <Nav />
      <section className="container py-4">
        <h1 className="py-2">Student Detail</h1>
        <p className="fw-medium">Name: {foundStudent?.name}</p>
        <p className="fw-medium">Age: {foundStudent?.age}</p>
        <p className="fw-medium">Grade: {foundStudent?.grade}</p>
        {foundStudent?.attendance && foundStudent?.marks && (
          <div>
            <p className="fw-medium">Attendance: {foundStudent?.attendance}</p>
            <p className="fw-medium">Marks: {foundStudent?.marks}</p>
          </div>
        )}
        <Link
          className="btn btn-warning btn-sm px-3 text-danger fw-medium"
          to={"/studentForm"}
          state={foundStudent}
        >
          Edit details
        </Link>
        <Link className="btn btn-danger ms-2 btn-sm" onClick={handleDelete}>
          Delete
        </Link>
      </section>
    </>
  );
};

export default StudentDetails;
