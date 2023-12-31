import { configureStore } from "@reduxjs/toolkit";
import { OpenModal, OpenModalReducer } from "./redux/features/openModal";

export const reducer =  {
  [OpenModal.name]: OpenModalReducer
}

export const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => 
  // getDefaultMiddleware().concat()
})

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default { store };