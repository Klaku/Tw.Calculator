import { configureStore } from "@reduxjs/toolkit";
import { configurationApi } from "store/hooks/configuration";

export const store = configureStore({
  reducer: {
    [configurationApi.reducerPath]: configurationApi.reducer,
  },
});
