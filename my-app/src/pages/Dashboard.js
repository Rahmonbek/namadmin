import { message } from "antd";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import YouTube from "react-youtube";
import GLOBAL from "../host/Global";
import { url } from "../host/Host";
import Loader from "./Loader";
import {
  YMaps,
  Map,
  Clusterer,
  Placemark,
  TypeSelector,
  ZoomControl,
  GeolocationControl,
  RouteButton,
  TrafficControl,
} from "react-yandex-maps";

export default class Dashboard extends Component {
  state = {
    loading: false,
    school: null,
    images: {},
    input: true,
    params: null,
    domain: null,
    selectA: false,
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAkFBMVEUAAAD///8BAQEFBQX8/Pzi4uJZWVn5+fkJCQn29vaKioq2trbf398VFRUzMzMNDQ1TU1M9PT1ubm4xMTG8vLyioqKTk5MrKyvx8fHr6+tHR0cgICCqqqrZ2dkcHBzQ0NBlZWV7e3uOjo7JyclMTEx2dnbDw8ODg4OcnJxVVVV4eHheXl5AQEBvb2+mpqZISEjpH0DzAAALXklEQVR4nO1a63raMBKVRjKWwcZcA8YQINBAmqR9/7fbuQiw29BvNyHJj53TJAVfpDnSXCUZo1AoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQvFOgDOGfpyRfyaAAUM/AleXzgB9BRjTfbwNM7oWnz+1Qw+5y3vNGw6ofe6JmiZwp4F7ir8fB/YRnDAC6ilSO9/tRPGNGQ9dIGlNucUHgcQ+P0iiYENvjBRwF/Q/uDN1d3qR77w1AO8B0OAIF5LlDyajmgeSHjnK48EdhsI8NNuAa+IISZkces9BZOfOlD5OBEwYDl/6w+EQf/v4Yex4Ws73oe6KDuGl5xGNHqK/K1mI5nP0uXB/tu9AHhSNgnI2pq5m98XlfdGFjwIbyeaZTb21NrVVWq2ca+osflr2jRhQcOt7nAUcUTPZRitpNhTc6G8i8Q6+vehOVjZNPXVls2rdu+vMnAutcfsIE1cW5tlaaj4pTBlMgJaAbr+MZmlc90HUHfZ27EzbuPH7oPd3+4Hpuv20woF6/LHv3xf17PfmV449ep/c9QOYt2zrf+bB3XSQhU/ThLoNUaooB35eLVz0UbOsTyxxHFfr0oFpGjtenjy+1YGBsrNGsatufTIO+h0iNeRmJ+E2xo5tO3hG1cIpyYFdiIPWffdz59gJYPeTnbgeOPhDyyfQx7Ff/z202OS4hxpll7X4xejssZ9Zj2YlrVvtvJ8IyUozQqrVMF7+I50WfhOFdk/+2bB11Fk6bHHGq1NfNWYIxNDBjcgA/Si03Rr5yXDwPvX35hbGfo3IKQAwlWlVcsfodZK8ZFfgejj8rQlxRWWzovU6vRIebGZ99lSYlgaxpwdzyKy9v0SVTyHCJlDU6FZgYe8kboLp2i6bCyx8+kCiXCTb4rjXLSJkYEuyA5pSCK1hBxmjXmYLdxPduqpadMONu/SxXM9nICFzls3HEgJyOx+e3A1KHVyFKtS/8HIcMI84HalFZ8ejDk3i+C2Y2Zxn5DOJkNjwUrFP+WGXcdTcLu3xp7BN7bo8PY0PPZG72F/epwzLjDKy51VxotvqmF3INKtvoVj/UC228336TEpWZH5BuQn+DjxJiwN+n9ns4E7CObMjk95cXsafgONN2J/dbmOgOEhigLEFwCeqVhzT53THznKaPsbMr0zSnCYCXC+1fgYnJkMKCn7b4IGzNKGgZyfGOcmooeXVWP/cUwB3A6d1VbUoeQJ4tZ5D4MJmzyD5RtfaLbvgBTqj1YmIW6bUwt25XXp2QPZBMwiS5l94cNIP8lz41DjCfaCT8nbKUXtt81JyxxmqFDkaCCsU8hAlqjMae78UClJjuDWnIZy93UDS9xLhMbzzdl6TSrym9sAuE9zE2iXHuldMAOd9Lkto6ijtfDzVKBQsF3PORA83MYH3EmHVMrBE+V5J/jJN55QqoYBo7mT6DkpKZHcFN/KT09p0JVokry8pFfV29s1E6C+Ovk/zQHJNbTrlBN+VOYqPDseEJWnOgQ2549nYk1gmcTCdk4HYlYMb1bLvIhLl2Yn3xOEfpmnal3S+i2P/Si6nT8acjsmNvnADPivjIHBgIWr2+Pkc/gsiK9LyCUeBNX6Qsa4zn1YFBYE13p6vyEHNKMFFgvWFyNGzZm3MbbzSe4nIskhFUS6dUSjZ4KeO1LRo7jjQKOvGo+xZFyeqoPlA9F0kIizx9b75VhuJRDJ2Rg/keIu59ZyToNKQbZDI93MqktFzQag4jtgXBzH2lRnXtGkBzeWlLyci1V/B/tNWBX1Dc/c/KBhDQHP3O1oMOfKgL5woIWITDRtMX5glLi5M/N1vXBkTF/LhRYh/zIhxtZiwf6EA0vdEifu+I3tAmV0f6wm/prR+J4r0w0isB/ObJ8Sv2wt+J7izYxQXx0nMh1KVq0So4T7ZLxZGL1wGobnbO0oo4B4rO5sXgdyaT0f0Ws8zka6sJRq2KTL2yamxP7vlckS4NOvMTyEC4lS5XkLpNrRAMePx67HQ2C+Km5SBlEyITM9EtjJFS3hTs4xMQKwaHa+rfizcXLcRbHYg0vnAeozmbn2PV4efaKI8llhl5R84RzlIExM4SdmVC7/ginijVbKq8mSV5PxnVH4we/wHER5vknjuODV0R66deIEn55UcfPUohRFNFzVxNgl4OBN5q9tg6sXi96+UPcLj/mVR8xTd3th5wuEnX05z8amuT6ax5sr0gQKIHTjoc8ILZi9EkpP7NQ+y6Lc8LYH/CVKsLrsS24tLwp/jtagUPXBstjsTK6UdeeNXuleTAGlSomeTKmOYsuDzKA9AJNJ7m4jsLGCVQK/1AD7I4h9EeIXhKNd70TU61p+8oM8TNh4sR6SChVrk9venWnDLHs/uwF01YhA7Qru7QcD8Zxz5ddZz2QFAc0et7hLNDmWEPptBEDnJExCV2WloRxJHqhj5vouIVLoT6eguaoIxR8m9iGSCaub9lNd9QL4TkaGL5r6PHq+IWcI3EREua+loC7IobMqxx9wqXQau3akE2cpCmzk9azsQicy8FI3964tWX0XEmNxLAgWyQcgFCpaCOOwOa3esReYhbnGBGI31ryYScRV7Cj+6plhfSISzeMRAsicSeMPV0iNlVxOqx91pMxV+CZGutAHEjH3r0lytEL9MtcpMrg9ZXXhXNtA4p/YZw8UgtVlc7iReUahpXJEEGPF3n5RXp+RLjJ086L1MiB9LJs7XHnjZJ8cAEhIrVbyolgRPnAAO9Cj8TAoS//K97pc+jpuOR+BmKXsnDCDQTWeXjR33xDJh4D8lau6Rox2v5H+nauFID2VI52XTLe9IPFvVGNMnjcfdQtpYRaFR454yqoRtVV6rM77IRmiBmftJWoJsRN+mmETeN/cQZ5JsVSEWejglOVJG37aBb7QRvtURmVfNoxqhlMiHOTw0IgQm+TbW6Bciv9M4SVcE/aIUJWYZ3j42D0JgnUs5cGonrrVtCmEuyz91zEnIOfQyj0kN1r/fGNnJ0xyEyLKpGs6M2Uhs2mkltQC5PD2Mo0AmXiZk7vPq/u2N9K+aEbiTy3dN1SiNeSSJM7s1zY0NkMvWP5m4/Eukh7xeJIX79xFxU7l8aJ5NQek7yCKlNaL2WZSeSLU5r2PR6YxBRsum/vDpRMQs5QiHLEHL4SqutHusQ35k2gRDRRH/ob3w5uDIa6b+ELOAiEHF6zAjx1sSca1IDmk5d8dpgr0yYf8b2C7PMxLNNCZQj1IgDpr5KxXvFN19bc5ei0O+VFI+PbZ8gDMvCS9XvobzzglXg/xnwvlx2rvBYZR4FkWO7CSykAFcYzjapuKJWjRfIHEwZKS/2kffKJ/0THvZ2vREeYsjCWuPBe21mzglhnZDa46YUrN/nAh5Fz5Ug/mdEQUQQwWTXCqKpsSOEttxOFVfpxsdOSu1M6bl5TDcDHe0WJx34pEBMLJ1WOy4/dW2vsUqd6BBGoiuJsHEXWTHKjyXBYUinnm7EOnwSpAcvYhKD+iW6eksN609Q24tLHq0troa3Yta0d/xtqJdpONLgFuc4cA+B4POHWeHad4ZDAYyK+UeL4vC+efBYH9hQn6rXC0gHjbhS84NnvajeHit09kv3KV9PvTgXD2aZFlmd8fR89N+c+glma8mP/vB3OYAB3WTJ6s8zxP8rdZJ/sjLDODWeHlFd1Y5/rdqEOETDY5PbQgxIkILhjm1Q3+ThhuKzfEM90cPvTXer1aPy+1z3FuUcwMfJgLk7Z3U5CAL/WIisVyKZn/WLYjrEHDeEYj7U6eyPhZgzR5knRJkS/18bMjEM7RwoylRKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhULx/4r/ADd/cnRabncAAAAAAElFTkSuQmCC",
  };
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  // componentDidMount() {
  //   this.getSchool();
  // }
  getSchool = () => {
    axios.get(`${url}/school-by-admin/${GLOBAL.user}`).then((res) => {
      this.setState({
        school: res.data,
        params: res.data.params,
        domain: res.data.domain,
        loading: false,
      });
    });
  };

