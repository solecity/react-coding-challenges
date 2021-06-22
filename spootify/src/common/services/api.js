import axios from "axios";

import config from "../../config";

export const fetchToken = async () => {
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: config.api.clientId,
      password: config.api.clientSecret,
    },
  };

  try {
    const res = await axios.post(
      config.api.authUrl,
      "grant_type=client_credentials",
      headers
    );

    return res.data.access_token;
  } catch (error) {
    throw error;
  }
};

export const getData = async (token, path, item, callback) => {
  try {
    const res = await axios.get(`${config.api.baseUrl}/${path}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(item);
    console.log(res.data);

    callback(res.data[item].items);
  } catch (error) {
    throw error;
  }
};
