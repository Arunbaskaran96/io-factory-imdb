import Button from "../../compoenets/ui/button/Button";
import classes from "./actor.module.css";
import "@mantine/core/styles.css";
import AddActor from "../../compoenets/actor/addActor/AddActor";
import ViewBtn from "../../compoenets/actor/viewBtn/ViewBtn";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actorSelector, fetchActors } from "../../redux/slices/actorSlice";
import Loading from "../../compoenets/loading/Loading";
import { Link } from "react-router-dom";

function Actors() {
  const dispatch = useDispatch();
  const { status, error, actors } = actorSelector();

  useEffect(() => {
    dispatch(fetchActors());
  }, []);

  return (
    <div>
      <div className={classes.newBtnContainer}>
        <AddActor />
      </div>
      {status && <Loading />}
      <div className={classes.container}>
        {actors &&
          actors.map((actor, index) => {
            return (
              <div key={index} className={classes.actorContainer}>
                <div>
                  <img
                    className={classes.img}
                    src={actor.pic}
                    alt="actor-image"
                  />
                </div>
                <div>
                  <h2>
                    <span style={{ color: "#b68d08" }}>Name :</span>{" "}
                    {actor.name}
                  </h2>
                  <h2>
                    <span style={{ color: "#b68d08" }}>Gender : </span>
                    {actor.gender}
                  </h2>
                  <h2>
                    <span style={{ color: "#b68d08" }}>DOB : </span>
                    {actor.dob}
                  </h2>
                  <p>
                    <span style={{ color: "#b68d08", fontWeight: "bolder" }}>
                      Bio :{" "}
                    </span>
                    {actor.bio}
                  </p>
                  <div className={classes.btnContainer}>
                    <ViewBtn key={index} actor={actor} />
                    <Link to={`/layout/editactor/${actor._id}`}>
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

export default Actors;
