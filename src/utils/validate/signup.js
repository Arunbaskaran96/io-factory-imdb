export const validateSignup = (formData, setErrors) => {
  let error = {};
  if (!formData.name) {
    error.name = "name is required";
  }
  if (!formData.email) {
    error.email = "email is required";
  } else {
    if (!validEmail(formData.email)) {
      error.email = "Enter a valid Email";
    }
  }
  if (!formData.password) {
    error.password = "password is required";
  }
  if (!formData.confirmpassword) {
    error.confirmpassword = "confirm password is required";
  }
  if (formData.password != formData.confirmpassword) {
    error.mismatch = "passowrd & confirm password mismatch";
  }
  setErrors(error);
  return Object.keys(error).length === 0;
};

function validEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}
