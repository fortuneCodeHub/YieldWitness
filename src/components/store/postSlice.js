import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPosts } from "../helpers/allFetchForPosts";

// Fetch posts (initial load)
export const getPosts = createAsyncThunk("posts/getPosts", 
    async (_, { rejectWithValue } ) => {
        try {
            const res = await fetch('/api/protected/posts/all')

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
            return data.posts;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong. It could be your internet")
        }
    }
);

// Fetch posts (initial frontend load)
export const getFrontendPosts = createAsyncThunk("posts/getPosts", 
    async (_, { rejectWithValue } ) => {
        try {
            const res = await fetch('/api/auth/posts/')

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
            return data.posts;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong. It could be your internet")
        }
    }
);



// Add new post
export const addPost = createAsyncThunk(
    "posts/addPost",
    async (newPost, { rejectWithValue }) => {
      try {
        const res = await fetch("/api/protected/posts/new", {
          method: "POST",
        //   headers: { "Content-Type": "application/json" },
          body: newPost,
        });
  
        if (!res.ok) {
          let msg = `Failed with status ${res.status}`;
          try {
            const errData = await res.json();
            msg = errData.message || msg;
          } catch {}
          return rejectWithValue(msg);
        }
  
        const data = await res.json();
        return data.post;
      } catch (err) {
        return rejectWithValue(err.message || "Something went wrong. It could be your internet");
      }
    }
);
  
// Update existing post
export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({ id, updates }, { rejectWithValue }) => {
        console.log(id);
        console.log(updates);
        try {
            const res = await fetch(`/api/protected/posts/${id}`, {
                method: "PATCH",
                // headers: { "Content-Type": "application/json" },
                body: updates,
            });

            if (!res.ok) {
                let msg = `Failed with status ${res.status}`;
                try {
                    const errData = await res.json();
                    msg = errData.message || msg;
                } catch {}
                return rejectWithValue(msg);
            }

            const data = await res.json();
            return data.post;
        } catch (err) {
            return rejectWithValue(err.message || "Something went wrong. It could be your internet");
        }
    }
);
  
// Delete post
export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/protected/posts/${id}`, { method: "DELETE" });

            if (!res.ok) {
                let msg = `Failed with status ${res.status}`;
                try {
                    const errData = await res.json();
                    msg = errData.message || msg;
                } catch {}
                return rejectWithValue(msg);
            }

            return { success: true, id };
        } catch (err) {
            return rejectWithValue(err.message || "Something went wrong. It could be your internet");
        }
    }
);


// Post Slice 
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    postLoading: true,
    postError: null,
  },
  reducers: {
    // Purely local remove (no API call)
    removePost: (state, action) => {
      state.data = state.data.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getPosts.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.postLoading = false;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.postLoading = false;
      })

      // addPost
      .addCase(addPost.fulfilled, (state, action) => {
        state.data.unshift(action.payload); // insert new one at top
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.payload || action.error.message
      })

      // updatePost
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload; // replace with updated post
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.payload || action.error.message
      })

      // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.data = state.data.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload || action.error.message
      })
  },
});

// export the postReducer
export const { removePost } = postsSlice.actions;
export default postsSlice.reducer;
