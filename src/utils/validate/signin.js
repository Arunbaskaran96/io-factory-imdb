export const validSignin = (email, passowrd, setErrors) => {
  const error = {};
  if (!email) {
    error.email = "email is required";
  }
  if (!passowrd) {
    error.password = "password is required";
  }
  setErrors(error);
  return Object.keys(error).length === 0;
};
