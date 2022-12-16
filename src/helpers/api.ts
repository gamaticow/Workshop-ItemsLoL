import axios from "axios";

export const baseURL =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/";

export const api = axios.create({
  baseURL: baseURL + "v1/",
  timeout: 1000,
});
