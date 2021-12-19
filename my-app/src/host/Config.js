import GLOBAL from "./Global";
import { httpRequest, url } from "./Host";

export const getNews = () => {
  var config = {
    url: `${url}/new/${GLOBAL.id}`,
    method: "get",
  };
  return httpRequest(config);
};
export const GetMurojaat = () => {
  var config = {
    url: `${url}/murojaat/${GLOBAL.id}`,
    method: "get",
  };
  return httpRequest(config);
};

export const getSubject = () => {
  var config = {
    url: `${url}/subject/`,
    method: "get",
  };
  return httpRequest(config);
};

export const createNew = (config) => {
  var configs = {
    url: `${url}/new/`,
    method: "post",
    data: config,

    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return httpRequest(configs);
};

export const deleteNew = (idD) => {
  var config = {
    url: `${url}/new/${idD}`,
    method: "delete",
  };
  return httpRequest(config);
};
export const deleteMurojat = (idM) => {
  var config = {
    url: `${url}/murojaat/${GLOBAL.id}/${idM}`,
    method: "delete",
  };
  return httpRequest(config);
};

export const editNew = (configs, idT) => {
  var config = {
    url: `${url}/new/${idT}/`,
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};

export const getEvents = () => {
  var config = {
    url: `${url}/event/${GLOBAL.id}`,
    method: "get",
  };
  return httpRequest(config);
};

export const createEvent = (config) => {
  var configs = {
    url: `${url}/event/`,
    method: "post",
    data: config,

    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return httpRequest(configs);
};

export const deleteEvent = (idD) => {
  var config = {
    url: `${url}/event/${idD}`,
    method: "delete",
  };
  return httpRequest(config);
};
export const editEvent = (configs, idT) => {
  var config = {
    url: `${url}/event/${idT}/`,
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};

export const getXodim = () => {
  var config = {
    url: `${url}/staff/`,
    method: "get",
  };
  return httpRequest(config);
};

export const createXodim = (config) => {
  var configs = {
    url: `${url}/staff/`,
    method: "post",
    data: config,
  };
  return httpRequest(configs);
};

export const register = (config) => {
  var configs = {
    url: `${url}/register/`,
    method: "post",
    data: config,
  };

  return httpRequest(configs);
};

export const deleteXodim = (idD) => {
  var config = {
    url: `${url}/staff/${idD}`,
    method: "delete",
  };
  return httpRequest(config);
};

export const patchXodim = (configs, idM) => {
  var config = {
    url: `${url}/staff/${idM}/`,
    method: "patch",
    data: configs,
  };
  return httpRequest(config);
};

export const editXodim = (configs, idM) => {
  var config = {
    url: `${url}/staff/${idM}/`,
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};

export const getSpec = () => {
  var config = {
    url: `${url}/spec/`,
    method: "get",
  };
  return httpRequest(config);
};

export const getClass = () => {
  var config = {
    url: `${url}/class-by-school/${GLOBAL.id}`,
    method: "get",
  };
  return httpRequest(config);
};

export const createClass = (config) => {
  var configs = {
    url: `${url}/class/`,
    method: "post",
    data: config,
  };
  console.log(config);
  return httpRequest(configs);
};

export const deleteClass = (idD) => {
  var config = {
    url: `${url}/class/${idD}`,
    method: "delete",
  };
  return httpRequest(config);
};

export const editClass = (configs, idM) => {
  var config = {
    url: `${url}/class/${idM}/`,
    method: "put",
    data: configs,
  };
  return httpRequest(config);
};

export const getCourses = (id) => {
  var config = {
    url: `${url}/course/${id}/`,
    method: "get",
  };
  return httpRequest(config);
};

export const getSchools = () => {
  var config = {
    url: `${url}/school/`,
    method: "get",
  };
  return httpRequest(config);
};

export const getStaff = () => {
  var config = {
    url: `${url}/staff-by-school/${GLOBAL.id}/`,
    method: "get",
  };
  return httpRequest(config);
};

export const createCourses = (configs) => {
  var config = {
    url: `${url}/course/`,
    method: "post",
    data: configs,
  };
  return httpRequest(config);
};

export const deleteCourse = (id) => {
  var config = {
    url: `${url}/course/${id}/`,
    method: "delete",
  };
  return httpRequest(config);
};

export const editCourse = (data, id) => {
  var config = {
    url: `${url}/course/${id}/`,
    method: "put",
    data: data,
  };
  return httpRequest(config);
};

export const getPupils = (id) => {
  var config = {
    url: `${url}/pupil/${id}/`,
    method: "get",
  };
  return httpRequest(config);
};

export const createPupils = (data) => {
  var config = {
    url: `${url}/pupil/`,
    method: "post",
    data: data,
  };
  return httpRequest(config);
};

export const editPupils = (data, id) => {
  var config = {
    url: `${url}/pupil/${id}/`,
    method: "patch",
    data: data,
  };
  return httpRequest(config);
};

export const deletePupils = (id) => {
  var config = {
    url: `${url}/pupil/${id}/`,
    method: "delete",
  };
  return httpRequest(config);
};
