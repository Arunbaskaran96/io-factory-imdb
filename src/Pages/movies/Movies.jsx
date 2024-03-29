import { Link } from "react-router-dom";
import Button from "../../compoenets/ui/button/Button";
import classes from "./movie.module.css";
import { fetchMovies, movieSelector } from "../../redux/slices/movieSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ViewMovie from "../../compoenets/movie/viewmovie/ViewMovie";
import Loading from "../../compoenets/loading/Loading";

function Movies() {
  const { status, movies, error } = movieSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  return (
    <div>
      <div className={classes.newBtnContainer}>
        <Link to="/layout/addmovie">
          <Button value="Add Movie" variant="primary" />
        </Link>
      </div>
      {status === true && <Loading />}
      <div className={classes.movieContainer}>
        {movies &&
          movies.map((movie, index) => {
            return (
              <div key={index} className={classes.movie}>
                <div>
                  <img
                    className={classes.img}
                    src={movie.poster}
                    alt="movie-image"
                  />
                </div>
                <div>
                  <h2>
                    <span style={{ color: "#b68d08" }}>Name : </span>
                    {movie.name}
                  </h2>
                  <h2>
                    <span style={{ color: "#b68d08" }}>Producer : </span>
                    {movie.producer.name}
                  </h2>
                  <h2>
                    <span style={{ color: "#b68d08" }}>Year : </span>
                    {movie.year}
                  </h2>
                  <p>
                    <span style={{ color: "#b68d08" }}>Year : </span>
                    {movie.plot}
                  </p>
                  <div className={classes.btnContainer}>
                    <ViewMovie key={index} movie={movie} />
                    <Link to={`/layout/editMovie/${movie._id}`}>
                      <Button height="30px" value="Edit" variant="secondary" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Movies;
