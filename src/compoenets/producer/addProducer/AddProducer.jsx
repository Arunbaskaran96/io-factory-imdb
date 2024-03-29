import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";
import { useEffect, useState } from "react";
import { validateActor } from "../../../utils/validate/actor";
import classes from "./addproducer.module.css";
import { BASE_URL } from "../../../config";
import { useDispatch } from "react-redux";
import {
  addProducer,
  producerSelector,
} from "../../../redux/slices/producerSlice";
import Loading from "../../loading/Loading";
import TextArea from "../../ui/textArea/TextArea";

function AddProducer({ producerRef, setSearchTerm }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { addProducerSuccessfully, status } = producerSelector();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    bio: "",
    gender: "",
  });

  const handleChange = (e) => {
    if (e.target.id === "female") {
      setFormData({ ...formData, gender: "female" });
    } else if (e.target.id === "male") {
      setFormData({ ...formData, gender: "male" });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  useEffect(() => {
    if (addProducerSuccessfully) {
      if (producerRef) {
        producerRef.current.value = "";
        setSearchTerm("");
      }
      if (setFormData) {
        setFormData({ ...formData, producer: "" });
      }
      close();
    }
  }, [addProducerSuccessfully]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateActor(formData, setErrors)) {
      dispatch(addProducer(formData));

      setFormData({
        name: "",
        dob: "",
        bio: "",
        gender: "",
      });
    }
  };
  return (
    <div>
      <Button
        type="button"
        onClick={open}
        value="Add Producer"
        variant="primary"
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
            originalValue={formData.name}
          />
          {errors.name && <span className={classes.error}>{errors.name}</span>}
          <TextArea
            onChange={handleChange}
            id="bio"
            type="text"
            placeholder="Bio"
            originalValue={formData.bio}
          />
          {errors.bio && <span className={classes.error}>{errors.bio}</span>}
          <Input
            onChange={handleChange}
            id="dob"
            type="date"
            placeholder="date"
            originalValue={formData.dob}
          />
          {errors.dob && <span className={classes.error}>{errors.dob}</span>}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3>Gender</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                onChange={handleChange}
                id="male"
                type="radio"
                name="gender"
                checked={formData.gender === "male"}
              />
              <span>Male</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                onChange={handleChange}
                id="female"
                type="radio"
                name="gender"
                checked={formData.gender === "female"}
              />
              <span>Female</span>
            </div>
          </div>
          {errors.gender && (
            <span className={classes.error}>{errors.gender}</span>
          )}
          <Button
            disabled={status}
            value={status ? <Loading /> : "submit"}
            variant="tertiary"
          />
        </form>
      </Modal>
    </div>
  );
}

export default AddProducer;
