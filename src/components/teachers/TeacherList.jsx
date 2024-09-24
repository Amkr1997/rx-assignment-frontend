import { Link } from "react-router-dom";

const TeacherList = ({ teachers }) => {
  return (
    <>
      <ul>
        {teachers?.teachers?.length > 0 &&
          teachers?.teachers?.map((teacher) => {
            return (
              <li key={teacher._id}>
                <Link to={`/teachersDetails/${teacher._id}`}>
                  {teacher.name} (Age: {teacher.age})
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default TeacherList;
