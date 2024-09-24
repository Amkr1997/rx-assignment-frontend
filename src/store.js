import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./features/studentSlice";
import schoolSlice from "./features/schoolSlice";
import teachersSlice from "./features/teachersSlice";

const store = configureStore({
  reducer: {
    students: studentSlice,
    school: schoolSlice,
    teachers: teachersSlice,
  },
});

export default store;
