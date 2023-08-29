import { Axios } from "axios";

const client: Axios = new Axios({ baseURL: "http://contracts" });
export default client;
