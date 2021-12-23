import { httpRequest, url } from "./Host";

export const getNews = () => {
  var config = {
    url: `${url}/new/`,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${window.localStorage.getItem("token")}`
      },
    method: "get",
  };
  return httpRequest(config);
};
export const GetMurojaat = () => {
  var config = {
    url: `${url}/murojaat/`,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${window.localStorage.getItem("token")}`
      },
    method: "get",
  };
  return httpRequest(config);
};

export const createNew = (config) => {
  var configs = {
    url: `${url}/new/`,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${window.localStorage.getItem("token")}`
      },
    method: "post",
    data: config,
     

  };
  return httpRequest(configs);
};

export const deleteNew = (idD) => {
  var config = {
    url: `${url}/new/${idD}`,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${window.localStorage.getItem("token")}`
      },
    method: "delete",
  };
  return httpRequest(config);
};
export const deleteMurojat = (idM) => {
  var config = {
    url: `${url}/murojaat/${idM}`,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${window.localStorage.getItem("token")}`
      },
    method: "delete",
  };
  return httpRequest(config);
};

export const editNew = (configs, idT) => {
  var config = {
    url: `${url}/new/${idT}/`,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${window.localStorage.getItem("token")}`
      },
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};

export const getEvents = () => {
  var config = {
    url: `${url}/events/`,
    method: "get",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
     'Authorization': `Token ${window.localStorage.getItem("token")}`
    },
  
  };
  return httpRequest(config);
};

export const createEvent = (config) => {
  var configs = {
    url: `${url}/events/`,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${window.localStorage.getItem("token")}`
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
       'Authorization': `Token ${window.localStorage.getItem("token")}`
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
       'Authorization': `Token ${window.localStorage.getItem("token")}`
      },
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};