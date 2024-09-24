import { useEffect, useState } from "react";
import Nav from "../Nav";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addStudentAsync,
  updateStudentAsync,
} from "../../features/studentSlice";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "",
    attendance: "",
    marks: "",
  });

  const location = useLocation();
  const existingStudent = location.state;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "attendance" || name === "marks" || name === "age"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingStudent) {
      if (
        formData.name &&
        formData.age &&
        formData.gender &&
        formData.grade &&
        formData.attendance &&
        formData.marks
      ) {
        const newStudent = {
          _id: existingStudent._id,
          name: formData.name,
          age: formData.age,
          grade: formData.grade,
          gender: formData.gender,
          attendance: formData.attendance,
          marks: formData.marks,
        };

        dispatch(updateStudentAsync(newStudent));

        setFormData({
          name: "",
          age: "",
          grade: "",
          gender: "",
          attendance: "",
          marks: "",
        });
      }
    } else if (
      formData.name &&
      formData.age &&
      formData.gender &&
      formData.grade
    ) {
      const newStudent = {
        name: formData.name,
        age: formData.age,
        grade: formData.grade,
        gender: formData.gender,
      };

      dispatch(addStudentAsync(newStudent));

      setFormData({
        name: "",
        age: "",
        grade: "",
        gender: "",
      });
    }
  };

  useEffect(() => {
    if (existingStudent) {
      setFormData({
        name: existingStudent.name,
        age: existingStudent.age,
        grade: existingStudent.grade,
        gender: existingStudent.gender,
      });
    }
  }, []);

  return (
    <>
      <Nav />
      <section className="container py-4">
        <h1 className="py-3">
          {existingStudent ? "Edit Student" : "Add Student"}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />
          <br />
          <br />
          <label className="me-2">Gender:</label>
          <input
            type="radio"
            name="gender"
            value={"male"}
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            className="ms-2"
            value={"female"}
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          Female
          <br />
          <br />
          {existingStudent && (
            <>
              {" "}
              <input
                type="number"
                placeholder="attendance"
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
              />
              <br />
              <br />
              <input
                type="number"
                placeholder="marks"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
              />
              <br />
              <br />
            </>
          )}
          <button className={existingStudent ? "btn btn-primary" : ""}>
            {existingStudent ? "Update" : "Add"}
          </button>
        </form>
      </section>
    </>
  );
};

export default StudentForm;