  customRequest = (e) => {
    let image = e.target.files[0];

    var a = this.state.images;
    // a.append(`${e.target.name}`, image)
    a[`${e.target.name}`] = image;

    this.setState({ images: a });
  };
  customText = (e) => {
    var a = this.state.images;
    // a.append(`${e.target.name}`, image)
    a[`${e.target.name}`] = e.target.value;

    this.setState({ images: a, selectA: true });
  };
  domain = (e) => {
    this.setState({ domain: e.target.value });
  };
  addLesson = () => {
    const formData = new FormData();
    this.setState({ loading: true });

    if (this.state.params !== null) {
      formData.append("params", this.state.params);
    }
    if (this.state.domain !== null) {
      formData.append("domain", this.state.domain);
    }
    if (this.state.images.instagram) {
      formData.append("instagram", this.state.images.instagram);
    }
    if (this.state.images.telegram) {
      formData.append("telegram", this.state.images.telegram);
    }
    if (this.state.images.facebook) {
      formData.append("facebook", this.state.images.facebook);
    }
    if (this.state.images.youtube) {
      formData.append("youtube", this.state.images.youtube);
    }
    if (this.state.images.email) {
      formData.append("email", this.state.images.email);
    }

    if (this.state.images.tel) {
      formData.append("tel", this.state.images.tel);
    }

    if (this.state.images.b_r1) {
      formData.append("b_r1", this.state.images.b_r1);
    }

    if (this.state.images.b_c1) {
      formData.append("b_c1", this.state.images.b_c1);
    }

    if (this.state.images.b_c2) {
      formData.append("b_c2", this.state.images.b_c2);
    }

    if (this.state.images.b_c3) {
      formData.append("b_c3", this.state.images.b_c3);
    }

    if (this.state.images.video) {
      formData.append("video", this.state.images.video);
    }

    if (this.state.images.address) {
      formData.append("address", this.state.images.address);
    }

    if (this.state.images.m_h_h1) {
      formData.append("m_h_h1", this.state.images.m_h_h1);
    }

    if (this.state.images.m_h_h2) {
      formData.append("m_h_h2", this.state.images.m_h_h2);
    }

    if (this.state.images.m_h_h3) {
      formData.append("m_h_h3", this.state.images.m_h_h3);
    }

    if (this.state.images.m_h_h4) {
      formData.append("m_h_h4", this.state.images.m_h_h4);
    }

    if (this.state.images.m_h_h5) {
      formData.append("m_h_h5", this.state.images.m_h_h5);
    }

    if (this.state.images.m_h_tq) {
      formData.append("m_h_tq", this.state.images.m_h_tq);
    }

    if (this.state.images.m_h_navruz) {
      formData.append("m_h_navruz", this.state.images.m_h_navruz);
    }

    if (this.state.images.m_h_mustaqillik) {
      formData.append("m_h_mustaqillik", this.state.images.m_h_mustaqillik);
    }

    if (this.state.images.m_h_bitiruv) {
      formData.append("m_h_bitiruv", this.state.images.m_h_bitiruv);
    }

    if (this.state.images.m_h_t) {
      formData.append("m_h_t", this.state.images.m_h_t);
    }

    if (this.state.images.m_h_t_t) {
      formData.append("m_h_t_t", this.state.images.m_h_t_t);
    }

    if (this.state.images.m_h_k_h) {
      formData.append("m_h_k_h", this.state.images.m_h_k_h);
    }

    if (this.state.images.m_h_k_t) {
      formData.append("m_h_k_t", this.state.images.m_h_k_t);
    }

    if (this.state.images.m_h_oshxona) {
      formData.append("m_h_oshxona", this.state.images.m_h_oshxona);
    }

    if (this.state.images.m_h_oshxona_t) {
      formData.append("m_h_oshxona_t", this.state.images.m_h_oshxona_t);
    }

    if (this.state.images.m_h_musiqa) {
      formData.append("m_h_musiqa", this.state.images.m_h_musiqa);
    }

    if (this.state.images.m_h_musiqa_t) {
      formData.append("m_h_musiqa_t", this.state.images.m_h_musiqa_t);
    }

    if (this.state.images.m_h_sport) {
      formData.append("m_h_sport", this.state.images.m_h_sport);
    }

    if (this.state.images.m_h_sport_t) {
      formData.append("m_h_sport_t", this.state.images.m_h_sport_t);
    }

    if (this.state.images.m_h_axborot) {
      formData.append("m_h_axborot", this.state.images.m_h_axborot);
    }

    if (this.state.images.m_h_axborot_t) {
      formData.append("m_h_axborot_t", this.state.images.m_h_axborot_t);
    }

    if (this.state.images.m_h_xavfsizlik) {
      formData.append("m_h_xavfsizlik", this.state.images.m_h_xavfsizlik);
    }

    if (this.state.images.m_h_xavfsizlik_t) {
      formData.append("m_h_xavfsizlik_t", this.state.images.m_h_xavfsizlik_t);
    }

    if (this.state.images.m_h_tibbiyot) {
      formData.append("m_h_tibbiyot", this.state.images.m_h_tibbiyot);
    }

    if (this.state.images.m_h_tibbiyot_t) {
      formData.append("m_h_tibbiyot_t", this.state.images.m_h_tibbiyot_t);
    }

    if (this.state.images.m_h_o_r) {
      formData.append("m_h_o_r", this.state.images.m_h_o_r);
    }

    if (this.state.images.m_h_o) {
      formData.append("m_h_o", this.state.images.m_h_o);
    }

    if (this.state.images.m_h_o_t) {
      formData.append("m_h_o_t", this.state.images.m_h_o_t);
    }

    if (this.state.images.q) {
      formData.append("q", this.state.images.q);
    }

    if (this.state.images.q_t) {
      formData.append("q_t", this.state.images.q_t);
    }

    if (this.state.images.q_talim) {
      formData.append("q_talim", this.state.images.q_talim);
    }

    if (this.state.images.q_bitiruv) {
      formData.append("q_bitiruv", this.state.images.q_bitiruv);
    }

    if (this.state.images.q_oquvchi) {
      formData.append("q_oquvchi", this.state.images.q_oquvchi);
    }

    if (this.state.images.q_j_online) {
      formData.append("q_j_online", this.state.images.q_j_online);
    }

    if (this.state.images.q_j_forma) {
      formData.append("q_j_forma", this.state.images.q_j_forma);
    }

    if (this.state.images.q_j_koz) {
      formData.append("q_j_koz", this.state.images.q_j_koz);
    }

    if (this.state.images.q_j_hujjat) {
      formData.append("q_j_hujjat", this.state.images.q_j_hujjat);
    }

    if (this.state.images.q_j_intervyu) {
      formData.append("q_j_intervyu", this.state.images.q_j_intervyu);
    }

    if (this.state.images.q_j_qaror) {
      formData.append("q_j_qaror", this.state.images.q_j_qaror);
    }

    if (this.state.images.q_imtihon_r) {
      formData.append("q_imtihon_r", this.state.images.q_imtihon_r);
    }

    if (this.state.images.q_imtihon_t) {
      formData.append("q_imtihon_t", this.state.images.q_imtihon_t);
    }

    if (this.state.images.q_oquv_yili) {
      formData.append("q_oquv_yili", this.state.images.q_oquv_yili);
    }

    if (this.state.images.q_muddat) {
      formData.append("q_muddat", this.state.images.q_muddat);
    }

    if (this.state.images.q_imtihon) {
      formData.append("q_imtihon", this.state.images.q_imtihon);
    }

    if (this.state.images.q_hujjat_t1) {
      formData.append("q_hujjat_t1", this.state.images.q_hujjat_t1);
    }

    if (this.state.images.q_hujjat_t2) {
      formData.append("q_hujjat_t2", this.state.images.q_hujjat_t2);
    }

    if (this.state.images.q_hujjat_t3) {
      formData.append("q_hujjat_t3", this.state.images.q_hujjat_t3);
    }

    if (this.state.images.q) {
      formData.append("q", this.state.images.q);
    }

    if (this.state.images.school_name) {
      formData.append("school_name", this.state.images.school_name);
    }
    if (this.state.images.school_number) {
      formData.append("school_number", Number(this.state.images.school_number));
    }

    if (!!this.state.images.type) {
      formData.append("type", this.state.images.type);
    }
    if (!!this.state.images.phone) {
      formData.append("phone", this.state.images.phone);
    }
    if (!!this.state.images.address) {
      formData.append("address", this.state.images.address);
    }
    formData.append(
      "region",
      this.state.school.region ? this.state.school.region : ""
    );
    formData.append(
      "school_number",
      this.state.school.school_number ? this.state.school.school_number : ""
    );
    formData.append("user", GLOBAL.user ? GLOBAL.user : "");
    if (this.state.images.foto) {
      formData.append("foto", this.state.images.foto);
    }
    if (this.state.images.foto1) {
      formData.append("foto1", this.state.images.foto1);
    }
    if (this.state.images.foto2) {
      formData.append("foto2", this.state.images.foto2);
    }
    if (this.state.images.foto3) {
      formData.append("foto3", this.state.images.foto3);
    }
    if (this.state.images.foto4) {
      formData.append("foto4", this.state.images.foto4);
    }
    if (this.state.images.foto5) {
      formData.append("foto5", this.state.images.foto5);
    }
    if (this.state.images.foto6) {
      formData.append("foto6", this.state.images.foto6);
    }
    if (this.state.images.foto7) {
      formData.append("foto7", this.state.images.foto7);
    }
    axios
      .put(`${url}/school/${GLOBAL.id}/`, formData)
      .then((res) => {
        this.getSchool();
        message.success("Ma'lumot qo'shildi");
      })
      .catch((err) => {
        message.error("Ma'lumot qo'shilmadi");
        this.setState({ loading: false });
      });
  };
  onMapClick = (e) => {
    var coords = e.get("coords");
    this.setState({
      params: coords,
    });
  };
 
  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <div>
          
