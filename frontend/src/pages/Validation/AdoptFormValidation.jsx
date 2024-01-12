function validatePhone(phone) {
  const phoneNumberPattern = /^09\d{9}$/;
  return phone === ""
    ? "Phone number is required"
    : phoneNumberPattern.test(phone)
    ? ""
    : "Invalid Phone Number Format";
}

function validateProvince(province) {
  return province === "" ? "Field is required" : "";
}

function validateCity(city) {
  return city === "" ? "Field is required" : "";
}

function validateBarangay(barangay) {
  return barangay === "" ? "Field is required" : "";
}

function validateOption(serviceoption) {
  return serviceoption === "" ? "Field is required" : "";
}

function validateReason(reason) {
  return reason === "" ? "Field is required" : "";
}

function AdoptFormValidation(values) {
  let errors = {};

  errors.email = validateEmail(values.email);
  errors.name = validateName(values.name);
  errors.phone = validatePhone(values.phone);
  errors.province = validateProvince(values.province);
  errors.city = validateCity(values.city);
  errors.barangay = validateBarangay(values.barangay);
  errors.serviceoption = validateOption(values.serviceoption);
  errors.reason = validateReason(values.reason);

  return errors;
}

export default AdoptFormValidation;
