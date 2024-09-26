import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    updatedSchoolStats: {},
    topStudent: "",
    updatedTeacherStats: {},
  },

  reducers: {
    updateSchoolStats: (state, action) => {
      state.updatedSchoolStats = action.payload;
    },

    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },

    updateTeacherStats: (state, action) => {
      //console.log(action.payload);
      state.updatedTeacherStats = action.payload;
    },
  },
});

export const { updateSchoolStats, setTopStudent, updateTeacherStats } =
  schoolSlice.actions;

export default schoolSlice.reducer;
