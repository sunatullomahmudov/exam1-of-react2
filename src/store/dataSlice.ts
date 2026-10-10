import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type DataState = {
  dataRedux: ReduxUser[];
};

const initialState: DataState = {
  dataRedux: [
    { id: 1, status: true, job: "korgar" },
    { id: 2, status: false, job: "Bekor" },
    { id: 3, status: true, job: "Director" },
    { id: 4, status: false, job: "Manager" },
    { id: 5, status: true, job: "transleter" },
    { id: 6, status: false, job: "korgar" },
    { id: 7, status: true, job: "transleter" },
    { id: 8, status: false, job: "korgar" },
  ],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    deleteUserR: (state, action: PayloadAction<number>) => {
      state.dataRedux = state.dataRedux.filter((el) => el.id !== action.payload);
    },
    addUserR: (state, action: PayloadAction) => {
      state.dataRedux = [action.payload, ...state.dataRedux];
    },
    editUserR: (state, action: PayloadAction) => {
      state.dataRedux = state.dataRedux.map((el) =>
        el.id === action.payload.id ? { ...el, ...action.payload } : el,
      );
    },
  },
});

export const { deleteUserR, addUserR, editUserR } = dataSlice.actions;

export default dataSlice.reducer;
