export const validMovie = (formData, setErrors) => {
  const error = {};

  if (!formData.name) {
    error.name = "name is required";
  }
  if (!formData.year) {
    error.year = "Released year is required";
  }
  if (!formData.producer) {
    error.producer = "Producer is required";
  }
  if (!formData.plot) {
    error.plot = "plot is required";
  }
  if (formData.actors.length === 0) {
    error.actors = "atleast one actor is requried";
  }

  setErrors(error);
  return Object.keys(error).length === 0;
};
