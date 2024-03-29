import classes from "./signin.module.css";
import { useState, useRef, useEffect } from "react";
import Input from "../../compoenets/ui/input/Input";
import Button from "../../compoenets/ui/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../redux/slices/userSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { validSignin } from "../../utils/validate/signin";
import { FaHandPointUp } from "react-icons/fa";
import { BASE_URL } from "../../config";
import Loading from "../../compoenets/loading/Loading";
import { useDispatch } from "react-redux";

function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { setItem } = useLocalStorage("user");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [errors, setErrors] = useState({});

  const [error, setError] = useState(null);

  const formHandler = async (e) => {
    e.preventDefault();
    if (
      validSignin(
        emailRef?.current.value,
        passwordRef?.current.value,
        setErrors
      )
    ) {
      try {
        setLoading(true);
        const data = await fetch(`${BASE_URL}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
          }),
        });
        const res = await data.json();
        if (res.success === false) {
          setError(res.message);
        } else {
          nav("/home/movies");
          setItem(res);
          dispatch(addUser(res));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const generateAuth = () => {
    emailRef.current.value = "arun@gmail.com";
    passwordRef.current.value = "Arun";
  };
  return (
    <div className={classes.container}>
      <form onSubmit={formHandler} className={classes.form}>
        <Input ref={emailRef} type="email" placeholder="Email" />
        {errors.email && (
          <span className={classes.error}>
            {errors.email} <FaHandPointUp />
          </span>
        )}
        <Input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          showPassword
          disabled={loading}
        />
        {errors.password && (
          <span className={classes.error}>
            {errors.password} <FaHandPointUp />
          </span>
        )}
        {error && <span className={classes.error}>{error}</span>}

        <Button
          value={loading ? <Loading /> : "Signin"}
          variant="primary"
          disabled={loading}
        />
        <Link to="/signup">
          <Button
            value="Create new Account"
            variant="tertiary"
            disabled={loading}
            type="button"
          />
        </Link>
        <Button
          onClick={generateAuth}
          value="Generate Credential"
          variant="secondary"
          type="button"
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default Signin;
