import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config";

export const fetchActors = createAsyncThunk("actor/fetchActors", async () => {
  const data = await fetch(`${BASE_URL}/getactors`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const res = await data.json();
  return res;
});

export const addActor = createAsyncThunk("actor/addActor", async (formData) => {
  const data = await fetch(`${BASE_URL}/addactor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const res = await data.json();
  return res;
});

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    actors: [],
    status: false,
    error: null,
    addedSuccessfully: false,
  },
  reducers: {
    editActor: (state, action) => {
      const actors = state.actors.filter(
        (item) => item._id != action.payload._id
      );
      state.actors = [...actors, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActors.pending, (state, action) => {
      (state.status = true), (state.actors = []), (state.error = null);
    });
    builder.addCase(fetchActors.fulfilled, (state, action) => {
      state.status = false;
      state.actors = action.payload;
      state.error = null;
    });
    builder.addCase(fetchActors.rejected, (state, action) => {
      (state.status = false), (state.actors = []);
      state.error = action.payload.message;
    });

    builder
      .addCase(addActor.pending, (state) => {
        (state.status = true), (state.actors = [...state.actors]);
        state.error = null;
        state.addedSuccessfully = false;
      })
      .addCase(addActor.fulfilled, (state, action) => {
        state.status = false;
        state.actors = [...state.actors, action.payload];
        state.addedSuccessfully = true;
        state.error = null;
      })
      .addCase(addActor.rejected, (state, action) => {
        state.status = false;
        state.actors = [...state.actors];
        state.error = action.payload.message;
      });
  },
});

export const getActor = (state, id) => {
  const actor = state.actor.actors.find((item) => item._id === id);
  return actor;
};
export const actorSelector = () => useSelector((state) => state.actor);

export const { editActor } = actorSlice.actions;
export default actorSlice.reducer;
