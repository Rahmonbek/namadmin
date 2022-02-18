import { httpRequest, url } from "./Host";

export const getEvents = () => {
  var config = {
    url: `${url}/events/`,
    method: "get",
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
  };
  return httpRequest(config);
};

export const createEvent = (config) => {
  var configs = {
    url: `${url}/events/`,
    headers: {
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
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
  };
  return httpRequest(config);
};

export const createYangilik = (config) => {
  var configs = {
    url: `${url}/news/`,
    headers: {
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
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};

export const getXodim = () => {
  var config = {
    url: `${url}/rahbariyat/`,
    method: "get",
  };
  return httpRequest(config);
};

export const createXodim = (config) => {
  var configs = {
    url: `${url}/rahbariyat/`,
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "post",
    data: config,
  };
  return httpRequest(configs);
};

export const register = (config) => {
  var configs = {
    url: `${url}/register/`,
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "post",
    data: config,
  };

  return httpRequest(configs);
};

export const deleteXodim = (idD) => {
  var config = {
    url: `${url}/rahbariyat/${idD}`,
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "delete",
  };
  return httpRequest(config);
};

export const patchXodim = (configs, idM) => {
  var config = {
    url: `${url}/rahbariyat/${idM}/`,
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "patch",
    data: configs,
  };
  return httpRequest(config);
};

export const editXodim = (configs, idM) => {
  var config = {
    url: `${url}/rahbariyat/${idM}/`,
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};
export const getSpec = () => {
  var config = {
    url: `${url}/speciality/`,
    method: "get",
  };
  return httpRequest(config);
};

export const getTumanlar = () => {
  var config = {
    url: `${url}/regions/`,
    method: "get",
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
  };
  return httpRequest(config);
};

export const createTumanlar = (config) => {
  var configs = {
    url: `${url}/regions/`,
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "post",
    data: config,
  };
  return httpRequest(configs);
};

export const deleteTumanlar = (idD) => {
  var config = {
    url: `${url}/regions/${idD}`,
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "delete",
  };
  return httpRequest(config);
};
export const editTumanlar = (configs, idT) => {
  var config = {
    url: `${url}/regions/${idT}/`,
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};

export const getProjects = () => {
  var config = {
    url: `${url}/projects/`,
    method: "get",
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
  };
  return httpRequest(config);
};

export const createProjects = (data) => {
  var config = {
    url: `${url}/projects/`,
    method: "post",
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    data: data,
  };
  return httpRequest(config);
};

export const editProjects = (data, id) => {
  var config = {
    url: `${url}/projects/${id}/`,
    method: "patch",
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    data: data,
  };
  return httpRequest(config);
};

export const deleteProjects = (id) => {
  var config = {
    url: `${url}/projects/${id}/`,
    method: "delete",
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
  };
  return httpRequest(config);
};
