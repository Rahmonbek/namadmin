import { httpRequest, url } from "./Host";

export const getEvents = () => {
  var config = {
    url: `${url}/events/`,
    method: "get",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
  };
  return httpRequest(config);
};

export const createEvent = (config) => {
  var configs = {
    url: `${url}/events/`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "post",
    data: config,
  };
  return httpRequest(configs);
};

export const deleteEvent = (idD) => {
  var config = {
    url: `${url}/events/${idD}`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "delete",
  };
  return httpRequest(config);
};
export const editEvent = (configs, idT) => {
  var config = {
    url: `${url}/events/${idT}/`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};
export const getYangilik = () => {
  var config = {
    url: `${url}/news/`,
    method: "get",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
  };
  return httpRequest(config);
};

export const createYangilik = (config) => {
  var configs = {
    url: `${url}/news/`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "post",
    data: config,
  };
  return httpRequest(configs);
};

export const deleteYangilik = (idD) => {
  var config = {
    url: `${url}/news/${idD}`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "delete",
  };
  return httpRequest(config);
};
export const editYangilik = (configs, idT) => {
  var config = {
    url: `${url}/news/${idT}/`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};
