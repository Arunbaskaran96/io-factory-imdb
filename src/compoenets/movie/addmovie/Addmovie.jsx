import { useEffect, useRef, useState } from "react";
import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";
import classes from "./addmovie.module.css";
import useDebounce from "../../../hooks/useDebounce";
import Loading from "../../loading/Loading";
import AddProducer from "../../producer/addProducer/AddProducer";
import Pills from "../../pills/Pills";
import AddActor from "../../actor/addActor/AddActor";
import { useNavigate } from "react-router-dom";
import { validMovie } from "../../../utils/validate/movie";
import { FaHandPointUp } from "react-icons/fa";
import TextArea from "../../ui/textArea/TextArea";
import { BASE_URL } from "../../../config";

function Addmovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actorQuery, setActorQuery] = useState("");
  const debounedProducer = useDebounce(searchTerm);
  const [btnLoading, setBtnLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const debouncedActor = useDebounce(actorQuery);
  const [producers, setProducers] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    plot: "",
    producer: "",
    actors: [],
  });
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedActorSet, setSelectedActorSet] = useState(new Set());
  const producerRef = useRef();
  const navigate = useNavigate();

  const handleProducer = (e) => {
    setLoading(true);
    setProducers([]);
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (actorQuery === "") {
      setActors([]);
    } else {
      getActors();
    }
  }, [debouncedActor]);

  const getActors = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `${BASE_URL}/searchActor?name=${debouncedActor}`,
        {
          method: "GET",
          "Content-Type": "application/json",
        }
      );
      const res = await data.json();
      if (res.success === false) {
      } else {
        res.map((item) => {
          if (!selectedActorSet.has(item._id)) {
            setActors((prev) => [...prev, item]);
          }
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      setProducers([]);
    } else {
      getProducer();
    }
  }, [debounedProducer]);

  const getProducer = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `${BASE_URL}/searchProducer?name=${debounedProducer}`,
        {
          method: "GET",
          "Content-Type": "application/json",
        }
      );
      const res = await data.json();
      setProducers(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const producerHandler = (p) => {
    producerRef.current.value = p.name;
    setFormData({ ...formData, producer: p._id });
    setSearchTerm("");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      if (validMovie(formData, setErrors)) {
        setBtnLoading(true);
        const data = await fetch(`${BASE_URL}/addmovie`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const res = await data.json();
        if (res.success === false) {
        } else {
          navigate("/home/movies");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const actorSearchHandler = (e) => {
    setActorQuery(e.target.value);
    setLoading(true);
    setActors([]);
  };

  const actorHandler = (actor) => {
    setSelectedActors((prev) => [...prev, actor]);
    setSelectedActorSet(selectedActorSet.add(actor._id));
    setFormData({ ...formData, actors: [...selectedActorSet] });
    setActorQuery("");
  };

  const removeSelectedActor = (actor) => {
    const updateSelectedActor = selectedActors.filter(
      (item) => item._id != actor._id
    );
    setSelectedActors(updateSelectedActor);
    const updatedSelectedActorSet = new Set(selectedActorSet);
    updatedSelectedActorSet.delete(actor._id);
    setSelectedActorSet(new Set(updatedSelectedActorSet));
    setFormData({ ...formData, actors: [...selectedActorSet] });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.movie}>
        <Input
          onChange={handleChange}
          id="name"
          placeholder="Movie Name"
          type="text"
        />
        {errors.name && (
          <span className={classes.error}>
            {errors.name} <FaHandPointUp />
          </span>
        )}
        <Input
          onChange={handleChange}
          placeholder="Released Year"
          type="number"
          id="year"
        />
        {errors.year && (
          <span className={classes.error}>
            {errors.year} <FaHandPointUp />
          </span>
        )}

        <TextArea
          onChange={handleChange}
          placeholder="Movie Plot"
          type="text"
          height="100px"
          id="plot"
        />
        {errors.plot && (
          <span className={classes.error}>
            {errors.plot} <FaHandPointUp />
          </span>
        )}
        <div className={classes.producerContainer}>
          <Input
            onChange={handleProducer}
            placeholder="Produced By"
            type="text"
            id="producer"
            ref={producerRef}
          />
          {errors.producer && (
            <span className={classes.error}>
              {errors.producer} <FaHandPointUp />
            </span>
          )}
          {searchTerm && (
            <div className={classes.sugesstionContainer}>
              {loading && <Loading />}
              {producers.map((p, i) => {
                return (
                  <div
                    id="producer"
                    onClick={() => producerHandler(p)}
                    className={classes.producer}
                    key={i}
                  >
                    <img
                      className={classes.img}
                      src={p.pic}
                      alt="producer-image"
                    />
                    <h4>{p.name}</h4>
                  </div>
                );
              })}
              {searchTerm && !loading && producers.length === 0 && (
                <div>
                  no producers found
                  <div>
                    <AddProducer
                      producerRef={producerRef}
                      setSearchTerm={setSearchTerm}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={classes.pillsContainer}>
          {selectedActors.length > 0 &&
            selectedActors.map((actor, i) => {
              return (
                <Pills
                  removeSelectedActor={() => removeSelectedActor(actor)}
                  key={i}
                  name={actor.name}
                />
              );
            })}
        </div>
        <div className={classes.actorContainer}>
          <Input
            onChange={actorSearchHandler}
            placeholder="Actors"
            type="text"
            originalValue={actorQuery}
          />
          {errors.actors && (
            <span className={classes.error}>
              {errors.actors} <FaHandPointUp />
            </span>
          )}
          {actorQuery && (
            <div className={classes.sugesstionContainer}>
              {loading && <Loading />}
              {actors.map((p, i) => {
                return (
                  !selectedActorSet.has(p._id) && (
                    <div
                      id="producer"
                      onClick={() => actorHandler(p)}
                      className={classes.producer}
                      key={i}
                    >
                      <img
                        className={classes.img}
                        src={p.pic}
                        alt="producer-image"
                      />
                      <h4>{p.name}</h4>
                    </div>
                  )
                );
              })}
              {actorQuery && !loading && actors.length === 0 && (
                <div>
                  no actors found
                  <div>
                    <AddActor setActorQuery={setActorQuery} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <Button
          disabled={btnLoading}
          value={btnLoading ? <Loading /> : "submit"}
          variant="primary"
        />
      </form>
    </div>
  );
}

export default Addmovie;
