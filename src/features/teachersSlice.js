import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncTeachers = createAsyncThunk(
  "fetch/Teachers",
  async () => {
    try {
      const response = await axios.get(
        `https://rx-assignment-backend.vercel.app/teachers`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addAsyncTeacher = createAsyncThunk(
  "add/Teacher",
  async (dataToAdd) => {
    try {
      const response = await axios.post(
        `https://rx-assignment-backend.vercel.app/teachers`,
        dataToAdd
      );

      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAsyncTeacher = createAsyncThunk(
  "fetch/Teacher",
  async (teacherId) => {
    try {
      const response = await axios.delete(
        `https://rx-assignment-backend.vercel.app/teachers/${teacherId}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAsyncTeachers.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchAsyncTeachers.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    });

    builder.addCase(fetchAsyncTeachers.rejected, (state, action) => {
      state.status = "pending";
      state.error = action.error.message;
    });

    builder.addCase(deleteAsyncTeacher.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteAsyncTeacher.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = state.teachers.teachers.filter(
        (teacher) => teacher._id !== action.payload._id
      );
    });

    builder.addCase(deleteAsyncTeacher.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default teacherSlice.reducer;
