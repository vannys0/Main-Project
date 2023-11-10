function validateName(name) {
  const namePattern = /^[A-Z][a-zA-Z]*$/;
  const hasNumber = /\d/.test(name);

  return name === ""
    ? "Name is required"
    : hasNumber
    ? "Invalid name"
    : namePattern.test(name)
    ? ""
    : "First letter must be uppercase";
}

function validateEmail(email) {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return email === ""
    ? "Email is required"
    : emailPattern.test(email)
    ? ""
    : "Invalid email format";
}

function validatePassword(password) {
  // const passwordPattern = /^(?=.*\d.*\D|\D.*\d)[a-zA-Z\d]{4,}$/;
  return password === ""
    ? "Password is required"
    : // : passwordPattern.test(password)
      // ? ""
      "";
}

function Validation(values) {
  let errors = {};

  errors.name = validateName(values.name);
  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);

  return errors;
}

export default Validation;
