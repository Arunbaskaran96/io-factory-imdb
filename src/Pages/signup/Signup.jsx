import { useState } from "react";
import Button from "../../compoenets/ui/button/Button";
import Input from "../../compoenets/ui/input/Input";
import classes from "./signup.module.css";
import { validateSignup } from "../../utils/validate/signup";
import Loading from "../../compoenets/loading/Loading";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

function Signup() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setErrors({});
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (validateSignup(formData, setErrors)) {
        const data = await fetch(`${BASE_URL}/adduser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const res = await data.json();
        if (res.success === false) {
        } else {
          navigateTo("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.signup}>
        <Input
          onChange={handleChange}
          orginalValue={formData.name}
          placeholder="Name"
          type="text"
          id="name"
        />
        {errors.name && <span className={classes.error}>{errors.name}</span>}
        <Input
          onChange={handleChange}
          orginalValue={formData.email}
          placeholder="Email"
          type="text"
          id="email"
        />
        {errors.email && <span className={classes.error}>{errors.email}</span>}
        <Input
          onChange={handleChange}
          orginalValue={formData.password}
          placeholder="Password"
          type="password"
          id="password"
          showPassword
        />
        {errors.password && (
          <span className={classes.error}>{errors.password}</span>
        )}
        <Input
          onChange={handleChange}
          orginalValue={formData.confirmpassword}
          placeholder="Confirm Password"
          type="password"
          id="confirmpassword"
          showPassword
        />
        {errors.confirmpassword && (
          <span className={classes.error}>{errors.confirmpassword}</span>
        )}
        {errors.mismatch && (
          <span className={classes.error}>{errors.mismatch}</span>
        )}
        <Button
          disabled={loading}
          value={loading ? <Loading /> : "Register"}
          variant="tertiary"
        />
      </form>
    </div>
  );
}

export default Signup;
