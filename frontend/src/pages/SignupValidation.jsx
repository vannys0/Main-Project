import { toast } from "react-toastify";

function Validation(values) {
  let error = {};
  const email_pattern = /^[^s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/;

  if (values.name === "") {
    toast.warning("Name field is required");
  } else {
    error.name = "";
  }
  // validate email
  if (values.email === "") {
    toast.warning("Email field is required");
    // } else if (!email_pattern.test(values.email)) {
    //   toast.warning("Please enter a valid email");
  } else {
    error.email = "";
  }
  //validate password
  if (values.password === "") {
    //   } else if (!password_pattern.test(values.password)) {
    toast.warning("Password field is required");
  } else {
    error.password = "";
  }

  return error;
  // if (values.password === "") {
  //   error.password = "Field is required";
  //   // } else if (!password_pattern.test(values.password)) {
  //   //   error.password = "Minimum of 8 characters";
  // } else {
  //   error.password = "";
  // }
  // return error;
}

export default Validation;
