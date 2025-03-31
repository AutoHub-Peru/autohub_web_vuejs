import axios from "axios";

export default axios.create({
  baseURL: "https://nova-core.azurewebsites.net",
  headers: {
    "Content-type": "application/json",
    "Acess-Control-Allow-Origin": "*",
  },
});
