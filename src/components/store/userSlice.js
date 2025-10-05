import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../helpers/allFetchForUsers"; // your existing fetchUser function

// Thunk to fetch user data asynchronously
export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetch("/api/protected/users/me");
  
        if (!res.ok) {
          // maybe parse JSON safely
          let errorMsg = `Failed with status ${res.status}`;
          try {
            const errData = await res.json();
            errorMsg = errData.error || errorMsg;
          } catch {
            // fallback if not JSON
          }
          return rejectWithValue(errorMsg);
        }
  
        const data = await res.json();
        return data.user;
      } catch (err) {
        return rejectWithValue("Something went wrong. It could be your internet");
      }
    }
  );
  

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    userLoading: true,
    userError: null,
  },
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.userLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        // state.error = action.error.message;
        state.error = action.payload || action.error.message; 
        state.userLoading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
