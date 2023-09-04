import { Axios } from "axios";

const client: Axios = new Axios({ baseURL: "http://requests" });
export default client;
