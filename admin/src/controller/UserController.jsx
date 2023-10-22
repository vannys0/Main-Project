import appConfig from '../../config.json';
const BASE_URL = appConfig.apiBasePath; //e.g "http://localhost:8080/api";
import SecureStore from "react-secure-storage";
import.meta.env;

//for experimental
export async function signin(data) {
  var END_POINT = "/login";
  console.log("siginin", BASE_URL + END_POINT);
  var response = await fetch(BASE_URL + END_POINT, {
    method: "POST",
  });
  var token = response.text();
  return token;
}

export function clear() {
  SecureStore.clear();
}
