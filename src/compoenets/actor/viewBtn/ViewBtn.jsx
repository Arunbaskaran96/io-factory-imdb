import classes from "./viewbtn.module.css";
import Button from "../../ui/button/Button";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function ViewBtn({ actor }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className={classes.mainContainer}>
      <Button onClick={open} height="30px" value="View" variant="primary" />
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        size={"lg"}
        classNames={{
          body: classes.modal,
        }}
      >
        <div className={classes.container}>
          <div>
            <img className={classes.img} src={actor.pic} alt="profilepicture" />
          </div>
          <div>
            <h1>
              <span style={{ color: "#b68d08" }}>Name :</span> {actor.name}
            </h1>
            <h3>
              <span style={{ color: "#b68d08" }}>Gender :</span> {actor.gender}
            </h3>
            <h3>
              <span style={{ color: "#b68d08" }}>DOB :</span> {actor.dob}
            </h3>
            <div>
              <span style={{ color: "#b68d08" }}>Bio :</span>
              {actor.bio}
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h3>Movies List</h3>
          <div className={classes.movieContainer}>
            {actor.movies.length > 0 ? (
              actor.movies.map((movie) => {
                return (
                  <div className={classes.movie}>
                    <img
                      className={classes.movieImage}
                      src={movie.poster}
                      alt="movie-image"
                    />
                    <h4>{movie.name}</h4>
                  </div>
                );
              })
            ) : (
              <div>No movie found</div>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default ViewBtn;
