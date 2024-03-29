import { Modal } from "@mantine/core";
import Button from "../../ui/button/Button";
import classes from "./addactor.module.css";
import { useDisclosure } from "@mantine/hooks";
import Input from "../../ui/input/Input";
import { useEffect, useState } from "react";
import { validateActor } from "../../../utils/validate/actor";
import TextArea from "../../ui/textArea/TextArea";
import { useDispatch } from "react-redux";
import { actorSelector, addActor } from "../../../redux/slices/actorSlice";
import Loading from "../../loading/Loading";

function AddActor({ setActorQuery }) {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const { status, addedSuccessfully } = actorSelector();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    if (addedSuccessfully) {
      if (setActorQuery) {
        setActorQuery("");
      }
      close();
    }
  }, [addedSuccessfully]);

  const handleChange = (e) => {
    if (e.target.id === "male") {
      setFormData({ ...formData, gender: "male" });
    } else if (e.target.id === "female") {
      setFormData({ ...formData, gender: "female" });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateActor(formData, setErrors)) {
      dispatch(addActor(formData));
      setFormData({
        name: "",
        bio: "",
        gender: "",
        dob: "",
      });
    }
  };
  return (
    <div className={classes.container}>
      <Button
        type="button"
        onClick={open}
        value="Add Actor"
        variant="tertiary"
      />
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        classNames={{ body: classes.modal }}
      >
        <form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            id="name"
            type="text"
            placeholder="name"
          />
          {errors.name && <span className={classes.error}>{errors.name}</span>}

          <TextArea
            onChange={handleChange}
            id="bio"
            type="text"
            placeholder="bio"
          />
          {errors.bio && <span className={classes.error}>{errors.bio}</span>}
          <Input
            onChange={handleChange}
            id="dob"
            type="date"
            placeholder="dob"
          />
          {errors.dob && <span className={classes.error}>{errors.dob}</span>}
          <div className={classes.genderContainer}>
            <h4>Gender</h4>
            <div className={classes.gender}>
              <input
                id="male"
                onChange={handleChange}
                name="gender"
                type="radio"
              />
              <span>Male</span>
            </div>
            <div className={classes.gender}>
              <input
                id="female"
                onChange={handleChange}
                name="gender"
                type="radio"
              />
              <span>Female</span>
            </div>
          </div>
          {errors.gender && (
            <span className={classes.error}>{errors.gender}</span>
          )}
          <Button
            disabled={status}
            value={status ? <Loading /> : "Submit"}
            variant="tertiary"
          />
        </form>
      </Modal>
    </div>
  );
}

export default AddActor;
