import { useDisclosure } from "@mantine/hooks";
import Button from "../../compoenets/ui/button/Button";
import classes from "./producer.module.css";
import AddProducer from "../../compoenets/producer/addProducer/AddProducer";
import {
  fetchProducers,
  producerSelector,
} from "../../redux/slices/producerSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ViewBtn from "../../compoenets/actor/viewBtn/ViewBtn";
import { Link } from "react-router-dom";
import Loading from "../../compoenets/loading/Loading";

function Producers() {
  const [opened, { open, close }] = useDisclosure(false);
  const { status, error, producers } = producerSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducers());
  }, []);

  return (
    <div>
      <div className={classes.newBtnContainer}>
        <AddProducer />
      </div>
      {status === true && <Loading />}
      <div className={classes.container}>
        {producers &&
          producers.map((producer, index) => {
            return (
              <div key={index} className={classes.actorContainer}>
                <div>
                  <img
                    className={classes.img}
                    src={producer.pic}
                    alt="actor-image"
                  />
                </div>
                <div>
                  <h2>
                    <span style={{ color: "#b68d08" }}>Name :</span>{" "}
                    {producer.name}
                  </h2>
                  <h2>
                    <span style={{ color: "#b68d08" }}>Gender :</span>
                    {producer.gender}
                  </h2>
                  <h2>
                    <span style={{ color: "#b68d08" }}>DOB :</span>
                    {producer.dob}
                  </h2>
                  <p>
                    <span style={{ color: "#b68d08", fontWeight: "bolder" }}>
                      Bio :
                    </span>
                    {producer.bio}
                  </p>
                  <div className={classes.btnContainer}>
                    <ViewBtn key={index} actor={producer} />
                    <Link to={`/layout/editProducer/${producer._id}`}>
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

export default Producers;
