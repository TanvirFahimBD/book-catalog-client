import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  searchBook: string;
  publishYear: number;
}

const initialState: IBook = {
  searchBook: '',
  publishYear: 2023,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSearchBook: (state, action: PayloadAction<string>) => {
      state.searchBook = action.payload;
    },
    setPublishYear: (state, action: PayloadAction<number>) => {
      state.publishYear = action.payload;
    },
  },
});

export const { setSearchBook, setPublishYear } = bookSlice.actions;
export default bookSlice.reducer;
