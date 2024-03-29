import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActor } from "../../../redux/slices/actorSlice";
import { useSelector } from "react-redux";
import Input from "../../ui/input/Input";
import classes from "./editactor.module.css";
import Button from "../../ui/button/Button";
import { validateActor } from "../../../utils/validate/actor";
import TextArea from "../../ui/textArea/TextArea";
import Loading from "../../loading/Loading";
import { BASE_URL } from "../../../config";

function EditActor() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const actor = useSelector((state) => getActor(state, id));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(actor);
  }, [actor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateActor(formData, setErrors)) {
        setLoading(true);
        const data = await fetch(`${BASE_URL}/editactor/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const res = await data.json();
        if (res.success === false) {
        } else {
          navigate("/home/actors");
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

  return (
    actor && (
      <div>
        <form onSubmit={handleSubmit} className={classes.editActor}>
          <Input
            originalValue={formData.name}
            id="name"
            onChange={handleChange}
          />
          {errors.name && <span className={classes.error}>{errors.name}</span>}

          <TextArea
            onChange={handleChange}
            className={classes.bio}
            defaultValue={formData.bio}
            id="bio"
          />
          <Input
            onChange={handleChange}
            type="date"
            id="dob"
            originalValue={formData.dob}
          />
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
          <Button
            disabled={loading}
            value={loading ? <Loading /> : "update"}
            variant="tertiary"
          />
        </form>
      </div>
    )
  );
}

export default EditActor;
