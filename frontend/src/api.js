import axios from "axios";

import { domains } from "./config";

export default axios.create({
  baseURL: domains.api,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "x-csrftoken",
});
