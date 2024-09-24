import { Link } from "react-router-dom";

const StudentList = ({ students }) => {
  return (
    <>
      <ul>
        {students.length > 0 &&
          students?.map((student) => {
            return (
              <li key={student._id}>
                <Link to={`/studentDetails/${student._id}`}>
                  {student.name} (Age: {student.age})
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default StudentList;
