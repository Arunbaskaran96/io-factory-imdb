import { configureStore } from "@reduxjs/toolkit";
import actorSlice from "../slices/actorSlice";
import movieSlice from "../slices/movieSlice";
import producerSlice from "../slices/producerSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    actor: actorSlice,
    movie: movieSlice,
    producer: producerSlice,
    user: userSlice,
  },
});

export default store;
