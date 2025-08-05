import { configureStore } from "@reduxjs/toolkit";

import booksReducer from "../bookslice/bookslice";

const store = configureStore({
  reducer: {
    main: booksReducer,
  },
});

export default store;
