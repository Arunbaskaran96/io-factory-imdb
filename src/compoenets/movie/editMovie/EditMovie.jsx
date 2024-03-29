import { useNavigate, useParams } from "react-router-dom";
import classes from "./editmovie.module.css";
import { useSelector } from "react-redux";
import { getMovie } from "../../../redux/slices/movieSlice";
import { useEffect, useRef, useState } from "react";
import Input from "../../ui/input/Input";
import { FaHandPointUp } from "react-icons/fa";
import useDebounce from "../../../hooks/useDebounce";
import Loading from "../../loading/Loading";
import AddProducer from "../../producer/addProducer/AddProducer";
import Pills from "../../pills/Pills";
import Button from "../../ui/button/Button";
import AddActor from "../../actor/addActor/AddActor";
import { validMovie } from "../../../utils/validate/movie";
import TextArea from "../../ui/textArea/TextArea";
import { BASE_URL } from "../../../config";

function EditMovie() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    plot: "",
    producer: "",
    actors: [],
  });
  const [producerQuery, setProducerQuery] = useState("");
  const debouncedProducer = useDebounce(producerQuery);
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actorQuery, setActorQuery] = useState("");
  const debouncedActor = useDebounce(actorQuery);
  const [actors, setActors] = useState([]);
  const producerRef = useRef();
  const fetchMovie = useSelector((state) => getMovie(state, id));
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedActorsSet, setSelectedActorsSet] = useState(new Set());
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(fetchMovie);
    setSelectedActors(fetchMovie.actors);
  }, [id]);

  useEffect(() => {
    getActorsId();
  }, [selectedActors]);

  const getActorsId = () => {
    const temp = selectedActors.map((item) => item._id);
    const set = new Set(temp);
    setSelectedActorsSet(set);
  };

  useEffect(() => {
    if (producerQuery === "") {
      setProducers([]);
    } else {
      fetchProducers();
    }
  }, [debouncedProducer]);

  const fetchProducers = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `${BASE_URL}/searchProducer?name=${debouncedProducer}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await data.json();
      if (res.success === false) {
      } else {
        setProducers(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (actorQuery === "") {
      setActors([]);
    } else {
      fetchActors();
    }
  }, [debouncedActor]);

  const fetchActors = async () => {
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
          if (!selectedActorsSet.has(item._id)) {
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

  const handleProducer = (e) => {
    setProducerQuery(e.target.value);
    setLoading(true);
    setProducers([]);
  };

  const handleActor = (e) => {
    setActorQuery(e.target.value);
    setLoading(true);
    setActors([]);
  };

  const producerHandler = (p) => {
    producerRef.current.value = p.name;
    setFormData({ ...formData, producer: p });
    setProducerQuery("");
  };

  const actorHandler = (a) => {
    setSelectedActors((prev) => [...prev, a]);
    setSelectedActorsSet(selectedActorsSet.add(a._id));
    setFormData({ ...formData, actors: [...selectedActorsSet] });
    setActorQuery("");
  };
  const removeSelectedActor = (actor) => {
    setSelectedActors(selectedActors.filter((item) => item._id != actor._id));
    let set = new Set(selectedActors.map((item) => item._id));
    set.delete(actor._id);
    setSelectedActorsSet(set);
    setFormData({ ...formData, actors: [...set] });
  };

  const handleSunmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      if (validMovie(formData, setErrors)) {
        const data = await fetch(`${BASE_URL}/editmovie/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            producer: formData.producer?._id,
          }),
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    formData && (
      <form onSubmit={handleSunmit} className={classes.container}>
        <div className={classes.left}>
          <img className={classes.img} src={formData.poster} alt="movie-img" />
        </div>
        <div className={classes.right}>
          <label>Movie Name</label>
          <Input
            type="text"
            placeholder="name"
            originalValue={formData.name}
            id="name"
            onChange={handleChange}
          />
          {errors.name && (
            <span className={classes.name}>
              {errors.name} <FaHandPointUp />
            </span>
          )}
          <br />
          <label>Released Year</label>
          <Input
            type="number"
            placeholder="Released year"
            originalValue={formData.year}
            id="year"
            onChange={handleChange}
          />
          {errors.year && (
            <span className={classes.name}>
              {errors.year} <FaHandPointUp />
            </span>
          )}
          <br />
          <label>Plot</label>
          <TextArea
            onChange={handleChange}
            className={classes.bio}
            defaultValue={formData.plot}
            id="plot"
            spellCheck="false"
          />
          {errors.plot && (
            <span className={classes.name}>
              {errors.plot} <FaHandPointUp />
            </span>
          )}
          <br />
          <label>
            Selected Producer :
            <span style={{ color: "#cd9d01", fontSize: "18px" }}>
              {formData.producer?.name}
            </span>
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            <Input
              id="producer"
              placeholder="producer"
              type="text"
              onChange={handleProducer}
              ref={producerRef}
            />
            {errors.producer && (
              <span className={classes.name}>
                {errors.producer} <FaHandPointUp />
              </span>
            )}
            <div className={classes.producerSuggestion}>
              {producerQuery && (
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
                          className={classes.producerimg}
                          src={p.pic}
                          alt="producer-image"
                        />
                        <h4>{p.name}</h4>
                      </div>
                    );
                  })}
                  {producerQuery && !loading && producers.length === 0 && (
                    <div>
                      no producers found
                      <div>
                        <AddProducer
                          producerRef={producerRef}
                          setSearchTerm={setProducerQuery}
                          setFormData={setFormData}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
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
          <div style={{ position: "relative", width: "100%" }}>
            <Input
              id="actors"
              placeholder="actors"
              type="text"
              onChange={handleActor}
              originalValue={actorQuery}
            />
            {errors.actors && (
              <span className={classes.name}>
                {errors.actors} <FaHandPointUp />
              </span>
            )}
            <div className={classes.producerSuggestion}>
              {actorQuery && (
                <div className={classes.sugesstionContainer}>
                  {loading && <Loading />}
                  {actors.map((p, i) => {
                    return (
                      !selectedActorsSet.has(p._id) && (
                        <div
                          id="producer"
                          onClick={() => actorHandler(p)}
                          className={classes.producer}
                          key={i}
                        >
                          <img
                            className={classes.producerimg}
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
          </div>
          <Button
            disabled={btnLoading}
            value={btnLoading ? <Loading /> : "update"}
            variant="tertiary"
          />
        </div>
      </form>
    )
  );
}

export default EditMovie;
