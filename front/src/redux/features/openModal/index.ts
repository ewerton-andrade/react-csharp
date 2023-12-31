import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  open: boolean
}

const initialState: InitialState = {
  open: false
}

export const OpenModal = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
})

export const OpenModalReducer = OpenModal.reducer;
export const OpenModalActions = OpenModal.actions;
