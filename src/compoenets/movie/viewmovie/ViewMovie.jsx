import { useDisclosure } from "@mantine/hooks";
import Button from "../../ui/button/Button";
import classes from "./viewmovie.module.css";
import { Drawer } from "@mantine/core";

function ViewMovie({ movie }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={classes.container}>
      <Button onClick={open} height="30px" value="view" variant="primary" />
      <Drawer
        classNames={{ body: classes.drawer }}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={"lg"}
      >
        <div>
          <div>
            <img
              className={classes.img}
              src={movie?.poster}
              alt="movie-image"
            />
          </div>
          <div>
            <h3 className={classes.key}>
              Name : <span className={classes.value}>{movie.name}</span>
            </h3>
            <h3 className={classes.key}>
              Year : <span className={classes.value}>{movie.year}</span>
            </h3>
            <h3 className={classes.key}>
              Plot :{" "}
              <span
                style={{ fontWeight: "lighter", fontSize: "16px" }}
                className={classes.value}
              >
                {movie.plot}
              </span>
            </h3>
          </div>
          <hr />
          <div style={{ marginBottom: "10px" }}>
            <h3 className={classes.key}>Producer</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <img
                className={classes.producerImg}
                src={movie.producer.pic}
                alt="producer-image"
              />
              <h3>{movie.producer.name}</h3>
            </div>
          </div>
          <hr />
          <div>
            <h3 className={classes.key}>Actors</h3>
            <div className={classes.actorsContainer}>
              {movie.actors.map((item) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      className={classes.producerImg}
                      src={item.pic}
                      alt="producer-image"
                    />
                    <h3>{item.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default ViewMovie;
