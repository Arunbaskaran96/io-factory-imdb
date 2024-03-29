import classes from "./button.module.css";

function Button({ value, variant, onClick, height, type, disabled }) {
  return (
    <div className={classes.container}>
      <button
        style={{ height: height }}
        className={`${classes.btn} ${
          variant === "primary" && classes.primary
        } ${variant === "secondary" && classes.secondary} ${
          variant === "tertiary" && classes.tertiary
        }`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {value}
      </button>
    </div>
  );
}

export default Button;
