import { forwardRef, useEffect, useState } from "react";
import classes from "./input.module.css";
import { FaEye } from "react-icons/fa";

function Input(props, ref) {
  const {
    type,
    placeholder,
    showPassword,
    value,
    onChange,
    id,
    height,
    originalValue,
  } = props;
  const [inputType, setInputType] = useState("");

  useEffect(() => {
    setInputType(type);
  }, []);

  const changeHandler = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className={classes.inputContainer}>
      <input
        style={{ height: height }}
        id={id}
        className={classes.input}
        type={inputType}
        ref={ref}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        value={originalValue}
        spellCheck={false}
      />
      {showPassword && (
        <FaEye
          onClick={changeHandler}
          style={{ cursor: "pointer" }}
          size={20}
        />
      )}
    </div>
  );
}

export default forwardRef(Input);
