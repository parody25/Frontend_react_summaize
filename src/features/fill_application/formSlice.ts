import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../components/CreditApplication/types';

const initialState: FormData = {
  borrowerName: "",
  registrationNumber: "",
  borrowerType: "",
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormField(state, action: PayloadAction<{field: keyof FormData; value: string}>) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm(state) {
      state.borrowerName = "";
      state.registrationNumber = "";
      state.borrowerType = "";
    },
  },
});

export const { updateFormField, resetForm } = formSlice.actions;
export default formSlice.reducer;