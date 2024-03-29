import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config";

export const fetchProducers = createAsyncThunk(
  "producer/fetchProducers",
  async () => {
    const data = await fetch(`${BASE_URL}/getProducers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    return res;
  }
);

export const addProducer = createAsyncThunk(
  "producer/addProducer",
  async (formData) => {
    const data = await fetch(`${BASE_URL}/addProducer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const res = await data.json();
    return res;
  }
);

const producerSlice = createSlice({
  name: "producer",
  initialState: {
    status: false,
    producers: [],
    error: null,
    addProducerSuccessfully: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.pending, (state, action) => {
        (state.status = true), (state.producers = []);
        state.error = null;
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        (state.status = false),
          (state.producers = action.payload),
          (state.error = null);
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        (state.status = false), (state.producers = []);
        state.error = action.payload.message;
      })
      .addCase(addProducer.pending, (state, action) => {
        (state.status = true),
          (state.producers = [...state.producers]),
          (state.error = null);
        state.addProducerSuccessfully = false;
      })
      .addCase(addProducer.fulfilled, (state, action) => {
        (state.status = false),
          (state.producers = [...state.producers, action.payload]);
        (state.error = null), (state.addProducerSuccessfully = true);
      })
      .addCase(addProducer.rejected, (state, action) => {
        (state.status = false),
          (state.error = action.payload.message),
          (state.producers = [...state.producers]);
        state.addProducerSuccessfully = false;
      });
  },
});

export const producerSelector = () => useSelector((state) => state.producer);
export const getProducer = (state, id) => {
  return state.producer.producers.find((item) => item._id === id);
};

export default producerSlice.reducer;
