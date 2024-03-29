export const validateActor = (formData, setErrors) => {
  let error = {};
  if (!formData.name) {
    error.name = "name is required";
  }
  if (!formData.bio) {
    error.bio = "bio is required";
  }
  if (!formData.gender) {
    error.gender = "gender is required";
  }
  if (!formData.dob) {
    error.dob = "dob is required";
  }
  setErrors(error);
  return Object.keys(error).length === 0;
};
