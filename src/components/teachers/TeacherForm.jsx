import { useState } from "react";
import Nav from "../Nav";
import { useDispatch } from "react-redux";
import { addAsyncTeacher } from "../../features/teachersSlice";

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    subject: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  const handleDeletion = (e) => {
    e.preventDefault();

    const newTeacher = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      subject: formData.subject,
    };

    dispatch(addAsyncTeacher(newTeacher));

    setFormData({
      name: "",
      age: "",
      gender: "",
      subject: "",
    });
  };

  return (
    <>
      <Nav />

      <section className="container py-3">
        <h1 className="py-2">Add Teacher</h1>

        <form onSubmit={handleDeletion}>
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
          <label>Gender: </label>
          <input
            type="radio"
            className="ms-2"
            value={"male"}
            name="gender"
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            className="ms-2"
            value={"female"}
            name="gender"
            onChange={handleChange}
          />
          Female
          <br />
          <br />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <br />
          <br />
          <button type="submit">ADD</button>
        </form>
      </section>
    </>
  );
};

export default TeacherForm;
