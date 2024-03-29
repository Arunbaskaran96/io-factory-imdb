import { Loader } from "@mantine/core";
import classes from "./loading.module.css";

function Loading() {
  return (
    <div className={classes.container}>
      <Loader size={46} />
    </div>
  );
}

export default Loading;