            <div
              style={{
                backgroundColor: "white",
                marginBottom: "30px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
            >
              <h4
                style={{ textAlign: "center", margin: "0", padding: "0.5em 0" }}
              >
                Boshqarma joylashgan manzilni kiriting
              </h4>
              <YMaps query={{ lang: "uz_Uz" }}>
                <Map
                  onClick={this.onMapClick}
                  width="100%"
                  height="65vh"
                  defaultState={{
                    center:
                      this.state.params !== null
                        ? this.state.params
                        : [41.79478951067519, 64.27236652149892],

                    zoom: 6,
                  }}
                >
                  {
                    <Clusterer
                      options={{
                        preset: "islands#invertedVioletClusterIcons",
                        groupByCoordinates: false,
                      }}
                    >
                      <Placemark
                        key={0}
                        geometry={
                          this.state.params !== null
                            ? this.state.params
                            : [41.79478951067519, 64.27236652149892]
                        }
                        properties={{
                          balloonContent: "Boshqarma binosi",
                        }}
                      />
                    </Clusterer>
                  }

                  <GeolocationControl options={{ float: "left" }} />
                  <TypeSelector options={{ float: "right" }} />
                  <TrafficControl options={{ float: "right" }} />
                  <RouteButton options={{ float: "right" }} />
                  <ZoomControl options={{ float: "left" }} />
                </Map>
              </YMaps>
            </div>

            <Form
              style={{
                backgroundColor: "white",
                padding: "20px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
            >
              <Row style={{ marginTop: "20px" }}>
                <Col lg={6} md={12} sm={12}>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma nomeri
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="school_number"
                          type="text"
                          readOnly={true}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.school_number
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma nomi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="school_name"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.school_name
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma manzili
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="address"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.address
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma turi
                        </Form.Label>
                        {this.state.selectA ? (
                          <select
                            className="formInput"
                            style={{ width: "100%" }}
                            name="type"
                            type="text"
                            value={
                              !this.state.images.type
                                ? ""
                                : this.state.images.type
                            }
                            onChange={(e) => this.customText(e)}
                          >
                            <option value="Ixtisoslashtirilgan Davlat umuta'lim Boshqarmai">
                              Ixtisoslashtirilgan Davlat umumta'lim Boshqarmai
                            </option>
                            <option value="Ayrim fanlar chuqur o'rganiladigan ixtisoslashtirilgan davlat umumiy o'rta ta'lim Boshqarmai">
                              Ayrim fanlar chuqur o'rganiladigan
                              ixtisoslashtirilgan davlat umumiy o'rta ta'lim
                              Boshqarmai
                            </option>

                            <option value="Davlat umumta'lim Boshqarmai">
                              Davlat umumta'lim Boshqarmai
                            </option>
                            <option value="Xususiy Boshqarma">
                              Xususiy Boshqarma
                            </option>
                            <option value="Prezident Boshqarmai">
                              Prezident Boshqarmai
                            </option>
                          </select>
                        ) : (
                          <select
                            className="formInput"
                            style={{ width: "100%" }}
                            name="type"
                            type="text"
                            value={
                              this.state.school !== null
                                ? this.state.school.type
                                : ""
                            }
                            onChange={(e) => {
                              this.customText(e);
                            }}
                          >
                            <option value="Ayrim fanlar chuqur o'rganiladigan ixtisoslashtirilgan davlat umumiy o'rta ta'lim Boshqarmai">
                              Ayrim fanlar chuqur o'rganiladigan
                              ixtisoslashtirilgan davlat umumiy o'rta ta'lim
                              Boshqarmai
                            </option>

                            <option value="Ixtisoslashtirilgan Davlat umuta'lim Boshqarmai">
                              Ixtisoslashtirilgan Davlat umuta'lim Boshqarmai
                            </option>
                            <option value="Davlat umumta'lim Boshqarmai">
                              Davlat umumta'lim Boshqarmai
                            </option>
                            <option value="Xususiy Boshqarma">
                              Xususiy Boshqarma
                            </option>
                            <option value="Prezident Boshqarmai">
                              Prezident Boshqarmai
                            </option>
                          </select>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma veb sahifasining ssilkasini kiriting
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="instagram"
                          type="url"
                          defaultValue={
                            this.state.domain !== null ? this.state.domain : ""
                          }
                          onChange={(e) => this.domain(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma emailini kiriting
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="email"
                          type="email"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.email
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma instagram sahifasining ssilkasini kiriting
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="instagram"
                          type="url"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.instagram
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma telegram sahifasining ssilkasini kiriting
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="telegram"
                          type="url"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.telegram
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma facebook sahifasining ssilkasini kiriting
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="facebook"
                          type="url"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.facebook
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma youtube sahifasining ssilkasini kiriting
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="youtube"
                          type="url"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.youtube
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma telefon raqamini kiriting
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="phone"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.phone
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifasining bosh qismidagi rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="b_r1"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.b_r1 !== null
                              ? this.state.school.b_r1
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi yutuqlarimiz kartichkasi orqa foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="b_c1"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.b_c1 !== null
                              ? this.state.school.b_c1
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi yangiliklar kartichkasi orqa foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="b_c2"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.b_c2 !== null
                              ? this.state.school.b_c2
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi fotolavhalar kartichkasi orqa foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="b_c3"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.b_c3 !== null
                              ? this.state.school.b_c3
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi fotolavhalar kartichkasi orqa foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="foto"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.foto !== null
                              ? this.state.school.foto
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi fotolavhalar kartichkasi orqa 1-foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="foto1"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.foto1 !== null
                              ? this.state.school.foto1
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi fotolavhalar kartichkasi orqa 2-foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="foto2"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.foto2 !== null
                              ? this.state.school.foto2
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi fotolavhalar kartichkasi orqa 3-foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="foto3"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.foto3 !== null
                              ? this.state.school.foto3
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi fotolavhalar kartichkasi orqa 4-foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="foto4"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.foto4 !== null
                              ? this.state.school.foto4
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi fotolavhalar kartichkasi orqa 5-foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="foto5"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.foto5 !== null
                              ? this.state.school.foto5
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi fotolavhalar kartichkasi orqa 6-foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="foto6"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.foto6 !== null
                              ? this.state.school.foto6
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahifadagi fotolavhalar kartichkasi orqa 7-foni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="foto7"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.foto7 !== null
                              ? this.state.school.foto7
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Bosh sahidagi video you tube link qo'ying
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="video"
                          type="url"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.video
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <YouTube
                        videoId={
                          this.state.school !== null
                            ? this.state.school.video !== null
                              ? this.state.school.video.slice(
                                  this.state.school.video.indexOf("youtu.be/") +
                                    9
                                )
                              : ""
                            : ""
                        }
                        opts={{
                          width: "100%",
                          height: "100%",
                          playerVars: {
                            // https://developers.google.com/youtube/player_parameters
                            autoplay: 0,
                          },
                        }}
                        onReady={this._onReady}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining bosh qismidagi 1-rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_h1"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_h1 !== null
                              ? this.state.school.m_h_h1
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining bosh qismidagi 2-rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_h2"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_h2 !== null
                              ? this.state.school.m_h_h2
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining bosh qismidagi 3-rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_h3"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_h3 !== null
                              ? this.state.school.m_h_h3
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining bosh qismidagi 4-rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_h4"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_h4 !== null
                              ? this.state.school.m_h_h4
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining bosh qismidagi 5-rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_h5"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_h5 !== null
                              ? this.state.school.m_h_h5
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining tadbirlari va qadriyatlari
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_tq"
                          as="textarea"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_tq
                              : ""
                          }
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining Navruz bayrami rasmi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_navruz"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_navruz
                              ? this.state.school.m_h_navruz
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining Mustaqillik bayrami
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_mustaqillik"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_mustaqillik
                              ? this.state.school.m_h_mustaqillik
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining Bitiruv bayrami rasmi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_bitiruv"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_bitiruv
                              ? this.state.school.m_h_bitiruv
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining transport xizmati uchun
                          rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_t"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_t !== null
                              ? this.state.school.m_h_t
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasining transport xizmati uchun
                          rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_t_t"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_t_t
                              : ""
                          }
                          as="textarea"
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi 306 gradusli rasm uchun
                          sarlavha
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_k_h"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_k_h
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi 306 gradusli rasm uchun
                          matn
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_k_t"
                          as="textarea"
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_k_t
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi oshxona rasmi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_oshxona"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>

                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_oshxona
                              ? this.state.school.m_h_oshxona
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi oshxona matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_oshxona_t"
                          as="textarea"
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_oshxona_t
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi musiqa rasmi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_musiqa"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_musiqa
                              ? this.state.school.m_h_musiqa
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi musiqa matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_musiqa_t"
                          as="textarea"
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_musiqa_t
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi sport rasmi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_sport"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_sport
                              ? this.state.school.m_h_sport
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi sport matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_sport_t"
                          as="textarea"
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_sport_t
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi axborot rasmi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_axborot"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_axborot
                              ? this.state.school.m_h_axborot
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi axborot matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_axborot_t"
                          as="textarea"
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_axborot_t
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi xavfsizlik rasmi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_xavfsizlik"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_xavfsizlik
                              ? this.state.school.m_h_xavfsizlik
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi xavfsizlik matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_xavfsizlik_t"
                          as="textarea"
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_xavfsizlik_t
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi tibbiyot rasmi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_tibbiyot"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_tibbiyot
                              ? this.state.school.m_h_tibbiyot
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidagi tibbiyot matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_tibbiyot_t"
                          as="textarea"
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_tibbiyot_t
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidaning oxirdagi mashhur inson
                          rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="m_h_o_r"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.m_h_o_r !== null
                              ? this.state.school.m_h_o_r
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidaning oxirdagi mashhur inson
                          matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_o"
                          placeholder="Matn kiriting..."
                          as="textarea"
                          style={{ height: "100px" }}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_o
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Boshqarma hayoti sahifasidaning oxirdagi mashhur inson
                          ismi
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="m_h_o_t"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.m_h_o_t
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining qabul jarayoni uchun rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="q"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.q !== null
                              ? this.state.school.q
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining qabul jarayoni uchun matn
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_t"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_t
                              : ""
                          }
                          placeholder="Matn kiriting..."
                          as="textarea"
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining ta'lim shakli uchun matn
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_talim"
                          as="textarea"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_talim
                              : ""
                          }
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining bitiruvchilar uchun matn
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_bitiruv"
                          as="textarea"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_bitiruv
                              : ""
                          }
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining o'quvchilar uchun matn
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_oquvchi"
                          as="textarea"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_oquvchi
                              : ""
                          }
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining online ro'yhatdan o'tish matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_j_online"
                          as="textarea"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_j_online
                              : ""
                          }
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining ariza to'ldirish matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_j_forma"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_j_forma
                              : ""
                          }
                          as="textarea"
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining arizani ko'zdan kechirish matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_j_koz"
                          as="textarea"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_j_koz
                              : ""
                          }
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining hujjat to'plash matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_j_hujjat"
                          as="textarea"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_j_hujjat
                              : ""
                          }
                          placeholder="Matn kiriting..."
                          style={{ height: "100px" }}
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining suhbat jarayoni matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_j_intervyu"
                          style={{ height: "100px" }}
                          placeholder="Matn kiriting..."
                          as="textarea"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_j_intervyu
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining so'ngi qaror matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_j_qaror"
                          as="textarea"
                          style={{ height: "100px" }}
                          placeholder="Matn kiriting..."
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_j_qaror
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={8}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={8}
                      lg={8}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining imtihonda ishtirok etish rasm
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          accept=".jpg, .jpeg, .png"
                          name="q_imtihon_r"
                          type="file"
                          onChange={this.customRequest}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      sm={4}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={4}
                      lg={4}
                    >
                      <img
                        alt="..."
                        src={
                          this.state.school !== null
                            ? this.state.school.q_imtihon_r
                              ? this.state.school.q_imtihon_r
                              : this.state.img
                            : ""
                        }
                        style={{ width: "70px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining imtihonda ishtirok etish matni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_imtihon_t"
                          placeholder="Matn kiriting..."
                          as="textarea"
                          style={{ height: "100px" }}
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_imtihon_t
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining o'quv yili
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_oquv_yili"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_oquv_yili
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining hujjat topshirish muddati
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_muddat"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_muddat
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining imtihon kuni
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_imtihon"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_imtihon
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining kerakli hujjatlari 1
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_hujjat_t1"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_hujjat_t1
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining kerakli hujjatlari 2
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_hujjat_t2"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_hujjat_t2
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col
                      sm={12}
                      style={{ alignItems: "center", justifyContent: "center" }}
                      md={12}
                      lg={12}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            borderBottom: "1px solid black",
                            marginBottom: "20px",
                            fontSize: "16px",
                          }}
                        >
                          Qabul sahifasining kerakli hujjatlari 3
                        </Form.Label>
                        <Form.Control
                          className="formInput"
                          name="q_hujjat_t3"
                          type="text"
                          defaultValue={
                            this.state.school !== null
                              ? this.state.school.q_hujjat_t3
                              : ""
                          }
                          onChange={(e) => this.customText(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Button
                className="btnFormIn"
                onClick={this.addLesson}
                variant="primary"
              >
                Ma'lumotlarni qo'shish
              </Button>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
