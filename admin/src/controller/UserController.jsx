import appConfig from '../../config.json';
import SecureStore from "react-secure-storage";

const BASE_URL = appConfig.apiBasePath; //e.g "http://localhost:8080/api";
var END_POINT = "/login";
//for experimental
export async function signin(data) {
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
