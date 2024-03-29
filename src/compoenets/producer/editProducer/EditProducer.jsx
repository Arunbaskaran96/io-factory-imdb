import { useEffect, useState } from "react";
import classes from "./editproducer.module.css";
import { useSelector } from "react-redux";
import { getProducer } from "../../../redux/slices/producerSlice";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import TextArea from "../../ui/textArea/TextArea";
import { validateActor } from "../../../utils/validate/actor";
import Loading from "../../loading/Loading";
import { BASE_URL } from "../../../config";

function EditProducer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    bio: "",
    gender: "",
  });
  const fetchProducer = useSelector((state) => getProducer(state, id));
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateActor(formData, setErrors)) {
        setLoading(true);
        const data = await fetch(`${BASE_URL}/editproducer/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const res = await data.json();
        if (res.success === false) {
        } else {
          navigate("/home/producers");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "male") {
      setFormData({ ...formData, gender: "male" });
    } else if (e.target.id === "female") {
      setFormData({ ...formData, gender: "female" });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  useEffect(() => {
    setFormData(fetchProducer);
  }, [id]);
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.editProducer}>
        <Input
          onChange={handleChange}
          type="text"
          placeholder="name"
          originalValue={formData.name}
          id="name"
        />
        {errors.name && <span className={classes.error}>{errors.name}</span>}
        <TextArea
          onChange={handleChange}
          className={classes.bio}
          defaultValue={formData.bio}
          id="bio"
        />
        {errors.bio && <span className={classes.error}>{errors.bio}</span>}
        <Input
          originalValue={formData.dob}
          onChange={handleChange}
          type="date"
          id="dob"
        />
        {errors.dob && <span className={classes.error}>{errors.dob}</span>}
        <div className={classes.genderContainer}>
          <h4>Gender</h4>
          <div className={classes.gender}>
            <input
              onChange={handleChange}
              name="gender"
              type="radio"
              id="male"
              checked={formData.gender === "male"}
            />
            <span>Male</span>
          </div>
          <div className={classes.gender}>
            <input
              onChange={handleChange}
              name="gender"
              type="radio"
              id="female"
              checked={formData.gender === "female"}
            />
            <span>Female</span>
          </div>
        </div>
        {errors.gender && (
          <span className={classes.error}>{errors.gender}</span>
        )}
        <Button
          disabled={loading}
          value={loading ? <Loading /> : "update"}
          variant="tertiary"
        />
      </form>
    </div>
  );
}

export default EditProducer;
