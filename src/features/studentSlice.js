import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudentsAsync = createAsyncThunk(
  "fetch/Student",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/students");
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addStudentAsync = createAsyncThunk(
  "add/Student",
  async (dataToAdd) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/students",
        dataToAdd
      );

      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateStudentAsync = createAsyncThunk(
  "update/Student",
  async (dataToUpdate) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/students/${dataToUpdate._id}`,
        dataToUpdate
      );

      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "delete/Student",
  async (studentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/students/${studentId}`
      );

      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const handleSortBy = (state) => {
  if (state.sortBy === "attendance") {
    state.sortedStudents = state.filteredStudents.sort(
      (a, b) => a.attendance - b.attendance
    );
  } else if (state.sortBy === "marks") {
    state.sortedStudents = state.filteredStudents.sort(
      (a, b) => a.marks - b.marks
    );
  } else {
    state.sortedStudents = state.filteredStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
};

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
    filteredStudents: [],
    sortedStudents: [],
  },

  reducers: {
    // filter can't be done seperatly like sorting because it alters exisitng array and works slower than dispatched action.
    setFilter: (state, action) => {
      state.filter = action.payload;

      state.filteredStudents =
        state.filter !== "All"
          ? state.students.filter(
              (student) => student.gender === action.payload
            )
          : state.students;

      handleSortBy(state);
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      handleSortBy(state);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchStudentsAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchStudentsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
      state.filteredStudents = state.students;
      state.sortedStudents = state.filteredStudents;
    });

    builder.addCase(fetchStudentsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(addStudentAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });

    builder.addCase(addStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateStudentAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      state.status = "success";

      const existingStudentIndex = state.students.findIndex(
        (student) => student._id === action.payload._id
      );

      const existingStudent = action.payload;
      state.students[existingStudentIndex] = existingStudent;
    });

    builder.addCase(updateStudentAsync.rejected, (state, action) => {
      state.status = "success";
      state.error = action.error.message;
    });

    builder.addCase(deleteStudentAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.students = state.students.filter(
        (student) => student._id !== action.payload._id
      );
    });

    builder.addCase(deleteStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { setFilter, setSortBy } = studentSlice.actions;

export default studentSlice.reducer;
