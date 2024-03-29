import React from "react";
import Signin from "./Pages/signin/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Topbar from "./compoenets/topbar/Topbar";
import Actors from "./Pages/actor/Actors";
import Movies from "./Pages/movies/Movies";
import Producers from "./Pages/producers/Producers";
import { ThemeProvider } from "./context/themeContext";
import { MantineProvider } from "@mantine/core";
import ViewMovie from "./compoenets/movie/viewmovie/ViewMovie";
import Addmovie from "./compoenets/movie/addmovie/Addmovie";
import MovieLayout from "./compoenets/movie/movieLayout/MovieLayout";
import EditActor from "./compoenets/actor/editActor/EditActor";
import EditProducer from "./compoenets/producer/editProducer/EditProducer";
import EditMovie from "./compoenets/movie/editMovie/EditMovie";
import Signup from "./Pages/signup/Signup";

export default function App() {
  return (
    <MantineProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<Topbar />} />
            <Route path="/home" element={<Home />}>
              <Route path="actors" element={<Actors />} />
              <Route path="movies" element={<Movies />} />
              <Route path="producers" element={<Producers />} />
              <Route path="viewmovie" element={<ViewMovie />} />
            </Route>
            <Route path="/layout" element={<MovieLayout />}>
              <Route path="addmovie" element={<Addmovie />} />
              <Route path="editActor/:id" element={<EditActor />} />
              <Route path="editProducer/:id" element={<EditProducer />} />
              <Route path="editMovie/:id" element={<EditMovie />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </MantineProvider>
  );
}
