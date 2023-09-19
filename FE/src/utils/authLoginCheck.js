import axios from "axios";

import { URL } from "../data/constants";

const authLoginCheck = () => {
  const localUser = localStorage.getItem("localUser");

  if (localUser === null) {
    return false;
  }

  const newLocalUser = JSON.parse(localUser);
  axios
    .post(
      `${URL}/members/renewAccessToken`,
      {},
      {
        headers: { Refresh: newLocalUser.refresh },
      },
    )
    .then((response) => {
      newLocalUser.accessToken = response.headers.authorization;
      localStorage.setItem("localUser", JSON.stringify(newLocalUser));
    })
    .catch(() => {
      return window.location.replace("/login");
    });

  return JSON.parse(localStorage.getItem("localUser"));
};

export default authLoginCheck;
