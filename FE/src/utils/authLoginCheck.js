import axios from "axios";

import { URL } from "../data/constants";

const authLoginCheck = async () => {
  const localUser = localStorage.getItem("localUser");

  if (localUser === null) {
    return false;
  }

  const newLocalUser = JSON.parse(localUser);

  const {
    headers: { authorization },
  } = await axios.post(
    `${URL}/members/renewAccessToken`,
    {},
    {
      headers: { Refresh: newLocalUser.refresh },
    },
  );

  console.log("authorization : ", authorization);

  if (authorization === undefined) {
    return false;
  }

  newLocalUser.accessToken = authorization;

  localStorage.setItem("localUser", JSON.stringify(newLocalUser));

  return true;
};

export default authLoginCheck;
