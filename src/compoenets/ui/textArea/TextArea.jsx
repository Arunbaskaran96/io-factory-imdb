import classes from "./textarea.module.css";

function TextArea(props) {
  const { onChange, defaultValue, id, placeholder } = props;
  return (
    <div className={classes.container}>
      <textarea
        onChange={onChange}
        className={classes.text}
        defaultValue={defaultValue}
        id={id}
        spellCheck={false}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextArea;
