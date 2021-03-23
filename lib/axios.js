import axios from "axios";

const instance = axios.create({
  baseURL: "https://ticket-digital-app-default-rtdb.firebaseio.com/",
});

export default instance;
