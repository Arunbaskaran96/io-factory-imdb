import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config";

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async () => {
  const data = await fetch(`${BASE_URL}/getmovies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();
  return res;
});

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    status: false,
    movies: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        (state.status = true), (state.movies = []);
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        (state.status = false),
          (state.movies = action.payload),
          (state.error = null);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        (state.status = false),
          (state.movies = []),
          (state.error = action.payload.message);
      });
  },
});

export const movieSelector = () => useSelector((state) => state.movie);
export const getMovie = (state, id) => {
  return state.movie.movies.find((item) => item._id === id);
};

export default movieSlice.reducer;
