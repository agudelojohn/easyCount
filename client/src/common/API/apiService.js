import axios from "axios";

export const setConfiguration = (method, url, dataRequest) => {
  return {
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: dataRequest,
  };
};

export const getAllRecipes = () => {
  //Constants
  const baseUrl = "https://8da0iso4rc.execute-api.us-east-1.amazonaws.com";
  const apiStage = "/dev_1";
  const path_getData = "/getdata";
  const path_getAllRecipes = "/getallrecipes";

  var config = setConfiguration(
    "get",
    baseUrl + apiStage + path_getAllRecipes,
    null
  );
  return axios(config);
};
